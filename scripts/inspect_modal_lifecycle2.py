import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('src/templates/home.html', 'r', encoding='utf-8') as f:
    lines = f.readlines()

for i in range(3260, min(len(lines), 3330)):
    print(f"{i+1}: {lines[i]}", end='')
