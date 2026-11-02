from bs4 import BeautifulSoup

with open('src/templates/home.html', 'r', encoding='utf-8') as f:
    soup = BeautifulSoup(f.read(), 'html.parser')

print('=== ALL HEADINGS (H1-H6, .is-h-*) ===')
for h in soup.find_all(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']):
    print(f'<{h.name}> {h.get_text(separator=" ", strip=True)}')

for el in soup.find_all(class_=lambda c: c and any(x in c for x in ['is-h-', 'heading', 'title'])):
    txt = el.get_text(separator=' ', strip=True)
    if txt and len(txt) < 120:
        print(f'[{el.get("class")}] {txt}')

print('\n=== ALL PARAGRAPHS ===')
for p in soup.find_all('p'):
    print(f'<p> {p.get_text(separator=" ", strip=True)}')

print('\n=== FORM DESCRIPTIONS & SUBTITLES ===')
for el in soup.find_all(class_=lambda c: c and any(x in c for x in ['desc', 'subtitle', 'txts', 'caption'])):
    txt = el.get_text(separator=' ', strip=True)
    if txt and len(txt) < 140:
        print(f'[{el.get("class")}] {txt}')
