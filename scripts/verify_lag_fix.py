import sys, time
sys.stdout.reconfigure(encoding='utf-8')
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1440, "height": 900})

    console_logs = []
    page.on('console', lambda msg: console_logs.append(f'[{msg.type}] {msg.text}') if msg.type in ['warning', 'error'] else None)

    page.goto('http://localhost:3000', wait_until='networkidle')
    time.sleep(2)

    stats_initial = page.evaluate('''() => {
        const canvases = document.querySelectorAll('canvas');
        const rippleCanvases = document.querySelectorAll('.card-ripple-canvas');
        const noiseOverlay = document.querySelector('.samaria-noise-overlay');
        const bgImg = noiseOverlay ? window.getComputedStyle(noiseOverlay).backgroundImage : '';
        return {
            totalCanvases: canvases.length,
            cardRippleCanvases: rippleCanvases.length,
            noiseBg: bgImg
        };
    }''')
    print("Initial Stats (Before Hover):", stats_initial)

    # Hover over the first visible project card
    hover_stats = page.evaluate('''() => {
        const cards = Array.from(document.querySelectorAll('.project-vid[gsap-img], .project-file[gsap-img]'));
        const visibleCard = cards.find(c => {
            const r = c.getBoundingClientRect();
            return r.width > 100 && r.height > 100 && r.top >= 0 && r.top < window.innerHeight;
        }) || cards[12]; // fallback to first known project card

        if (visibleCard) {
            visibleCard.scrollIntoView({ behavior: 'instant', block: 'center' });
            const rect = visibleCard.getBoundingClientRect();
            const mouseEvent = new MouseEvent('mouseenter', {
                clientX: rect.left + rect.width / 2,
                clientY: rect.top + rect.height / 2,
                bubbles: true
            });
            visibleCard.dispatchEvent(mouseEvent);
            return {
                cardFound: true,
                className: visibleCard.className,
                rect: { width: rect.width, height: rect.height }
            };
        }
        return { cardFound: false };
    }''')
    print("Hover Triggered:", hover_stats)
    time.sleep(1)

    stats_after_hover = page.evaluate('''() => {
        const canvases = document.querySelectorAll('canvas');
        const rippleCanvases = document.querySelectorAll('.card-ripple-canvas');
        const activeRipple = document.querySelector('.card-ripple-canvas.is-active');
        return {
            totalCanvases: canvases.length,
            cardRippleCanvases: rippleCanvases.length,
            hasActiveRipple: !!activeRipple
        };
    }''')
    print("Stats After Hover:", stats_after_hover)

    # Scroll down to simulate real user journey
    page.evaluate('''() => {
        window.scrollBy({ top: 800, behavior: 'smooth' });
    }''')
    time.sleep(1.5)

    print("\nConsole Warnings/Errors During Test:")
    if not console_logs:
        print("  None! (Zero console warnings/errors)")
    else:
        for log in console_logs:
            print("  ->", log[:120])

    browser.close()
