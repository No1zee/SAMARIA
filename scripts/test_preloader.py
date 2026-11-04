import sys, time
sys.stdout.reconfigure(encoding='utf-8')
from playwright.sync_api import sync_playwright

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

    page_errors = []
    console_logs = []
    page.on('pageerror', lambda err: page_errors.append(str(err)))
    page.on('console', lambda msg: console_logs.append(f"[{msg.type}] {msg.text}") if msg.type in ['error', 'warning'] else None)

    print("Navigating to http://localhost:3000 ...")
    page.goto('http://localhost:3000')

    # Monitor preloader state during first 4 seconds
    states = []
    for sec in range(9):
        time.sleep(0.5)
        state = page.evaluate('''() => {
            const preloader = document.getElementById('preloader');
            const overlay = document.querySelector('.preloader-overlay-in');
            const counter = document.querySelector('.preloader-counter');
            const fill = document.querySelector('.preloader-bar-fill');
            const lottie = document.querySelector('.preloader-logo[data-animation-type="lottie"]');
            
            return {
                time: (performance.now() / 1000).toFixed(1),
                preloaderDisplay: preloader ? window.getComputedStyle(preloader).display : null,
                preloaderOpacity: preloader ? window.getComputedStyle(preloader).opacity : null,
                overlayOpacity: overlay ? window.getComputedStyle(overlay).opacity : null,
                counterText: counter ? counter.textContent : null,
                fillWidth: fill ? fill.style.width : null
            };
        }''')
        states.append(state)

    print("\nPreloader Timeline Progression:")
    for s in states:
        print(f"  T+{s['time']}s | Counter: {s['counterText']} | Fill: {s['fillWidth']} | Overlay Opacity: {s['overlayOpacity']} | Preloader Display: {s['preloaderDisplay']}")

    print("\nPage Errors:", page_errors if page_errors else "None! (0 errors)")
    print("Console Warnings/Errors:", [l for l in console_logs if 'ReadPixels' not in l] if console_logs else "None! (0 warnings)")

    # Final check: is preloader done and site accessible?
    is_done = page.evaluate('''() => {
        const preloader = document.getElementById('preloader');
        const overlay = document.querySelector('.preloader-overlay-in');
        return {
            preloaderGone: preloader ? (window.getComputedStyle(preloader).display === 'none' || window.getComputedStyle(preloader).opacity === '0') : true,
            overlayGone: overlay ? (window.getComputedStyle(overlay).display === 'none' || window.getComputedStyle(overlay).opacity === '0') : true,
            heroVisible: !!document.querySelector('.hero-title')
        };
    }''')
    print("\nFinal State Check:", is_done)

    # Take screenshot of the revealed website
    artifact_path = "C:/Users/Edward Magejo/.gemini/antigravity/brain/c38161f9-4a6f-468b-ab53-043340eb2182/preloader_revealed_site.png"
    page.screenshot(path=artifact_path)
    print("Screenshot saved to", artifact_path)

    browser.close()
