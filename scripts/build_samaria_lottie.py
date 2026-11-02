import json
import re
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from build_samaria_svg import create_samaria_tech_svg
from test_lottie_convert import svg_to_lottie_shape

shifted_letters, total_w = create_samaria_tech_svg()

# Full-fidelity 10:1 canvas matching SAMARIA TECH exactly with ZERO wasted padding
CANVAS_W = round(total_w) # ~2960
CANVAS_H = 296
FRAME_RATE = 60
TOTAL_FRAMES = 31 # Exactly 31 frames at 60fps = 0.5166666666666667s matching Webflow data-duration

print(f"Canvas: {CANVAS_W}x{CANVAS_H}, Total letters: {len(shifted_letters)}")

layers = []
# Sequence 11 letters: SAMARIA (0..12), gap (12..16), TECH (16..22)
start_frames = [0, 2, 4, 6, 8, 10, 12, 16, 18, 20, 22]

# Snappy mechanical deceleration curve
ease_mecha = {
    "i": {"x": [0.12], "y": [1.0]},
    "o": {"x": [0.12], "y": [0.0]}
}

for idx, (char, path_str, orig_x, orig_w) in enumerate(shifted_letters):
    f_start = start_frames[idx]
    
    # Path is already at native coordinates (y: 0 to 296, x: 0 to CANVAS_W)
    contours = svg_to_lottie_shape(path_str)
    
    it_items = []
    for c_idx, c in enumerate(contours):
        it_items.append({
            "ind": c_idx,
            "ty": "sh",
            "ix": c_idx + 1,
            "ks": {
                "a": 0,
                "k": c
            },
            "nm": f"Path {c_idx + 1}"
        })
    
    # Fill item - pure black matching original
    it_items.append({
        "ty": "fl",
        "c": {
            "a": 0,
            "k": [0, 0, 0, 1]
        },
        "o": {
            "a": 0,
            "k": 100
        },
        "r": 1,
        "bm": 0,
        "nm": "Fill 1"
    })
    
    # Transform inside shape group
    it_items.append({
        "ty": "tr",
        "p": {"a": 0, "k": [0, 0]},
        "a": {"a": 0, "k": [0, 0]},
        "s": {"a": 0, "k": [100, 100]},
        "r": {"a": 0, "k": 0},
        "o": {"a": 0, "k": 100},
        "sk": {"a": 0, "k": 0},
        "sa": {"a": 0, "k": 0},
        "nm": "Transform"
    })
    
    # Cyber strobe opacity animation
    if f_start == 0:
        opacity_kf = [
            {"t": 0, "s": [100], "h": 1},
            {"t": 1, "s": [25], "h": 1},
            {"t": 2, "s": [100]}
        ]
    else:
        opacity_kf = [
            {"t": 0, "s": [0], "h": 1},
            {"t": f_start, "s": [100], "h": 1},
            {"t": f_start + 1, "s": [25], "h": 1},
            {"t": f_start + 2, "s": [100]}
        ]
    
    # Center anchor point for pneumatic scale & drop
    char_cx = orig_x + (orig_w / 2.0)
    char_cy = 148.0
    
    # Mechanical locking drop
    if f_start == 0:
        pos_kf = [
            {"t": 0, "s": [0, -14, 0], **ease_mecha},
            {"t": 3, "s": [0, 1.5, 0], **ease_mecha},
            {"t": 4, "s": [0, 0, 0]}
        ]
        scale_kf = [
            {"t": 0, "s": [100, 100, 100], **ease_mecha},
            {"t": 3, "s": [103, 97, 100], **ease_mecha},
            {"t": 4, "s": [100, 100, 100]}
        ]
    else:
        pos_kf = [
            {"t": 0, "s": [0, -14, 0], "h": 1},
            {"t": f_start, "s": [0, -14, 0], **ease_mecha},
            {"t": f_start + 3, "s": [0, 1.5, 0], **ease_mecha},
            {"t": f_start + 4, "s": [0, 0, 0]}
        ]
        scale_kf = [
            {"t": 0, "s": [100, 100, 100], "h": 1},
            {"t": f_start, "s": [100, 100, 100], **ease_mecha},
            {"t": f_start + 3, "s": [103, 97, 100], **ease_mecha},
            {"t": f_start + 4, "s": [100, 100, 100]}
        ]
    
    layer = {
        "ddd": 0,
        "ind": idx + 1,
        "ty": 4,
        "nm": f"{char}_{idx}",
        "sr": 1,
        "ks": {
            "o": {
                "a": 1,
                "k": opacity_kf
            },
            "r": {
                "a": 0,
                "k": 0
            },
            "p": {
                "a": 1,
                "k": pos_kf
            },
            "a": {
                "a": 0,
                "k": [0, 0, 0]
            },
            "s": {
                "a": 1,
                "k": scale_kf
            }
        },
        "ao": 0,
        "shapes": [
            {
                "ty": "gr",
                "it": it_items,
                "nm": f"Group {char}_{idx}"
            }
        ],
        "ip": 0,
        "op": TOTAL_FRAMES + 10,
        "st": 0,
        "bm": 0
    }
    layers.append(layer)

lottie_data = {
    "v": "5.12.1",
    "fr": FRAME_RATE,
    "ip": 0,
    "op": TOTAL_FRAMES,
    "w": CANVAS_W,
    "h": CANVAS_H,
    "nm": "Samaria Tech Animated Logo",
    "ddd": 0,
    "assets": [],
    "layers": layers
}

output_path_938 = "public/assets/6a180066e6ba27b81a7ef938_data.json"
output_path_99e = "public/assets/6a180066e6ba27b81a7ef99e_data.json"

with open(output_path_938, "w", encoding="utf-8") as f:
    json.dump(lottie_data, f, separators=(',', ':'))

with open(output_path_99e, "w", encoding="utf-8") as f:
    json.dump(lottie_data, f, separators=(',', ':'))

print(f"Generated Lottie JSON successfully for both {output_path_938} and {output_path_99e}!")
