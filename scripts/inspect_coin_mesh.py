import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('src/templates/home.html', 'r', encoding='utf-8') as f:
    text = f.read()

pos = text.find('window.__coinMesh = coin;')
print(text[pos-100:pos+500])
