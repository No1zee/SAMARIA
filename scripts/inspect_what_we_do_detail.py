from bs4 import BeautifulSoup

with open('src/templates/home.html', 'r', encoding='utf-8') as f:
    soup = BeautifulSoup(f.read(), 'html.parser')

investments = soup.find(id='investments')
if not investments:
    print("No #investments found")
    exit()

sections = investments.find_all('section')
print(f"Total sections inside #investments: {len(sections)}")

for i, s in enumerate(sections):
    title = s.find(attrs={'section-navi': 'main-section-title'})
    order = s.find(attrs={'section-navi': 'order-number'})
    small_names = s.find_all(attrs={'scroll-small-name': True})
    
    t_text = title.get_text(strip=True) if title else 'N/A'
    o_text = order.get_text(strip=True) if order else 'N/A'
    tags = [sn.get_text(strip=True) for sn in small_names]
    
    # Check media inside
    # Find all main media containers
    project_files = s.find_all(class_='project-file')
    vids = s.find_all('video')
    imgs = s.find_all('img')
    
    print(f"\n--- Project {i+1}: {o_text} - {t_text} ---")
    print(f"Tags: {tags}")
    print(f"Project files total: {len(project_files)}, Videos: {len(vids)}, Imgs: {len(imgs)}")
    
    # List top 4 media elements (img src or video poster/src)
    for idx, pf in enumerate(project_files[:5]):
        vid = pf.find('video')
        img = pf.find('img')
        is_mini = 'is-mini' in pf.get('class', [])
        media_type = 'video' if vid else ('img' if img else 'none')
        src = (vid.get('poster') or vid.get('src') or '') if vid else ((img.get('src') or '') if img else '')
        print(f"  Media {idx+1}: {media_type} (mini={is_mini}) -> {src[:80]}")
