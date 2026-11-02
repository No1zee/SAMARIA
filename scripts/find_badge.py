import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('src/templates/home.html', 'r', encoding='utf-8') as f:
    text = f.read()

import re
matches = re.findall(r'.{0,50}(?:webflow-badge|w-webflow-badge|badge|Made in Webflow).{0,50}', text, re.IGNORECASE)
for m in matches:
    print(m)

with open('public/assets/mecha-shared.css', 'r', encoding='utf-8') as f:
    css = f.read()

matches_css = re.findall(r'.{0,50}(?:badge|webflow-badge).{0,50}', css, re.IGNORECASE)
for m in matches_css:
    print("CSS:", m)
