import os
from playwright.sync_api import sync_playwright

html_path = os.path.abspath('scripts/stitch_bento_screen.html')
file_url = f"file:///{html_path.replace(os.sep, '/')}"
out_dir = r"C:\Users\Edward Magejo\.gemini\antigravity\brain\c38161f9-4a6f-468b-ab53-043340eb2182"

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1440, "height": 1800})
    page.goto(file_url, wait_until='networkidle')
    page.wait_for_timeout(1000)

    # 1. Full view
    page.screenshot(path=os.path.join(out_dir, "preview_bento_full.png"), full_page=True)

    # 2. Hero viewport
    page.set_viewport_size({"width": 1440, "height": 950})
    page.screenshot(path=os.path.join(out_dir, "preview_bento_hero.png"))

    # 3. Secondary Duo view
    page.evaluate("() => window.scrollBy(0, 750)")
    page.wait_for_timeout(500)
    page.screenshot(path=os.path.join(out_dir, "preview_bento_duo.png"))

    browser.close()
    print("Previews successfully rendered and saved!")
