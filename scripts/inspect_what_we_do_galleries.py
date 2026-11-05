from bs4 import BeautifulSoup

with open('src/templates/home.html', 'r', encoding='utf-8') as f:
    soup = BeautifulSoup(f.read(), 'html.parser')

investments_sec = soup.find(id='investments')
sections = investments_sec.find_all('section')

for i, s in enumerate(sections):
    title = s.find(attrs={'section-navi': 'main-section-title'})
    title_text = title.get_text(strip=True) if title else 'No title'
    print(f"\n================ SECTION {i+1}: {title_text} ================")
    # Look for galleries, marquees, grids
    marquees = s.find_all(class_='is-marquee-tracker')
    galleries = s.find_all(class_='project-gallery')
    print(f"  Marquees: {len(marquees)}")
    print(f"  Galleries: {len(galleries)}")
    for g in galleries:
        print(f"    Gallery classes: {g.get('class')}")
        items = g.find_all(class_='project-file')
        print(f"    Gallery items (project-file): {len(items)}")
        for it in items[:3]:
            print(f"      Item classes: {it.get('class')}, has_img: {bool(it.find('img'))}, has_vid: {bool(it.find('video'))}")
    for m in marquees:
        items = m.find_all(class_='project-file')
        print(f"    Marquee items: {len(items)}")
