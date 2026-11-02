import { chromium } from 'playwright';

async function testMobileModal() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } }); // iPhone 14 / mobile viewport

  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);

  // Trigger modal
  await page.evaluate(() => {
    const btns = document.querySelectorAll('[open-modal]');
    if (btns.length > 0) btns[0].click();
  });

  await page.waitForTimeout(1600);
  await page.screenshot({ path: 'public/modal_mobile.png' });
  console.log('Captured public/modal_mobile.png');

  await browser.close();
}

testMobileModal().catch(console.error);
