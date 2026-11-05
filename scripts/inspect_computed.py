import asyncio
from playwright.async_api import async_playwright

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch(
            headless=True,
            args=[
                '--disable-background-timer-throttling',
                '--disable-renderer-backgrounding',
                '--use-gl=angle',
                '--use-angle=d3d11',
            ]
        )
        page = await browser.new_page(viewport={'width': 1440, 'height': 900})
        await page.goto('http://localhost:3000', wait_until='networkidle')
        await page.wait_for_timeout(4000)

        # Inspect .is-svg.is-f
        info = await page.evaluate('''() => {
            const el = document.querySelector('.is-svg.is-f');
            if (!el) return { found: false };
            const cs = window.getComputedStyle(el);
            const img = el.querySelector('img');
            const imgCs = img ? window.getComputedStyle(img) : null;
            const rect = el.getBoundingClientRect();
            return {
                found: true,
                rect: { top: rect.top, left: rect.left, width: rect.width, height: rect.height },
                display: cs.display,
                visibility: cs.visibility,
                opacity: cs.opacity,
                zIndex: cs.zIndex,
                position: cs.position,
                parent: el.parentElement ? el.parentElement.className : null,
                parentRect: el.parentElement ? el.parentElement.getBoundingClientRect() : null,
                imgSrc: img ? img.src : null,
                imgDisplay: imgCs ? imgCs.display : null,
                imgVisibility: imgCs ? imgCs.visibility : null,
                imgOpacity: imgCs ? imgCs.opacity : null,
                imgNaturalWidth: img ? img.naturalWidth : 0,
                imgNaturalHeight: img ? img.naturalHeight : 0,
            };
        }''')
        print("is_f info:", info)

        # Also inspect .footer-illu
        finfo = await page.evaluate('''() => {
            const el = document.querySelector('.footer-illu');
            if (!el) return { found: false };
            const cs = window.getComputedStyle(el);
            const rect = el.getBoundingClientRect();
            return {
                found: true,
                display: cs.display,
                visibility: cs.visibility,
                rect: { top: rect.top, left: rect.left, width: rect.width, height: rect.height }
            };
        }''')
        print("footer_illu info:", finfo)

        await browser.close()

asyncio.run(run())
