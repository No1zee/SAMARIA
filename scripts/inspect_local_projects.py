import os
import json

base_dir = r"c:\Projects"
projects = [
    "Africa Advisory",
    "bambino-3d-map",
    "bambino-world",
    "CAR-MONITOR",
    "CV APPLICATIONS",
    "Kinetik",
    "KINETIK CLIPPER",
    "KWEDU",
    "LIFELINE",
    "LULU TISSUES",
    "nova_v2",
    "NSV1.0",
    "TRADOR- TRADING AGENT",
    "VIRIDIAN",
    "WORLD CUP AUTOMATION",
    "ZIM RUGBY UNION"
]

summaries = {}

for p in projects:
    p_path = os.path.join(base_dir, p)
    if not os.path.isdir(p_path):
        continue
    files = os.listdir(p_path)
    readme_content = ""
    for r in ["README.md", "readme.md", "README.txt", "package.json"]:
        if r in files:
            try:
                with open(os.path.join(p_path, r), "r", encoding="utf-8", errors="ignore") as f:
                    readme_content = f.read(1500)
                break
            except Exception as e:
                pass
    
    # Check for images or screenshots
    img_files = []
    for root, dirs, f_names in os.walk(p_path):
        # don't go deep into node_modules or .git
        if "node_modules" in root or ".git" in root or ".next" in root:
            continue
        for f in f_names:
            if f.lower().endswith((".png", ".jpg", ".jpeg", ".webp", ".svg", ".mp4", ".webm")):
                img_files.append(f)
        if len(img_files) > 5:
            break

    summaries[p] = {
        "files_count": len(files),
        "sample_files": files[:8],
        "readme_snippet": readme_content[:600] if readme_content else "No README found",
        "has_images": len(img_files) > 0,
        "sample_images": img_files[:5]
    }

print(json.dumps(summaries, indent=2))
