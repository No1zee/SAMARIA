from bs4 import BeautifulSoup

with open('src/templates/home.html', 'r', encoding='utf-8') as f:
    soup = BeautifulSoup(f.read(), 'html.parser')

investments = soup.find(id='investments')
sections = investments.find_all('section')

for i, s in enumerate(sections):
    print(f"\n================ SECTION {i+1} ================")
    order = s.find(attrs={'section-navi': 'order-number'})
    title = s.find(attrs={'section-navi': 'main-section-title'})
    tags = [t.get_text(strip=True) for t in s.find_all(attrs={'scroll-small-name': True})]
    link = s.find('a', class_=lambda c: c and 'project-cover' in c)
    href = link.get('href') if link else 'N/A'
    
    # Primary video or main image
    vid = s.find('video')
    img = s.find('img', class_=lambda c: c and 'is-mini' not in c)
    
    print(f"Order: {order.get_text(strip=True) if order else ''}")
    print(f"Title: {title.get_text(strip=True) if title else ''}")
    print(f"Tags: {tags}")
    print(f"Link: {href}")
    if vid:
        print(f"Video poster: {vid.get('poster')}")
        src_tag = vid.find('source')
        print(f"Video src: {src_tag.get('src') if src_tag else vid.get('src')}")
    if img:
        print(f"Image src: {img.get('src')}")
