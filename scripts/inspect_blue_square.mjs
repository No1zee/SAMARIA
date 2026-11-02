import { chromium } from 'playwright';

async function checkElement() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(4500);

  // Evaluate element at (245, 455)
  const elInfo = await page.evaluate(() => {
    const el = document.elementFromPoint(245, 455);
    return {
      tagName: el?.tagName,
      className: el?.className,
      id: el?.id,
      outerHTML: el?.outerHTML?.substring(0, 200),
      color: el ? window.getComputedStyle(el).backgroundColor : null,
    };
  });

  console.log('Element at (245, 455):', JSON.stringify(elInfo, null, 2));

  // Check if it's on canvas or behind canvas:
  // Let's temporarily hide canvas and see what's underneath
  const underCanvas = await page.evaluate(() => {
    const canvas = document.querySelector('#m-mecha-container canvas');
    if (canvas) canvas.style.display = 'none';
    const under = document.elementFromPoint(245, 455);
    return {
      tagName: under?.tagName,
      className: under?.className,
      id: under?.id,
      outerHTML: under?.outerHTML?.substring(0, 200),
      style: under?.getAttribute('style'),
    };
  });
  console.log('Under canvas:', JSON.stringify(underCanvas, null, 2));

  await browser.close();
}

checkElement().catch(console.error);
