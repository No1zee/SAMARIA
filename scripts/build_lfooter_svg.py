import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from build_samaria_svg import create_samaria_tech_svg

shifted_letters, total_w = create_samaria_tech_svg()

svg_content = f'''<svg width="100%" height="100%" viewBox="0 0 {total_w:.0f} 296" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_samaria_footer)">
'''

for char, path_str, orig_x, orig_w in shifted_letters:
    svg_content += f'  <path d="{path_str}" fill="currentColor"/>\n'

svg_content += f'''</g>
<defs>
<clipPath id="clip0_samaria_footer">
<rect width="{total_w:.0f}" height="296" fill="white"/>
</clipPath>
</defs>
</svg>'''

output_path = 'public/assets/6a180066e6ba27b81a7ef9cc_lfooter.svg'
with open(output_path, 'w', encoding='utf-8') as f:
    f.write(svg_content)

print(f"Generated mobile footer SVG successfully at {output_path}!")
