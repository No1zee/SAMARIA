import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('src/templates/home.html', 'r', encoding='utf-8') as f:
    text = f.read()

import re
sections = re.findall(r'<section[^>]*>', text)
for s in sections:
    print('SECTION:', s[:120])
