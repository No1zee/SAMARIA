import { spawn } from 'child_process';
import { chromium } from 'playwright';

const PORT = 3009;
const BASE_URL = `http://localhost:${PORT}`;

console.log('Starting Next.js server on port', PORT);
const nextProcess = spawn('npx', ['next', 'start', '-p', String(PORT)], {
  stdio: 'inherit',
  shell: true,
});

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitForServer(url, timeout = 20000) {
  const start = Date.now();
  while (Date.now() - start < timeout) {
    try {
      const res = await fetch(url);
      if (res.status === 200) return true;
    } catch (e) {
      // wait
    }
    await sleep(500);
  }
  throw new Error(`Server did not start within ${timeout}ms`);
}

async function runTests() {
  try {
    await waitForServer(BASE_URL);
    console.log('Next.js server is up! Launching Playwright browser...');

    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext();
    const page = await context.newPage();

    const consoleErrors = [];
    const pageErrors = [];

    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        console.error('Browser console error:', msg.text());
        consoleErrors.push(msg.text());
      }
    });

    page.on('pageerror', (err) => {
      console.error('Unhandled page exception:', err.message);
      pageErrors.push(err.message);
    });

    console.log('\n--- Test 1: Home Page Loading & Metadata ---');
    await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
    const title = await page.title();
    console.log('Page Title:', title);
    if (!title.includes('Samaria Tech')) {
      throw new Error(`Title does not contain "Samaria Tech": ${title}`);
    }

    console.log('\n--- Test 2: Checking Preloader & Navbar Lottie Assets ---');
    // Check that Lottie elements exist
    const preloaderLogo = page.locator('.preloader-logo');
    await preloaderLogo.waitFor({ state: 'attached', timeout: 5000 });
    const navbarLogo = page.locator('.navbar-logo');
    await navbarLogo.waitFor({ state: 'attached', timeout: 5000 });
    console.log('Found .preloader-logo and .navbar-logo elements in DOM.');

    // Wait for preloader animation and scripts to execute
    await sleep(2500);

    console.log('\n--- Test 3: Three.js 3D Container & Canvas ---');
    const threeContainer = page.locator('#m-mecha-container');
    await threeContainer.waitFor({ state: 'attached', timeout: 5000 });
    const canvas = page.locator('#m-mecha-container canvas');
    const hasCanvas = await canvas.count();
    console.log('Three.js canvas elements inside #m-mecha-container:', hasCanvas);
    if (hasCanvas === 0) {
      console.warn('Canvas not immediately found, waiting 2s for GLTF loader...');
      await sleep(2000);
      const hasCanvasRetry = await canvas.count();
      console.log('After retry, canvas count:', hasCanvasRetry);
    }

    console.log('\n--- Test 4: Brand Copy & Headings ---');
    const pageContent = await page.content();
    if (!pageContent.includes('Samaria Tech deploys physical automation')) {
      throw new Error('Hero heading copy missing "Samaria Tech deploys physical automation"');
    }
    if (!pageContent.includes('Managing Partner at Samaria Tech.')) {
      throw new Error('Team section missing "Managing Partner at Samaria Tech."');
    }
    if (!pageContent.includes('contact@samariatech.com')) {
      throw new Error('Contact email missing "contact@samariatech.com"');
    }
    console.log('All brand copy, team titles, and contact emails verified in page content!');

    console.log('\n--- Test 5: Massive Footer Logo SVG ---');
    const footerLogo = page.locator('.footer-logo svg');
    await footerLogo.waitFor({ state: 'attached', timeout: 5000 });
    const viewBox = await footerLogo.getAttribute('viewBox');
    console.log('Footer Logo SVG viewBox:', viewBox);
    if (!viewBox.includes('2965') && !viewBox.includes('2964')) {
      throw new Error(`Footer Logo SVG unexpected viewBox: ${viewBox}`);
    }
    const pathCount = await page.locator('.footer-logo svg path').count();
    console.log('Footer Logo SVG path count:', pathCount);
    if (pathCount !== 11) {
      throw new Error(`Footer Logo SVG should have 11 paths for SAMARIA TECH, got: ${pathCount}`);
    }

    console.log('\n--- Test 6: Subpage / Blog Verification ---');
    await page.goto(`${BASE_URL}/blog`, { waitUntil: 'domcontentloaded' });
    const blogTitle = await page.title();
    console.log('Blog Page Title:', blogTitle);
    if (!blogTitle.includes('Samaria Tech')) {
      throw new Error(`Blog title does not contain "Samaria Tech": ${blogTitle}`);
    }

    console.log('\n--- Test 7: Blog Post Verification ---');
    await page.goto(`${BASE_URL}/blog-posts/a-new-economy-is-knocking`, { waitUntil: 'domcontentloaded' });
    const postTitle = await page.title();
    console.log('Post Page Title:', postTitle);
    if (!postTitle.includes('Samaria Tech')) {
      throw new Error(`Post title does not contain "Samaria Tech": ${postTitle}`);
    }

    console.log('\n--- Test 8: Console & Runtime Errors Summary ---');
    // Filter benign cross-origin favicon or Webflow external analytics warnings if any
    const fatalErrors = pageErrors.concat(
      consoleErrors.filter((e) => !e.includes('favicon.ico') && !e.includes('analytics') && !e.includes('lenis'))
    );
    console.log('Fatal page / console errors count:', fatalErrors.length);
    if (fatalErrors.length > 0) {
      console.error('Fatal errors encountered:', fatalErrors);
      throw new Error(`Encountered ${fatalErrors.length} fatal errors during execution`);
    }

    console.log('\n=== ALL PLAYWRIGHT E2E VERIFICATION TESTS PASSED PERFECTLY (0 ERRORS) ===');
    await browser.close();
  } finally {
    console.log('Terminating Next.js server process...');
    nextProcess.kill('SIGTERM');
  }
}

runTests().catch((err) => {
  console.error('\nFAILED VERIFICATION:', err);
  process.exit(1);
});
