import { chromium } from 'playwright';
import fs from 'fs';

async function diagnose() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  const consoleMessages = [];
  page.on('console', msg => {
    consoleMessages.push(`[${msg.type()}] ${msg.text()}`);
  });
  page.on('pageerror', err => {
    consoleMessages.push(`[PAGE ERROR] ${err.message}`);
  });

  console.log('Navigating to http://localhost:3000 ...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  const containerInfo = await page.evaluate(() => {
    const el = document.getElementById('m-mecha-container');
    if (!el) return { found: false };
    const rect = el.getBoundingClientRect();
    const style = window.getComputedStyle(el);
    const canvas = el.querySelector('canvas');
    return {
      found: true,
      rect: { top: rect.top, left: rect.left, width: rect.width, height: rect.height },
      visibility: style.visibility,
      display: style.display,
      opacity: style.opacity,
      hasCanvas: !!canvas,
      canvasRect: canvas ? canvas.getBoundingClientRect() : null,
      parentClass: el.parentElement?.className,
      parentDisplay: el.parentElement ? window.getComputedStyle(el.parentElement).display : null,
      parentVisibility: el.parentElement ? window.getComputedStyle(el.parentElement).visibility : null,
    };
  });

  console.log('Container Info:', JSON.stringify(containerInfo, null, 2));
  console.log('Console Logs:');
  consoleMessages.forEach(m => console.log(m));

  // Take screenshot of whole page top
  await page.screenshot({ path: 'public/diagnose_screenshot.png' });
  console.log('Saved screenshot to public/diagnose_screenshot.png');

  await browser.close();
}

diagnose().catch(err => {
  console.error(err);
  process.exit(1);
});
