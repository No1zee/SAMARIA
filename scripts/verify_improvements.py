import sys, json, time
sys.stdout.reconfigure(encoding='utf-8')
from playwright.sync_api import sync_playwright

console_messages = []
console_warnings = []
console_errors = []

def run_tests():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={"width": 1440, "height": 900})

        def handle_console(msg):
            text = msg.text
            console_messages.append(text)
            if msg.type == 'warning':
                console_warnings.append(text)
            elif msg.type == 'error':
                console_errors.append(text)

        page.on('console', handle_console)

        print("\n--- TEST 1: HOME PAGE ---")
        page.goto('http://localhost:3000', wait_until='networkidle')
        time.sleep(2)

        # Check Schema.org JSON-LD
        json_ld_scripts = page.locator('script[type="application/ld+json"]').all_inner_texts()
        print(f"Found {len(json_ld_scripts)} JSON-LD script(s)")
        for jtext in json_ld_scripts:
            try:
                parsed = json.loads(jtext)
                print(f"✓ Valid JSON-LD: @graph items = {len(parsed.get('@graph', []))}")
                for item in parsed.get('@graph', []):
                    print(f"  - @type: {item.get('@type')}, name: {item.get('name')}")
            except Exception as e:
                print(f"✗ Failed to parse JSON-LD: {e}")

        # Check Three.js duplicate instances warning
        three_duplicate_warnings = [m for m in console_messages if 'multiple instances of three' in m.lower()]
        print(f"Three.js duplicate instance warnings: {len(three_duplicate_warnings)}")
        if three_duplicate_warnings:
            print("✗ Warning found:", three_duplicate_warnings[0])
        else:
            print("✓ ZERO Three.js duplicate engine warnings!")

        # Check sidebar coin
        sidebar_canvas = page.locator('#m-mecha-container canvas')
        print(f"Sidebar coin canvas count: {sidebar_canvas.count()}")

        # Check flight & modal docking using evaluate click on visible CTA
        print("Triggering contact modal open...")
        clicked = page.evaluate('''() => {
            const btn = document.querySelector('.action-wrap[data-wf--fixed-cta-button--variant="desktop"] [open-modal]') ||
                        document.querySelector('[open-modal]');
            if (btn) {
                btn.click();
                return true;
            }
            return false;
        }''')
        print(f"CTA Clicked via evaluate: {clicked}")
        time.sleep(2.5) # Wait for parabolic flight arc & docking

        modal_canvas = page.locator('#m-popup-container canvas')
        print(f"Modal canvas count: {modal_canvas.count()}")

        has_shadow = page.evaluate('() => window.__modalContactShadow ? window.__modalContactShadow.visible : false')
        print(f"Contact shadow visible: {has_shadow}")

        has_coin = page.evaluate('() => window.__modalCoinMesh ? window.__modalCoinMesh.visible : false')
        print(f"Modal coin mesh visible: {has_coin}")

        page.screenshot(path='test_modal_shadow.png')
        print("Saved screenshot to test_modal_shadow.png")

        print("\n--- TEST 2: BLOG PAGE ---")
        page.goto('http://localhost:3000/blog', wait_until='networkidle')
        time.sleep(1)

        blog_title = page.title()
        print(f"Blog title: {blog_title}")

        top_nav_texts = [el.inner_text().strip() for el in page.locator('.top-nav a').all()]
        print(f"Blog top nav links: {top_nav_texts}")

        blog_json_ld = page.locator('script[type="application/ld+json"]').all_inner_texts()
        print(f"Blog JSON-LD scripts: {len(blog_json_ld)}")
        for b_text in blog_json_ld:
            parsed = json.loads(b_text)
            print(f"  - @type: {parsed.get('@type')}, name: {parsed.get('name')}")

        print("\n--- TEST 3: 404 PAGE ---")
        resp = page.goto('http://localhost:3000/non-existent-page-check')
        print(f"404 Status: {resp.status}")
        p404_title = page.title()
        print(f"404 title: {p404_title}")
        p404_h1 = page.locator('h1').inner_text()
        print(f"404 h1: {p404_h1}")
        page.screenshot(path='test_404_page.png')
        print("Saved screenshot to test_404_page.png")

        browser.close()

    print("\nConsole Errors summary:")
    real_errors = [e for e in console_errors if 'favicon' not in e.lower()]
    for err in real_errors:
        print(f"  [ERROR] {err}")
    if not real_errors:
        print("  ✓ ZERO console errors!")

if __name__ == '__main__':
    run_tests()
