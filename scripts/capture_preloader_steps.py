import time
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

    page.goto('http://localhost:3000')

    # Capture 6 frames during preloader
    for i in range(7):
        time.sleep(0.7)
        shot_path = f"C:/Users/Edward Magejo/.gemini/antigravity/brain/c38161f9-4a6f-468b-ab53-043340eb2182/preloader_step_{i}.png"
        page.screenshot(path=shot_path)
        
        info = page.evaluate('''() => {
            const lottie = document.querySelector('.preloader-logo[data-animation-type="lottie"]');
            const svg = lottie ? lottie.querySelector('svg') : null;
            const preloader = document.getElementById('preloader');
            const counter = document.querySelector('.preloader-counter');
            return {
                hasSvg: !!svg,
                svgBox: svg ? svg.getBoundingClientRect() : null,
                counter: counter ? counter.textContent : null,
                lottieTransform: lottie ? lottie.style.transform : null
            };
        }''')
        print(f"Step {i} ({i*0.7:.1f}s):", info)

    browser.close()
