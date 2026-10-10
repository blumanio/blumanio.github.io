import { z } from 'zod';
export const FIELDS = {
 residuo_fisso_180:['Residuo fisso a 180 °C','mg/L'],residuo_temperatura_non_dichiarata:['Residuo fisso (temperatura non dichiarata)','mg/L'],tds:['TDS (temperatura non dichiarata)','mg/L'],ph:['pH',''],conducibilita:['Conducibilità a 20 °C','µS/cm'],temperatura:['Temperatura alla sorgente','°C'],co2_libera:['CO₂ libera','mg/L'],calcio:['Calcio','mg/L'],magnesio:['Magnesio','mg/L'],sodio:['Sodio','mg/L'],potassio:['Potassio','mg/L'],bicarbonati:['Bicarbonati','mg/L'],solfati:['Solfati','mg/L'],cloruri:['Cloruri','mg/L'],nitrati:['Nitrati','mg/L'],nitriti:['Nitriti','mg/L'],fluoruri:['Fluoruri','mg/L'],silice:['Silice','mg/L'],ferro:['Ferro totale / non specificato','mg/L'],ferro_bivalente:['Ferro bivalente Fe(II)','mg/L'],durezza:['Durezza','°f'],
} as const;
export type Field = keyof typeof FIELDS;
export type Measurement = { value:number; qualifier:'='|'<'|'<='|'>'|'>='; raw:string } | null;
export function measurement(raw:string):Measurement {
 if(!raw.trim()) return null;
 const m=raw.trim().replace(',','.').match(/^(<=|>=|<|>|≤|≥)?\s*(\d+(?:\.\d+)?)$/);
 if(!m) throw Error(`Valore non valido: ${raw}`);
 return {value:Number(m[2]),qualifier:({ '≤':'<=','≥':'>=' }[m[1]??'']??m[1]??'=') as NonNullable<Measurement>['qualifier'],raw:raw.trim()};
}
export const isoDate=z.string().regex(/^\d{4}-\d{2}-\d{2}$/).refine(s=>!isNaN(Date.parse(s))&&new Date(s).toISOString().slice(0,10)===s,'Data non valida');
export const rowSchema=z.object({slug:z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),name:z.string().min(2),source_name:z.string(),source_type:z.enum(['produttore','etichetta','gestore']),source_url:z.url().refine(s=>s.startsWith('https://')),accessed_on:isoDate,analysis_date:z.union([isoDate,z.literal('')]),entered_on:isoDate,notes:z.string()});
export const claimSchema=z.object({water_slug:z.string(),text:z.string().min(1),claim_source:z.enum(['etichetta','decreto']),source_url:z.url(),decree_reference:z.string().nullable(),criterion_id:z.string().optional()}).superRefine((v,c)=>{if(v.claim_source==='decreto'&&!v.decree_reference)c.addIssue({code:'custom',message:'Riferimento decreto obbligatorio'});});
export type Claim=z.infer<typeof claimSchema>;
export type Water=z.infer<typeof rowSchema>&{composition:Record<Field,Measurement>;claims:Claim[];warnings:string[];ion_balance:number|null;period?:string;zone?:string};
export function format(m:Measurement|undefined){return m?`${m.qualifier==='='?'':m.qualifier.replace('<=','≤').replace('>=','≥')}${m.value.toLocaleString('it-IT',{maximumFractionDigits:6})}`:'—';}
