import { chromium } from 'playwright';

async function verify() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  console.log('Navigating to http://localhost:3000 ...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(5000); // Wait for preloader to finish

  // 1. Verify "PE DISCIPLINE" / "VC UPSIDE" is gone
  const bodyText = await page.innerText('body');
  const hasPE = bodyText.includes('PE DISCIPLINE');
  const hasVC = bodyText.includes('VC UPSIDE');
  console.log('Contains PE DISCIPLINE?', hasPE);
  console.log('Contains VC UPSIDE?', hasVC);

  // 2. Verify "WHAT WE DO"
  const hasWhatWeDo = bodyText.includes('WHAT WE DO') || bodyText.includes('What We Do');
  console.log('Contains WHAT WE DO / What We Do?', hasWhatWeDo);

  // Capture hero screenshot (front view, no infographic, "WHAT WE DO" in nav)
  await page.screenshot({ path: 'public/hero_clean.png' });
  console.log('Captured public/hero_clean.png');

  // 3. Flip coin to back: drag horizontally across the coin container
  const container = page.locator('#m-mecha-container');
  const box = await container.boundingBox();
  if (box) {
    const cx = box.x + box.width / 2;
    const cy = box.y + box.height / 2;
    // Drag horizontally to rotate 180 degrees
    await page.mouse.move(cx, cy);
    await page.mouse.down();
    await page.mouse.move(cx + 390, cy, { steps: 25 });
    await page.mouse.up();
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'public/coin_back_live.png' });
    console.log('Captured public/coin_back_live.png');
  }

  await browser.close();
}

verify().catch(console.error);
