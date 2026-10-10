import {test} from 'node:test';
import assert from 'node:assert/strict';
// Selection module itself imports JSON through Vite. The browser QA tests exercise its UI.
import fs from 'node:fs';
import {measurement} from '../src/data/schema.ts';
test('Milano numeric values exactly match source per zone and period',()=>{const raw=JSON.parse(fs.readFileSync('data/milano-2026.raw.json','utf8'));const derived=JSON.parse(fs.readFileSync('src/data/generated/milano.json','utf8'));assert.equal(derived.length,24);const months=['Gennaio','Febbraio','Marzo','Aprile','Maggio','Giugno','Luglio'];for(const w of derived){const [year,month]=w.period.split('-');const source=raw.find((r:any)=>r.zonaNome===w.zone&&r.anno===Number(year)&&r.mese===months[Number(month)-1]&&r.parametroMisurato==='Calcio');assert.deepEqual(w.composition.calcio,measurement(source.valoreRilevato));assert.equal(w.source_type,'gestore');assert.ok(!w.period.endsWith('-05'));}assert.equal(derived.find((w:any)=>w.slug==='milano-18-2026-07').composition.residuo_fisso_180.value,435);});
