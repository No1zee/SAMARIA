import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('src/templates/home.html', 'r', encoding='utf-8') as f:
    text = f.read()

idx = text.find('id="teams"')
print('Index:', idx)
print(text[idx-100:idx+3500])
