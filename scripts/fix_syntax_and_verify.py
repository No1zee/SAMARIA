import subprocess

with open('src/templates/home.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Fix literal backslashes
content = content.replace("filter: \\'blur(4px)\\'", "filter: 'blur(4px)'")
content = content.replace(
    "if (nameLines.length > 0)  if (nameLines.length > 0) gsap.set",
    "if (nameLines.length > 0) gsap.set"
)

with open('src/templates/home.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Fixed syntax in home.html")

# Extract and validate all scripts with node
import re
scripts = re.findall(r'<script(?:\s+[^>]*)?>(.*?)</script>', content, re.DOTALL)
print(f"Validating {len(scripts)} scripts in home.html...")

for i, s in enumerate(scripts):
    s_clean = s.strip()
    if not s_clean:
        continue
    # write to temp file and test with node -c
    with open('_temp_check.js', 'w', encoding='utf-8') as tf:
        tf.write(s_clean)
    res = subprocess.run(['node', '-c', '_temp_check.js'], capture_output=True, text=True)
    if res.returncode != 0:
        print(f"SYNTAX ERROR in script #{i+1}:")
        print(res.stderr[:300])
    else:
        print(f"Script #{i+1}: OK")

import os
if os.path.exists('_temp_check.js'):
    os.remove('_temp_check.js')
