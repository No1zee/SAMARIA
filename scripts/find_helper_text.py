import re
from bs4 import BeautifulSoup

with open('src/templates/home.html', 'r', encoding='utf-8') as f:
    html = f.read()

soup = BeautifulSoup(html, 'html.parser')

print('=== 1. CAPTIONS & SUBTITLES (.is-caption, .is-sub, etc.) ===')
seen = set()
for el in soup.find_all(class_=re.compile(r'caption|help|hint|note|subtext|tip|label|tag', re.I)):
    txt = el.get_text(separator=' ', strip=True)
    if txt and txt not in seen and len(txt) < 150:
        seen.add(txt)
        cls = ' '.join(el.get('class', []))
        print(f'[{cls}] -> "{txt}"')

print('\n=== 2. FORM LABELS & PLACEHOLDERS ===')
for inp in soup.find_all(['input', 'textarea']):
    ph = inp.get('placeholder', '')
    name = inp.get('name', '')
    val = inp.get('value', '')
    print(f'field [{name}]: placeholder="{ph}", value="{val}"')

print('\n=== 3. BUTTONS & CTAs ===')
for btn in soup.find_all(class_=re.compile(r'button|btn|link-more', re.I)):
    txt = btn.get_text(separator=' ', strip=True)
    if txt and len(txt) < 80:
        print(f'Button -> "{txt}"')

print('\n=== 4. SHORT / HELPER / MISC TEXT ELEMENTS ===')
for tag in soup.find_all(['span', 'p', 'div', 'small']):
    txt = tag.get_text(separator=' ', strip=True)
    if any(k in txt.lower() for k in ['drag', 'scroll', 'click', 'hold', 'explore', 'please wait', 'oops', 'thank you', 'designed by', 'last published', 'widelab']):
        if len(txt) < 160:
            print(f'Helper snippet: "{txt}"')
