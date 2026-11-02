import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('src/templates/home.html', 'r', encoding='utf-8') as f:
    text = f.read()

pos = text.find('function initCoin()')
print(text[pos:pos+1500])
