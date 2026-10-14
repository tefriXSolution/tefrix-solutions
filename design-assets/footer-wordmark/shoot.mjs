// Usage: node shoot.mjs <out-file> [query-string]
// Renders render.html in headless Chrome and saves window.__result.
import { writeFileSync } from "node:fs";
import { chromium } from "playwright-core";

const [out = "preview.png", query = ""] = process.argv.slice(2);
const browser = await chromium.launch({
  channel: "chrome",
  args: ["--enable-unsafe-swiftshader", "--ignore-gpu-blocklist", "--use-angle=swiftshader"],
});
const page = await browser.newPage({ viewport: { width: 400, height: 300 } });
const errors = [];
page.on("pageerror", (e) => errors.push(e.message));
page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
await page.goto(`http://localhost:4173/render.html?${query}`);
await page.waitForFunction(() => window.__done === true, null, { timeout: 180000 }).catch(() => {});
const dataUrl = await page.evaluate(() => window.__result);
if (!dataUrl) {
  console.error("render failed", errors.join("\n"));
  process.exit(1);
}
writeFileSync(out, Buffer.from(dataUrl.split(",")[1], "base64"));
console.log(`wrote ${out}`, errors.length ? `(errors: ${errors.join(" | ")})` : "");
await browser.close();
