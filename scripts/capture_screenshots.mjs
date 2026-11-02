import { chromium } from 'playwright';

async function capture() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  console.log('Navigating to http://localhost:3000 ...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  
  // Wait for 3.8s preloader animation + exit slide
  console.log('Waiting for preloader to fully finish (5.5s)...');
  await page.waitForTimeout(5500);

  // Take screenshot of default view
  await page.screenshot({ path: 'public/home_coin_live.png' });
  console.log('Captured public/home_coin_live.png');

  // Interact: drag coin
  const container = page.locator('#m-mecha-container');
  const box = await container.boundingBox();
  if (box) {
    const cx = box.x + box.width / 2;
    const cy = box.y + box.height / 2;
    await page.mouse.move(cx, cy);
    await page.mouse.down();
    await page.mouse.move(cx + 120, cy - 30, { steps: 15 });
    await page.mouse.up();
    await page.waitForTimeout(600);
    await page.screenshot({ path: 'public/home_coin_dragged.png' });
    console.log('Captured public/home_coin_dragged.png');
  }

  // Scroll down 450px to demonstrate scroll response
  await page.evaluate(() => window.scrollBy(0, 450));
  await page.waitForTimeout(700);
  await page.screenshot({ path: 'public/home_coin_scrolled.png' });
  console.log('Captured public/home_coin_scrolled.png');

  await browser.close();
}

capture().catch(console.error);
