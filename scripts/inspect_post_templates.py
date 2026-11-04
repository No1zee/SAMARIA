import glob
from bs4 import BeautifulSoup

files = glob.glob('src/templates/post-*.html') + ['src/templates/404.html']

for f in files:
    with open(f, 'r', encoding='utf-8') as fp:
        soup = BeautifulSoup(fp.read(), 'html.parser')
    cursor_wrap = soup.find(class_='cursor-wrap')
    hamburger = soup.find(class_='bold-nav-full__hamburger')
    close_popup = soup.find(class_='close-popup')
    close_burger = soup.find(class_='close-burger')
    noise = soup.find(class_='samaria-noise-overlay')
    print(f"File: {f}")
    print(f"  cursor_wrap: {cursor_wrap is not None}")
    print(f"  hamburger aria: {hamburger.get('aria-label') if hamburger else 'N/A'}")
    print(f"  close_popup role: {close_popup.get('role') if close_popup else 'N/A'}")
    print(f"  noise overlay: {noise is not None}")
