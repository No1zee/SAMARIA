import math
import os
import numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageFilter

os.makedirs('public/assets/coin', exist_ok=True)

SIZE = 2048
CENTER = SIZE // 2
RADIUS = SIZE // 2 - 40

print("Generating realistic 2048x2048 gold coin maps...")

# 1. Height Map (16-bit float / 8-bit grayscale for normal generation)
height_arr = np.full((SIZE, SIZE), 110.0, dtype=np.float32) # Base field height

y_coords, x_coords = np.ogrid[:SIZE, :SIZE]
dist_from_center = np.sqrt((x_coords - CENTER)**2 + (y_coords - CENTER)**2)

# Transparent outside coin radius
coin_mask = dist_from_center <= RADIUS

# Upset Rim (Raised outer border)
rim_outer = RADIUS
rim_inner = RADIUS - 75
rim_mask = (dist_from_center >= rim_inner) & (dist_from_center <= rim_outer)
# Smooth bevel on rim
height_arr[rim_mask] = 210.0

# Outer drop-off
outer_drop = (dist_from_center > rim_outer - 15) & (dist_from_center <= rim_outer)
height_arr[outer_drop] = np.linspace(210.0, 110.0, np.count_nonzero(outer_drop)) if np.count_nonzero(outer_drop) else 210.0

# Inner bevel of the rim
inner_bevel = (dist_from_center >= rim_inner - 20) & (dist_from_center < rim_inner)
if np.any(inner_bevel):
    ratio = (dist_from_center[inner_bevel] - (rim_inner - 20)) / 20.0
    height_arr[inner_bevel] = 110.0 + ratio * 100.0

# Convert to PIL for drawing denticles, lettering, and logo
height_img = Image.fromarray(np.clip(height_arr, 0, 255).astype(np.uint8), mode='L')
draw_h = ImageDraw.Draw(height_img)

# Denticles (Classic beaded border around inside of rim)
num_denticles = 120
denticle_radius = rim_inner - 24
for i in range(num_denticles):
    angle = math.radians(i * (360.0 / num_denticles))
    cx = CENTER + denticle_radius * math.cos(angle)
    cy = CENTER + denticle_radius * math.sin(angle)
    r = 9
    draw_h.ellipse([cx - r, cy - r, cx + r, cy + r], fill=225)

# Inner hairline groove
groove_r = denticle_radius - 22
draw_h.ellipse([CENTER - groove_r, CENTER - groove_r, CENTER + groove_r, CENTER + groove_r], outline=85, width=4)
draw_h.ellipse([CENTER - groove_r + 4, CENTER - groove_r + 4, CENTER + groove_r - 4, CENTER + groove_r - 4], outline=175, width=3)

# Arc Inscriptions (Embossed Lettering)
# We draw text on a high-res arc
def draw_arc_text(draw_target, text, radius, start_angle_deg, sweep_angle_deg, fill_val, font_size=52):
    try:
        # Try finding a serif or standard bold font
        font = ImageFont.truetype("arialbd.ttf", font_size)
    except:
        font = ImageFont.load_default()

    chars = list(text)
    n = len(chars)
    if n == 0:
        return
    step = sweep_angle_deg / max(n - 1, 1)
    
    for i, ch in enumerate(chars):
        angle_deg = start_angle_deg + i * step
        angle_rad = math.radians(angle_deg)
        x = CENTER + radius * math.cos(angle_rad)
        y = CENTER + radius * math.sin(angle_rad)
        
        # Render single character rotated
        char_img = Image.new('L', (font_size * 2, font_size * 2), 0)
        c_draw = ImageDraw.Draw(char_img)
        c_draw.text((font_size, font_size), ch, font=font, fill=fill_val, anchor="mm")
        
        # Rotate character perpendicular to radius
        rot_angle = -(angle_deg + 90)
        rotated = char_img.rotate(rot_angle, resample=Image.Resampling.BICUBIC)
        
        # Paste onto target
        box = (int(x - font_size), int(y - font_size))
        draw_target.bitmap(box, rotated, fill=fill_val)

# Top and Bottom Inscriptions
text_radius = denticle_radius - 85
draw_arc_text(draw_h, "SAMARIA  TECH  •  PHYSICAL  INTELLIGENCE", text_radius, 205, 130, fill_val=220, font_size=46)
draw_arc_text(draw_h, "★  1  TROY  OUNCE  .9999  FINE  GOLD  •  2026  ★", text_radius, 25, 130, fill_val=220, font_size=46)

# Inner Medallion Ring
inner_ring_r = text_radius - 75
draw_h.ellipse([CENTER - inner_ring_r, CENTER - inner_ring_r, CENTER + inner_ring_r, CENTER + inner_ring_r], outline=190, width=5)
draw_h.ellipse([CENTER - inner_ring_r + 8, CENTER - inner_ring_r + 8, CENTER + inner_ring_r - 8, CENTER + inner_ring_r - 8], outline=85, width=3)

# Center Medallion Field: The Samaria Warrior Logo
logo_raw = Image.open('public/logo.png').convert('RGBA')
logo_size = 980
logo_resized = logo_raw.resize((logo_size, logo_size), Image.Resampling.LANCZOS)

# Extract logo alpha and luminance to create continuous sculpted bas-relief
logo_alpha = np.array(logo_resized.split()[-1], dtype=np.float32) / 255.0
logo_luma = np.array(logo_resized.convert('L'), dtype=np.float32)

# Bas-relief sculpting: combine alpha silhouette with internal features
logo_relief = (logo_alpha * 55.0) + (logo_luma * 0.35)
logo_relief = np.clip(logo_relief, 0, 100).astype(np.uint8)

# Multi-scale Gaussian beveling for smooth struck-metal feel
logo_img = Image.fromarray(logo_relief, mode='L')
logo_smooth = logo_img.filter(ImageFilter.GaussianBlur(2.0))

# Paste embossed logo into center
box_x = CENTER - logo_size // 2
box_y = CENTER - logo_size // 2

# Composite logo height onto height_img
h_arr_cur = np.array(height_img, dtype=np.float32)
logo_arr_smooth = np.array(logo_smooth, dtype=np.float32)

# Blend with base field (110)
target_slice = h_arr_cur[box_y:box_y+logo_size, box_x:box_x+logo_size]
h_arr_cur[box_y:box_y+logo_size, box_x:box_x+logo_size] = np.maximum(target_slice, 110.0 + logo_arr_smooth)

# Final Height Map
final_height_arr = np.clip(h_arr_cur, 0, 255)
# Zero outside coin
final_height_arr[~coin_mask] = 0

height_final_img = Image.fromarray(final_height_arr.astype(np.uint8), mode='L')
height_final_img.save('public/assets/coin/gold_height.png')
print("Saved gold_height.png")

# 2. Tangent Space Normal Map Generation (Sobel filter via numpy)
print("Computing Normal Map...")
kernel_x = np.array([[-1, 0, 1], [-2, 0, 2], [-1, 0, 1]], dtype=np.float32)
kernel_y = np.array([[-1, -2, -1], [0, 0, 0], [1, 2, 1]], dtype=np.float32)

from scipy.signal import convolve2d
try:
    sobel_x = convolve2d(final_height_arr, kernel_x, mode='same', boundary='symm')
    sobel_y = convolve2d(final_height_arr, kernel_y, mode='same', boundary='symm')
except:
    # Manual fallback if scipy not installed
    sobel_x = np.zeros_like(final_height_arr)
    sobel_y = np.zeros_like(final_height_arr)
    sobel_x[:, 1:-1] = (final_height_arr[:, 2:] - final_height_arr[:, :-2]) * 2.0
    sobel_y[1:-1, :] = (final_height_arr[2:, :] - final_height_arr[:-2, :]) * 2.0

# Normal vector calculation
# Invert Y for standard DirectX / Three.js tangent space
STRENGTH = 0.045
nx = -sobel_x * STRENGTH
ny = sobel_y * STRENGTH
nz = np.ones_like(nx)

length = np.sqrt(nx**2 + ny**2 + nz**2)
length[length == 0] = 1.0
nx /= length
ny /= length
nz /= length

# Map [-1, 1] to [0, 255]
norm_r = ((nx + 1.0) * 0.5 * 255.0).astype(np.uint8)
norm_g = ((ny + 1.0) * 0.5 * 255.0).astype(np.uint8)
norm_b = ((nz + 1.0) * 0.5 * 255.0).astype(np.uint8)

normal_map = np.stack([norm_r, norm_g, norm_b], axis=-1)
normal_img = Image.fromarray(normal_map, mode='RGB')
normal_img.save('public/assets/coin/gold_normal.png')
print("Saved gold_normal.png")

# 3. Base Color / Diffuse Map (Solid Continuous 24K Mint Gold)
print("Generating 24K Gold Base Color Map...")
# Real gold hex: #fed35c to #e8b334 with subtle radial luster
diffuse_arr = np.zeros((SIZE, SIZE, 4), dtype=np.uint8)

# Radial gradient across coin face
norm_dist = np.clip(dist_from_center / RADIUS, 0.0, 1.0)
gold_center = np.array([255, 224, 115], dtype=np.float32) # Vibrant luster center
gold_rim = np.array([226, 172, 45], dtype=np.float32)     # Deep rich gold edge

for c in range(3):
    channel = gold_center[c] * (1.0 - norm_dist*0.35) + gold_rim[c] * (norm_dist*0.35)
    # Add subtle occlusion in crevices from height gradient
    grad_magnitude = np.sqrt(sobel_x**2 + sobel_y**2)
    occlusion = np.clip(grad_magnitude * 0.035, 0, 45)
    channel = np.clip(channel - occlusion, 30, 255)
    
    # Frosted cameo effect: slightly brighter gold on raised relief
    raised_mask = final_height_arr > 130
    channel[raised_mask] = np.clip(channel[raised_mask] + 12, 0, 255)
    diffuse_arr[:, :, c] = channel.astype(np.uint8)

diffuse_arr[:, :, 3] = np.where(coin_mask, 255, 0).astype(np.uint8)

diffuse_img = Image.fromarray(diffuse_arr, mode='RGBA')
diffuse_img.save('public/assets/coin/gold_diffuse.png')
print("Saved gold_diffuse.png")

# 4. Roughness Map (Proof Finish: Mirror Field vs. Frosted Cameo Devices)
print("Generating Proof Roughness Map...")
# Mirror Field = very smooth (~38 / 255 = 0.15 roughness)
roughness_arr = np.full((SIZE, SIZE), 38, dtype=np.uint8)

# Frosted Cameo Devices (Logo, text, denticles = satin matte ~105 / 255 = 0.41 roughness)
frosted_mask = final_height_arr > 125
roughness_arr[frosted_mask] = 105

# Outer rim semi-gloss (~55 / 255)
roughness_arr[rim_mask] = 55
roughness_arr[~coin_mask] = 255

roughness_img = Image.fromarray(roughness_arr, mode='L')
roughness_img.save('public/assets/coin/gold_roughness.png')
print("Saved gold_roughness.png")

# 5. Coin Back (Reverse: Heraldic Eagle / Cybernetic Samaria Crest)
print("Generating Reverse (Coin Back) maps...")
back_h_arr = np.full((SIZE, SIZE), 110.0, dtype=np.float32)
back_h_arr[rim_mask] = 210.0

back_h_img = Image.fromarray(np.clip(back_h_arr, 0, 255).astype(np.uint8), mode='L')
draw_bh = ImageDraw.Draw(back_h_img)

# Denticles on back
for i in range(num_denticles):
    angle = math.radians(i * (360.0 / num_denticles))
    cx = CENTER + denticle_radius * math.cos(angle)
    cy = CENTER + denticle_radius * math.sin(angle)
    draw_bh.ellipse([cx - 9, cy - 9, cx + 9, cy + 9], fill=225)

draw_bh.ellipse([CENTER - groove_r, CENTER - groove_r, CENTER + groove_r, CENTER + groove_r], outline=85, width=4)
draw_bh.ellipse([CENTER - groove_r + 4, CENTER - groove_r + 4, CENTER + groove_r - 4, CENTER + groove_r - 4], outline=175, width=3)

# Reverse Inscriptions
draw_arc_text(draw_bh, "UNITED  MINTS  OF  SAMARIA  •  IN  PHYSICAL  WE  TRUST", text_radius, 205, 130, fill_val=220, font_size=42)
draw_arc_text(draw_bh, "★  TEN  THOUSAND  CREDITS  •  LEGAL  TENDER  ★", text_radius, 25, 130, fill_val=220, font_size=42)

draw_bh.ellipse([CENTER - inner_ring_r, CENTER - inner_ring_r, CENTER + inner_ring_r, CENTER + inner_ring_r], outline=190, width=5)

# Central Heraldic Crest / Mechanical Shield
crest_r = 380
for r_step in [380, 320, 240, 160]:
    draw_bh.ellipse([CENTER - r_step, CENTER - r_step, CENTER + r_step, CENTER + r_step], outline=180, width=4)

# 12 radiating heraldic rays
for ray in range(12):
    deg = ray * 30
    rad = math.radians(deg)
    x1 = CENTER + 165 * math.cos(rad)
    y1 = CENTER + 165 * math.sin(rad)
    x2 = CENTER + 375 * math.cos(rad)
    y2 = CENTER + 375 * math.sin(rad)
    draw_bh.line([(x1, y1), (x2, y2)], fill=195, width=6)

# Central monogram
draw_bh.ellipse([CENTER - 110, CENTER - 110, CENTER + 110, CENTER + 110], fill=225, outline=255, width=5)
try:
    center_font = ImageFont.truetype("arialbd.ttf", 90)
except:
    center_font = ImageFont.load_default()
draw_bh.text((CENTER, CENTER), "ST", font=center_font, fill=85, anchor="mm")

back_h_arr_cur = np.array(back_h_img, dtype=np.float32)
back_h_arr_cur[~coin_mask] = 0

# Back Normal Map
if 'sobel_x' in locals():
    try:
        b_sobel_x = convolve2d(back_h_arr_cur, kernel_x, mode='same', boundary='symm')
        b_sobel_y = convolve2d(back_h_arr_cur, kernel_y, mode='same', boundary='symm')
    except:
        b_sobel_x = np.zeros_like(back_h_arr_cur)
        b_sobel_y = np.zeros_like(back_h_arr_cur)
        b_sobel_x[:, 1:-1] = (back_h_arr_cur[:, 2:] - back_h_arr_cur[:, :-2]) * 2.0
        b_sobel_y[1:-1, :] = (back_h_arr_cur[2:, :] - back_h_arr_cur[:-2, :]) * 2.0

bnx = -b_sobel_x * STRENGTH
bny = b_sobel_y * STRENGTH
bnz = np.ones_like(bnx)
blen = np.sqrt(bnx**2 + bny**2 + bnz**2)
blen[blen == 0] = 1.0
bnx /= blen
bny /= blen
bnz /= blen

back_normal_img = Image.fromarray(np.stack([
    ((bnx + 1.0) * 0.5 * 255.0).astype(np.uint8),
    ((bny + 1.0) * 0.5 * 255.0).astype(np.uint8),
    ((bnz + 1.0) * 0.5 * 255.0).astype(np.uint8)
], axis=-1), mode='RGB')
back_normal_img.save('public/assets/coin/gold_back_normal.png')
print("Saved gold_back_normal.png")

# Back Diffuse
back_diffuse_arr = np.zeros((SIZE, SIZE, 4), dtype=np.uint8)
for c in range(3):
    ch = gold_center[c] * (1.0 - norm_dist*0.35) + gold_rim[c] * (norm_dist*0.35)
    b_occl = np.clip(np.sqrt(b_sobel_x**2 + b_sobel_y**2) * 0.035, 0, 45)
    ch = np.clip(ch - b_occl, 30, 255)
    ch[back_h_arr_cur > 130] = np.clip(ch[back_h_arr_cur > 130] + 12, 0, 255)
    back_diffuse_arr[:, :, c] = ch.astype(np.uint8)

back_diffuse_arr[:, :, 3] = np.where(coin_mask, 255, 0).astype(np.uint8)
Image.fromarray(back_diffuse_arr, mode='RGBA').save('public/assets/coin/gold_back_diffuse.png')
print("Saved gold_back_diffuse.png")

# 6. Realistic Reeded Coin Edge
print("Generating Reeded Coin Edge...")
edge_w = 4096
edge_h = 256
edge_reeded = np.full((edge_h, edge_w, 3), 220, dtype=np.uint8)

# Vertical ridges (hundreds of fine teeth)
tooth_width = 8
for x in range(0, edge_w, tooth_width * 2):
    # Highlight on top of ridge
    edge_reeded[:, x:x+tooth_width, 0] = 255 # R
    edge_reeded[:, x:x+tooth_width, 1] = 230 # G
    edge_reeded[:, x:x+tooth_width, 2] = 120 # B
    # Deep shadow in the groove between ridges
    edge_reeded[:, x+tooth_width:x+tooth_width*2, 0] = 135
    edge_reeded[:, x+tooth_width:x+tooth_width*2, 1] = 95
    edge_reeded[:, x+tooth_width:x+tooth_width*2, 2] = 25

Image.fromarray(edge_reeded, mode='RGB').save('public/assets/coin/gold_edge_diffuse.png')
print("Saved gold_edge_diffuse.png")

print("All realistic gold coin texture maps created successfully!")
