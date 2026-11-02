with open('src/templates/home.html', 'r', encoding='utf-8') as f:
    text = f.read()

import re
old_pattern = r'<div class="m-wrapper" contact-clip=""><img alt="" class="is-svg is-infographic is-invert" loading="lazy" src="[^"]*Frame%202147224524[^"]*"/></div>'
new_badge = '<div class="m-wrapper" contact-clip="" style="display:inline-flex; align-items:center; gap:0.5rem; padding: 0.35rem 0.85rem; border: 1px solid rgba(255,255,255,0.3); border-radius: 9999px; text-transform: uppercase; font-size: 0.72rem; letter-spacing: 0.12em; color: rgba(255,255,255,0.9); font-family: monospace; margin-bottom: 1.5rem;"><span>CONTACT US</span><span style="opacity:0.4;">—</span><span style="color:#deb34a; font-weight:600;">SAMARIA</span></div>'

new_text, count = re.subn(old_pattern, new_badge, text)
print(f"Replaced badges: {count}")

with open('src/templates/home.html', 'w', encoding='utf-8') as f:
    f.write(new_text)
