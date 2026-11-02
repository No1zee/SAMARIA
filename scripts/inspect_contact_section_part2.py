import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('src/templates/home.html', 'r', encoding='utf-8') as f:
    text = f.read()

idx = text.find('id="contact"')
if idx != -1:
    print(text[idx+1800:idx+4000])
