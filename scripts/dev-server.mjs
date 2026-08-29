import { createServer } from 'node:http';
import { readFileSync, existsSync } from 'node:fs';
import { extname, join } from 'node:path';
const port=Number(process.env.PORT||4173);
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8'};
createServer((req,res)=>{const path=req.url==='/'?'index.html':req.url.slice(1);const file=join(process.cwd(),path);if(!existsSync(file)){res.writeHead(404);res.end('Not found');return;}res.writeHead(200,{'content-type':types[extname(file)]||'application/octet-stream'});res.end(readFileSync(file));}).listen(port,()=>console.log(`Atlas Assistant dev server: http://localhost:${port}`));
