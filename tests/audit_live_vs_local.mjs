import { chromium } from 'playwright';

async function audit(url, label) {
  console.log(`\n================ AUDITING ${label} (${url}) ================`);
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  const failedRequests = [];
  const consoleMessages = [];

  page.on('requestfailed', req => {
    failedRequests.push({ url: req.url(), failure: req.failure()?.errorText });
  });

  page.on('console', msg => {
    consoleMessages.push({ type: msg.type(), text: msg.text() });
  });

  try {
    const res = await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
    console.log(`HTTP Status: ${res.status()}`);

    // Wait 3.5 seconds for preloader and initial animations
    await page.waitForTimeout(3500);

    // Check preloader state
    const preloaderVisible = await page.evaluate(() => {
      const el = document.getElementById('preloader') || document.querySelector('.preloader-overlay-in');
      if (!el) return null;
      const style = window.getComputedStyle(el);
      return { opacity: style.opacity, display: style.display, visibility: style.visibility };
    });
    console.log('Preloader state:', preloaderVisible);

    // Check Three.js canvas in hero
    const threeState = await page.evaluate(() => {
      const container = document.getElementById('m-mecha-container');
      const canvas = container ? container.querySelector('canvas') : null;
      return {
        containerFound: !!container,
        canvasFound: !!canvas,
        canvasWidth: canvas?.width,
        canvasHeight: canvas?.height
      };
    });
    console.log('Three.js hero state:', threeState);

    // Check Lottie animation in navbar and preloader
    const lottieState = await page.evaluate(() => {
      const navLogo = document.querySelector('.navbar-logo');
      const preLogo = document.querySelector('.preloader-logo');
      const navSvg = navLogo ? navLogo.querySelector('svg') : null;
      const preSvg = preLogo ? preLogo.querySelector('svg') : null;
      return {
        navLogoFound: !!navLogo,
        navSvgFound: !!navSvg,
        navSvgChildren: navSvg ? navSvg.children.length : 0,
        preLogoFound: !!preLogo,
        preSvgFound: !!preSvg,
      };
    });
    console.log('Lottie state:', lottieState);

    // Check Footer Logo
    const footerState = await page.evaluate(() => {
      const footerLogo = document.querySelector('.footer-logo');
      const svg = footerLogo ? footerLogo.querySelector('svg') : null;
      const style = footerLogo ? window.getComputedStyle(footerLogo) : null;
      return {
        footerLogoFound: !!footerLogo,
        svgFound: !!svg,
        transform: style?.transform,
        opacity: style?.opacity
      };
    });
    console.log('Footer Logo state:', footerState);

    // Check GSAP animations / ScrollTriggers
    const gsapState = await page.evaluate(() => {
      if (!window.gsap) return { gsapAvailable: false };
      const triggers = window.ScrollTrigger ? window.ScrollTrigger.getAll().length : 0;
      return {
        gsapAvailable: true,
        scrollTriggersCount: triggers,
        lenisAvailable: !!window.lenis
      };
    });
    console.log('GSAP/ScrollTrigger/Lenis state:', gsapState);

    // Check videos
    const videoState = await page.evaluate(() => {
      const videos = Array.from(document.querySelectorAll('video'));
      return videos.map((v, idx) => ({
        index: idx,
        src: (v.currentSrc || v.src || '').slice(-30),
        paused: v.paused,
        currentTime: v.currentTime,
        readyState: v.readyState
      }));
    });
    console.log(`Videos count: ${videoState.length}`, videoState.slice(0, 4));

    console.log(`Failed requests count: ${failedRequests.length}`);
    if (failedRequests.length > 0) {
      console.log('Sample failed requests:', failedRequests.slice(0, 5));
    }

    console.log(`Console messages count: ${consoleMessages.length}`);
    const errors = consoleMessages.filter(m => m.type === 'error');
    console.log(`Errors count: ${errors.length}`);
    if (errors.length > 0) {
      console.log('Console errors:', errors.slice(0, 5));
    }

  } catch (err) {
    console.error(`Error auditing ${label}:`, err.message);
  } finally {
    await browser.close();
  }
}

async function main() {
  await audit('https://mecha-xyz.webflow.io/', 'LIVE WEBFLOW');
  await audit('http://localhost:3000/', 'LOCAL CLONE');
}

main();
