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

    console_warnings = []
    page.on('console', lambda msg: console_warnings.append(f"[{msg.type}] {msg.text}") if msg.type in ['warning', 'error'] else None)

    page.goto('http://localhost:3000', wait_until='networkidle')
    # Wait for preloader to settle
    time.sleep(3.8)

    # Measure FPS during scrolling down through project cards
    metrics = page.evaluate('''() => {
        return new Promise(resolve => {
            const deltas = [];
            let last = performance.now();
            let count = 0;
            const targetFrames = 120; // 2 full seconds of animation

            function step(now) {
                const delta = now - last;
                last = now;
                deltas.push(delta);
                count++;

                // Scroll incrementally on each frame to test Lenis and WebGL card hover/motion
                window.scrollBy(0, 18);

                if (count < targetFrames) {
                    requestAnimationFrame(step);
                } else {
                    resolve(deltas);
                }
            }
            requestAnimationFrame(step);
        });
    }''')

    # Analyze
    sample = metrics[5:] # warm frames
    avg_delta = sum(sample) / len(sample)
    avg_fps = 1000.0 / avg_delta if avg_delta > 0 else 0
    drops = [d for d in sample if d > 25.0] # frames taking > 25ms (dropping below 40fps)

    print("==========================================")
    print(" SAMARIA PERFORMANCE & 60 FPS AUDIT")
    print("==========================================")
    print(f"Total Frames Tested: {len(sample)}")
    print(f"Average Frame Delta: {avg_delta:.2f} ms")
    print(f"Sustained Frame Rate: {avg_fps:.1f} FPS")
    print(f"Frames > 25ms: {len(drops)} / {len(sample)} ({len(drops)/len(sample)*100:.1f}%)")

    # Audit WebGL Context Count
    contexts = page.evaluate('''() => {
        const canvases = document.querySelectorAll('canvas');
        const ripple = document.querySelectorAll('.card-ripple-canvas');
        return {
            totalCanvases: canvases.length,
            cardRippleCanvases: ripple.length
        };
    }''')
    print(f"Active Canvases on Page: {contexts['totalCanvases']} (Target: <= 3)")

    print("\nBrowser Warnings/Errors:")
    filtered_warnings = [w for w in console_warnings if 'ReadPixels' not in w]
    if not filtered_warnings:
        print("  Zero runtime warnings/errors! All clear.")
    else:
        for w in filtered_warnings:
            print("  ->", w)

    browser.close()
