import asyncio
from playwright.async_api import async_playwright

async def generate_previews():
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
        
        # We test both options:
        # Option 1: /assets/coin/coin_front.png (Obsidian & Gold Technical Seal)
        # Option 2: /assets/coin/sovereign_diffuse.png (22K Gold Minted Sovereign)

        for opt_name, img_src in [
            ('option_1_obsidian_gold', '/assets/coin/coin_front.png'),
            ('option_2_22k_minted_gold', '/assets/coin/sovereign_diffuse.png')
        ]:
            page = await browser.new_page(viewport={'width': 1440, 'height': 900})
            await page.goto('http://localhost:3000', wait_until='networkidle')
            await page.wait_for_timeout(3500)

            # Inject the replacement and styles into the live page
            await page.evaluate(f'''() => {{
                // Replace in sidebar
                const isF = document.querySelector('.is-svg.is-f');
                if (isF) {{
                    isF.style.transform = 'none';
                    isF.style.display = 'flex';
                    isF.style.justifyContent = 'center';
                    isF.style.alignItems = 'center';
                    isF.style.paddingBottom = '24px';
                    isF.style.position = 'absolute';
                    isF.style.bottom = '0';
                    isF.style.left = '0';
                    isF.style.right = '0';
                    const img = isF.querySelector('img');
                    if (img) {{
                        img.src = '{img_src}';
                        img.removeAttribute('srcset');
                        img.style.width = '160px';
                        img.style.height = '160px';
                        img.style.aspectRatio = '1 / 1';
                        img.style.objectFit = 'contain';
                        img.style.filter = 'drop-shadow(0 12px 30px rgba(212, 175, 55, 0.15))';
                    }}
                }}

                // Replace in footer
                const footerIllu = document.querySelector('.footer-illu');
                if (footerIllu) {{
                    footerIllu.style.display = 'flex';
                    footerIllu.style.justifyContent = 'center';
                    footerIllu.style.alignItems = 'center';
                    footerIllu.style.marginTop = '4rem';
                    footerIllu.style.marginBottom = '4rem';
                    const fImg = footerIllu.querySelector('img');
                    if (fImg) {{
                        fImg.src = '{img_src}';
                        fImg.removeAttribute('srcset');
                        fImg.style.width = '300px';
                        fImg.style.height = '300px';
                        fImg.style.aspectRatio = '1 / 1';
                        fImg.style.objectFit = 'contain';
                        fImg.style.filter = 'drop-shadow(0 20px 45px rgba(212, 175, 55, 0.22))';
                    }}
                }}
            }}''')

            await page.wait_for_timeout(1000)

            # 1. Capture Hero / Sidebar view
            await page.screenshot(
                path=f'C:/Users/Edward Magejo/.gemini/antigravity/brain/c38161f9-4a6f-468b-ab53-043340eb2182/preview_seal_{opt_name}_hero.png'
            )
            print(f"Captured {opt_name} hero")

            # 2. Scroll to footer and capture Footer view
            await page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
            await page.wait_for_timeout(1500)

            await page.screenshot(
                path=f'C:/Users/Edward Magejo/.gemini/antigravity/brain/c38161f9-4a6f-468b-ab53-043340eb2182/preview_seal_{opt_name}_footer.png'
            )
            print(f"Captured {opt_name} footer")

            # 3. Mobile viewport preview (390 x 844)
            mobile_page = await browser.new_page(viewport={'width': 390, 'height': 844})
            await mobile_page.goto('http://localhost:3000', wait_until='networkidle')
            await mobile_page.wait_for_timeout(3500)

            await mobile_page.evaluate(f'''() => {{
                const footerIllu = document.querySelector('.footer-illu');
                if (footerIllu) {{
                    footerIllu.style.display = 'flex';
                    footerIllu.style.justifyContent = 'center';
                    footerIllu.style.alignItems = 'center';
                    footerIllu.style.marginTop = '3rem';
                    footerIllu.style.marginBottom = '3rem';
                    const fImg = footerIllu.querySelector('img');
                    if (fImg) {{
                        fImg.src = '{img_src}';
                        fImg.removeAttribute('srcset');
                        fImg.style.width = '200px';
                        fImg.style.height = '200px';
                        fImg.style.aspectRatio = '1 / 1';
                        fImg.style.objectFit = 'contain';
                        fImg.style.filter = 'drop-shadow(0 15px 35px rgba(212, 175, 55, 0.2))';
                    }}
                }}
            }}''')
            await mobile_page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
            await mobile_page.wait_for_timeout(1000)
            await mobile_page.screenshot(
                path=f'C:/Users/Edward Magejo/.gemini/antigravity/brain/c38161f9-4a6f-468b-ab53-043340eb2182/preview_seal_{opt_name}_mobile_footer.png'
            )
            print(f"Captured {opt_name} mobile footer")
            await mobile_page.close()

            await page.close()

        await browser.close()

asyncio.run(generate_previews())
