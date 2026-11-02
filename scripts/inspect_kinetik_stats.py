with open('src/templates/home.html', 'r', encoding='utf-8') as f:
    text = f.read()

idx = 93625
print(text[idx-400:idx+600])
