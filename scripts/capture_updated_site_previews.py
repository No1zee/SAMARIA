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
        page = await browser.new_page(viewport={'width': 1440, 'height': 900})
        await page.goto('http://localhost:3000', wait_until='networkidle')
        await page.wait_for_timeout(2000)

        # 1. Projects Section - HEMS Card
        p1 = page.locator('.samaria-project-row').nth(0)
        await p1.scroll_into_view_if_needed()
        await page.wait_for_timeout(600)
        hems_path = 'public/previews/hems_project_card.png'
        await p1.screenshot(path=hems_path)
        print("Captured HEMS project card")

        # 2. Projects Section - Kinetic Card
        p2 = page.locator('.samaria-project-row').nth(1)
        await p2.scroll_into_view_if_needed()
        await page.wait_for_timeout(600)
        kinetic_path = 'public/previews/kinetic_project_card.png'
        await p2.screenshot(path=kinetic_path)
        print("Captured Kinetic project card")

        # 3. Team Section
        teams = page.locator('#teams')
        await teams.scroll_into_view_if_needed()
        await page.wait_for_timeout(1000)
        team_path = 'public/previews/team_credentials_card.png'
        await teams.screenshot(path=team_path)
        print("Captured Team section")

        # 4. Mobile View of Team
        m_page = await browser.new_page(viewport={'width': 390, 'height': 844})
        await m_page.goto('http://localhost:3000', wait_until='networkidle')
        await m_page.wait_for_timeout(1500)
        m_teams = m_page.locator('#teams')
        await m_teams.scroll_into_view_if_needed()
        await m_page.wait_for_timeout(800)
        m_team_path = 'public/previews/mobile_team_section.png'
        await m_teams.screenshot(path=m_team_path)
        print("Captured Mobile Team section")

        await browser.close()

    # Generate remote preview artifact
    hems_b64 = img_to_base64_webp(hems_path)
    kinetic_b64 = img_to_base64_webp(kinetic_path)
    team_b64 = img_to_base64_webp(team_path)
    m_team_b64 = img_to_base64_webp(m_team_path)

    artifact_path = r'C:\Users\Edward Magejo\.gemini\antigravity\brain\c38161f9-4a6f-468b-ab53-043340eb2182\remote_projects_and_team_preview.md'

    md = f"""# Updated Projects (HEMS & Kinetic) & Team Credentials Preview

This artifact renders verified visual captures directly in your remote Antigravity window.

---

## 1. Project 01: HEMS (Replaced Apex Web Platform)
- **Title**: HEMS
- **Tags**: Emergency Telemetry · Mobile & Cloud
- **Description**: A mission-critical emergency ambulance monitoring and telemetry platform. Features sub-minute GPS tracking, ruggedized Android hardware integration, offline-first mobile sync, and a real-time dispatch operations console.
- **Media**: Live Apple-native Emergency Ambulance Monitoring console screenshot (`/assets/projects/hems_console.webp`).

<div align="center" style="margin: 1.5rem 0;">
  <img src="{hems_b64}" alt="HEMS Project Card" style="max-width: 900px; width: 100%; border-radius: 12px; border: 1px solid rgba(255,255,255,0.15); box-shadow: 0 16px 36px rgba(0,0,0,0.5);" />
</div>

---

## 2. Project 02: Kinetic (Replaced PAWS Application)
- **Title**: Kinetic
- **Tags**: Computer Vision · AI Automation
- **Description**: An autonomous, high-performance video extraction engine designed for automated sports highlights. Combines real-time audio spike detection, multimodal Gemini Vision confirmation, and sub-second video segmentation.
- **Media**: High-resolution sports broadcast computer vision intelligence frame (`/assets/projects/kinetic_clipper.webp`).

<div align="center" style="margin: 1.5rem 0;">
  <img src="{kinetic_b64}" alt="Kinetic Project Card" style="max-width: 900px; width: 100%; border-radius: 12px; border: 1px solid rgba(255,255,255,0.15); box-shadow: 0 16px 36px rgba(0,0,0,0.5);" />
</div>

---

## 3. Team Section: Verified Credentials & Disciplines
- **Edward Magejo**:
  - **Credentials**: Holds a BSc in Information Systems.
  - **Role**: Founding Partner · Lead Solutions Architect & Full-Stack Engineer.
- **Divine Mwale**:
  - **Credentials**: Holds a BSc in Software Engineering.
  - **Role**: Founding Partner · Full-Stack Engineer & Designer.
- **Munashe Simango**:
  - **Credentials**: Holds an LLB.
  - **Role**: Founding Partner · Compliance & Data Protection.

<div align="center" style="margin: 1.5rem 0;">
  <img src="{team_b64}" alt="Team Section Desktop" style="max-width: 900px; width: 100%; border-radius: 12px; border: 1px solid rgba(255,255,255,0.15); box-shadow: 0 16px 36px rgba(0,0,0,0.5);" />
</div>

<div align="center" style="margin: 1.5rem 0;">
  <img src="{m_team_b64}" alt="Team Section Mobile" style="max-width: 390px; width: 100%; border-radius: 12px; border: 1px solid rgba(255,255,255,0.15); box-shadow: 0 16px 36px rgba(0,0,0,0.5);" />
  <p style="font-size: 0.85rem; color: #888; margin-top: 0.5rem;">Mobile accordion rendering displaying updated titles, degrees, and discipline breakdowns.</p>
</div>
"""

    with open(artifact_path, 'w', encoding='utf-8') as f:
        f.write(md)

    print("Created remote_projects_and_team_preview.md successfully!")

if __name__ == '__main__':
    asyncio.run(main())
