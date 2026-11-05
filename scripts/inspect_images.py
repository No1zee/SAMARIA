import re

with open(r'c:\Projects\SAMARIA\src\templates\home.html', 'r', encoding='utf-8') as f:
    text = f.read()

imgs = re.findall(r'<img[^>]+src=[\'"]([^\'"]+)[\'"]', text)
print(f"Total img tags: {len(imgs)}")
for u in sorted(set(imgs)):
    if any(k in u for k in ['Warstwa', 'chip', '6a180066', 'diffuse', 'coin', 'seal', 'logo']):
        print("MATCH:", u)
