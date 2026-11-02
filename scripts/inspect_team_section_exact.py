import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('src/templates/home.html', 'r', encoding='utf-8') as f:
    lines = f.readlines()

print(''.join(lines[1590:1750]))
