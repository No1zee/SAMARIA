import { chromium } from 'playwright';

async function findPills() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(4000);

  const pills = await page.evaluate(() => {
    // Search all elements containing 'PE' or 'DISCIPLINE' or 'UPSIDE' or check classes
    const found = [];
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let node;
    while (node = walker.nextNode()) {
      const val = node.nodeValue?.trim();
      if (val && (val.toLowerCase().includes('pe') || val.toLowerCase().includes('discipline') || val.toLowerCase().includes('upside') || val.toLowerCase().includes('vc'))) {
        found.push({
          text: val,
          parentTag: node.parentElement?.tagName,
          parentClass: node.parentElement?.className,
          parentOuter: node.parentElement?.outerHTML?.substring(0, 300)
        });
      }
    }
    return found;
  });

  console.log('Found nodes:', JSON.stringify(pills, null, 2));

  await browser.close();
}

findPills().catch(console.error);
