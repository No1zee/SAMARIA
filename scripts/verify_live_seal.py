import asyncio
from playwright.async_api import async_playwright

async def verify():
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

        # 1. Desktop Test
        page = await browser.new_page(viewport={'width': 1440, 'height': 900})
        await page.goto('http://localhost:3000', wait_until='networkidle')
        await page.wait_for_timeout(3500)

        # Capture desktop Hero/Sidebar
        await page.screenshot(
            path=r'C:\Users\Edward Magejo\.gemini\antigravity\brain\c38161f9-4a6f-468b-ab53-043340eb2182\live_seal_desktop_sidebar.png'
        )
        print("Captured live_seal_desktop_sidebar.png")

        # Scroll to bottom to view footer
        await page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
        await page.wait_for_timeout(2000)

        await page.screenshot(
            path=r'C:\Users\Edward Magejo\.gemini\antigravity\brain\c38161f9-4a6f-468b-ab53-043340eb2182\live_seal_desktop_footer.png'
        )
        print("Captured live_seal_desktop_footer.png")
        await page.close()

        # 2. Mobile Test (390 x 844)
        mobile_page = await browser.new_page(viewport={'width': 390, 'height': 844})
        await mobile_page.goto('http://localhost:3000', wait_until='networkidle')
        await mobile_page.wait_for_timeout(3500)

        # Capture mobile header (with new S icon)
        await mobile_page.screenshot(
            path=r'C:\Users\Edward Magejo\.gemini\antigravity\brain\c38161f9-4a6f-468b-ab53-043340eb2182\live_seal_mobile_header.png'
        )
        print("Captured live_seal_mobile_header.png")

        # Scroll to mobile footer
        await mobile_page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
        await mobile_page.wait_for_timeout(2000)

        await mobile_page.screenshot(
            path=r'C:\Users\Edward Magejo\.gemini\antigravity\brain\c38161f9-4a6f-468b-ab53-043340eb2182\live_seal_mobile_footer.png'
        )
        print("Captured live_seal_mobile_footer.png")
        await mobile_page.close()

        await browser.close()

asyncio.run(verify())
