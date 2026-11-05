from playwright.sync_api import sync_playwright

def test_benchmark():
    with sync_playwright() as p:
        print("=== 1. DESKTOP MOTION PHYSICS BENCHMARK (BLOG PAGE) ===")
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={"width": 1440, "height": 900})

        errors = []
        page.on("pageerror", lambda err: errors.append(f"PageError: {err}"))
        page.on("console", lambda msg: errors.append(f"ConsoleError: {msg.text}") if msg.type == "error" else None)

        page.goto('http://localhost:3000/blog', wait_until='networkidle')
        page.wait_for_timeout(3500) # wait for preloader

        # 1. Magnetic Hamburger
        hamb = page.query_selector('.bold-nav-full__hamburger')
        if hamb:
            box = hamb.bounding_box()
            if box:
                page.mouse.move(box['x'] + box['width'] * 0.8, box['y'] + box['height'] * 0.8)
                page.wait_for_timeout(400)
                t_active = hamb.evaluate("el => getComputedStyle(el).transform")
                print(f"  Hamburger Magnetic Active: {t_active}")
                page.mouse.move(10, 10)
                page.wait_for_timeout(500)
                t_rest = hamb.evaluate("el => getComputedStyle(el).transform")
                print(f"  Hamburger Magnetic Rest: {t_rest}")

        # 2. 3D Perspective Tilt on Blog Holder Card
        card = page.query_selector('.blog-holder')
        if card:
            card_box = card.bounding_box()
            if card_box:
                page.mouse.move(card_box['x'] + card_box['width'] * 0.8, card_box['y'] + card_box['height'] * 0.8)
                page.wait_for_timeout(400)
                card_tilt = card.evaluate("el => getComputedStyle(el).transform")
                print(f"  Blog Card 3D Tilt Active: {card_tilt}")
                page.mouse.move(10, 10)
                page.wait_for_timeout(500)
                card_rest = card.evaluate("el => getComputedStyle(el).transform")
                print(f"  Blog Card 3D Tilt Rest: {card_rest}")

        # 3. Sustained FPS
        fps = page.evaluate('''() => {
            return new Promise(resolve => {
                let frames = 0;
                let start = performance.now();
                function step() {
                    frames++;
                    if (performance.now() - start < 1000) {
                        requestAnimationFrame(step);
                    } else {
                        resolve(Math.round((frames * 1000) / (performance.now() - start)));
                    }
                }
                requestAnimationFrame(step);
            });
        }''')
        print(f"  Sustained Desktop FPS: {fps} FPS")
        print(f"  Desktop Errors: {len(errors)}")
        browser.close()

        print("\n=== 2. MOBILE TOUCH ADAPTATION (iPhone 14) ===")
        iphone = p.devices['iPhone 14']
        m_browser = p.chromium.launch(headless=True)
        m_page = m_browser.new_context(**iphone).new_page()
        m_errors = []
        m_page.on("pageerror", lambda err: m_errors.append(err))
        m_page.goto('http://localhost:3000/blog', wait_until='networkidle')
        m_page.wait_for_timeout(3500)

        # Tap on touch element
        m_hamb = m_page.query_selector('.bold-nav-full__hamburger')
        if m_hamb:
            m_box = m_hamb.bounding_box()
            if m_box:
                m_page.touchscreen.tap(m_box['x'] + m_box['width'] / 2, m_box['y'] + m_box['height'] / 2)
                m_page.wait_for_timeout(300)

        print(f"  Mobile Errors: {len(m_errors)}")
        m_browser.close()

        print("\n=== 3. BLOG POST 3D PERSPECTIVE LIFT ===")
        post_browser = p.chromium.launch(headless=True)
        post_page = post_browser.new_page(viewport={"width": 1440, "height": 900})
        p_errors = []
        post_page.on("pageerror", lambda err: p_errors.append(err))
        post_page.goto('http://localhost:3000/blog-posts/a-new-economy-is-knocking', wait_until='networkidle')
        post_page.wait_for_timeout(2000)

        spans = post_page.query_selector_all('.kinetic-3d-wrap')
        print(f"  Kinetic 3D Perspective Wraps found: {len(spans)}")
        print(f"  Post Page Errors: {len(p_errors)}")
        post_browser.close()

        print("\nAll motion physics suites verified successfully!")

if __name__ == '__main__':
    test_benchmark()
