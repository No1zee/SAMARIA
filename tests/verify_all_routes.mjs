import { chromium } from 'playwright';

async function run() {
  console.log('🚀 Running full comprehensive verification across all routes...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  const consoleErrors = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });

  // 1. Home
  await page.goto('http://localhost:3000/', { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('#m-mecha-container canvas', { timeout: 15000 });
  console.log('  ✅ Home 3D Canvas verified');

  // 2. Blog index
  await page.goto('http://localhost:3000/blog', { waitUntil: 'domcontentloaded' });
  const count = await page.$$eval('a[href*="/blog-posts/"]', els => els.length);
  console.log(`  ✅ Blog index verified with ${count} post links`);

  // 3. All 4 blog posts
  const posts = [
    { slug: 'a-new-economy-is-knocking', title: 'A New Economy Is Knocking' },
    { slug: 'engineering-the-systems-of-abundance', title: 'Engineering the Systems of Abundance' },
    { slug: 'turning-sci-fi-into-economic-fact', title: 'Turning Sci-Fi Into Economic Fact' },
    { slug: 'we-engineer-the-future-economy-in-the-real-world-not-in-theory', title: 'We engineer the future economy' }
  ];

  for (const post of posts) {
    const url = `http://localhost:3000/blog-posts/${post.slug}`;
    await page.goto(url, { waitUntil: 'domcontentloaded' });
    const h1 = await page.textContent('h1');
    if (!h1.includes(post.title)) {
      throw new Error(`Title mismatch on ${url}: expected ${post.title}, got ${h1}`);
    }
    console.log(`  ✅ Verified: ${post.slug} -> "${h1.trim()}"`);
  }

  // 4. Check console errors
  const errors = consoleErrors.filter(e => !e.includes('favicon') && !e.includes('webclip'));
  if (errors.length > 0) {
    throw new Error(`Console errors found: ${JSON.stringify(errors)}`);
  }
  console.log('  ✅ Verified 0 console errors across all routes');

  await browser.close();
  console.log('🎉 Full verification passed successfully!');
}

run().catch(err => {
  console.error('❌ Failed:', err);
  process.exit(1);
});
