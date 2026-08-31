import { copyFileSync, mkdirSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const sourceDir = 'src';
const outputDir = 'dist';

mkdirSync(outputDir, { recursive: true });
copyFileSync('index.html', join(outputDir, 'index.html'));
copyFileSync(join(sourceDir, 'styles.css'), join(outputDir, 'styles.css'));

for (const file of readdirSync(sourceDir).filter((name) => name.endsWith('.js'))) {
  copyFileSync(join(sourceDir, file), join(outputDir, file));
}

console.log(`Built ${outputDir}/ static application from ${sourceDir}/.`);
