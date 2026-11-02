import re

with open('public/assets/6a180066e6ba27b81a7ef9cc_lfooter.svg', encoding='utf-8', errors='ignore') as f:
    text = f.read()

svg_tag = re.search(r'<svg[^>]*>', text).group(0)
print('svg tag:', svg_tag)
paths = re.findall(r'<path d="([^"]+)"', text)
print('lfooter paths count:', len(paths))
