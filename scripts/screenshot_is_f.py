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
        page = await browser.new_page(viewport={'width': 1440, 'height': 1200})
        await page.goto('http://localhost:3000', wait_until='networkidle')
        await page.wait_for_timeout(4000)

        # Screenshot .is-svg.is-f
        is_f = await page.query_selector('.is-svg.is-f')
        if is_f:
            await is_f.screenshot(path='current_is_f.png')
            print("Captured current_is_f.png")

        # Full page top
        await page.screenshot(path='current_top_nav.png')
        print("Captured current_top_nav.png")

        await browser.close()

asyncio.run(run())
