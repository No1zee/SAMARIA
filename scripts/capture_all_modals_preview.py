import asyncio
from playwright.async_api import async_playwright
import os
import base64
from io import BytesIO
from PIL import Image

def img_to_base64_webp(path, max_dim=1000, quality=82):
    with Image.open(path) as img:
        img = img.convert('RGB')
        w, h = img.size
        if max(w, h) > max_dim:
            ratio = max_dim / max(w, h)
            img = img.resize((int(w * ratio), int(h * ratio)), Image.Resampling.LANCZOS)
        buf = BytesIO()
        img.save(buf, format='WEBP', quality=quality)
        b64 = base64.b64encode(buf.getvalue()).decode('utf-8')
        return f"data:image/webp;base64,{b64}"

async def main():
    os.makedirs('public/previews', exist_ok=True)
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        # 1440x900 desktop viewport
        page = await browser.new_page(viewport={'width': 1440, 'height': 900})
        await page.goto('http://localhost:3000', wait_until='networkidle')
        await page.wait_for_timeout(2000)

        # 1. Open HEMS modal
        await page.evaluate("window.openProjectModal(0)")
        await page.wait_for_timeout(1000)
        hems_modal_path = 'public/previews/modal_hems_deep_dive.png'
        await page.screenshot(path=hems_modal_path)
        print("Captured HEMS modal")

        # 2. Switch to Kinetic modal via Next button
        await page.evaluate("window.openProjectModal(1)")
        await page.wait_for_timeout(1000)
        kinetic_modal_path = 'public/previews/modal_kinetic_deep_dive.png'
        await page.screenshot(path=kinetic_modal_path)
        print("Captured Kinetic modal")

        # 3. Switch to Bambino modal via Next button
        await page.evaluate("window.openProjectModal(2)")
        await page.wait_for_timeout(1000)
        bambino_modal_path = 'public/previews/modal_bambino_deep_dive.png'
        await page.screenshot(path=bambino_modal_path)
        print("Captured Bambino modal")

        # 4. Capture Mobile view of Bambino modal
        m_page = await browser.new_page(viewport={'width': 390, 'height': 844})
        await m_page.goto('http://localhost:3000', wait_until='networkidle')
        await m_page.wait_for_timeout(1500)
        await m_page.evaluate("window.openProjectModal(0)")
        await m_page.wait_for_timeout(1000)
        mobile_modal_path = 'public/previews/modal_mobile_hems.png'
        await m_page.screenshot(path=mobile_modal_path)
        print("Captured Mobile HEMS modal")

        await browser.close()

    # Generate remote preview markdown artifact
    hems_b64 = img_to_base64_webp(hems_modal_path)
    kinetic_b64 = img_to_base64_webp(kinetic_modal_path)
    bambino_b64 = img_to_base64_webp(bambino_modal_path)
    mobile_b64 = img_to_base64_webp(mobile_modal_path)

    artifact_path = r'C:\Users\Edward Magejo\.gemini\antigravity\brain\c38161f9-4a6f-468b-ab53-043340eb2182\remote_case_study_modals_preview.md'

    md = f"""# Interactive Case Study Modals Preview: HEMS, Kinetic & Bambino

This artifact renders verified visual captures directly in your remote Antigravity window.

---

## 1. Project 01: HEMS — Emergency Telemetry Platform
- **Tagline**: *"When every second counts, WhatsApp voice notes don't cut it."*
- **The Hassle**: Real-world breakdown of emergency fleets operating on radio static and guesswork in emerging markets.
- **The Engine**: Rugged Blackview BV7300 Android hardware tracking GPS fixes every 10 meters, offline SQLite queue, and an Apple-native dispatch console.
- **The Win**: 98%+ tracked shift uptime, zero lost GPS points even in dead zones, <40s triage awareness.

<div align="center" style="margin: 1.5rem 0;">
  <img src="{hems_b64}" alt="HEMS Case Study Modal" style="max-width: 900px; width: 100%; border-radius: 12px; border: 1px solid rgba(255,255,255,0.15); box-shadow: 0 16px 36px rgba(0,0,0,0.5);" />
</div>

---

## 2. Project 02: Kinetic — Autonomous Sports Highlight Engine
- **Tagline**: *"Sports highlights delivered while the stadium is still cheering."*
- **The Hassle**: Eliminates video editors suffering through 90 minutes of raw footage just to clip a goal 20 minutes after social media has moved on.
- **The Engine**: Real-time crowd roar audio spike scan (FFmpeg ebur128), Gemini Vision scoreboard snipe (99.8% confidence), and sub-second surgical cuts.
- **The Win**: Under 12s turnaround from live pitch event to published clip, automated 9:16 vertical viral formatting.

<div align="center" style="margin: 1.5rem 0;">
  <img src="{kinetic_b64}" alt="Kinetic Case Study Modal" style="max-width: 900px; width: 100%; border-radius: 12px; border: 1px solid rgba(255,255,255,0.15); box-shadow: 0 16px 36px rgba(0,0,0,0.5);" />
</div>

---

## 3. Project 03: Bambino — Interactive 3D Festival & World Map
- **Tagline**: *"Ditching flat PDF event maps for an interactive 3D digital twin."*
- **The Hassle**: Solves the nightmare of static, unreadable PDF festival maps that leave thousands of families lost across sprawling acres.
- **The Engine**: Custom Three.js 3D isometric terrain, interactive attraction hotspots, ambient spatial soundscapes, and an instant booking wizard.
- **The Win**: 60 FPS mobile WebGL rendering, 0% lost attendees, instant ticket bookings directly from the 3D map.

<div align="center" style="margin: 1.5rem 0;">
  <img src="{bambino_b64}" alt="Bambino Case Study Modal" style="max-width: 900px; width: 100%; border-radius: 12px; border: 1px solid rgba(255,255,255,0.15); box-shadow: 0 16px 36px rgba(0,0,0,0.5);" />
</div>

---

## 4. Mobile Viewport: Seamless Responsive Drawer
- Complete touch-optimized vertical scroll with sticky close button, smooth backdrop fader, and Prev / Next navigation.

<div align="center" style="margin: 1.5rem 0;">
  <img src="{mobile_b64}" alt="Mobile Case Study Modal" style="max-width: 390px; width: 100%; border-radius: 12px; border: 1px solid rgba(255,255,255,0.15); box-shadow: 0 16px 36px rgba(0,0,0,0.5);" />
</div>
"""

    with open(artifact_path, 'w', encoding='utf-8') as f:
        f.write(md)

    print("Created remote_case_study_modals_preview.md successfully!")

if __name__ == '__main__':
    asyncio.run(main())
