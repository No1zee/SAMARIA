import { chromium } from 'playwright';

async function checkReplacement() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(5000);

  // Scroll down to the first project section (~800px)
  await page.evaluate(() => window.scrollBy(0, 900));
  await page.waitForTimeout(800);

  await page.screenshot({ path: 'public/web_software_dev_section.png' });
  console.log('Captured public/web_software_dev_section.png');

  const naviItem1 = await page.evaluate(() => {
    const el = document.querySelectorAll('.navi-li')[1]; // second nav item or first project
    return el?.innerText?.trim();
  });
  console.log('Nav item text:', naviItem1);

  await browser.close();
}

checkReplacement().catch(console.error);
