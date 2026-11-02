with open('src/templates/home.html', 'r', encoding='utf-8') as f:
    lines = f.readlines()

for i, l in enumerate(lines):
    if 'Edward Magejo' in l or 'Divine Mwale' in l or 'Munashe Simango' in l:
        print(f'Line {i+1}: {l.strip()[:100]}')
