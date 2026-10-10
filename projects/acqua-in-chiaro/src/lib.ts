import waterData from './data/generated/waters.json';
import milanoData from './data/generated/milano.json';
import type { Water } from './data/schema';
export const waters=waterData as Water[];
export const milano=milanoData as Water[];
export const BASE='/projects/acqua-in-chiaro/';
export const href=(path='')=>BASE+path.replace(/^\//,'');
export const allWaters=[...waters,...milano];
export function selection(ids:string[],available=allWaters){const valid=[...new Set(ids)].filter(id=>available.some(w=>w.slug===id));let tap=false;return valid.filter(id=>{if(!id.startsWith('milano-'))return true;if(tap)return false;tap=true;return true;}).slice(0,3);}
export function readSelection(){if(typeof window==='undefined')return [];const p=new URLSearchParams(location.search);if(p.has('ids'))return selection((p.get('ids')??'').split(','));try{return selection(JSON.parse(sessionStorage.getItem('acqua-compare')??'[]'));}catch{return [];}}
export function saveSelection(ids:string[]){try{sessionStorage.setItem('acqua-compare',JSON.stringify(selection(ids)));}catch{}window.dispatchEvent(new CustomEvent('acqua-selection',{detail:selection(ids)}));}
