import { chromium } from 'playwright';

async function inspectH1() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(4000);

  const res = await page.evaluate(() => {
    const el = document.elementFromPoint(400, 850); // Where PE DISCIPLINE is in screenshot!
    const el2 = document.elementFromPoint(380, 850);
    const el3 = document.elementFromPoint(450, 850);
    return {
      at400_850: { tag: el?.tagName, class: el?.className, html: el?.outerHTML?.substring(0, 300) },
      at380_850: { tag: el2?.tagName, class: el2?.className, html: el2?.outerHTML?.substring(0, 300) },
      at450_850: { tag: el3?.tagName, class: el3?.className, html: el3?.outerHTML?.substring(0, 300) }
    };
  });

  console.log('Elements at point:', JSON.stringify(res, null, 2));

  await browser.close();
}

inspectH1().catch(console.error);
