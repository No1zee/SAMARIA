import re

with open('src/templates/home.html', 'r', encoding='utf-8') as f:
    lines = f.readlines()

pattern = r'(<link[^>]+webclip[^>]+>\s*)+'
new_favicons = '<link href="/favicon.ico" rel="shortcut icon" type="image/x-icon"/><link href="/favicon-32x32.png" rel="icon" sizes="32x32" type="image/png"/><link href="/favicon-16x16.png" rel="icon" sizes="16x16" type="image/png"/><link href="/favicon-48x48.png" rel="icon" sizes="48x48" type="image/png"/><link href="/apple-touch-icon.png" rel="apple-touch-icon" sizes="180x180"/><link href="/icon-192.png" rel="icon" sizes="192x192" type="image/png"/><link href="/icon-512.png" rel="icon" sizes="512x512" type="image/png"/>'

lines[1], count = re.subn(pattern, new_favicons, lines[1])
print(f"Substitutions made: {count}")

with open('src/templates/home.html', 'w', encoding='utf-8') as f:
    f.writelines(lines)
print("Updated favicon links successfully!")
