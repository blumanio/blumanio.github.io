import unittest, importlib.util, pathlib, math
ROOT=pathlib.Path(__file__).resolve().parents[1]
def module(slug):
    spec=importlib.util.spec_from_file_location(slug,ROOT/'projects'/slug/'analyze.py')
    m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m);return m
class AnalysisTests(unittest.TestCase):
    def test_head_and_missing(self):
        m=module('groundwater-monitoring');r={'well':'A','date':'2025-01-01','measuring_point_m':100,'depth_to_water_m':4}
        result=m.analyze([r,{**r,'date':'2025-02-01','depth_to_water_m':None}]);self.assertEqual(result['series']['A'][0]['head_m'],96);self.assertEqual(result['missing_count'],1)
        with self.assertRaises(ValueError):m.analyze([r,r])
    def test_quality_boundaries(self):
        m=module('water-quality')
        self.assertEqual(m.classify(1,'=',1),'At or below reference')
        self.assertEqual(m.classify(1,'<',1),'Below reference (non-detect)')
        self.assertEqual(m.classify(2,'<',1),'Indeterminate')
        self.assertEqual(m.classify(2,'=',1),'Above reference')
        with self.assertRaises(ValueError):m.classify(float('nan'),'=',1)
        with self.assertRaises(ValueError):m.analyze([{'well':'A','date':'2025-01-01','analyte':'a','unit':'mg/L','value':1,'qualifier':'='}],{'a':{'unit':'ug/L','value':1}})
    def test_gradient_known_plane(self):
        m=module('groundwater-map');w=[{'x':0,'y':0,'head_m':100},{'x':1000,'y':0,'head_m':98},{'x':0,'y':1000,'head_m':99}];g=m.gradient(w)
        self.assertAlmostEqual(g['gradient_m_per_m'],math.sqrt(5)*.001);self.assertAlmostEqual(g['flow_bearing_deg'],63.4349488)
        self.assertIsNone(m.gradient([{**p,'head_m':100} for p in w])['flow_bearing_deg'])
        with self.assertRaises(ValueError):m.gradient([w[0],w[1],{'x':2000,'y':0,'head_m':97}])
if __name__=='__main__':unittest.main()
