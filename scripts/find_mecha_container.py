import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('src/templates/home.html', 'r', encoding='utf-8') as f:
    text = f.read()

idx = 0
while True:
    pos = text.find('m-mecha-container', idx)
    if pos == -1:
        break
    print(f"Found at pos {pos}:")
    print(text[max(0, pos-100):pos+150])
    idx = pos + 1
