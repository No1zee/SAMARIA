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

        print("\n=== TEST 1: HOME PAGE FILM GRAIN & CARDS ===")
        page.goto('http://localhost:3000', wait_until='networkidle')
        time.sleep(2)

        # Check Noise Overlay
        grain_count = page.locator('.samaria-noise-overlay').count()
        print(f"Film grain overlay count: {grain_count}")

        grain_style = page.evaluate('''() => {
            const el = document.querySelector('.samaria-noise-overlay');
            if (!el) return null;
            const cs = window.getComputedStyle(el);
            return {
                opacity: cs.opacity,
                position: cs.position,
                pointerEvents: cs.pointerEvents,
                animation: cs.animation
            };
        }''')
        print(f"Film grain style: {grain_style}")

        # Scroll to project cards section
        print("\nScrolling to Project Showcase section...")
        page.evaluate('() => window.scrollTo({ top: 1800, behavior: "instant" })')
        time.sleep(2)

        card_canvases = page.locator('.card-ripple-canvas')
        print(f"Card ripple canvas count: {card_canvases.count()}")

        # Target a visible card using pure DOM geometry check
        print("Finding visible project card and triggering hover/mousemove...")
        activated = page.evaluate('''() => {
            const cards = Array.from(document.querySelectorAll('.project-vid[gsap-img], .project-file[gsap-img]'));
            const visibleCard = cards.find(el => el.offsetWidth > 50 && el.offsetHeight > 50);
            if (!visibleCard) return false;

            const rect = visibleCard.getBoundingClientRect();
            const evt = new MouseEvent('mousemove', {
                clientX: rect.left + rect.width / 2,
                clientY: rect.top + rect.height / 2,
                bubbles: true
            });
            visibleCard.dispatchEvent(evt);
            return true;
        }''')
        print(f"Dispatched mousemove to visible card: {activated}")
        time.sleep(1)

        card_active = page.evaluate('''() => {
            const card = document.querySelector('.card-ripple-active');
            return card ? true : false;
        }''')
        print(f"A card has .card-ripple-active: {card_active}")

        canvas_opacity = page.evaluate('''() => {
            const cv = document.querySelector('.card-ripple-active .card-ripple-canvas') ||
                       document.querySelector('.card-ripple-canvas');
            return cv ? window.getComputedStyle(cv).opacity : '0';
        }''')
        print(f"Ripple canvas computed opacity on hover: {canvas_opacity}")

        page.screenshot(path='screenshot_card_ripple_hover.png')
        print("Captured screenshot_card_ripple_hover.png")

        # Capture overall home with film grain
        page.screenshot(path='screenshot_grain_home.png')
        print("Captured screenshot_grain_home.png")

        # Test Blog Page for film grain
        print("\n=== TEST 2: BLOG PAGE FILM GRAIN ===")
        page.goto('http://localhost:3000/blog', wait_until='networkidle')
        time.sleep(1)
        blog_grain = page.locator('.samaria-noise-overlay').count()
        print(f"Blog film grain overlay count: {blog_grain}")
        page.screenshot(path='screenshot_grain_blog.png')
        print("Captured screenshot_grain_blog.png")

        browser.close()

    print("\nConsole Errors:")
    for err in console_errors:
        print(f"  [ERROR] {err}")
    if not console_errors:
        print("  ✓ ZERO console errors!")

if __name__ == '__main__':
    run_tests()
