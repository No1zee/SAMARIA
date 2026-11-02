import { chromium } from 'playwright';

async function findBlue() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(5000);
  await page.evaluate(() => window.scrollBy(0, 450));
  await page.waitForTimeout(1000);

  const blueElements = await page.evaluate(() => {
    const all = document.querySelectorAll('*');
    const matches = [];
    for (const el of all) {
      if (el.tagName === 'HTML' || el.tagName === 'BODY') continue;
      const style = window.getComputedStyle(el);
      const bg = style.backgroundColor;
      const color = style.color;
      const border = style.borderColor;
      const rect = el.getBoundingClientRect();
      
      // Check if blue:
      const isBlue = (c) => {
        const m = c.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
        if (m) {
          const [_, r, g, b] = m.map(Number);
          return b > 150 && b > r * 1.5;
        }
        return false;
      };

      if (isBlue(bg) || isBlue(color) || isBlue(border)) {
        matches.push({
          tag: el.tagName,
          className: el.className,
          id: el.id,
          rect: { top: rect.top, left: rect.left, width: rect.width, height: rect.height },
          bg,
          color,
        });
      }
    }
    return matches;
  });

  console.log('Blue elements found:', JSON.stringify(blueElements, null, 2));

  await browser.close();
}

findBlue().catch(console.error);
