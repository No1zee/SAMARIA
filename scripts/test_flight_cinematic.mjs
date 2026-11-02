import { chromium } from 'playwright';

async function testFlight() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  page.on('console', msg => console.log('BROWSER LOG:', msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.message));

  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);

  console.log('Triggering "Start a Project" / open-modal...');

  // Click Start a Project
  await page.evaluate(() => {
    const btns = document.querySelectorAll('[open-modal]');
    if (btns.length > 1) btns[1].click();
    else if (btns.length > 0) btns[0].click();
  });

  // Capture frame 1: Mid-flight launch arc (400ms)
  await page.waitForTimeout(450);
  await page.screenshot({ path: 'public/flight_01_midair.png' });
  console.log('Captured public/flight_01_midair.png');

  // Capture frame 2: Apex rotation (850ms)
  await page.waitForTimeout(400);
  await page.screenshot({ path: 'public/flight_02_apex.png' });
  console.log('Captured public/flight_02_apex.png');

  // Capture frame 3: Docked in contact modal (1600ms total)
  await page.waitForTimeout(750);
  await page.screenshot({ path: 'public/flight_03_docked.png' });
  console.log('Captured public/flight_03_docked.png');

  // Close modal to test reverse flight
  console.log('Closing modal...');
  await page.evaluate(() => {
    const closeBtn = document.querySelector('.close-popup');
    if (closeBtn) closeBtn.click();
  });

  // Capture frame 4: Reverse flight mid-air (450ms)
  await page.waitForTimeout(450);
  await page.screenshot({ path: 'public/flight_04_reverse.png' });
  console.log('Captured public/flight_04_reverse.png');

  // Capture frame 5: Safely docked back at left sidebar (1200ms)
  await page.waitForTimeout(800);
  await page.screenshot({ path: 'public/flight_05_returned.png' });
  console.log('Captured public/flight_05_returned.png');

  await browser.close();
  console.log('Cinematic Flight Test Completed Successfully!');
}

testFlight().catch(console.error);
