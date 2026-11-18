import { chromium } from 'playwright';

async function runTests() {
  console.log('Launching browser for E2E modal tests...');
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  console.log('Navigating to http://localhost:3000 ...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000); // Allow preloader to finish

  // Test 1: Verify 3 Project Cards exist
  console.log('--- Test 1: Checking Project Cards ---');
  const projectTitles = await page.$$eval('.samaria-project-title', els => els.map(el => el.textContent.trim()));
  console.log('Project Titles on page:', projectTitles);
  if (!projectTitles.includes('Bambino')) {
    throw new Error('Project 03 title Bambino not found on page!');
  }
  if (!projectTitles.includes('HEMS') || !projectTitles.includes('Kinetic')) {
    throw new Error('HEMS or Kinetic title missing!');
  }

  // Verify Bambino card details
  const bambinoRow = page.locator('.samaria-project-row[data-project-index="2"]');
  const bambinoImg = await bambinoRow.locator('img').getAttribute('src');
  console.log('Bambino card image src:', bambinoImg);
  if (bambinoImg !== '/assets/projects/bambino_world_map.webp') {
    throw new Error(`Expected Bambino img to be /assets/projects/bambino_world_map.webp, got: ${bambinoImg}`);
  }

  // Test 2: Trigger Bambino Modal via "Explore Case Study" button
  console.log('--- Test 2: Triggering Bambino Case Study Modal ---');
  await page.evaluate(() => {
    const btn = document.querySelector('.samaria-project-row[data-project-index="2"] a.open-case-study');
    if (btn) btn.click();
  });
  await page.waitForTimeout(1200); // Wait for GSAP slide-up animation

  const isModalVisible = await page.evaluate(() => {
    const modal = document.querySelector('.projects-detail-modal');
    return modal && modal.classList.contains('is-active') && window.getComputedStyle(modal).display !== 'none';
  });
  console.log('Is modal open and active?', isModalVisible);
  if (!isModalVisible) {
    throw new Error('Modal failed to open!');
  }

  // Verify 3 acts inside the modal
  const modalText = await page.locator('.projects-detail-modal .container.is-c-active').innerText();
  const upperText = modalText.toUpperCase();
  console.log('Modal contains "ACT I"?', upperText.includes('ACT I') && upperText.includes('THE HASSLE'));
  console.log('Modal contains "ACT II"?', upperText.includes('ACT II') && upperText.includes('THE ENGINE'));
  console.log('Modal contains "ACT III"?', upperText.includes('ACT III') && upperText.includes('THE TECHNICAL WIN'));
  console.log('Modal contains "Nobody wants to squint at a soggy PDF map"?', modalText.includes('Nobody wants to squint at a soggy PDF map'));

  if (!upperText.includes('ACT I') || !upperText.includes('ACT II') || !upperText.includes('ACT III')) {
    throw new Error('3-act editorial structure not found in modal!');
  }

  // Take screenshot of Bambino modal
  await page.screenshot({ path: 'public/modal_bambino_act1.png' });
  console.log('Saved screenshot public/modal_bambino_act1.png');

  // Test 3: Bottom Navigation (Prev -> Kinetic)
  console.log('--- Test 3: Testing Prev Button Navigation ---');
  const prevBtn = page.locator('.projects-detail-modal .pri-link.is-prev');
  const prevText = await prevBtn.innerText();
  console.log('Prev button text:', prevText);
  await prevBtn.evaluate(el => el.click());
  await page.waitForTimeout(1000); // Wait for fade transition

  const currentTitle = await page.locator('.projects-detail-modal .cs-title').innerText();
  console.log('Title after clicking Prev:', currentTitle);
  if (currentTitle !== 'Kinetic') {
    throw new Error(`Expected Kinetic after clicking Prev, got: ${currentTitle}`);
  }

  // Take screenshot of Kinetic modal
  await page.screenshot({ path: 'public/modal_kinetic.png' });
  console.log('Saved screenshot public/modal_kinetic.png');

  // Test 4: Bottom Navigation (Next -> Bambino)
  console.log('--- Test 4: Testing Next Button Navigation ---');
  const nextBtn = page.locator('.projects-detail-modal .pri-link.is-next');
  await nextBtn.evaluate(el => el.click());
  await page.waitForTimeout(1000);

  const nextTitle = await page.locator('.projects-detail-modal .cs-title').innerText();
  console.log('Title after clicking Next:', nextTitle);
  if (nextTitle !== 'Bambino') {
    throw new Error(`Expected Bambino after clicking Next, got: ${nextTitle}`);
  }

  // Test 5: Close Button
  console.log('--- Test 5: Testing Close Button ---');
  const closeBtn = page.locator('.projects-detail-modal .close-project');
  await closeBtn.evaluate(el => el.click());
  await page.waitForTimeout(1000); // Wait for slide-down

  const isClosed = await page.evaluate(() => {
    const modal = document.querySelector('.projects-detail-modal');
    return !modal.classList.contains('is-active') || window.getComputedStyle(modal).display === 'none';
  });
  console.log('Is modal closed after clicking close button?', isClosed);
  if (!isClosed) {
    throw new Error('Modal did not close!');
  }

  // Test 6: Open HEMS via image card click and close via Esc Key
  console.log('--- Test 6: Testing HEMS Modal via card media click + Esc Key ---');
  await page.evaluate(() => {
    const hemsMedia = document.querySelector('.samaria-project-row[data-project-index="0"] .samaria-project-media.open-case-study') || document.querySelector('.samaria-project-row .open-case-study');
    if (hemsMedia) hemsMedia.click();
  });
  await page.waitForTimeout(1000);

  const hemsTitle = await page.locator('.projects-detail-modal .cs-title').innerText();
  console.log('HEMS Modal opened with title:', hemsTitle);
  if (hemsTitle !== 'HEMS') {
    throw new Error(`Expected HEMS title, got: ${hemsTitle}`);
  }

  // Press Escape
  await page.keyboard.press('Escape');
  await page.waitForTimeout(1000);

  const isClosedEsc = await page.evaluate(() => {
    const modal = document.querySelector('.projects-detail-modal');
    return !modal.classList.contains('is-active') || window.getComputedStyle(modal).display === 'none';
  });
  console.log('Is modal closed after Escape key?', isClosedEsc);
  if (!isClosedEsc) {
    throw new Error('Modal did not close via Escape key!');
  }

  await browser.close();
  console.log('ALL TESTS PASSED WITH 100% SUCCESS!');
}

runTests().catch(err => {
  console.error('Test failed:', err);
  process.exit(1);
});
