import re

with open(r'c:\Projects\SAMARIA\src\templates\home.html', 'r', encoding='utf-8') as f:
    text = f.read()

for m in re.finditer(r'"selector":\s*"([^"]*(?:is-f|footer-illu|footer-img)[^"]*)"', text):
    print("Found selector:", m.group(1))
