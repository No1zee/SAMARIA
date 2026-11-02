with open('src/templates/home.html', 'r', encoding='utf-8') as f:
    text = f.read()

idx = text.find('class="contact-modal')
if idx != -1:
    print(text[idx:idx+1200])
else:
    print('contact-modal not found')
