from playwright.sync_api import sync_playwright
import time

with sync_playwright() as p:
    browser = p.chromium.launch(
        headless=True,
        args=[
            '--disable-background-timer-throttling',
            '--disable-renderer-backgrounding',
            '--disable-backgrounding-occluded-windows',
            '--use-gl=angle',
            '--use-angle=d3d11'
        ]
    )
    page = browser.new_page(viewport={"width": 1440, "height": 900})
    page.goto('http://localhost:3000')

    # Wait for preloader to finish (about 4.5s)
    time.sleep(5.5)

    # Scroll to investments
    page.evaluate("() => { const el = document.getElementById('investments'); if(el) el.scrollIntoView({ behavior: 'instant' }); }")
    time.sleep(1)
    page.screenshot(path='C:/Users/Edward Magejo/.gemini/antigravity/brain/c38161f9-4a6f-468b-ab53-043340eb2182/what_we_do_overview_1.png')

    page.evaluate("() => window.scrollBy(0, 750)")
    time.sleep(1)
    page.screenshot(path='C:/Users/Edward Magejo/.gemini/antigravity/brain/c38161f9-4a6f-468b-ab53-043340eb2182/what_we_do_overview_2.png')

    page.evaluate("() => window.scrollBy(0, 950)")
    time.sleep(1)
    page.screenshot(path='C:/Users/Edward Magejo/.gemini/antigravity/brain/c38161f9-4a6f-468b-ab53-043340eb2182/what_we_do_overview_3.png')

    browser.close()
    print("Accurate screenshots captured!")
