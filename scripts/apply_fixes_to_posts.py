import glob
import re
from bs4 import BeautifulSoup

CURSOR_RESTORE_STYLE = """
<style>
/* Native System Cursor Restoration & Overlay Removal */
.cursor-wrap, .custom-cursor, .hand-cursor, .arrow-cursor, .absolute-hover, .absolute-hand {
  display: none !important;
  visibility: hidden !important;
  pointer-events: none !important;
}
html, body, .body, .page-wrapper, .page-wrapper.no-cursor, * {
  cursor: auto !important;
}
a, button, [href], .hoverable, [open-modal], .action-button, .close-popup, .close-project, [data-navigation-toggle], .pri-link, .top-link, .link-absolute {
  cursor: pointer !important;
}
input, textarea, select {
  cursor: text !important;
}
#m-mecha-container, .sidebar-video, #m-popup-container {
  cursor: grab !important;
}
</style>
"""

NOISE_STYLE = """
<style>
@keyframes noise-grain {
  0%, 100% { transform: translate3d(0, 0, 0); }
  10% { transform: translate3d(-2%, -3%, 0); }
  30% { transform: translate3d(3%, 1%, 0); }
  50% { transform: translate3d(-1%, 3%, 0); }
  70% { transform: translate3d(3%, -2%, 0); }
  90% { transform: translate3d(-3%, 2%, 0); }
}
.samaria-noise-overlay {
  position: fixed;
  top: -100%;
  left: -100%;
  width: 300%;
  height: 300%;
  pointer-events: none;
  opacity: 0.04;
  z-index: 9999;
  background-image: url("/noise.png");
  background-repeat: repeat;
  will-change: transform;
  transform: translate3d(0, 0, 0);
  animation: 2.5s steps(5, end) infinite noise-grain;
}
</style>
"""

files = glob.glob('src/templates/post-*.html')

for f in files:
    with open(f, 'r', encoding='utf-8') as fp:
        html = fp.read()

    # 1. Strip cursor-tracking scripts
    # Find scripts with SELECTOR or handCursor or requestAnimationFrame animate for cursors
    html = re.sub(r'<script>\s*const SELECTOR = [\'"]a, button[\s\S]*?<\/script>', '<script>/* mouse cursor script removed */</script>', html)
    html = re.sub(r'<script>\s*\(function \(\) \{\s*const cursors = \[[\s\S]*?<\/script>', '<script>/* cursor loop removed */</script>', html)

    # 2. Fix filter backslashes if any
    html = html.replace(r"\'blur(4px)\'", "'blur(4px)'")
    html = html.replace(r"\'blur(0px)\'", "'blur(0px)'")

    soup = BeautifulSoup(html, 'html.parser')

    # 3. Add styles before </head> if not present
    if not soup.find(string=re.compile(r'noise-grain')):
        head = soup.find('head')
        if head:
            head.append(BeautifulSoup(NOISE_STYLE + CURSOR_RESTORE_STYLE, 'html.parser'))

    # 4. Remove .cursor-wrap element
    for cw in soup.find_all(class_='cursor-wrap'):
        cw.decompose()

    # 5. Add .samaria-noise-overlay as first child of body
    body = soup.find('body')
    if body and not soup.find(class_='samaria-noise-overlay'):
        noise_div = soup.new_tag('div', attrs={'class': 'samaria-noise-overlay', 'aria-hidden': 'true'})
        body.insert(0, noise_div)

    # 6. Accessibility additions
    hamburger = soup.find(class_='bold-nav-full__hamburger')
    if hamburger and not hamburger.get('aria-label'):
        hamburger['aria-label'] = 'Toggle navigation menu'

    for cp in soup.find_all(class_='close-popup'):
        cp['role'] = 'button'
        cp['tabindex'] = '0'
        cp['aria-label'] = 'Close contact dialog'

    for cb in soup.find_all(class_='close-burger'):
        cb['role'] = 'button'
        cb['tabindex'] = '0'
        cb['aria-label'] = 'Close navigation menu'

    for logo_link in soup.find_all('a', class_=re.compile(r'preloader-logo-wrapper|logo_nav')):
        if not logo_link.get('aria-label'):
            logo_link['aria-label'] = 'Samaria Tech Homepage'

    # 7. Videos preload="none"
    for vid in soup.find_all('video'):
        vid['preload'] = 'none'

    with open(f, 'w', encoding='utf-8') as fp:
        fp.write(str(soup))
    print(f"Updated {f}")
