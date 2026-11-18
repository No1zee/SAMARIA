import os
import math
from PIL import Image, ImageDraw, ImageFont, ImageFilter, ImageEnhance
import numpy as np

W, H = 2400, 1260  # Render at 2x for razor-sharp downsampling to 1200x630

# 1. Base Dark Canvas with subtle radial gradient
card = Image.new('RGBA', (W, H), (11, 14, 20, 255))
draw = ImageDraw.Draw(card)

# Create radial glow background centered around the coin position (X=480, Y=630)
glow = Image.new('RGBA', (W, H), (0, 0, 0, 0))
glow_draw = ImageDraw.Draw(glow)
center_x, center_y = 480, 630
max_r = 750

for r in range(max_r, 0, -15):
    alpha = int(24 * (1.0 - (r / max_r) ** 1.5))
    # warm amber/gold atmospheric glow
    glow_draw.ellipse(
        [center_x - r, center_y - r, center_x + r, center_y + r],
        fill=(212, 175, 55, alpha)
    )

card = Image.alpha_composite(card, glow)
draw = ImageDraw.Draw(card)

# Subtle background tech grid lines
grid_color = (255, 255, 255, 6)
for x in range(0, W, 80):
    draw.line([(x, 0), (x, H)], fill=grid_color, width=1)
for y in range(0, H, 80):
    draw.line([(0, y), (W, y)], fill=grid_color, width=1)

# Outer subtle border with soft corner highlight
draw.rectangle([(24, 24), (W - 24, H - 24)], outline=(255, 255, 255, 22), width=2)
draw.rectangle([(26, 26), (W - 26, H - 26)], outline=(212, 175, 55, 30), width=1)

# 2. Add the 3D Sovereign Gold Coin on the Left
coin_path = 'public/assets/coin/sovereign_diffuse.png'
coin_img = Image.open(coin_path).convert('RGBA')

# Crop to non-transparent bounding box
bbox = coin_img.getbbox()
coin_cropped = coin_img.crop(bbox)

# Enhance contrast and gold punch
enhancer = ImageEnhance.Sharpness(coin_cropped)
coin_enhanced = enhancer.enhance(1.25)
color_enh = ImageEnhance.Color(coin_enhanced)
coin_enhanced = color_enh.enhance(1.1)

# Scale coin to target height in 2x canvas (e.g. 780x780)
coin_size = 780
coin_scaled = coin_enhanced.resize((coin_size, coin_size), Image.Resampling.LANCZOS)

# Create realistic soft drop shadow behind the coin
shadow = Image.new('RGBA', (coin_size + 140, coin_size + 140), (0, 0, 0, 0))
shadow_draw = ImageDraw.Draw(shadow)
shadow_draw.ellipse([50, 50, coin_size + 90, coin_size + 90], fill=(0, 0, 0, 160))
shadow = shadow.filter(ImageFilter.GaussianBlur(36))

# Paste shadow then coin
coin_x = 100
coin_y = (H - coin_size) // 2

card.paste(shadow, (coin_x - 70, coin_y - 50), shadow)
card.paste(coin_scaled, (coin_x, coin_y), coin_scaled)

# 3. Typography on the Right
text_x = 980

# Load fonts
try:
    font_badge = ImageFont.truetype('C:/Windows/Fonts/segoeuib.ttf', 28)
    font_h1 = ImageFont.truetype('C:/Windows/Fonts/segoeuib.ttf', 76)
    font_desc = ImageFont.truetype('C:/Windows/Fonts/segoeui.ttf', 38)
    font_mono = ImageFont.truetype('C:/Windows/Fonts/consola.ttf', 30)
    font_footer = ImageFont.truetype('C:/Windows/Fonts/segoeuib.ttf', 32)
except Exception:
    font_badge = font_h1 = font_desc = font_mono = font_footer = ImageFont.load_default()

# 3a. Brand Eyebrow Badge: "SAMARIA TECH — SOVEREIGN SOFTWARE"
badge_text = "SAMARIA TECH"
badge_sub = "ENGINEERING & SYSTEMS"
badge_y = 230

# Badge pill outline
badge_w = 480
badge_h = 58
draw.rounded_rectangle(
    [(text_x, badge_y), (text_x + badge_w, badge_y + badge_h)],
    radius=29,
    outline=(212, 175, 55, 90),
    fill=(212, 175, 55, 18),
    width=2
)
draw.text((text_x + 28, badge_y + 12), badge_text, font=font_badge, fill=(212, 175, 55, 255))
draw.text((text_x + 225, badge_y + 13), "—", font=font_badge, fill=(255, 255, 255, 80))
draw.text((text_x + 255, badge_y + 13), badge_sub, font=ImageFont.truetype('C:/Windows/Fonts/segoeui.ttf', 24), fill=(240, 240, 240, 200))

# 3b. Bold Headline
h1_line1 = "Modern software powers"
h1_line2 = "the real economy."
draw.text((text_x, 340), h1_line1, font=font_h1, fill=(255, 255, 255, 255))
draw.text((text_x, 435), h1_line2, font=font_h1, fill=(212, 175, 55, 255))

# Thin accent line under headline
draw.line([(text_x, 560), (text_x + 1040, 560)], fill=(255, 255, 255, 30), width=2)

# 3c. Description / What We Build
desc_line1 = "High-performance web architecture, emergency telemetry,"
desc_line2 = "and mission-critical software solutions."
draw.text((text_x, 600), desc_line1, font=font_desc, fill=(180, 190, 205, 255))
draw.text((text_x, 655), desc_line2, font=font_desc, fill=(180, 190, 205, 255))

# 3d. Featured Flagship Pillars Chips
chips = [
    ("HEMS", "Ambulance Telemetry"),
    ("Kinetic", "Video AI Engine"),
    ("Bambino", "3D WebGL World")
]

chip_x = text_x
chip_y = 750
for name, tag in chips:
    # Pill box
    chip_label = f"{name}  ·  {tag}"
    # measure width approx
    pill_w = len(chip_label) * 16 + 40
    draw.rounded_rectangle(
        [(chip_x, chip_y), (chip_x + pill_w, chip_y + 54)],
        radius=12,
        outline=(255, 255, 255, 26),
        fill=(255, 255, 255, 8),
        width=1
    )
    # text
    draw.text((chip_x + 20, chip_y + 12), name, font=ImageFont.truetype('C:/Windows/Fonts/segoeuib.ttf', 26), fill=(255, 255, 255, 230))
    draw.text((chip_x + len(name) * 17 + 24, chip_y + 13), f"·  {tag}", font=ImageFont.truetype('C:/Windows/Fonts/segoeui.ttf', 24), fill=(160, 170, 185, 200))
    chip_x += pill_w + 24

# 3e. Bottom Domain Badge / URL Anchor
footer_y = 960
draw.line([(text_x, footer_y - 30), (text_x + 1040, footer_y - 30)], fill=(255, 255, 255, 20), width=1)

# Domain
draw.text((text_x, footer_y), "samariatech.com", font=font_footer, fill=(212, 175, 55, 255))
draw.text((text_x + 280, footer_y + 2), "—", font=font_footer, fill=(255, 255, 255, 60))
draw.text((text_x + 320, footer_y + 2), "Custom Web Platforms & Distributed Systems", font=ImageFont.truetype('C:/Windows/Fonts/segoeui.ttf', 28), fill=(140, 150, 165, 220))

# 4. Downscale with high-quality LANCZOS to 1200x630
final_og = card.resize((1200, 630), Image.Resampling.LANCZOS)

# Save both PNG and WEBP formats
final_og.save('public/og-image.png', 'PNG', optimize=True)
final_og.save('public/og-image.webp', 'WEBP', quality=92)
print("Saved public/og-image.png and public/og-image.webp successfully!")

# Also generate social card for Twitter
final_og.save('public/twitter-image.png', 'PNG', optimize=True)
print("Saved public/twitter-image.png successfully!")
