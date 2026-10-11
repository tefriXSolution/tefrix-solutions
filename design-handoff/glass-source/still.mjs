import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
const [,, outDir, ...jobs] = process.argv; // jobs like hero:900:0.0
const b = await chromium.launch({
  args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
for (const job of jobs) {
  const [name, size, p] = job.split(':');
  const page = await b.newPage({ viewport: { width: +size, height: +size } });
  page.on('console', m => console.log('console:', m.text()));
  page.on('pageerror', e => console.log('pageerror:', e.message));
  await page.goto('file://' + path.join(path.dirname(new URL(import.meta.url).pathname), 'render.html'));
  await page.evaluate(([n, s]) => window.setup(n, s), [name, +size]);
  const url = await page.evaluate((pp) => window.frame(pp), +(p || 0));
  fs.writeFileSync(path.join(outDir, `${name}_raw.png`), Buffer.from(url.split(',')[1], 'base64'));
  console.log('wrote', name);
  await page.close();
}
await b.close();
