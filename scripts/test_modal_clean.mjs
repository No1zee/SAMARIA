import { chromium } from 'playwright';

async function testModal() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(4000);

  // Trigger modal via DOM evaluation
  await page.evaluate(() => {
    const btns = document.querySelectorAll('[open-modal]');
    if (btns.length > 1) btns[1].click();
    else if (btns.length > 0) btns[0].click();
  });

  await page.waitForTimeout(1600); // Wait for GSAP modal slide-in
  await page.screenshot({ path: 'public/contact_modal_clean.png' });
  console.log('Captured public/contact_modal_clean.png');

  await browser.close();
}

testModal().catch(console.error);
