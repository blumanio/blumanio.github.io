"""Three-well planar head surface on a fictional local metric grid."""
import math, json
from pathlib import Path

def gradient(wells):
    if len(wells)!=3: raise ValueError('Exactly three wells required')
    if any(not isinstance(w[k],(int,float)) or not math.isfinite(w[k]) for w in wells for k in ('x','y','head_m')): raise ValueError('Non-finite coordinate/head')
    a,b,c=wells
    dx1,dy1,dh1=b['x']-a['x'],b['y']-a['y'],b['head_m']-a['head_m']
    dx2,dy2,dh2=c['x']-a['x'],c['y']-a['y'],c['head_m']-a['head_m']
    det=dx1*dy2-dx2*dy1
    if abs(det)<1e-9: raise ValueError('Collinear wells cannot define a plane')
    gx=(dh1*dy2-dh2*dy1)/det; gy=(dx1*dh2-dx2*dh1)/det
    magnitude=math.hypot(gx,gy)
    return {'dh_dx':gx,'dh_dy':gy,'intercept_m':a['head_m']-gx*a['x']-gy*a['y'],'gradient_m_per_m':magnitude,'flow_bearing_deg':None if magnitude<1e-12 else (math.degrees(math.atan2(-gx,-gy))+360)%360}

if __name__=='__main__':
    p=Path(__file__).parent; data=json.loads((p/'data.json').read_text()); result={**data,'gradient':gradient(data['wells'])}
    (p/'results.json').write_text(json.dumps(result,indent=2)+'\n')
    (p/'data.js').write_text('window.STUDY = '+json.dumps(result)+';\n')
    print(json.dumps(result['gradient'],indent=2))
