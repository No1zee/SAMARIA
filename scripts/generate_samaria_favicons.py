import os
from PIL import Image, ImageEnhance, ImageFilter

coin_path = 'public/assets/coin/sovereign_diffuse.png'
coin = Image.open(coin_path).convert('RGBA')

# Crop to circle boundary
bbox = coin.getbbox()
coin_cropped = coin.crop(bbox)

# Enhance sharpness & contrast for small icon visibility
enhancer = ImageEnhance.Sharpness(coin_cropped)
coin_enhanced = enhancer.enhance(1.4)
col_enh = ImageEnhance.Color(coin_enhanced)
coin_enhanced = col_enh.enhance(1.2)

# Generate individual PNG favicons
sizes = {
    'favicon-16x16.png': (16, 16),
    'favicon-32x32.png': (32, 32),
    'favicon-48x48.png': (48, 48),
    'apple-touch-icon.png': (180, 180),
    'icon-192.png': (192, 192),
    'icon-512.png': (512, 512),
}

for filename, sz in sizes.items():
    resized = coin_enhanced.resize(sz, Image.Resampling.LANCZOS)
    target = os.path.join('public', filename)
    resized.save(target, 'PNG', optimize=True)
    print(f"Generated {target} ({sz[0]}x{sz[1]})")

# Generate multi-size favicon.ico
ico_sizes = [(16, 16), (32, 32), (48, 48), (64, 64)]
ico_imgs = [coin_enhanced.resize(s, Image.Resampling.LANCZOS) for s in ico_sizes]

ico_path_public = os.path.join('public', 'favicon.ico')
ico_imgs[0].save(
    ico_path_public,
    format='ICO',
    sizes=ico_sizes,
    append_images=ico_imgs[1:]
)
print(f"Generated {ico_path_public} with sizes: {ico_sizes}")

# Also update src/app/favicon.ico
ico_path_app = os.path.join('src', 'app', 'favicon.ico')
ico_imgs[0].save(
    ico_path_app,
    format='ICO',
    sizes=ico_sizes,
    append_images=ico_imgs[1:]
)
print(f"Generated {ico_path_app} with sizes: {ico_sizes}")
