import asyncio
from playwright.async_api import async_playwright
import os

async def main():
    os.makedirs('public/previews', exist_ok=True)
    async with async_playwright() as p:
        # 1. Test Mobile Viewport (iPhone 13/14/15 size: 390x844)
        browser = await p.chromium.launch()
        context = await browser.new_context(
            viewport={'width': 390, 'height': 844},
            user_agent='Mozilla/5.0 (iPhone; CPU iPhone OS 16_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.5 Mobile/15E148 Safari/604.1'
        )
        page = await context.new_page()
        
        print("Navigating to mobile home page...")
        await page.goto('http://localhost:3000', wait_until='networkidle')
        await page.wait_for_timeout(2500) # Wait for preloader & Three.js canvas init

        # Verify mobile dynamic coin container and canvas
        mobile_coin = page.locator('#m-mobile-mecha-container canvas')
        is_mobile_coin_visible = await mobile_coin.is_visible()
        print(f"Mobile dynamic coin canvas visible: {is_mobile_coin_visible}")

        # Check canvas dimensions
        box = await mobile_coin.bounding_box()
        print(f"Mobile dynamic coin bounding box: {box}")

        # Capture mobile hero
        await page.screenshot(path='public/previews/mobile_hero_dynamic_coin.png')
        print("Captured mobile hero screenshot.")

        # Open mobile hamburger menu
        hamburger = page.locator('.bold-nav-full__hamburger')
        if await hamburger.is_visible():
            await hamburger.click()
            await page.wait_for_timeout(1000)
            
            # Check static coin inside nav drawer
            nav_seal = page.locator('.mobile-nav-seal img')
            is_seal_visible = await nav_seal.is_visible()
            print(f"Mobile nav drawer static seal visible: {is_seal_visible}")
            
            await page.screenshot(path='public/previews/mobile_nav_drawer_seal.png')
            print("Captured mobile nav drawer screenshot.")
        else:
            print("Hamburger button not found!")

        await context.close()

        # 2. Test Desktop Viewport (1440x900)
        desk_context = await browser.new_context(viewport={'width': 1440, 'height': 900})
        desk_page = await desk_context.new_page()
        print("\nNavigating to desktop home page...")
        await desk_page.goto('http://localhost:3000', wait_until='networkidle')
        await desk_page.wait_for_timeout(2500)

        desk_coin = desk_page.locator('#m-mecha-container canvas')
        is_desk_coin_visible = await desk_coin.is_visible()
        print(f"Desktop dynamic coin canvas visible: {is_desk_coin_visible}")

        mobile_render = desk_page.locator('.mobile-render')
        is_mobile_render_hidden = not await mobile_render.is_visible()
        print(f"Mobile render hidden on desktop: {is_mobile_render_hidden}")

        # Ensure static seal in nav is hidden on desktop
        static_seal = desk_page.locator('.mobile-nav-seal')
        is_static_hidden = not await static_seal.is_visible()
        print(f"Static seal hidden on desktop: {is_static_hidden}")

        await desk_page.screenshot(path='public/previews/desktop_sidebar_dynamic_coin.png')
        print("Captured desktop screenshot.")

        await desk_context.close()
        await browser.close()

if __name__ == '__main__':
    asyncio.run(main())
