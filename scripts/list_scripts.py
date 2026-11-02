import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('src/templates/home.html', 'r', encoding='utf-8') as f:
    text = f.read()

import re
scripts = re.findall(r'<script[^>]*src=[^>]*>', text)
for s in scripts:
    print('Script:', s)
