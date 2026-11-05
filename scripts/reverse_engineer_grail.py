import sys
sys.stdout.reconfigure(encoding='utf-8')
import os
import json
from playwright.sync_api import sync_playwright

url = "https://grail-app.com/"
out_dir = r"C:\Users\Edward Magejo\.gemini\antigravity\brain\c38161f9-4a6f-468b-ab53-043340eb2182"

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
    context = browser.new_context(viewport={"width": 1440, "height": 950})
    page = context.new_page()

    requests_log = []
    page.on("request", lambda r: requests_log.append({
        "url": r.url,
        "resource_type": r.resource_type
    }))

    print(f"Navigating to {url} ...")
    try:
        page.goto(url, wait_until='networkidle', timeout=30000)
    except Exception as e:
        print(f"Navigation note: {e}")

    page.wait_for_timeout(3000)

    # Take full page and viewport screenshots
    page.screenshot(path=os.path.join(out_dir, "grail_hero.png"))
    page.screenshot(path=os.path.join(out_dir, "grail_full.png"), full_page=True)
    print("Screenshots captured!")

    # Extract Page Metadata, Tech Stack, Fonts, Scripts, CSS Libraries
    analysis = page.evaluate('''() => {
        // Tech stack signals
        const hasFramerMotion = !!window.__framer_import || document.querySelector('[data-framer-name], [data-projection-id]');
        const hasGSAP = !!window.gsap;
        const hasLenis = !!window.lenis || !!document.querySelector('.lenis');
        const hasThree = !!window.THREE;
        const hasTailwind = Array.from(document.querySelectorAll('*')).some(el => Array.from(el.classList).some(c => c.startsWith('text-') || c.startsWith('bg-') || c.startsWith('flex-')));
        
        // Fonts
        const fonts = Array.from(document.fonts || []).map(f => f.family);

        // Meta tags
        const title = document.title;
        const description = document.querySelector('meta[name="description"]')?.content;

        // Color palette signals
        const computedBody = window.getComputedStyle(document.body);
        const bgColor = computedBody.backgroundColor;
        const color = computedBody.color;

        // Key sections and headline texts
        const headlines = Array.from(document.querySelectorAll('h1, h2, h3')).map(h => ({
            tag: h.tagName,
            text: h.textContent.trim().replace(/\\s+/g, ' '),
            fontSize: window.getComputedStyle(h).fontSize,
            fontFamily: window.getComputedStyle(h).fontFamily,
            fontWeight: window.getComputedStyle(h).fontWeight,
            letterSpacing: window.getComputedStyle(h).letterSpacing,
            lineHeight: window.getComputedStyle(h).lineHeight
        }));

        // Layout structures
        const structuralElements = Array.from(document.querySelectorAll('section, main, [class*="hero"], [class*="card"], [class*="feature"], [class*="grid"], [class*="bento"]')).map(el => ({
            tag: el.tagName,
            classes: Array.from(el.classList),
            id: el.id
        }));

        return {
            title,
            description,
            tech: { hasFramerMotion: !!hasFramerMotion, hasGSAP, hasLenis, hasThree, hasTailwind },
            fonts: Array.from(new Set(fonts)),
            theme: { bgColor, color },
            headlines: headlines.slice(0, 15),
            structureCount: structuralElements.length
        };
    }''')

    with open(os.path.join(out_dir, "grail_analysis.json"), "w", encoding="utf-8") as f:
        json.dump(analysis, f, indent=2)

    # Save HTML
    html = page.content()
    with open(os.path.join(out_dir, "grail_dump.html"), "w", encoding="utf-8") as f:
        f.write(html)
    print(f"Saved {len(html)} chars of HTML.")

    browser.close()
    print("Reverse engineering scrape completed successfully!")
