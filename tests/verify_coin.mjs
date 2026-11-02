import { chromium } from 'playwright';

async function testCoin() {
  console.log('Testing 3D Coin showcase...');
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  const errors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') errors.push(msg.text());
  });

  const res = await page.goto('http://localhost:3000/coin', { waitUntil: 'networkidle' });
  console.log('Status:', res.status());

  await page.waitForTimeout(2000);

  const canvasState = await page.evaluate(() => {
    const canvas = document.querySelector('canvas');
    return {
      canvasFound: !!canvas,
      width: canvas?.width,
      height: canvas?.height
    };
  });
  console.log('Canvas state:', canvasState);

  // Test Flip Coin Button click
  await page.click('#btn-flip');
  console.log('Clicked #btn-flip');
  await page.waitForTimeout(1500);

  console.log('Errors:', errors);
  await browser.close();

  if (canvasState.canvasFound && errors.length === 0) {
    console.log('🎉 3D Coin verified successfully with 0 errors!');
  } else {
    process.exit(1);
  }
}

testCoin();
