import os
import base64
from io import BytesIO
from PIL import Image

def generate_artifact():
    # 1. Base64 encode the new OG image
    og_img = Image.open('public/og-image.webp')
    buf_og = BytesIO()
    og_img.save(buf_og, format='WEBP', quality=85)
    b64_og = base64.b64encode(buf_og.getvalue()).decode('utf-8')
    data_og = f"data:image/webp;base64,{b64_og}"

    # 2. Base64 encode the old Webflow MECHA card if exists
    data_old = ""
    if os.path.exists('scripts/webflow_og.png'):
        old_img = Image.open('scripts/webflow_og.png')
        buf_old = BytesIO()
        old_img.save(buf_old, format='WEBP', quality=80)
        b64_old = base64.b64encode(buf_old.getvalue()).decode('utf-8')
        data_old = f"data:image/webp;base64,{b64_old}"

    # 3. Base64 encode the favicon at 512 and 180
    fav_512 = Image.open('public/icon-512.png')
    buf_512 = BytesIO()
    fav_512.save(buf_512, format='PNG')
    b64_512 = base64.b64encode(buf_512.getvalue()).decode('utf-8')
    data_512 = f"data:image/png;base64,{b64_512}"

    fav_180 = Image.open('public/apple-touch-icon.png')
    buf_180 = BytesIO()
    fav_180.save(buf_180, format='PNG')
    b64_180 = base64.b64encode(buf_180.getvalue()).decode('utf-8')
    data_180 = f"data:image/png;base64,{b64_180}"

    fav_32 = Image.open('public/favicon-32x32.png')
    buf_32 = BytesIO()
    fav_32.save(buf_32, format='PNG')
    b64_32 = base64.b64encode(buf_32.getvalue()).decode('utf-8')
    data_32 = f"data:image/png;base64,{b64_32}"

    artifact_md = f"""# Samaria Tech — Social Share Card (Open Graph) & Sovereign Favicon Suite

> [!NOTE]
> All legacy Webflow **"MECHA"** template social cards and favicons have been completely replaced with authentic **Samaria Tech Sovereign Gold branding**.
> When you share `samariatech.com` on Twitter/X, LinkedIn, WhatsApp, iMessage, Facebook, or Slack, crawlers now fetch the bespoke 1200×630 landscape card with the 3D Gold Sovereign Coin, verified systems portfolio, and custom typography.

---

## 1. Social Media Share Card (1200×630)

### New Official Samaria Tech Card (`/og-image.png` & `/og-image.webp`)
![Samaria Tech Official Social Share Card]({data_og})

* **Dimensions**: 1200 × 630 px (Standard Open Graph & Twitter Summary Large Image).
* **Visual Anchor**: 3D Sovereign Gold Coin with ambient occlusion, gold rim reflections, and depth shadow.
* **Header Pill**: `SAMARIA TECH — ENGINEERING & SYSTEMS`
* **Headline**: *"Modern software powers the real economy."*
* **Flagship Portfolio Chips**:
  * `HEMS · Ambulance Telemetry`
  * `Kinetic · Video AI Engine`
  * `Bambino · 3D WebGL World`
* **Domain Tag**: `samariatech.com — Custom Web Platforms & Distributed Systems`

---

## 2. Before & After Social Unfurl Comparison

````carousel
### AFTER: Samaria Tech Sovereign Brand Card
![Samaria Tech Social Card]({data_og})
<!-- slide -->
### BEFORE: Legacy Webflow Template Card ("MECHA")
![Legacy Webflow Template Card]({data_old})
````

---

## 3. Samaria Sovereign Favicon Suite

All legacy "M" / "MECHA" square icons have been replaced with the high-resolution Samaria Sovereign Gold Coin seal across all standard device sizes:

| Format / Device | Size | Preview | Path |
| :--- | :--- | :--- | :--- |
| **PWA & Android High-Res** | 512×512 px | <img src="{data_512}" width="64" height="64" alt="512px icon" /> | `/icon-512.png` |
| **Apple Touch Icon (iOS)** | 180×180 px | <img src="{data_180}" width="48" height="48" alt="Apple Touch Icon" /> | `/apple-touch-icon.png` |
| **Desktop Browser Tabs** | 32×32 px | <img src="{data_32}" width="32" height="32" alt="32px Tab Icon" /> | `/favicon-32x32.png` & `/favicon.ico` |
| **Standard ICO** | Multi-res (16/32/48/64) | — | `/favicon.ico` & `src/app/favicon.ico` |

---

## 4. Metadata Configuration Summary

### Route Handler Injection (`src/templates/home.html` & `src/templates/scope.html`):
```html
<meta property="og:image" content="https://samariatech.com/og-image.png"/>
<meta property="og:image:width" content="1200"/>
<meta property="og:image:height" content="630"/>
<meta property="og:image:type" content="image/png"/>
<meta property="og:site_name" content="Samaria Tech"/>
<meta property="og:url" content="https://samariatech.com/"/>
<meta property="og:type" content="website"/>
<meta name="twitter:card" content="summary_large_image"/>
<meta name="twitter:site" content="@SamariaTech"/>
<meta name="twitter:title" content="Samaria Tech | Web Development, Software &amp; Tech Solutions"/>
<meta name="twitter:description" content="Samaria Tech builds high-performance websites, custom web applications, and practical tech solutions for businesses."/>
<meta name="twitter:image" content="https://samariatech.com/og-image.png"/>
<link href="/favicon.ico" rel="shortcut icon" type="image/x-icon"/>
<link href="/favicon-32x32.png" rel="icon" sizes="32x32" type="image/png"/>
<link href="/apple-touch-icon.png" rel="apple-touch-icon" sizes="180x180"/>
<link href="/icon-512.png" rel="icon" sizes="512x512" type="image/png"/>
```

### Next.js App Router Metadata (`src/app/layout.tsx`):
Synchronized with matching 1200×630 `openGraph.images` and `twitter.images` pointing to `/og-image.png`.
"""

    artifact_dir = r"C:\Users\Edward Magejo\.gemini\antigravity\brain\c38161f9-4a6f-468b-ab53-043340eb2182"
    artifact_path = os.path.join(artifact_dir, "remote_social_card_and_favicon_preview.md")
    with open(artifact_path, "w", encoding="utf-8") as f:
        f.write(artifact_md)

    print(f"Artifact written successfully to: {artifact_path} ({len(artifact_md)} bytes)")

if __name__ == "__main__":
    generate_artifact()
