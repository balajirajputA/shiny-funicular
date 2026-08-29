import { readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
const tracked=execFileSync('git',['ls-files','--cached','--others','--exclude-standard'],{encoding:'utf8'}).trim().split('\n').filter(Boolean);
const files=tracked.filter(f=>/\.(js|mjs|css|html|md)$/.test(f)&&!f.startsWith('dist/')&&!f.startsWith('node_modules/'));
for (const file of files){
  const text=readFileSync(file,'utf8');
  if(/API_KEY\s*=\s*['"][A-Za-z0-9_-]{16,}/.test(text)) throw new Error(`Potential secret in ${file}`);
  if(text.includes('FORBIDDEN_'+'FAKE_MARKER')) throw new Error(`Fake placeholder marker in ${file}`);
  if(!text.endsWith('\n')) throw new Error(`Missing trailing newline in ${file}`);
}
console.log(`Linted ${files.length} files; no forbidden patterns found.`);
