import re
import json

out_dir = r"C:\Users\Edward Magejo\.gemini\antigravity\brain\c38161f9-4a6f-468b-ab53-043340eb2182"
js_path = f"{out_dir}/grail_index-qyEp212_.js"
css_path = f"{out_dir}/grail_HomePage-B7z74ohK.css"

with open(js_path, 'r', encoding='utf-8', errors='ignore') as f:
    js_text = f.read()

with open(css_path, 'r', encoding='utf-8', errors='ignore') as f:
    css_text = f.read()

# 1. Detect Core Libraries in JS
libs = {
    'Three.js': 'three' in js_text.lower() or 'webglrenderer' in js_text.lower(),
    'Lenis': 'lenis' in js_text.lower() or 'scrolltrigger' in js_text.lower(),
    'Framer Motion': 'motion' in js_text.lower() or 'framer' in js_text.lower(),
    'GSAP': 'gsap' in js_text.lower() or 'timelinemax' in js_text.lower(),
    'Canvas2D': 'getcontext("2d")' in js_text.lower() or "getcontext('2d')" in js_text.lower(),
    'Lucide/Icons': 'lucide' in js_text.lower(),
}

# 2. Extract CSS Keyframes and Custom Properties
keyframes = re.findall(r'@keyframes\s+([a-zA-Z0-9_-]+)', css_text)
custom_props = list(set(re.findall(r'(--[a-zA-Z0-9_-]+)', css_text)))

# 3. Find 3D transforms, perspective, filters
transforms = list(set(re.findall(r'(perspective\([^)]+\)|translate3d\([^)]+\)|rotate[XYZ]\([^)]+\)|matrix3d\([^)]+\))', css_text)))

# 4. Search for specific components in JS
components = set(re.findall(r'function\s+([A-Z][a-zA-Z0-9_]+)\s*\(', js_text))

# 5. Extract transition timing functions (cubic-bezier)
easings = list(set(re.findall(r'cubic-bezier\([^)]+\)', css_text)))

report = {
    "libraries": libs,
    "keyframes": list(set(keyframes)),
    "custom_properties_count": len(custom_props),
    "sample_custom_properties": custom_props[:15],
    "transforms": transforms[:15],
    "easings": easings,
    "components": list(components)[:25]
}

print(json.dumps(report, indent=2))

with open(f"{out_dir}/grail_reverse_engineering_summary.json", "w", encoding="utf-8") as f:
    json.dump(report, f, indent=2)
