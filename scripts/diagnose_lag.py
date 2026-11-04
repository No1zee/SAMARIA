import sys, time
sys.stdout.reconfigure(encoding='utf-8')
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1440, "height": 900})

    console_warnings = []
    page.on('console', lambda msg: console_warnings.append(msg.text) if msg.type in ['warning', 'error'] else None)

    page.goto('http://localhost:3000', wait_until='networkidle')
    time.sleep(2)

    stats = page.evaluate('''() => {
        const canvases = document.querySelectorAll('canvas');
        const rippleCanvases = document.querySelectorAll('.card-ripple-canvas');
        return {
            totalCanvases: canvases.length,
            cardRippleCanvases: rippleCanvases.length
        };
    }''')
    print("Canvas Stats:", stats)

    print("\nBrowser Warnings/Errors:")
    for w in console_warnings:
        print("  ->", w[:120])

    browser.close()
