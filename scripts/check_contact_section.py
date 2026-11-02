with open('src/templates/home.html', 'r', encoding='utf-8') as f:
    text = f.read()

idx = text.find('id="contact"')
if idx != -1:
    print(text[idx:idx+1500])
