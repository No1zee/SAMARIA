"""
Master Sovereign Gold Coin Generator
Calibrated against authentic Royal Mint British Gold Sovereign specifications.
Produces high-precision 2048x2048 PBR maps:
- Die-struck bas-relief height & normal maps with anatomical volume & sharp draft angles
- 168 toothed denticles and raised outer rim matching authentic sovereign proportions
- Calibrated 22K Crown Gold F0 specular reflectance map
- Cameo-contrast roughness map (satin field vs frosted relief device)
- Ambient occlusion map for natural contact shadows in crevices
- Tangent-space normal mapped reeded edge
"""

import math
import os
import cv2
import numpy as np
import scipy.ndimage as ndi
from PIL import Image, ImageDraw, ImageFont

SIZE = 2048
CENTER = SIZE // 2
RADIUS = 1014 # Coin outer radius

# Radial boundaries (calibrated from sovereign macro photography)
R_RIM_OUTER = RADIUS
R_RIM_INNER = RADIUS - 48       # Width 48px
R_DENT_INNER = RADIUS - 98      # Denticles width 50px (occupies 916 to 966)
R_LEGEND_CENTER = RADIUS - 180  # Text center at 834 (occupies ~760 to 908)
R_FIELD_INNER = RADIUS - 250    # Device bounding zone

# Grid coordinates
y_grid, x_grid = np.indices((SIZE, SIZE), dtype=np.float32)
dx = x_grid - CENTER
dy = y_grid - CENTER
dist = np.sqrt(dx**2 + dy**2)
angle_rad = np.arctan2(dy, dx)
angle_deg = (np.degrees(angle_rad) + 360.0) % 360.0

coin_mask = dist <= R_RIM_OUTER

# Font configuration
font_path = "C:/Windows/Fonts/timesbd.ttf"
if not os.path.exists(font_path):
    font_path = "C:/Windows/Fonts/georgiab.ttf"


def draw_legend(draw_ctx, text, r, start_deg, end_deg, font_size=56, fill_val=225):
    """
    Draws text along a circular arc matching sovereign die-struck lettering.
    Every character has its baseline towards the coin center and top towards the outer rim.
    Lettering runs clockwise.
    """
    font = ImageFont.truetype(font_path, font_size)
    chars = list(text)
    n = len(chars)
    step = (end_deg - start_deg) / max(n - 1, 1)

    for i, ch in enumerate(chars):
        deg = start_deg + i * step
        rad = math.radians(deg)
        cx = CENTER + r * math.cos(rad)
        cy = CENTER + r * math.sin(rad)

        char_canvas = Image.new('L', (font_size * 2, font_size * 2), 0)
        c_draw = ImageDraw.Draw(char_canvas)
        c_draw.text((font_size, font_size), ch, font=font, fill=fill_val, anchor="mm")

        # In PIL coords, 270 deg is top (rot=0), 0 deg is right (rot=-90/270), 90 deg is bottom (rot=180)
        rot = 270.0 - deg
        rotated = char_canvas.rotate(rot, resample=Image.Resampling.BICUBIC)
        draw_ctx.bitmap((int(cx - font_size), int(cy - font_size)), rotated, fill=fill_val)


def build_coin_base():
    """
    Constructs the unadorned coin blank:
    - Flat table/field at base height 110.0
    - Raised protective outer rim with soft beveled corners
    - 168 toothed denticles pointing inward from the inner rim
    """
    h = np.full((SIZE, SIZE), 110.0, dtype=np.float32)

    # 1. Raised Outer Rim (r = 966 to 1014)
    rim_mask = (dist >= R_RIM_INNER) & (dist <= R_RIM_OUTER)
    # Beveled rim profile: rounded top at height 228
    rim_dist_norm = np.clip((dist - R_RIM_INNER) / max(R_RIM_OUTER - R_RIM_INNER, 1.0), 0.0, 1.0)
    rim_sin = np.clip(np.sin(rim_dist_norm * math.pi), 0.0, 1.0)
    rim_profile = (rim_sin ** 0.5) * 118.0
    h[rim_mask] = 110.0 + rim_profile[rim_mask]

    # 2. Toothed Denticles (168 radial teeth between R_DENT_INNER and R_RIM_INNER)
    NUM_DENTICLES = 168
    period_deg = 360.0 / NUM_DENTICLES
    pos_in_period = (angle_deg % period_deg) / period_deg

    # Denticle width is ~58% of period, tooth cross section is smoothly curved
    tooth_mask = pos_in_period < 0.58
    pos_clipped = np.clip(pos_in_period / 0.58, 0.0, 1.0)
    tooth_sin = np.clip(np.sin(pos_clipped * math.pi), 0.0, 1.0)
    tooth_profile = np.where(tooth_mask, tooth_sin ** 0.65, 0.0)

    # Radial profile: rounded inner tip, solid connection to rim
    r_rel = np.clip((dist - R_DENT_INNER) / max(R_RIM_INNER - R_DENT_INNER, 1.0), 0.0, 1.0)
    r_sin = np.clip(np.sin(r_rel * (math.pi / 2)), 0.0, 1.0)
    radial_profile = r_sin ** 0.6

    denticle_band = (dist >= R_DENT_INNER) & (dist < R_RIM_INNER)
    denticle_height = 110.0 + (tooth_profile * radial_profile * 105.0)

    h[denticle_band] = np.maximum(h[denticle_band], denticle_height[denticle_band])

    return h


def build_obverse():
    print("Sculpting Sovereign Obverse (Lady Samaria & SAMARiA)...")
    h = build_coin_base()

    # Inscriptions: Clean sovereign legend wrapping the open field
    h_pil = Image.fromarray(np.clip(h, 0, 255).astype(np.uint8), mode='L')
    draw_ctx = ImageDraw.Draw(h_pil)

    # Majestic circumferential legend: 140 deg (7 o'clock) -> 270 deg (top) -> 40 deg (5 o'clock)
    draw_legend(draw_ctx, "+  SAMARIA  *  PHYSICAL  INTELLIGENCE  SYSTEMS  +", R_LEGEND_CENTER, 142, 398, font_size=54, fill_val=218)

    h_arr = np.array(h_pil, dtype=np.float32)

    # Isolate Lady Samaria figure and SAMARiA typography from public/logo.png
    im = Image.open('public/logo.png')
    arr = np.array(im)
    alpha = arr[:, :, 3].astype(np.float32) / 255.0

    # 1. Lady Samaria Figure (y: 0 to 718)
    fig_a = alpha[:718, :]
    y_idx, x_idx = np.where(fig_a > 0.05)
    ymin, ymax = y_idx.min(), y_idx.max()
    xmin, xmax = x_idx.min(), x_idx.max()

    fig_crop = fig_a[ymin:ymax+1, xmin:xmax+1]
    TARGET_FIG_H = 920
    TARGET_FIG_W = int(TARGET_FIG_H * (fig_crop.shape[1] / fig_crop.shape[0]))

    fig_resized = cv2.resize(fig_crop, (TARGET_FIG_W, TARGET_FIG_H), interpolation=cv2.INTER_LANCZOS4)
    fig_mask = fig_resized > 0.15

    # Individual stroke dome
    dt_lines = cv2.distanceTransform((fig_mask * 255).astype(np.uint8), cv2.DIST_L2, 5)
    dt_max = np.percentile(dt_lines[fig_mask], 95) if fig_mask.any() else 1.0
    stroke_relief = np.sin(np.clip(dt_lines / dt_max, 0, 1) * (np.pi / 2)) ** 0.7 * 65.0

    # Anatomical mass support
    kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (35, 35))
    closed = cv2.morphologyEx((fig_mask * 255).astype(np.uint8), cv2.MORPH_CLOSE, kernel)
    dt_mass = cv2.distanceTransform(closed, cv2.DIST_L2, 5)
    mass_max = np.percentile(dt_mass[closed > 0], 90) if (closed > 0).any() else 1.0
    mass_relief = np.sin(np.clip(dt_mass / mass_max, 0, 1) * (np.pi / 2)) ** 0.6 * 50.0

    fig_relief = (mass_relief * 0.45 + stroke_relief * 0.85) * (fig_mask * 0.85 + (closed > 0) * 0.15)
    fig_smooth = cv2.bilateralFilter(fig_relief.astype(np.float32), 9, 25, 9)

    # 2. SAMARiA Brand Typography (y: 718 to 1024)
    txt_a = alpha[718:, :]
    yt_idx, xt_idx = np.where(txt_a > 0.05)
    ytmin, ytmax = yt_idx.min(), yt_idx.max()
    xtmin, xtmax = xt_idx.min(), xt_idx.max()

    txt_crop = txt_a[ytmin:ytmax+1, xtmin:xtmax+1]
    TARGET_TXT_W = 660
    TARGET_TXT_H = int(TARGET_TXT_W * (txt_crop.shape[0] / txt_crop.shape[1]))

    txt_resized = cv2.resize(txt_crop, (TARGET_TXT_W, TARGET_TXT_H), interpolation=cv2.INTER_LANCZOS4)
    txt_mask = txt_resized > 0.15

    # Flat-topped raised die-struck lettering
    dt_txt = cv2.distanceTransform((txt_mask * 255).astype(np.uint8), cv2.DIST_L2, 3)
    txt_relief = np.clip(dt_txt / 3.5, 0, 1.0) * 62.0
    txt_smooth = cv2.GaussianBlur(txt_relief, (3, 3), 0.6)

    # Place Figure and Typography in center field
    fig_x0 = CENTER - TARGET_FIG_W // 2 - 10
    fig_y0 = CENTER - TARGET_FIG_H // 2 - 50
    patch_fig = h_arr[fig_y0:fig_y0+TARGET_FIG_H, fig_x0:fig_x0+TARGET_FIG_W]
    h_arr[fig_y0:fig_y0+TARGET_FIG_H, fig_x0:fig_x0+TARGET_FIG_W] = np.maximum(patch_fig, 110.0 + fig_smooth)

    # Place SAMARiA text right below Lady Samaria
    txt_x0 = CENTER - TARGET_TXT_W // 2
    txt_y0 = fig_y0 + TARGET_FIG_H + 20
    patch_txt = h_arr[txt_y0:txt_y0+TARGET_TXT_H, txt_x0:txt_x0+TARGET_TXT_W]
    h_arr[txt_y0:txt_y0+TARGET_TXT_H, txt_x0:txt_x0+TARGET_TXT_W] = np.maximum(patch_txt, 110.0 + txt_smooth)

    # 3. Year & Sovereign Mark in Exergue: * MMXXVI *
    font_exergue = ImageFont.truetype(font_path, 42)
    exergue_canvas = Image.new('L', (SIZE, SIZE), 0)
    e_draw = ImageDraw.Draw(exergue_canvas)
    e_draw.text((CENTER, txt_y0 + TARGET_TXT_H + 46), "*  MMXXVI  *", font=font_exergue, fill=215, anchor="mm")
    e_arr = np.array(exergue_canvas, dtype=np.float32)
    e_dt = cv2.distanceTransform((e_arr > 30).astype(np.uint8) * 255, cv2.DIST_L2, 3)
    e_relief = np.clip(e_dt / 3.0, 0, 1.0) * 58.0
    h_arr = np.maximum(h_arr, 110.0 + e_relief)

    h_arr[~coin_mask] = 0.0
    return np.clip(h_arr, 0, 255).astype(np.float32)


def build_reverse():
    print("Sculpting Sovereign Reverse (The Guardian Warrior Sovereign)...")
    h = build_coin_base()

    # Inscriptions: Clean sovereign legend in the open field
    h_pil = Image.fromarray(np.clip(h, 0, 255).astype(np.uint8), mode='L')
    draw_ctx = ImageDraw.Draw(h_pil)

    # Circumferential Legend wrapping the top: 140 deg -> 40 deg
    draw_legend(draw_ctx, "+  BRITANNIA  ET  SAMARIA  *  FINE  GOLD  +", R_LEGEND_CENTER, 142, 398, font_size=54, fill_val=218)

    h_arr = np.array(h_pil, dtype=np.float32)

    # Sculpt the Guardian Warrior
    guard_im = Image.open('public/the-guardian.png').convert('RGB')
    arr = np.array(guard_im)
    gray = cv2.cvtColor(arr, cv2.COLOR_RGB2GRAY)
    mask = gray > 40

    y_idx, x_idx = np.where(mask)
    ymin, ymax = y_idx.min(), y_idx.max()
    xmin, xmax = x_idx.min(), x_idx.max()

    g_crop = gray[ymin:ymax+1, xmin:xmax+1]
    m_crop = mask[ymin:ymax+1, xmin:xmax+1]

    TARGET_H = 1100
    TARGET_W = int(TARGET_H * (g_crop.shape[1] / g_crop.shape[0]))

    g_resized = cv2.resize(g_crop, (TARGET_W, TARGET_H), interpolation=cv2.INTER_LANCZOS4)
    m_resized = (cv2.resize((m_crop * 255).astype(np.uint8), (TARGET_W, TARGET_H), interpolation=cv2.INTER_LANCZOS4) > 100)

    dt = cv2.distanceTransform((m_resized * 255).astype(np.uint8), cv2.DIST_L2, 5)
    dt_max = np.percentile(dt[m_resized], 90) if m_resized.any() else 1.0
    mass = np.sin(np.clip(dt / dt_max, 0, 1) * (np.pi / 2)) ** 0.65 * 58.0

    g_norm = (g_resized.astype(np.float32) / 255.0)
    detail = g_norm * 38.0

    total = (mass * 0.6 + detail * 0.8) * m_resized
    sculpt_smooth = cv2.bilateralFilter(total.astype(np.float32), 9, 25, 9)

    gx0 = CENTER - TARGET_W // 2
    gy0 = CENTER - TARGET_H // 2 - 30
    patch = h_arr[gy0:gy0+TARGET_H, gx0:gx0+TARGET_W]
    h_arr[gy0:gy0+TARGET_H, gx0:gx0+TARGET_W] = np.maximum(patch, 110.0 + sculpt_smooth)

    # Sovereign Reverse Exergue: FIVE POUNDS and 22K CROWN GOLD
    font_rev_ex1 = ImageFont.truetype(font_path, 48)
    font_rev_ex2 = ImageFont.truetype(font_path, 34)
    rev_exergue = Image.new('L', (SIZE, SIZE), 0)
    re_draw = ImageDraw.Draw(rev_exergue)
    re_draw.text((CENTER, gy0 + TARGET_H + 40), "*  FIVE  POUNDS  *", font=font_rev_ex1, fill=215, anchor="mm")
    re_draw.text((CENTER, gy0 + TARGET_H + 96), "22K  CROWN  GOLD", font=font_rev_ex2, fill=200, anchor="mm")

    re_arr = np.array(rev_exergue, dtype=np.float32)
    re_dt = cv2.distanceTransform((re_arr > 30).astype(np.uint8) * 255, cv2.DIST_L2, 3)
    re_relief = np.clip(re_dt / 3.0, 0, 1.0) * 58.0
    h_arr = np.maximum(h_arr, 110.0 + re_relief)

    h_arr[~coin_mask] = 0.0
    return np.clip(h_arr, 0, 255).astype(np.float32)


def make_normal_and_ao(h_map, strength=0.085):
    """
    Computes high-precision tangent-space normal map and ambient occlusion map.
    Adds subtle radial flow line micro-texture to the coin field for authentic cartwheel luster.
    """
    # 5x5 Scharr/Sobel derivatives
    kernel_x = np.array([
        [-1, -2, 0, 2, 1],
        [-2, -4, 0, 4, 2],
        [-3, -6, 0, 6, 3],
        [-2, -4, 0, 4, 2],
        [-1, -2, 0, 2, 1]
    ], dtype=np.float32) / 32.0

    kernel_y = kernel_x.T

    sx = cv2.filter2D(h_map, cv2.CV_32F, kernel_x)
    sy = cv2.filter2D(h_map, cv2.CV_32F, kernel_y)

    # Cartwheel radial micro-striations on the open field
    field_mask = (dist < R_DENT_INNER) & (h_map < 125.0)
    theta = np.arctan2(dy, dx)
    # Microscopic radial flow lines (radial striations)
    flow = np.sin(theta * 960.0) * 0.14 * field_mask.astype(np.float32)
    sx += flow * np.cos(theta) * 0.6
    sy += flow * np.sin(theta) * 0.6

    # Tangent space: nx = -sx * strength, ny = sy * strength (in Three.js cylinder UV space)
    nx = -sx * strength
    ny = sy * strength
    nz = np.ones_like(nx)

    n_len = np.sqrt(nx**2 + ny**2 + nz**2)
    n_len[n_len == 0] = 1.0
    nx /= n_len
    ny /= n_len
    nz /= n_len

    normal_rgb = np.stack([
        ((nx + 1.0) * 0.5 * 255.0).astype(np.uint8),
        ((ny + 1.0) * 0.5 * 255.0).astype(np.uint8),
        ((nz + 1.0) * 0.5 * 255.0).astype(np.uint8)
    ], axis=-1)

    # Ambient Occlusion from slope magnitude & crevice curvature
    grad_mag = np.sqrt(sx**2 + sy**2)
    ao = 255.0 - np.clip(grad_mag * 1.8, 0, 160)
    # Outside coin is black
    ao[~coin_mask] = 0.0
    ao_map = ao.astype(np.uint8)

    return normal_rgb, ao_map, sx, sy


def make_gold_reflectance(h_map, sx, sy, ao_map):
    """
    Produces calibrated 22K Crown Gold F0 specular reflectance map.
    Alloy: 91.67% gold, balance copper/silver.
    Field: #D8A842 (satin warm bullion table)
    Relief: #EDC05A (lustrous high points)
    Crevices: #5A3C12 (rich warm amber shadow)
    """
    rel = (h_map - 110.0)

    # Subtle cartwheel radial luster variation (±6 RGB units)
    theta = np.arctan2(dy, dx)
    cartwheel = (np.cos(theta * 2.0 - 0.72) ** 4 - 0.5) * 12.0

    # Fine uncirculated gold grain
    np.random.seed(42)
    grain = np.random.normal(0, 1.8, (SIZE, SIZE)).astype(np.float32)

    # Calibrated 22K Crown Gold base reflectance
    r = 216.0 + rel * 0.22 + cartwheel + grain
    g = 168.0 + rel * 0.25 + cartwheel * 0.85 + grain * 0.8
    b = 64.0 + rel * 0.32 + cartwheel * 0.60 + grain * 0.55

    # Modulate with Ambient Occlusion in crevices
    ao_factor = ao_map.astype(np.float32) / 255.0
    r = r * (0.35 + 0.65 * ao_factor)
    g = g * (0.32 + 0.68 * ao_factor)
    b = b * (0.28 + 0.72 * ao_factor)

    r = np.clip(r, 45, 255).astype(np.uint8)
    g = np.clip(g, 32, 250).astype(np.uint8)
    b = np.clip(b, 10, 215).astype(np.uint8)
    a = np.where(coin_mask, 255, 0).astype(np.uint8)

    return np.stack([r, g, b, a], axis=-1)


def make_roughness_map(h_map, sx, sy):
    """
    Generates Cameo-finish roughness map:
    - Field (table): Rich satin bullion finish (roughness ~0.29)
    - Devices (relief): Frosted cameo finish (roughness ~0.42)
    - Denticles & Rim: ~0.32
    - Crevices: ~0.55
    """
    # Base field roughness = 74 (~0.29 in 0-1 range)
    rough = np.full((SIZE, SIZE), 74, dtype=np.uint8)

    # Denticles and outer rim
    denticle_rim_mask = dist >= R_DENT_INNER
    rough[denticle_rim_mask] = 84  # 0.33

    # Raised relief devices (cameo frosted finish)
    rough[h_map > 125.0] = 108    # 0.42
    rough[h_map > 175.0] = 118    # 0.46

    # Crevices and high-slope die draft edges
    grad_mag = np.sqrt(sx**2 + sy**2)
    rough[grad_mag > 28.0] = 142  # 0.55

    # Background outside coin
    rough[~coin_mask] = 255

    return rough


def generate_reeded_edge():
    """
    Generates 4096x256 high-precision PBR maps for the milled coin edge:
    - 200 distinct vertical reeds with cylindrical tangent normals
    - Metallic base reflectance
    - Roughness map
    """
    print("Generating Reeded Milled Edge...")
    edge_w = 4096
    edge_h = 256
    NUM_REEDS = 200

    u = np.linspace(0, NUM_REEDS * 2 * np.pi, edge_w, endpoint=False)
    # Sine wave ridge profile
    phase = np.sin(u)
    # Normal in tangent space along circumference (u):
    # slope dx = cos(u)
    reed_nx = -np.cos(u) * 0.72
    reed_ny = np.zeros_like(reed_nx)
    reed_nz = np.sqrt(1.0 - np.clip(reed_nx**2, 0, 0.95))

    # 2D broadcast
    norm_x = np.tile(reed_nx, (edge_h, 1))
    norm_y = np.tile(reed_ny, (edge_h, 1))
    norm_z = np.tile(reed_nz, (edge_h, 1))

    # Subtle horizontal lathe/machining striations
    v_grain = np.random.normal(0, 0.05, (edge_h, edge_w)).astype(np.float32)
    norm_y += v_grain
    n_len = np.sqrt(norm_x**2 + norm_y**2 + norm_z**2)
    norm_x /= n_len
    norm_y /= n_len
    norm_z /= n_len

    edge_normal = np.stack([
        ((norm_x + 1.0) * 0.5 * 255.0).astype(np.uint8),
        ((norm_y + 1.0) * 0.5 * 255.0).astype(np.uint8),
        ((norm_z + 1.0) * 0.5 * 255.0).astype(np.uint8)
    ], axis=-1)

    # Edge diffuse/reflectance: slight shading in the grooves between reeds
    reed_ao = (phase * 0.5 + 0.5) ** 0.5
    edge_r = (185.0 + reed_ao * 35.0).astype(np.uint8)
    edge_g = (142.0 + reed_ao * 30.0).astype(np.uint8)
    edge_b = (52.0 + reed_ao * 18.0).astype(np.uint8)

    edge_diffuse = np.stack([
        np.tile(edge_r, (edge_h, 1)),
        np.tile(edge_g, (edge_h, 1)),
        np.tile(edge_b, (edge_h, 1))
    ], axis=-1)

    # Edge roughness: ~0.28 on peaks, ~0.42 in grooves
    edge_rough = np.tile((72 + (1.0 - reed_ao) * 35).astype(np.uint8), (edge_h, 1))

    os.makedirs('public/assets/coin', exist_ok=True)
    Image.fromarray(edge_normal, mode='RGB').save('public/assets/coin/sovereign_edge_normal.png')
    Image.fromarray(edge_diffuse, mode='RGB').save('public/assets/coin/sovereign_edge_diffuse.png')
    Image.fromarray(edge_rough, mode='L').save('public/assets/coin/sovereign_edge_roughness.png')
    print("Saved reeded edge textures!")


def main():
    os.makedirs('public/assets/coin', exist_ok=True)

    # 1. Obverse
    h_obv = build_obverse()
    Image.fromarray(h_obv.astype(np.uint8), mode='L').save('public/assets/coin/sovereign_height.png')
    print("Saved sovereign_height.png")

    norm_o, ao_o, sx_o, sy_o = make_normal_and_ao(h_obv, strength=0.088)
    Image.fromarray(norm_o, mode='RGB').save('public/assets/coin/sovereign_normal.png')
    Image.fromarray(ao_o, mode='L').save('public/assets/coin/sovereign_ao.png')
    print("Saved sovereign_normal.png & sovereign_ao.png")

    diff_o = make_gold_reflectance(h_obv, sx_o, sy_o, ao_o)
    Image.fromarray(diff_o, mode='RGBA').save('public/assets/coin/sovereign_diffuse.png')
    print("Saved sovereign_diffuse.png")

    rough_o = make_roughness_map(h_obv, sx_o, sy_o)
    Image.fromarray(rough_o, mode='L').save('public/assets/coin/sovereign_roughness.png')
    print("Saved sovereign_roughness.png")

    # 2. Reverse
    h_rev = build_reverse()
    Image.fromarray(h_rev.astype(np.uint8), mode='L').save('public/assets/coin/sovereign_back_height.png')
    print("Saved sovereign_back_height.png")

    norm_r, ao_r, sx_r, sy_r = make_normal_and_ao(h_rev, strength=0.088)
    Image.fromarray(norm_r, mode='RGB').save('public/assets/coin/sovereign_back_normal.png')
    Image.fromarray(ao_r, mode='L').save('public/assets/coin/sovereign_back_ao.png')
    print("Saved sovereign_back_normal.png & sovereign_back_ao.png")

    diff_r = make_gold_reflectance(h_rev, sx_r, sy_r, ao_r)
    Image.fromarray(diff_r, mode='RGBA').save('public/assets/coin/sovereign_back_diffuse.png')
    print("Saved sovereign_back_diffuse.png")

    rough_r = make_roughness_map(h_rev, sx_r, sy_r)
    Image.fromarray(rough_r, mode='L').save('public/assets/coin/sovereign_back_roughness.png')
    print("Saved sovereign_back_roughness.png")

    # 3. Reeded Edge
    generate_reeded_edge()

    print("\n[SUCCESS] All Sovereign Gold Master PBR Maps Generated Successfully!")


if __name__ == '__main__':
    main()
