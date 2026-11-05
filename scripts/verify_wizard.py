import asyncio
from playwright.async_api import async_playwright

async def verify_wizard():
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
        await page.goto('http://localhost:3000/scope', wait_until='networkidle')
        await page.wait_for_timeout(1500)

        # 1. Screenshot Step 01 (Platform)
        await page.screenshot(
            path=r'C:\Users\Edward Magejo\.gemini\antigravity\brain\c38161f9-4a6f-468b-ab53-043340eb2182\wizard_step_1_platform.png'
        )
        print("Captured step 1")

        # Select Full-Stack SaaS and click proceed
        await page.click('[data-platform="fullstack-saas"]')
        await page.wait_for_timeout(500)
        await page.click('[data-next-step="2"]')
        await page.wait_for_timeout(1000)

        # 2. Screenshot Step 02 (Capabilities)
        await page.screenshot(
            path=r'C:\Users\Edward Magejo\.gemini\antigravity\brain\c38161f9-4a6f-468b-ab53-043340eb2182\wizard_step_2_capabilities.png'
        )
        print("Captured step 2")

        # Select WebSockets and AI Pipeline, proceed
        await page.click('[data-capability="websockets"]')
        await page.wait_for_timeout(300)
        await page.click('[data-capability="ai-pipeline"]')
        await page.wait_for_timeout(300)
        await page.click('[data-next-step="3"]')
        await page.wait_for_timeout(1000)

        # 3. Screenshot Step 03 (Velocity)
        await page.screenshot(
            path=r'C:\Users\Edward Magejo\.gemini\antigravity\brain\c38161f9-4a6f-468b-ab53-043340eb2182\wizard_step_3_velocity.png'
        )
        print("Captured step 3")

        # Select Production Flagship and proceed
        await page.click('[data-velocity="production"]')
        await page.wait_for_timeout(300)
        await page.click('[data-next-step="4"]')
        await page.wait_for_timeout(1000)

        # 4. Screenshot Step 04 (Specification review)
        await page.screenshot(
            path=r'C:\Users\Edward Magejo\.gemini\antigravity\brain\c38161f9-4a6f-468b-ab53-043340eb2182\wizard_step_4_specification.png'
        )
        print("Captured step 4")

        await page.close()

        # 5. Mobile responsive screenshot (390 x 844)
        mobile_page = await browser.new_page(viewport={'width': 390, 'height': 844})
        await mobile_page.goto('http://localhost:3000/scope', wait_until='networkidle')
        await mobile_page.wait_for_timeout(1500)
        await mobile_page.screenshot(
            path=r'C:\Users\Edward Magejo\.gemini\antigravity\brain\c38161f9-4a6f-468b-ab53-043340eb2182\wizard_mobile_view.png'
        )
        print("Captured mobile wizard view")
        await mobile_page.close()

        await browser.close()

asyncio.run(verify_wizard())
