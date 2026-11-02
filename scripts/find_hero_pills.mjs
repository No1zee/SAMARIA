import { chromium } from 'playwright';

async function findHeroElements() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(4000);

  const heroPills = await page.evaluate(() => {
    // Find elements around the hero section or containing buttons
    const all = Array.from(document.querySelectorAll('*'));
    return all.filter(el => {
      const text = el.innerText?.trim();
      return text === 'PE DISCIPLINE' || text === 'VC UPSIDE' || text?.includes('PE DISCIPLINE') || text?.includes('VC UPSIDE');
    }).map(el => ({
      tag: el.tagName,
      className: el.className,
      id: el.id,
      text: el.innerText?.trim(),
      outerHTML: el.outerHTML
    }));
  });

  console.log('Hero pills found:', JSON.stringify(heroPills, null, 2));

  // Also let's find all occurrences of "INVESTMENTS"
  const investments = await page.evaluate(() => {
    const all = Array.from(document.querySelectorAll('*'));
    return all.filter(el => {
      const text = el.innerText?.trim();
      return text === 'INVESTMENTS' || text === 'Investments';
    }).map(el => ({
      tag: el.tagName,
      className: el.className,
      id: el.id,
      outerHTML: el.outerHTML
    }));
  });
  console.log('Investments elements found:', JSON.stringify(investments, null, 2));

  await browser.close();
}

findHeroElements().catch(console.error);
