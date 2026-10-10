import fs from 'node:fs';import path from 'node:path';
// Run from the project directory. Never reads or writes a parent repository path.
if(!fs.existsSync('.build/index.html'))throw Error('Run npm run build first');
const previous=fs.existsSync('release-manifest.json')?JSON.parse(fs.readFileSync('release-manifest.json','utf8')):[];
const files=fs.readdirSync('.build',{recursive:true}).filter(f=>fs.statSync(path.join('.build',f)).isFile());
for(const f of previous){if(f.includes('..')||path.isAbsolute(f))throw Error('Unsafe release manifest');if(!files.includes(f)&&fs.existsSync(f))fs.unlinkSync(f);}
for(const f of files){fs.mkdirSync(path.dirname(f),{recursive:true});fs.copyFileSync(path.join('.build',f),f);}
fs.writeFileSync('release-manifest.json',JSON.stringify(files,null,2)+'\n');console.log(`Staged ${files.length} generated files inside projects/acqua-in-chiaro only.`);
