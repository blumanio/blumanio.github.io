import fs from 'node:fs';import sharp from 'sharp';
import {guides} from '../src/data/guides.ts';
import {format,type Water} from '../src/data/schema.ts';
const waters=JSON.parse(fs.readFileSync('src/data/generated/waters.json','utf8')) as Water[];
const fontfile='assets/fonts/source-sans-3.ttf';
const escape=(s:string)=>s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');
async function textLayer(text:string,size:number,color:string){return sharp({text:{text:`<span foreground="${color}">${escape(text)}</span>`,font:`Source Sans 3 ${size}`,fontfile,width:980,rgba:true,spacing:10}}).png().toBuffer();}
async function render(file:string,title:string,detail:string,foot:string){const top=await textLayer('ACQUA IN CHIARO / TACCUINO DI CAMPO',28,'#0e6e78'),heading=await textLayer(title,66,'#13283a'),body=await textLayer(detail,32,'#526575'),bottom=await textLayer(foot,25,'#526575');await sharp({create:{width:1200,height:630,channels:4,background:'#f6f3ee'}}).composite([{input:Buffer.from('<svg width="1200" height="630"><rect x="60" y="60" width="5" height="510" fill="#0e6e78"/></svg>'),left:0,top:0},{input:top,left:100,top:72},{input:heading,left:100,top:165},{input:body,left:100,top:355},{input:bottom,left:100,top:535}]).png().toFile(file);}
fs.mkdirSync('.build/og',{recursive:true});
await render('.build/og.png','Leggi i dati.\nConfronta le acque.','Fonti, date e composizione. Senza classifiche.','blumanio.github.io/projects/acqua-in-chiaro/');
for(const w of waters){const name=`acque-${w.slug}`;await render(`.build/og/${name}.png`,w.name,`Sodio ${format(w.composition.sodio)} mg/L · Calcio ${format(w.composition.calcio)} mg/L\n— = dato non disponibile`,`${w.source_type} · analisi ${w.analysis_date||'senza data dichiarata'}`);const p=`.build/acque/${w.slug}/index.html`;fs.writeFileSync(p,fs.readFileSync(p,'utf8').replace('/acqua-in-chiaro/og.png',`/acqua-in-chiaro/og/${name}.png`));}
for(const g of guides){const name=`guide-${g.slug}`;await render(`.build/og/${name}.png`,g.title,g.pending?'Guida in revisione':`Prove: ${g.level}`,'Una guida alle fonti. Nessuna classifica di acque.');const p=`.build/profili/${g.slug}/index.html`;fs.writeFileSync(p,fs.readFileSync(p,'utf8').replace('/acqua-in-chiaro/og.png',`/acqua-in-chiaro/og/${name}.png`));}
console.log('OG: 20 water images, 9 guide images and home image; self-hosted Source Sans 3.');
