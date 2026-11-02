import { chromium } from 'playwright';

async function verifyAll() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  console.log('Navigating to http://localhost:3000 ...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(5000);

  // Check nav items
  const navItems = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('.navi-li')).map(el => el.innerText.trim());
  });
  console.log('Sidebar Navigation Items:', navItems);

  // Capture Section 1 (Bambino World)
  await page.evaluate(() => window.scrollTo(0, 950));
  await page.waitForTimeout(800);
  await page.screenshot({ path: 'public/proj_01_bambino.png' });
  console.log('Captured public/proj_01_bambino.png');

  // Capture Section 2 (Kinetik Clipper)
  await page.evaluate(() => window.scrollTo(0, 2600));
  await page.waitForTimeout(800);
  await page.screenshot({ path: 'public/proj_02_kinetik.png' });
  console.log('Captured public/proj_02_kinetik.png');

  // Capture Section 3 (Remote Workforce Tracker)
  await page.evaluate(() => window.scrollTo(0, 4800));
  await page.waitForTimeout(800);
  await page.screenshot({ path: 'public/proj_03_hems.png' });
  console.log('Captured public/proj_03_hems.png');

  await browser.close();
}

verifyAll().catch(console.error);
