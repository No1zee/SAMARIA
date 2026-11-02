import { chromium } from 'playwright';

async function inspectHero() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(4000);

  const heroHTML = await page.evaluate(() => {
    // Find heading containing "Modern software powers"
    const all = Array.from(document.querySelectorAll('*'));
    const h1 = all.find(el => el.innerText?.includes('Modern software powers'));
    if (!h1) return 'H1 not found';
    
    // Get parent or section container
    let container = h1.parentElement;
    while (container && container.tagName !== 'SECTION' && !container.className.includes('hero') && !container.className.includes('section')) {
      container = container.parentElement;
    }
    return {
      containerTag: container?.tagName,
      containerClass: container?.className,
      innerHTML: container?.innerHTML?.substring(0, 4000)
    };
  });

  console.log('Hero Container:', JSON.stringify(heroHTML, null, 2));

  await browser.close();
}

inspectHero().catch(console.error);
