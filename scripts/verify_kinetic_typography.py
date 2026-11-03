import sys, time
sys.stdout.reconfigure(encoding='utf-8')
from playwright.sync_api import sync_playwright

console_errors = []

def run_tests():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={"width": 1440, "height": 900})

        def handle_console(msg):
            if msg.type == 'error' and 'favicon' not in msg.text.lower():
                console_errors.append(msg.text)

        page.on('console', handle_console)

        print("\n=== TEST 1: HOME HERO KINETIC TYPOGRAPHY ===")
        page.goto('http://localhost:3000', wait_until='networkidle')
        time.sleep(3.8) # Wait for preloader finish & Hero H1 entrance

        hero_wraps = page.locator('h1.hero-name .kinetic-3d-wrap')
        hero_inners = page.locator('h1.hero-name .kinetic-3d-inner')
        print(f"Hero H1 .kinetic-3d-wrap count: {hero_wraps.count()}")
        print(f"Hero H1 .kinetic-3d-inner count: {hero_inners.count()}")

        hero_styles = page.evaluate('''() => {
            const inners = document.querySelectorAll('h1.hero-name .kinetic-3d-inner');
            if (!inners.length) return null;
            const cs = window.getComputedStyle(inners[0]);
            return {
                opacity: cs.opacity,
                filter: cs.filter,
                transform: cs.transform
            };
        }''')
        print(f"Hero H1 Settled Styles: {hero_styles}")
        page.screenshot(path='kinetic_hero_settled.png')
        print("Captured kinetic_hero_settled.png")

        print("\n=== TEST 2: SECTION HEADINGS KINETIC SCROLL ===")
        print("Scrolling to 'What We Do' section...")
        page.evaluate('() => window.scrollTo({ top: 1200, behavior: "instant" })')
        time.sleep(1.5)

        section_wraps = page.locator('[scroll-name] .kinetic-3d-wrap')
        print(f"[scroll-name] .kinetic-3d-wrap count: {section_wraps.count()}")

        section_styles = page.evaluate('''() => {
            const inners = document.querySelectorAll('[scroll-name] .kinetic-3d-inner');
            if (!inners.length) return null;
            const cs = window.getComputedStyle(inners[0]);
            return {
                opacity: cs.opacity,
                filter: cs.filter,
                transform: cs.transform
            };
        }''')
        print(f"Section [scroll-name] Settled Styles: {section_styles}")
        page.screenshot(path='kinetic_section_settled.png')
        print("Captured kinetic_section_settled.png")

        print("\n=== TEST 3: BI-DIRECTIONAL REVERSE SCROLL ===")
        page.evaluate('() => window.scrollTo({ top: 0, behavior: "instant" })')
        time.sleep(1.5)
        print("Reverse scroll completed without errors.")

        print("\n=== TEST 4: BLOG KINETIC TYPOGRAPHY ===")
        page.goto('http://localhost:3000/blog', wait_until='networkidle')
        time.sleep(2.5) # Wait for blog runInAnimations

        blog_hero_wraps = page.locator('h1.hero-name .kinetic-3d-wrap')
        blog_hero_inners = page.locator('h1.hero-name .kinetic-3d-inner')
        print(f"Blog Hero H1 .kinetic-3d-wrap count: {blog_hero_wraps.count()}")
        print(f"Blog Hero H1 .kinetic-3d-inner count: {blog_hero_inners.count()}")

        blog_styles = page.evaluate('''() => {
            const inners = document.querySelectorAll('h1.hero-name .kinetic-3d-inner');
            if (!inners.length) return null;
            const cs = window.getComputedStyle(inners[0]);
            return {
                opacity: cs.opacity,
                filter: cs.filter,
                transform: cs.transform
            };
        }''')
        print(f"Blog Hero H1 Settled Styles: {blog_styles}")
        page.screenshot(path='kinetic_blog_settled.png')
        print("Captured kinetic_blog_settled.png")

        browser.close()

    print("\nConsole Errors:")
    for err in console_errors:
        print(f"  [ERROR] {err}")
    if not console_errors:
        print("  ✓ ZERO console errors!")

if __name__ == '__main__':
    run_tests()
