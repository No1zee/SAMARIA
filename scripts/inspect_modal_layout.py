import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('src/templates/home.html', 'r', encoding='utf-8') as f:
    text = f.read()

import re
# Find all CSS rules relating to popup-three or m-popup-container
css_matches = re.findall(r'([^{}]*(?:popup-three|m-popup-container|contact-modal)[^{}]*\{[^{}]*\})', text)
for m in css_matches[:15]:
    print("CSS:", m.strip())

# Find HTML around m-popup-container
idx = text.find('m-popup-container')
if idx != -1:
    print("\nHTML around m-popup-container:")
    print(text[max(0, idx-300):idx+300])
