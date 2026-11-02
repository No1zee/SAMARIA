import { chromium } from 'playwright';

async function testNetwork() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  page.on('response', resp => {
    if (resp.status() >= 400) {
      console.log(`[HTTP ${resp.status()}] ${resp.url()}`);
    }
  });

  page.on('console', msg => {
    console.log(`[CONSOLE ${msg.type()}] ${msg.text()}`);
  });

  page.on('pageerror', err => {
    console.log(`[PAGEERROR] ${err.message}`);
  });

  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);

  const canvasCount = await page.locator('#m-mecha-container canvas').count();
  console.log('Canvas count inside #m-mecha-container:', canvasCount);

  const threeDefined = await page.evaluate(() => typeof THREE !== 'undefined');
  console.log('Is THREE defined in window?', threeDefined);

  await browser.close();
}

testNetwork().catch(console.error);
