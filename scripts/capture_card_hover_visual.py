import time
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1440, "height": 900})
    page.goto('http://localhost:3000', wait_until='networkidle')
    time.sleep(3.8)

    # Scroll down to the project cards section
    page.evaluate('''() => {
        const cards = Array.from(document.querySelectorAll('.project-vid[gsap-img], .project-file[gsap-img]'));
        const target = cards.find(c => c.offsetWidth > 200 && c.offsetHeight > 150) || cards[12];
        if (target) {
            target.scrollIntoView({ behavior: 'instant', block: 'center' });
            const rect = target.getBoundingClientRect();
            target.dispatchEvent(new MouseEvent('mouseenter', {
                clientX: rect.left + rect.width / 2,
                clientY: rect.top + rect.height / 2,
                bubbles: true
            }));
            target.dispatchEvent(new MouseEvent('mousemove', {
                clientX: rect.left + rect.width / 2 + 10,
                clientY: rect.top + rect.height / 2 - 10,
                bubbles: true
            }));
        }
    }''')
    time.sleep(0.5)

    # Capture visual verification
    artifact_path = "C:/Users/Edward Magejo/.gemini/antigravity/brain/c38161f9-4a6f-468b-ab53-043340eb2182/optimized_card_ripple.png"
    page.screenshot(path=artifact_path)
    print("Screenshot saved to", artifact_path)
    browser.close()
