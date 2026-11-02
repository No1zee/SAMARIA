import re

with open('src/templates/home.html', 'r', encoding='utf-8') as f:
    text = f.read()

matches = list(re.finditer(r'<section[^>]*class="section is-regular[^"]*"[^>]*>', text))
print('Found project sections:', len(matches))
for i, m in enumerate(matches):
    print(f'=== Project Section {i+1} at {m.start()} ===')
    print(text[m.start():m.start()+350])
