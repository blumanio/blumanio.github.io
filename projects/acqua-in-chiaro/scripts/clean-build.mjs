import fs from 'node:fs';
if(JSON.parse(fs.readFileSync('package.json','utf8')).name!=='acqua-in-chiaro')throw Error('Run from project directory');
fs.rmSync('.build',{recursive:true,force:true});
