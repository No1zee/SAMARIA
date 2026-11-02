import { chromium } from 'playwright';

async function captureBack() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  console.log('Navigating to http://localhost:3000 ...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(5000);

  // Set rotation to show back face exactly:
  // In animate loop, coin.rotation.y = scrollRotationY + dragRotation.y
  // So let's override dragRotation.y = Math.PI, or stop animate from resetting:
  await page.evaluate(() => {
    if (window.__coinMesh) {
      // Invert rotation to back face
      window.__setCoinRotationY = (val) => {
        // Find the dragRotation variable or set rotation
      };
    }
  });

  // Let's drag across the canvas inside the canvas bounds:
  const container = page.locator('#m-mecha-container');
  const box = await container.boundingBox();
  if (box) {
    const cx = box.x + box.width / 2;
    const cy = box.y + box.height / 2;
    // Drag horizontally from left to right inside the container
    await page.mouse.move(box.x + 20, cy);
    await page.mouse.down();
    // Move 393px: 393 * 0.008 = 3.144 rad = ~Math.PI!
    await page.mouse.move(box.x + 413, cy, { steps: 30 });
    // Keep mouse down for instant capture before inertia decays!
    await page.waitForTimeout(300);
    await page.screenshot({ path: 'public/coin_back_live.png' });
    console.log('Captured public/coin_back_live.png during drag');
    await page.mouse.up();
  }

  await browser.close();
}

captureBack().catch(console.error);
