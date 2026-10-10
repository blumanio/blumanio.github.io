import fs from 'node:fs';
import {FIELDS,measurement,rowSchema,claimSchema,type Field,type Water} from '../src/data/schema.ts';
import {ionBalance,matches} from '../src/rules/chemistry.ts';
import {THRESHOLDS} from '../src/rules/thresholds.ts';
export function parseCSV(text:string):Record<string,string>[] {
 const rows:string[][]=[];let row:string[]=[],cell='',quoted=false;
 for(let i=0;i<text.length;i++){const c=text[i];if(c==='"'){if(quoted&&text[i+1]==='"'){cell+='"';i++;}else quoted=!quoted;}else if(c===','&&!quoted){row.push(cell);cell='';}else if(c==='\n'&&!quoted){row.push(cell.replace(/\r$/,''));rows.push(row);row=[];cell='';}else cell+=c;}
 if(quoted)throw Error('CSV: virgolette non chiuse');if(cell||row.length){row.push(cell);rows.push(row);}
 const header=rows.shift()!;if(new Set(header).size!==header.length)throw Error('Colonne duplicate');
 return rows.filter(r=>r.some(Boolean)).map(r=>{if(r.length!==header.length)throw Error('CSV: numero colonne errato');return Object.fromEntries(header.map((k,i)=>[k,r[i]!]));});
}
export function validateRows(rows:Record<string,string>[],claimsInput:unknown=[],asOf='2026-10-10'){
 const errors:string[]=[],waters:Water[]=[];const ids=new Set<string>();
 const claims=claimSchema.array().parse(claimsInput);
 for(const raw of rows){try{
 const base=rowSchema.parse(raw);if(ids.has(base.slug))throw Error('Slug duplicato');ids.add(base.slug);
 for(const d of [base.accessed_on,base.entered_on,base.analysis_date])if(d&&d>asOf)throw Error('Data futura');
 if(base.analysis_date&&base.analysis_date>base.accessed_on)throw Error('Analisi successiva all’accesso');
 const composition=Object.fromEntries(Object.keys(FIELDS).map(k=>{if(!(k in raw))throw Error(`Colonna assente ${k}`);return [k,measurement(raw[k]!)];})) as Water['composition'];
 if(!Object.values(composition).some(Boolean))throw Error('Nessun parametro dichiarato');
 const warnings:string[]=[];
 for(const [k,m] of Object.entries(composition)){if(!m)continue;const max=k==='ph'?14:k==='temperatura'?100:k==='durezza'?500:10000;if(m.value>max)throw Error(`${k}: fuori intervallo`);if(k==='ph'&&(m.value<4||m.value>10))warnings.push('pH insolito: verificare trascrizione');}
 if(!base.analysis_date)warnings.push('Data di analisi non dichiarata');else if((Date.parse(asOf)-Date.parse(base.analysis_date))/86400000>1826)warnings.push('Analisi storica: oltre cinque anni');else if((Date.parse(asOf)-Date.parse(base.analysis_date))/86400000>548)warnings.push('Analisi oltre 18 mesi');
 if(Object.values(composition).filter(Boolean).length<8)warnings.push('Scheda parziale: meno di otto parametri');
 const balance=ionBalance(composition);if(balance===null)warnings.push('Bilancio ionico non calcolabile: pannello incompleto o valori censurati');else if(Math.abs(balance)>10)throw Error(`Bilancio ionico ${balance.toFixed(2)}% oltre ±10%`);else if(Math.abs(balance)>5)warnings.push(`Bilancio ionico ${balance.toFixed(2)}% oltre ±5%`);
 const ec=composition.conducibilita,rf=composition.residuo_fisso_180;if(ec?.qualifier==='='&&rf?.qualifier==='='&&ec.value>0&&(rf.value/ec.value<.4||rf.value/ec.value>1.2))warnings.push('Rapporto residuo/conducibilità insolito: controllare fonte e temperatura');
 const own=claims.filter(c=>c.water_slug===base.slug);for(const c of own){if(c.criterion_id){const t=THRESHOLDS[c.criterion_id as keyof typeof THRESHOLDS];if(!t)throw Error('Criterio claim sconosciuto');if(matches(composition[t.field],t)!==true)warnings.push(`Dicitura documentata: criterio ${c.criterion_id} non confermabile dai valori`);}}
 waters.push({...base,composition,claims:own,warnings,ion_balance:balance});
 }catch(e){errors.push(`${raw.slug??'riga'}: ${String(e)}`);}}
 for(const c of claims)if(!ids.has(c.water_slug))errors.push(`Claim senza acqua: ${c.water_slug}`);
 return {waters,errors};
}
export function readData(){return validateRows(parseCSV(fs.readFileSync('data/waters.csv','utf8')),JSON.parse(fs.readFileSync('data/claims.json','utf8')),JSON.parse(fs.readFileSync('data/meta.json','utf8')).as_of);}
export function requireValid(){const r=readData();if(r.errors.length)throw Error(r.errors.join('\n'));if(r.waters.length<20)throw Error('Release: minimo 20 acque');return r;}
