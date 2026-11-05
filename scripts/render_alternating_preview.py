import os
from playwright.sync_api import sync_playwright

html_path = os.path.abspath('scripts/preview_alternating.html')
file_url = f"file:///{html_path.replace(os.sep, '/')}"
out_dir = r"C:\Users\Edward Magejo\.gemini\antigravity\brain\c38161f9-4a6f-468b-ab53-043340eb2182"

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1440, "height": 950})
    page.goto(file_url, wait_until='networkidle')
    page.wait_for_timeout(1000)

    # 1. Overview showing top section + Row 1 (Image Left, Text Right) + top of Row 2
    page.screenshot(path=os.path.join(out_dir, "preview_alternating_row1.png"))

    # 2. Scroll to Row 2 & Row 3 (Text Left, Image Right)
    page.evaluate("() => window.scrollBy(0, 600)")
    page.wait_for_timeout(500)
    page.screenshot(path=os.path.join(out_dir, "preview_alternating_row2.png"))

    # 3. Full page
    page.screenshot(path=os.path.join(out_dir, "preview_alternating_full.png"), full_page=True)

    browser.close()
    print("Alternating preview screenshots captured successfully!")
