import type { Field, Measurement } from '../data/schema.ts';
export type Predicate={field:Field;operator:'lt'|'lte'|'gt'|'gt_lte';value:number|readonly[number,number]};
export function matches(m:Measurement|undefined, p:Predicate):boolean|null {
 if(!m)return null;
 const lo=m.qualifier==='<'||m.qualifier==='<='?0:m.value;
 const hi=m.qualifier==='>'||m.qualifier==='>='?Infinity:m.value;
 const v=typeof p.value==='number'?p.value:0;
 if(p.operator==='lt'){if(hi<v||(hi===v&&m.qualifier==='<'))return true;if(lo>=v)return false;return null;}
 if(p.operator==='lte'){if(hi<=v)return true;if(lo>v||(lo===v&&m.qualifier==='>'))return false;return null;}
 if(p.operator==='gt'){if(lo>v||(lo===v&&m.qualifier==='>'))return true;if(hi<=v)return false;return null;}
 const [a,b]=p.value as readonly[number,number];
 const l=matches(m,{...p,operator:'gt',value:a}),h=matches(m,{...p,operator:'lte',value:b});
 return l===false||h===false?false:l===true&&h===true?true:null;
}
export const FILTERS=[
 {id:'sodio',label:'Sodio < 20',descriptor:'Meno di 20 milligrammi di sodio per litro.',field:'sodio',operator:'lt',value:20},
 {id:'calcio',label:'Calcio > 150',descriptor:'Più di 150 milligrammi di calcio per litro.',field:'calcio',operator:'gt',value:150},
 {id:'solfati',label:'Solfati > 200',descriptor:'Più di 200 milligrammi di solfati per litro.',field:'solfati',operator:'gt',value:200},
 {id:'magnesio',label:'Magnesio > 50',descriptor:'Più di 50 milligrammi di magnesio per litro.',field:'magnesio',operator:'gt',value:50},
 {id:'nitrati',label:'Nitrati ≤ 10',descriptor:'Fino a 10 milligrammi di nitrati per litro.',field:'nitrati',operator:'lte',value:10},
 {id:'residuo-50',label:'Residuo fisso ≤ 50',descriptor:'Residuo dopo evaporazione a 180 °C.',field:'residuo_fisso_180',operator:'lte',value:50},
 {id:'residuo-500',label:'Residuo fisso (50–500]',descriptor:'Oltre 50 e fino a 500 milligrammi per litro.',field:'residuo_fisso_180',operator:'gt_lte',value:[50,500]},
 {id:'residuo-1500',label:'Residuo fisso (500–1500]',descriptor:'Oltre 500 e fino a 1500 milligrammi per litro.',field:'residuo_fisso_180',operator:'gt_lte',value:[500,1500]},
 {id:'residuo-alto',label:'Residuo fisso > 1500',descriptor:'Più di 1500 milligrammi per litro.',field:'residuo_fisso_180',operator:'gt',value:1500},
] as const satisfies readonly (Predicate&{id:string;label:string;descriptor:string})[];
export function ferruginosa(c:Partial<Record<Field,Measurement>>){return matches(c.ferro_bivalente,{field:'ferro_bivalente',operator:'gt',value:1})===true;}
export const equivalentWeights={calcio:20.039,magnesio:12.1525,sodio:22.9898,potassio:39.0983,bicarbonati:61.0168,solfati:48.03,cloruri:35.453,nitrati:62.0049} as const;
export function ionBalance(c:Partial<Record<Field,Measurement>>):number|null {
 const keys=Object.keys(equivalentWeights) as (keyof typeof equivalentWeights)[];
 if(keys.some(k=>!c[k]||c[k]?.qualifier!=='='))return null;
 const v=(k:keyof typeof equivalentWeights)=>c[k]!.value/equivalentWeights[k];
 const positive=v('calcio')+v('magnesio')+v('sodio')+v('potassio');
 const negative=v('bicarbonati')+v('solfati')+v('cloruri')+v('nitrati');
 return positive+negative===0?null:100*(positive-negative)/(positive+negative);
}
