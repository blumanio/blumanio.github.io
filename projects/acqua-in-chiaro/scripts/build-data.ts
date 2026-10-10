import fs from 'node:fs';
import {requireValid} from './data-lib.ts';
import {FIELDS,measurement,type Water} from '../src/data/schema.ts';
const {waters}=requireValid();
const raw=JSON.parse(fs.readFileSync('data/milano-2026.raw.json','utf8')) as {parametroMisurato:string;valoreRilevato:string;unitaMisura:string;zonaNome:string;zonaId:number;mese:string;anno:number;dataCaricamento:string}[];
const month=['Gennaio','Febbraio','Marzo','Aprile','Maggio','Giugno','Luglio','Agosto','Settembre','Ottobre','Novembre','Dicembre'];
const mapping:Record<string,keyof typeof FIELDS>={'Residuo Fisso A 180°':'residuo_fisso_180',Calcio:'calcio',Magnesio:'magnesio',Sodio:'sodio',Potassio:'potassio',Bicarbonati:'bicarbonati',Solfati:'solfati',Cloruri:'cloruri',Nitrati:'nitrati',Nitriti:'nitriti',Fluoruri:'fluoruri',Durezza:'durezza','Conducibilità':'conducibilita','Conducibilità elettrica':'conducibilita',pH:'ph'};
const grouped=new Map<string,Water>();
for(const r of raw){const field=mapping[r.parametroMisurato];if(!field)continue;const mi=month.indexOf(r.mese);if(mi<0)throw Error('Mese sconosciuto');const period=`${r.anno}-${String(mi+1).padStart(2,'0')}`,slug=`milano-${r.zonaId}-${period}`;
 if(!grouped.has(slug))grouped.set(slug,{slug,name:`Milano · ${r.zonaNome} · ${r.mese} ${r.anno}`,source_name:r.zonaNome,source_type:'gestore',source_url:'https://dati.comune.milano.it/dataset/0a1e04d3-cbef-433f-9eed-58eb61dafb39',accessed_on:'2026-10-10',analysis_date:'',entered_on:'2026-10-10',notes:'Fonte: MM / Comune di Milano, Open Data, CC BY 4.0. Periodo mensile; data del singolo campionamento non pubblicata. Nessuna media cittadina calcolata.',composition:Object.fromEntries(Object.keys(FIELDS).map(k=>[k,null])) as Water['composition'],claims:[],warnings:[],ion_balance:null,zone:r.zonaNome,period});
 const w=grouped.get(slug)!;if(w.composition[field])throw Error('Parametro Milano duplicato');w.composition[field]=measurement(r.valoreRilevato);
}
const milano=[...grouped.values()].sort((a,b)=>b.period!.localeCompare(a.period!)||a.zone!.localeCompare(b.zone!));if(milano.length!==24)throw Error(`Milano: attesi 24 gruppi, trovati ${milano.length}`);
fs.mkdirSync('src/data/generated',{recursive:true});
const report={as_of:'2026-10-10',water_count:waters.length,composition_fields:Object.keys(FIELDS).length,empty_composition_fields:waters.reduce((n,w)=>n+Object.values(w.composition).filter(v=>v===null).length,0),milano_groups:milano.length,milano_raw_rows:raw.length,warnings:waters.map(w=>({slug:w.slug,warnings:w.warnings})),errors:[]};
for(const [name,data] of Object.entries({waters,milano,report}))fs.writeFileSync(`src/data/generated/${name}.json`,JSON.stringify(data,null,2)+'\n');console.log(JSON.stringify({...report,warnings:report.warnings.length}));
