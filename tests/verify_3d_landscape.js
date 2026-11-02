const { chromium } = require("playwright");
const path = require("path");

const ARTIFACT_DIR = "C:\\Users\\Edward Magejo\\.gemini\\antigravity\\brain\\1d3bce45-6256-41b6-9f11-c3e905c30714";

async function main() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1200 },
    deviceScaleFactor: 1,
  });
  const page = await context.newPage();

  const errors = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(msg.text());
  });
  page.on("pageerror", (err) => errors.push(err.message));

  console.log("Navigating to http://localhost:4000...");
  await page.goto("http://localhost:4000", { waitUntil: "networkidle", timeout: 30000 });
  await page.waitForTimeout(2000);

  const phases = [
    { name: "eastern_highlands_00_midnight.png", scroll: 0.0 },
    { name: "eastern_highlands_01_sunrise.png", scroll: 0.25 },
    { name: "eastern_highlands_02_noon.png", scroll: 0.50 },
    { name: "eastern_highlands_03_sunset.png", scroll: 0.75 },
    { name: "eastern_highlands_04_midnight_return.png", scroll: 1.0 },
  ];

  for (const phase of phases) {
    await page.evaluate((val) => {
      if (typeof window.__setScrollProgress === "function") {
        window.__setScrollProgress(val);
      }
    }, phase.scroll);
    await page.waitForTimeout(1000);
    const savePath = path.join(ARTIFACT_DIR, phase.name);
    await page.screenshot({ path: savePath, fullPage: false });
    console.log(`Captured ${phase.name}`);
  }

  await browser.close();

  if (errors.length > 0) {
    console.error("Console/Page errors encountered:", errors);
    process.exit(1);
  } else {
    console.log("Zero errors detected! Eastern Highlands WebGL 3D pipeline running smoothly.");
    process.exit(0);
  }
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
