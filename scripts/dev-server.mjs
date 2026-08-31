import { createServer } from 'node:http';
import { existsSync, readFileSync, statSync } from 'node:fs';
import { extname, join, normalize, sep } from 'node:path';

const port = Number(process.env.PORT || 4173);
const root = process.cwd();
const types = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
};

function resolvePath(requestUrl) {
  const pathname = decodeURIComponent(new URL(requestUrl, 'http://localhost').pathname);
  const relativePath = pathname === '/' ? 'index.html' : pathname.replace(/^\/+/, '');
  const file = normalize(join(root, relativePath));
  const relative = file === root ? '' : file.slice(root.length + 1);
  if (file !== root && (!relative || relative.startsWith(`..${sep}`) || relative === '..')) return null;
  return file;
}

createServer((req, res) => {
  try {
    if (req.method !== 'GET' && req.method !== 'HEAD') {
      res.writeHead(405, { allow: 'GET, HEAD' });
      res.end('Method Not Allowed');
      return;
    }

    const file = resolvePath(req.url || '/');
    if (!file || !existsSync(file) || !statSync(file).isFile()) {
      res.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' });
      res.end('Not found');
      return;
    }

    const contentType = types[extname(file)] || 'application/octet-stream';
    const content = req.method === 'HEAD' ? null : readFileSync(file);
    res.writeHead(200, {
      'content-type': contentType,
      'cache-control': 'no-store',
      'x-content-type-options': 'nosniff',
    });
    res.end(content);
  } catch {
    res.writeHead(400, { 'content-type': 'text/plain; charset=utf-8' });
    res.end('Bad request');
  }
}).listen(port, () => console.log(`Atlas Assistant dev server: http://localhost:${port}`));
