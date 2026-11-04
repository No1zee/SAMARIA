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
    page = browser.new_page(viewport={'width': 1440, 'height': 900})
    page.goto('http://localhost:3000')

    frames = page.evaluate('''() => {
        return new Promise(resolve => {
            const history = [];
            let ticks = 0;
            const timer = setInterval(() => {
                ticks++;
                const lottieModule = window.Webflow && window.Webflow.require('lottie');
                const anims = lottieModule && lottieModule.lottie ? lottieModule.lottie.getRegisteredAnimations() : [];
                const lottieEl = document.querySelector('.preloader-logo[data-animation-type="lottie"]');
                const anim = anims.find(a => a.wrapper === lottieEl || (lottieEl && lottieEl.contains(a.wrapper)));
                if (anim) {
                    history.push({ frame: Math.round(anim.currentFrame), isPaused: anim.isPaused, dir: anim.playDirection });
                }
                if (ticks > 40) {
                    clearInterval(timer);
                    resolve(history);
                }
            }, 80);
        });
    }''')
    print('Recorded Frames count:', len(frames))
    print('Frames progression:', [f['frame'] for f in frames])
    browser.close()
