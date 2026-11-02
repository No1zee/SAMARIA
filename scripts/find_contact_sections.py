with open('src/templates/home.html', 'r', encoding='utf-8') as f:
    lines = f.readlines()

for i, line in enumerate(lines):
    if 'contact' in line.lower() and ('section' in line.lower() or 'popup' in line.lower() or 'modal' in line.lower() or 'container' in line.lower()):
        print(f"Line {i+1}: {line[:120].strip()}")
