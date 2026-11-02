import re
from build_samaria_svg import create_samaria_tech_svg

# 1. Update src/app/layout.tsx
layout_path = 'src/app/layout.tsx'
with open(layout_path, 'r', encoding='utf-8') as f:
    layout_content = f.read()

layout_content = layout_content.replace(
    "title: 'Mecha Capital | Robotics & AI Investment in Legacy Ind.'",
    "title: 'Samaria Tech | Robotics & AI Investment in Legacy Ind.'"
)
layout_content = layout_content.replace(
    "'Mecha Capital deploys physical automation",
    "'Samaria Tech deploys physical automation"
)
with open(layout_path, 'w', encoding='utf-8') as f:
    f.write(layout_content)
print(f"Updated {layout_path}")

# 2. Update home.html
home_path = 'src/templates/home.html'
with open(home_path, 'r', encoding='utf-8') as f:
    home_content = f.read()

# Replace metadata and domain
home_content = home_content.replace('data-wf-domain="mecha-xyz.webflow.io"', 'data-wf-domain="samaria-tech.webflow.io"')
home_content = home_content.replace('Mecha Capital | Robotics &amp; AI Investment in Legacy Ind.', 'Samaria Tech | Robotics &amp; AI Investment in Legacy Ind.')
home_content = home_content.replace('Mecha Capital deploys physical automation', 'Samaria Tech deploys physical automation')

# Replace Lottie data-src
home_content = home_content.replace(
    'data-src="https://cdn.prod.website-files.com/6a180066e6ba27b81a7ef915/6a180066e6ba27b81a7ef938_data.json"',
    'data-src="/assets/6a180066e6ba27b81a7ef938_data.json"'
)
home_content = home_content.replace(
    'data-src="https://cdn.prod.website-files.com/6a180066e6ba27b81a7ef915/6a180066e6ba27b81a7ef99e_data.json"',
    'data-src="/assets/6a180066e6ba27b81a7ef99e_data.json"'
)

# Replace copy & headings
home_content = home_content.replace(
    'Robotics will knock over the global economy. Mecha deploys physical automation into legacy industries',
    'Robotics will knock over the global economy. Samaria Tech deploys physical automation into legacy industries'
)
home_content = home_content.replace(
    "Mecha Capital&#x27;s Tomorrow Recycling uses AI",
    "Samaria Tech&#x27;s Tomorrow Recycling uses AI"
)
home_content = home_content.replace(
    '<div scroll-small-name="" class="is-caption">mecha</div>',
    '<div scroll-small-name="" class="is-caption">Samaria Tech</div>'
)
home_content = home_content.replace(
    'Mecha buys and builds operationally complex businesses',
    'Samaria Tech buys and builds operationally complex businesses'
)

# Replace team descriptions
home_content = home_content.replace('Managing Partner at Mecha Capital.', 'Managing Partner at Samaria Tech.')
home_content = home_content.replace('Partner at Mecha Capital focused on AI', 'Partner at Samaria Tech focused on AI')
home_content = home_content.replace('Principal at Mecha Capital leading Finance', 'Principal at Samaria Tech leading Finance')

# Replace email and mobile footer svg
home_content = home_content.replace('contact@mecha.xyz', 'contact@samariatech.com')
home_content = home_content.replace(
    'src="https://cdn.prod.website-files.com/6a180066e6ba27b81a7ef915/6a180066e6ba27b81a7ef9cc_lfooter.svg"',
    'src="/assets/6a180066e6ba27b81a7ef9cc_lfooter.svg"'
)

# Replace Massive Gravity-Physics Footer Logo SVG
shifted_letters, total_w = create_samaria_tech_svg()

new_footer_paths = "\n".join([f'    <path d="{path_str}" fill="currentColor"/>' for char, path_str, orig_x, orig_w in shifted_letters])

footer_old_pattern = re.compile(
    r'<div class="footer-logo"><div class="is-svg is-footer-full w-embed"><svg width="100%" height="100%" viewBox="0 0 1384 296" fill="none" xmlns="http://www.w3.org/2000/svg">.*?</svg></div>',
    re.DOTALL
)

new_footer_svg = f'''<div class="footer-logo"><div class="is-svg is-footer-full w-embed"><svg width="100%" height="100%" viewBox="0 0 {total_w:.0f} 296" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g opacity="0.1" clip-path="url(#clip0_samaria_footer_full)">
{new_footer_paths}
    </g>
    <defs>
    <clipPath id="clip0_samaria_footer_full">
    <rect width="{total_w:.0f}" height="296" fill="transparent"/>
    </clipPath>
    </defs>
    </svg></div>'''

if footer_old_pattern.search(home_content):
    home_content = footer_old_pattern.sub(new_footer_svg, home_content)
    print("Successfully replaced Massive Footer Logo SVG with SAMARIA TECH paths in home.html!")
else:
    print("WARNING: Could not match footer_old_pattern in home.html!")

with open(home_path, 'w', encoding='utf-8') as f:
    f.write(home_content)
print(f"Updated {home_path}")

# 3. Update blog.html and post templates
import glob

subpage_files = glob.glob('src/templates/post-*.html') + ['src/templates/blog.html']

for sp in subpage_files:
    with open(sp, 'r', encoding='utf-8') as f:
        content = f.read()

    content = content.replace('data-wf-domain="mecha-xyz.webflow.io"', 'data-wf-domain="samaria-tech.webflow.io"')
    content = content.replace('| Mecha Blog', '| Samaria Tech Blog')
    content = content.replace('"name": "Mecha"', '"name": "Samaria Tech"')
    content = content.replace(
        'data-src="https://cdn.prod.website-files.com/6a180066e6ba27b81a7ef915/6a180066e6ba27b81a7ef99e_data.json"',
        'data-src="/assets/6a180066e6ba27b81a7ef99e_data.json"'
    )
    content = content.replace('contact@mecha.xyz', 'contact@samariatech.com')
    content = content.replace(
        'src="https://cdn.prod.website-files.com/6a180066e6ba27b81a7ef915/6a180066e6ba27b81a7ef9cc_lfooter.svg"',
        'src="/assets/6a180066e6ba27b81a7ef9cc_lfooter.svg"'
    )

    with open(sp, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Updated {sp}")

print("All replacements executed successfully!")
