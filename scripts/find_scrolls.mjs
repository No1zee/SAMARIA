import { chromium } from 'playwright';

async function findScrolls() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(4000);

  const headings = await page.evaluate(() => {
    const h1s = Array.from(document.querySelectorAll('h1'));
    return h1s.map(h => {
      const rect = h.getBoundingClientRect();
      return {
        text: h.innerText.replace(/\n/g, ' '),
        top: rect.top + window.scrollY,
      };
    });
  });

  console.log('Heading scroll positions:', headings);

  for (let i = 0; i < headings.length; i++) {
    const h = headings[i];
    await page.evaluate((y) => window.scrollTo(0, Math.max(0, y - 80)), h.top);
    await page.waitForTimeout(600);
    await page.screenshot({ path: `public/section_${i}_shot.png` });
  }

  await browser.close();
}

findScrolls().catch(console.error);
