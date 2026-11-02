with open('src/templates/home.html', 'r', encoding='utf-8') as f:
    text = f.read()

import re

# Section 1
s1 = text[64748:78028]
print('=== SECTION 1 (01) ===')
for m in re.finditer(r'<h1[^>]*>.*?</h1>', s1, re.DOTALL):
    print('H1:', m.group())
for m in re.finditer(r'class="section-tags"[^>]*>.*?</div>\s*</div>', s1, re.DOTALL):
    print('Tags:', m.group()[:200])

# Section 2
s2 = text[78028:96556]
print('\n=== SECTION 2 (02) ===')
for m in re.finditer(r'<h1[^>]*>.*?</h1>', s2, re.DOTALL):
    print('H1:', m.group())
for m in re.finditer(r'class="section-tags"[^>]*>.*?</div>\s*</div>', s2, re.DOTALL):
    print('Tags:', m.group()[:200])

# Section 3
s3 = text[96556:112399]
print('\n=== SECTION 3 (03) ===')
for m in re.finditer(r'<h1[^>]*>.*?</h1>', s3, re.DOTALL):
    print('H1:', m.group())
for m in re.finditer(r'class="section-tags"[^>]*>.*?</div>\s*</div>', s3, re.DOTALL):
    print('Tags:', m.group()[:200])
