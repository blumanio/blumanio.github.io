"""Synthetic screening exercise; thresholds are illustrative, not legal standards."""
import json, math
from pathlib import Path

def classify(value, qualifier, threshold):
    if not all(isinstance(v,(int,float)) and math.isfinite(v) for v in (value,threshold)) or value<0 or threshold<=0: raise ValueError('Invalid result or threshold')
    if qualifier=='=': return 'Above reference' if value>threshold else 'At or below reference'
    if qualifier=='<': return 'Below reference (non-detect)' if value<=threshold else 'Indeterminate'
    raise ValueError('Unsupported qualifier')

def analyze(rows, thresholds):
    result=[]; seen=set()
    for row in rows:
        key=(row['well'],row['date'],row['analyte'])
        if key in seen: raise ValueError(f'Duplicate sample/analyte: {key}')
        seen.add(key)
        threshold=thresholds[row['analyte']]
        if row['unit']!=threshold['unit']: raise ValueError('Unit mismatch; explicit conversion required')
        result.append({**row,'reference':threshold['value'],'status':classify(row['value'],row['qualifier'],threshold['value'])})
    return result

if __name__=='__main__':
    p=Path(__file__).parent
    result=analyze(json.loads((p/'data.json').read_text()),json.loads((p/'thresholds.json').read_text()))
    (p/'results.json').write_text(json.dumps(result,indent=2)+'\n')
    (p/'data.js').write_text('window.STUDY = '+json.dumps(result)+';\n')
    print(json.dumps(result,indent=2))
