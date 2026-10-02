"""Synthetic monitoring study. Python 3.10+, standard library only."""
import json, math
from pathlib import Path
from datetime import date

def analyze(rows):
    seen=set(); series={}; missing=0
    for r in rows:
        date.fromisoformat(r['date'])
        key=(r['well'], r['date'])
        if key in seen: raise ValueError(f'Duplicate measurement: {key}')
        seen.add(key)
        mp=r['measuring_point_m']; depth=r['depth_to_water_m']
        if not isinstance(mp,(int,float)) or not math.isfinite(mp): raise ValueError('Invalid measuring point')
        if depth is not None and (not isinstance(depth,(int,float)) or not math.isfinite(depth)): raise ValueError('Invalid depth')
        if depth is None: missing+=1
        series.setdefault(r['well'],[]).append({'date':r['date'],'head_m':None if depth is None else round(mp-depth,3)})
    summaries={}
    for well, points in series.items():
        points.sort(key=lambda r:r['date']); valid=[r for r in points if r['head_m'] is not None]
        if not valid: summaries[well]={'count':0}; continue
        h=[r['head_m'] for r in valid]
        summaries[well]={'count':len(h),'min_m':min(h),'max_m':max(h),'range_m':round(max(h)-min(h),3),'first_to_last_change_m':round(h[-1]-h[0],3)}
    return {'series':series,'summary':summaries,'missing_count':missing}

if __name__=='__main__':
    p=Path(__file__).parent
    result=analyze(json.loads((p/'data.json').read_text()))
    (p/'results.json').write_text(json.dumps(result,indent=2)+'\n')
    (p/'data.js').write_text('window.STUDY = '+json.dumps(result)+';\n')
    print(json.dumps(result['summary'],indent=2))
