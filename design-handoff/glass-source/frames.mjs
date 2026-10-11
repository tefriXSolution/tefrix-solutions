import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
const [,, outDir, name, size, count] = process.argv;
fs.mkdirSync(outDir, { recursive: true });
const b = await chromium.launch({
  args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
const page = await b.newPage({ viewport: { width: +size, height: +size } });
page.on('pageerror', e => console.log('pageerror:', e.message));
await page.goto('file://' + path.join(path.dirname(new URL(import.meta.url).pathname), 'render.html'));
await page.evaluate(([n, s]) => window.setup(n, s), [name, +size]);
const n = +count;
for (let i = 0; i < n; i++) {
  const url = await page.evaluate((p) => window.frame(p), i / n);
  fs.writeFileSync(path.join(outDir, `f${String(i).padStart(4, '0')}.png`), Buffer.from(url.split(',')[1], 'base64'));
}
console.log('frames', n);
await b.close();
