with open('src/templates/home.html', 'r', encoding='utf-8') as f:
    text = f.read()

idx = text.find('$16k')
print('Index:', idx)
if idx != -1:
    print(text[idx-200:idx+200])
