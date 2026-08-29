import { mkdirSync, copyFileSync, readdirSync } from 'node:fs';
mkdirSync('dist',{recursive:true});
copyFileSync('index.html','dist/index.html');
copyFileSync('src/styles.css','dist/styles.css');
for (const file of readdirSync('src').filter(name=>name.endsWith('.js'))) copyFileSync(`src/${file}`,`dist/${file}`);
console.log('Built dist/ static application.');
