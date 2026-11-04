from bs4 import BeautifulSoup

for path in ['src/templates/home.html', 'src/templates/blog.html']:
    with open(path, 'r', encoding='utf-8') as f:
        soup = BeautifulSoup(f.read(), 'html.parser')
    missing = []
    for tag in soup.find_all(['button', 'a']):
        text = tag.get_text(strip=True)
        aria = tag.get('aria-label') or tag.get('aria-labelledby')
        title = tag.get('title')
        if not text and not aria and not title:
            img = tag.find('img')
            has_alt = img and img.get('alt')
            svg = tag.find('svg')
            has_svg_title = svg and svg.find('title')
            if not has_alt and not has_svg_title:
                missing.append((tag.name, tag.get('class'), tag.get('href'), str(tag)[:120]))
    print(f"=== {path}: {len(missing)} elements missing accessible names ===")
    for m in missing:
        print(f"  <{m[0]} class='{m[1]}' href='{m[2]}'>: {m[3]}")
