import {requireValid} from './data-lib.ts';
const {waters}=requireValid();console.log(`VALID: ${waters.length} acque; ${waters.reduce((a,w)=>a+w.warnings.length,0)} avvisi (dettagli in generated/report.json).`);
