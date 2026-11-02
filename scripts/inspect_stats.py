with open('src/templates/home.html', 'r', encoding='utf-8') as f:
    text = f.read()

import re

for i, (start, end) in enumerate([(64748, 78028), (78028, 96556), (96556, 112399)]):
    sec = text[start:end]
    print(f'=== SECTION {i+1} ===')
    for m in re.finditer(r'<a[^>]*class="[^"]*text-link[^"]*"[^>]*>(.*?)</a>', sec, re.DOTALL):
        print('Desc link:', m.group(1)[:300])
    for m in re.finditer(r'<div class="stats-columns"[^>]*>(.*?)</div>\s*</div>\s*</div>', sec, re.DOTALL):
        print('Stats columns:', m.group(1)[:400])
