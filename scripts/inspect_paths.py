import re

with open('src/templates/home.html', encoding='utf-8', errors='ignore') as f:
    text = f.read()

svg_match = re.search(r'<div class="footer-logo"><div class="is-svg is-footer-full w-embed"><svg[^>]*>(.*?)</svg>', text, re.DOTALL)
paths = re.findall(r'<path d="([^"]+)"', svg_match.group(1))

# Let's inspect each path's commands and relative coordinate bounds
names = ['C', 'E', 'M', 'H', 'A']
for name, p in zip(names, paths):
    print(f'=== {name} ===')
    print(p)
