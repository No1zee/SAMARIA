from bs4 import BeautifulSoup

for fn in ['src/templates/home.html', 'src/templates/blog.html']:
    with open(fn, 'r', encoding='utf-8') as f:
        soup = BeautifulSoup(f.read(), 'html.parser')
    print(f"\n=== ARIA / ROLE in {fn} ===")
    for el in soup.find_all(True):
        for k, v in list(el.attrs.items()):
            if k.startswith('aria-') or k == 'role':
                print(f"  <{el.name} class='{el.get('class')}' {k}='{v}'>")
