import math
import os
from PIL import Image, ImageDraw, ImageFont, ImageFilter, ImageOps

os.makedirs('public/assets/coin', exist_ok=True)

SIZE = 1024
CENTER = SIZE // 2
RADIUS = SIZE // 2 - 24

# 1. Base Gold Palette
# Metallic brass/gold gradient
GOLD_LIGHT = (255, 230, 140)
GOLD_MID = (212, 175, 55)
GOLD_DARK = (130, 95, 25)
GOLD_DEEP = (70, 50, 15)
GOLD_BG = (28, 22, 12)

def create_radial_gradient(size, inner_color, outer_color):
    img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    max_r = size // 2
    for r in range(max_r, 0, -1):
        ratio = r / max_r
        c = tuple(int(inner_color[i] * (1 - ratio) + outer_color[i] * ratio) for i in range(3))
        draw.ellipse([size//2 - r, size//2 - r, size//2 + r, size//2 + r], fill=c)
    return img

print("Generating coin front...")
# Create Front
front = Image.new('RGBA', (SIZE, SIZE), (0, 0, 0, 0))
draw_f = ImageDraw.Draw(front)

# Base Coin Disc
draw_f.ellipse([CENTER - RADIUS, CENTER - RADIUS, CENTER + RADIUS, CENTER + RADIUS], fill=(22, 18, 12, 255))

# Outer Reeded / Notched Border Ring
for angle_deg in range(0, 360, 3):
    rad = math.radians(angle_deg)
    r1 = RADIUS - 4
    r2 = RADIUS - 20
    x1 = CENTER + r1 * math.cos(rad)
    y1 = CENTER + r1 * math.sin(rad)
    x2 = CENTER + r2 * math.cos(rad)
    y2 = CENTER + r2 * math.sin(rad)
    draw_f.line([(x1, y1), (x2, y2)], fill=(212, 175, 55, 180), width=3)

# Inner Golden Borders
draw_f.ellipse([CENTER - RADIUS + 24, CENTER - RADIUS + 24, CENTER + RADIUS - 24, CENTER + RADIUS - 24], outline=(255, 225, 120, 255), width=6)
draw_f.ellipse([CENTER - RADIUS + 34, CENTER - RADIUS + 34, CENTER + RADIUS - 34, CENTER + RADIUS - 34], outline=(140, 105, 30, 255), width=3)
draw_f.ellipse([CENTER - RADIUS + 44, CENTER - RADIUS + 44, CENTER + RADIUS - 44, CENTER + RADIUS - 44], outline=(212, 175, 55, 120), width=2)

# Concentric subtle technical grid rings
for r_offset in [120, 220, 340]:
    r = RADIUS - r_offset
    draw_f.ellipse([CENTER - r, CENTER - r, CENTER + r, CENTER + r], outline=(180, 140, 45, 60), width=1)

# Cardinal Tick Marks
for deg in [0, 90, 180, 270]:
    rad = math.radians(deg)
    x1 = CENTER + (RADIUS - 46) * math.cos(rad)
    y1 = CENTER + (RADIUS - 46) * math.sin(rad)
    x2 = CENTER + (RADIUS - 70) * math.cos(rad)
    y2 = CENTER + (RADIUS - 70) * math.sin(rad)
    draw_f.line([(x1, y1), (x2, y2)], fill=(255, 230, 140, 220), width=4)

# Place the Samaria Logo in the center
logo = Image.open('public/logo.png').convert('RGBA')
# Resize logo to fit inside inner circle (e.g. 580x580)
logo_size = 580
logo_resized = logo.resize((logo_size, logo_size), Image.Resampling.LANCZOS)

# Create a golden tint / embossed glow for the logo
logo_gold = Image.new('RGBA', (logo_size, logo_size), (255, 220, 110, 255))
logo_gold.putalpha(logo_resized.split()[-1])

# Slight drop shadow under logo
shadow = Image.new('RGBA', (SIZE, SIZE), (0, 0, 0, 0))
shadow.paste((0, 0, 0, 180), (CENTER - logo_size//2 + 8, CENTER - logo_size//2 + 10), mask=logo_resized.split()[-1])
shadow = shadow.filter(ImageFilter.GaussianBlur(8))
front = Image.alpha_composite(front, shadow)

# Composite original logo with vibrant golden highlights
front.paste(logo_resized, (CENTER - logo_size//2, CENTER - logo_size//2), mask=logo_resized.split()[-1])

front.save('public/assets/coin/coin_front.png')
print("Saved coin_front.png")

# 2. Generate Coin Back
print("Generating coin back...")
back = Image.new('RGBA', (SIZE, SIZE), (0, 0, 0, 0))
draw_b = ImageDraw.Draw(back)

draw_b.ellipse([CENTER - RADIUS, CENTER - RADIUS, CENTER + RADIUS, CENTER + RADIUS], fill=(22, 18, 12, 255))

# Outer Reeded Border
for angle_deg in range(0, 360, 3):
    rad = math.radians(angle_deg)
    r1 = RADIUS - 4
    r2 = RADIUS - 20
    x1 = CENTER + r1 * math.cos(rad)
    y1 = CENTER + r1 * math.sin(rad)
    x2 = CENTER + r2 * math.cos(rad)
    y2 = CENTER + r2 * math.sin(rad)
    draw_b.line([(x1, y1), (x2, y2)], fill=(212, 175, 55, 180), width=3)

draw_b.ellipse([CENTER - RADIUS + 24, CENTER - RADIUS + 24, CENTER + RADIUS - 24, CENTER + RADIUS - 24], outline=(255, 225, 120, 255), width=6)
draw_b.ellipse([CENTER - RADIUS + 34, CENTER - RADIUS + 34, CENTER + RADIUS - 34, CENTER + RADIUS - 34], outline=(140, 105, 30, 255), width=3)

# Geometric Cyber Seal in Center of Back
for r in [280, 240, 180, 120, 60]:
    draw_b.ellipse([CENTER - r, CENTER - r, CENTER + r, CENTER + r], outline=(212, 175, 55, 140), width=2)

# Central Emblem / Star / Monogram for Samaria Tech
# 8-point geometric compass / polygon
points_outer = []
points_inner = []
for i in range(16):
    angle = math.radians(i * 360 / 16)
    r = 160 if i % 2 == 0 else 80
    points_outer.append((CENTER + r * math.cos(angle), CENTER + r * math.sin(angle)))

draw_b.polygon(points_outer, fill=(212, 175, 55, 180), outline=(255, 230, 130, 255))

# Central circle
draw_b.ellipse([CENTER - 45, CENTER - 45, CENTER + 45, CENTER + 45], fill=(24, 19, 10, 255), outline=(255, 220, 100, 255), width=3)

# Arc text simulation / dots around periphery
for i in range(36):
    angle = math.radians(i * 10)
    cx = CENTER + 370 * math.cos(angle)
    cy = CENTER + 370 * math.sin(angle)
    draw_b.ellipse([cx - 4, cy - 4, cx + 4, cy + 4], fill=(255, 215, 90, 220))

back.save('public/assets/coin/coin_back.png')
print("Saved coin_back.png")

# 3. Generate Bump / Normal Map for Coin Front
print("Generating bump map...")
bump = Image.new('L', (SIZE, SIZE), 128) # Mid-gray neutral height
draw_bump = ImageDraw.Draw(bump)

# Raised outer rim
draw_bump.ellipse([CENTER - RADIUS, CENTER - RADIUS, CENTER + RADIUS, CENTER + RADIUS], fill=160)
draw_bump.ellipse([CENTER - RADIUS + 24, CENTER - RADIUS + 24, CENTER + RADIUS - 24, CENTER + RADIUS - 24], outline=240, width=6)
draw_bump.ellipse([CENTER - RADIUS + 34, CENTER - RADIUS + 34, CENTER + RADIUS - 34, CENTER + RADIUS - 34], outline=180, width=4)

# Raised logo relief using logo alpha and luminance
logo_gray = logo_resized.convert('L')
logo_alpha = logo_resized.split()[-1]

# Combine luminance and alpha to create height map
logo_height = Image.new('L', (SIZE, SIZE), 128)
logo_mask_full = Image.new('L', (SIZE, SIZE), 0)
logo_mask_full.paste(logo_alpha, (CENTER - logo_size//2, CENTER - logo_size//2))
logo_height.paste(logo_gray, (CENTER - logo_size//2, CENTER - logo_size//2), mask=logo_alpha)

# Add to bump
bump = Image.composite(logo_height, bump, mask=logo_mask_full)
bump = bump.filter(ImageFilter.GaussianBlur(1.5))
bump.save('public/assets/coin/coin_bump.png')
print("Saved coin_bump.png")

# 4. Generate Edge Milling Texture
print("Generating edge texture...")
edge_w = 2048
edge_h = 128
edge = Image.new('RGBA', (edge_w, edge_h), (200, 160, 45, 255))
draw_e = ImageDraw.Draw(edge)

# Grooves along the circumference
groove_width = 8
for x in range(0, edge_w, groove_width * 2):
    draw_e.rectangle([x, 0, x + groove_width, edge_h], fill=(130, 95, 20, 255))
    draw_e.line([(x, 0), (x, edge_h)], fill=(255, 225, 110, 255), width=1)
    draw_e.line([(x + groove_width, 0), (x + groove_width, edge_h)], fill=(80, 55, 10, 255), width=1)

edge.save('public/assets/coin/coin_edge.png')
print("Saved coin_edge.png")

print("All coin textures generated successfully!")
