from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1440, "height": 900})

    errors = []
    page.on("pageerror", lambda err: errors.append(str(err)))

    page.goto('http://localhost:3000/blog-posts/a-new-economy-is-knocking', wait_until='networkidle')
    page.wait_for_timeout(2000)

    has_cursor_wrap = page.evaluate("() => !!document.querySelector('.cursor-wrap')")
    has_noise = page.evaluate("() => !!document.querySelector('.samaria-noise-overlay')")
    hero_visible = page.evaluate("() => document.body.innerText.length > 50")

    print(f"Blog post test:")
    print(f"  errors: {len(errors)}")
    print(f"  cursor_wrap: {has_cursor_wrap}")
    print(f"  noise overlay: {has_noise}")
    print(f"  body content loaded: {hero_visible}")

    browser.close()
