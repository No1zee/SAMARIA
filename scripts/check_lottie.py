from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={'width': 1440, 'height': 900})
    page.goto('http://localhost:3000')

    info = page.evaluate('''() => {
        return new Promise(resolve => {
            setTimeout(() => {
                const lottieEl = document.querySelector('.preloader-logo[data-animation-type="lottie"]');
                const lottieModule = window.Webflow && window.Webflow.require('lottie');
                const anims = lottieModule && lottieModule.lottie ? lottieModule.lottie.getRegisteredAnimations() : [];
                resolve({
                    hasWebflow: !!window.Webflow,
                    hasLottieModule: !!lottieModule,
                    registeredAnimsCount: anims.length,
                    animDetails: anims.map(a => ({
                        totalFrames: a.totalFrames,
                        currentFrame: a.currentFrame,
                        isPaused: a.isPaused,
                        wrapperMatch: a.wrapper === lottieEl || (lottieEl && lottieEl.contains(a.wrapper))
                    }))
                });
            }, 1000);
        });
    }''')
    print('Lottie Runtime Diagnostics:', info)
    browser.close()
