from bs4 import BeautifulSoup

with open('src/templates/home.html', 'r', encoding='utf-8') as f:
    soup = BeautifulSoup(f.read(), 'html.parser')

investments_sec = soup.find(id='investments')
if not investments_sec:
    print("investments section not found")
else:
    print(f"Tag: {investments_sec.name}, classes: {investments_sec.get('class')}")
    # find all sub-sections or project rows
    sections = investments_sec.find_all('section')
    print(f"Found {len(sections)} nested section tags")
    for i, s in enumerate(sections):
        title = s.find(attrs={'section-navi': 'main-section-title'})
        title_text = title.get_text(strip=True) if title else 'No title'
        vids = len(s.find_all('video'))
        imgs = len(s.find_all('img'))
        classes = s.get('class')
        print(f"Section {i+1}: title='{title_text}', vids={vids}, imgs={imgs}, classes={classes}")
        # print first 300 chars of structure
        direct_children = [c.name for c in s.find_all(recursive=False)]
        print(f"  Direct children: {direct_children}")
