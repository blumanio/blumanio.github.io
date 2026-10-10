import {waters,href} from '../lib';
import {guides} from '../data/guides';
import {articles} from '../data/articles';
export function GET(){const paths=['','acque/','confronta/','rubinetto/milano/','profili/','etichetta/','perche-sono-diverse/','segnala/',...articles.map(a=>a.slug+'/'),...waters.map(w=>'acque/'+w.slug+'/'),...guides.map(g=>'profili/'+g.slug+'/')];return new Response('<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+paths.map(p=>'<url><loc>https://blumanio.github.io'+href(p)+'</loc><lastmod>2026-10-10</lastmod></url>').join('')+'</urlset>',{headers:{'Content-Type':'application/xml'}});}
