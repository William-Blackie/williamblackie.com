import { chromium } from 'playwright';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const pages = [
  'http://localhost:3000',
  'http://localhost:3000/about',
  'http://localhost:3000/articles',
  'http://localhost:3000/projects',
  'http://localhost:3000/resume',
  'http://localhost:3000/tech',
];

async function audit() {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  // Inject axe-core via CDP
  const axeCore = readFileSync(resolve(__dirname, 'node_modules/axe-core/axe.min.js'), 'utf-8');
  
  for (const url of pages) {
    console.log(`\n🔍 Auditing: ${url}`);
    try {
      await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
      
      // Inject axe via page evaluate
      await page.evaluate(axeCore);
      
      const results = await page.evaluate(() => {
        return new Promise((resolve) => {
          window.axe.run(document, (err, result) => {
            if (err) resolve({ error: err.message });
            else resolve(result);
          });
        });
      });

      if (results.error) {
        console.log(`  ❌ Error: ${results.error}`);
      } else {
        const violations = results.violations || [];
        console.log(`  📊 ${violations.length} violations found`);

        if (violations.length > 0) {
          violations.forEach((v, i) => {
            console.log(`  ${i + 1}. [${v.impact}] ${v.id} - ${v.description}`);
            console.log(`     Nodes: ${v.nodes.map((n) => n.target).join(', ')}`);
          });
        }
      }
    } catch (e) {
      console.log(`  ❌ Failed: ${e.message}`);
    }
  }

  await browser.close();
}

audit();