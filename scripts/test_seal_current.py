import asyncio
from playwright.async_api import async_playwright

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch(
            headless=True,
            args=[
                '--disable-background-timer-throttling',
                '--disable-renderer-backgrounding',
                '--disable-backgrounding-occluded-windows',
                '--use-gl=angle',
                '--use-angle=d3d11',
            ]
        )
        page = await browser.new_page(viewport={'width': 1440, 'height': 900})
        await page.goto('http://localhost:3000', wait_until='networkidle')
        await page.wait_for_timeout(4000)

        # Check visibility and bounding box of .footer-illu
        footer_illu = await page.query_selector('.footer-illu')
        if footer_illu:
            box = await footer_illu.bounding_box()
            is_vis = await footer_illu.is_visible()
            print(f".footer-illu visible: {is_vis}, box: {box}")

        # Check .is-svg.is-f
        is_f = await page.query_selector('.is-svg.is-f')
        if is_f:
            box = await is_f.bounding_box()
            is_vis = await is_f.is_visible()
            print(f".is-svg.is-f visible: {is_vis}, box: {box}")

        # Scroll to footer
        await page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
        await page.wait_for_timeout(2000)
        
        await page.screenshot(path='current_footer.png')
        print("Captured current_footer.png")

        await browser.close()

asyncio.run(run())
