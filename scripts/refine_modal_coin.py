with open('src/templates/home.html', 'r', encoding='utf-8') as f:
    text = f.read()

# 1. Update coin scale & camera position for perfect framing without clipping
text = text.replace('model.scale.setScalar(1.22);', 'model.scale.setScalar(0.90);')
text = text.replace('camera.position.set(0, 0, 4.2);', 'camera.position.set(0, 0, 4.4);')

# 2. Update the contact modal pill badge to say CONTACT US — SAMARIA
old_badge = '<div class="m-wrapper" contact-clip=""><img alt="" class="is-svg is-infographic is-invert" loading="lazy" src="https://cdn.prod.website-files.com/6a180066e6ba27b81a7ef9ab_Frame%202147224524%20(2).png"/></div>'

new_badge = '<div class="m-wrapper" contact-clip="" style="display:inline-flex; align-items:center; gap:0.5rem; padding: 0.35rem 0.85rem; border: 1px solid rgba(255,255,255,0.3); border-radius: 9999px; text-transform: uppercase; font-size: 0.72rem; letter-spacing: 0.12em; color: rgba(255,255,255,0.9); font-family: monospace; margin-bottom: 1.5rem;"><span>CONTACT US</span><span style="opacity:0.4;">—</span><span style="color:#f5d77f; font-weight:600;">SAMARIA</span></div>'

if old_badge in text:
    text = text.replace(old_badge, new_badge)
    print("Replaced modal badge successfully!")
else:
    print("Notice: old_badge not found directly.")

with open('src/templates/home.html', 'w', encoding='utf-8') as f:
    f.write(text)

print("Modal coin scale, camera framing, and badge updated successfully!")
