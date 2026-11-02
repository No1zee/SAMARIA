import { chromium } from 'playwright';

async function testHome() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);

  // Check if badge exists in DOM
  const badgeCount = await page.evaluate(() => {
    return document.querySelectorAll('.w-webflow-badge, a[href*="webflow.com?utm_campaign=brandjs"]').length;
  });
  console.log('Badge count in DOM:', badgeCount);

  await page.screenshot({ path: 'public/home_no_badge.png' });
  console.log('Captured public/home_no_badge.png');

  await browser.close();
}

testHome().catch(console.error);
