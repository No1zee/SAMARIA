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

    page.add_init_script('''() => {
        window._lottieHistory = [];
        const interval = setInterval(() => {
            const lottieModule = window.Webflow && window.Webflow.require('lottie');
            const anims = lottieModule && lottieModule.lottie ? lottieModule.lottie.getRegisteredAnimations() : [];
            const lottieEl = document.querySelector('.preloader-logo[data-animation-type="lottie"]');
            const anim = anims.find(a => a.wrapper === lottieEl || (lottieEl && lottieEl.contains(a.wrapper)));
            if (anim) {
                window._lottieHistory.push({
                    t: (performance.now() / 1000).toFixed(2),
                    frame: anim.currentFrame,
                    isPaused: anim.isPaused,
                    playDirection: anim.playDirection
                });
            }
        }, 100);
    }''')

    page.goto('http://localhost:3000')
    time.sleep(4.5)

    history = page.evaluate('() => window._lottieHistory')
    print("Total Lottie Samples Recorded:", len(history))
    print("\nSample Timeline:")
    for h in history[::2]: # every 200ms
        print(f"  T+{h['t']}s: Frame {h['frame']:.1f} (Paused: {h['isPaused']}, Dir: {h['playDirection']})")

    # Check whether preloader is completely non-blocking after done
    preloader_status = page.evaluate('''() => {
        const preloader = document.getElementById('preloader');
        const overlay = document.querySelector('.preloader-overlay-in');
        return {
            preloaderPointerEvents: preloader ? window.getComputedStyle(preloader).pointerEvents : null,
            preloaderDisplay: preloader ? window.getComputedStyle(preloader).display : null,
            overlayDisplay: overlay ? window.getComputedStyle(overlay).display : null,
            overlayOpacity: overlay ? window.getComputedStyle(overlay).opacity : null
        };
    }''')
    print("\nPreloader Final CSS Status:", preloader_status)

    browser.close()
