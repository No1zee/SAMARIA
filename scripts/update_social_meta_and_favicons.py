import re
import os

# 1. Update src/templates/home.html
home_path = 'src/templates/home.html'
with open(home_path, 'r', encoding='utf-8') as f:
    home_content = f.read()

old_og_block = """<meta content="https://cdn.prod.website-files.com/6a180066e6ba27b81a7ef915/6a180066e6ba27b81a7ef9c3_OG-1%20(1).png" property="og:image"/><meta content="Samaria Tech | Web Development, Software &amp; Tech Solutions" name="twitter:title"/><meta content="Samaria Tech builds high-performance websites, custom web applications, and practical tech solutions for businesses." name="twitter:description"/><meta content="website" property="og:type"/><meta content="summary_large_image" name="twitter:card"/>"""

new_og_block = """<meta content="https://samariatech.com/og-image.png" property="og:image"/>
<meta content="1200" property="og:image:width"/>
<meta content="630" property="og:image:height"/>
<meta content="image/png" property="og:image:type"/>
<meta content="Samaria Tech" property="og:site_name"/>
<meta content="https://samariatech.com/" property="og:url"/>
<meta content="website" property="og:type"/>
<meta content="summary_large_image" name="twitter:card"/>
<meta content="@SamariaTech" name="twitter:site"/>
<meta content="Samaria Tech | Web Development, Software &amp; Tech Solutions" name="twitter:title"/>
<meta content="Samaria Tech builds high-performance websites, custom web applications, and practical tech solutions for businesses." name="twitter:description"/>
<meta content="https://samariatech.com/og-image.png" name="twitter:image"/>"""

assert old_og_block in home_content, "old_og_block not found in home.html"
home_content = home_content.replace(old_og_block, new_og_block)

# Verify favicons link in home.html
assert '<link href="/favicon.ico" rel="shortcut icon" type="image/x-icon"/>' in home_content
assert '<link href="/favicon-32x32.png" rel="icon" sizes="32x32" type="image/png"/>' in home_content

with open(home_path, 'w', encoding='utf-8') as f:
    f.write(home_content)

print("Updated src/templates/home.html with new Samaria OG and Twitter metadata!")

# 2. Update src/templates/scope.html
scope_path = 'src/templates/scope.html'
with open(scope_path, 'r', encoding='utf-8') as f:
    scope_content = f.read()

scope_target = '<meta content="Configure and architect your custom software, web platform, or automation system with Samaria Tech." property="og:description"/>'
scope_replacement = """<meta content="Configure and architect your custom software, web platform, or automation system with Samaria Tech." property="og:description"/>
  <meta content="https://samariatech.com/og-image.png" property="og:image"/>
  <meta content="1200" property="og:image:width"/>
  <meta content="630" property="og:image:height"/>
  <meta content="image/png" property="og:image:type"/>
  <meta content="Samaria Tech" property="og:site_name"/>
  <meta content="https://samariatech.com/scope" property="og:url"/>
  <meta content="website" property="og:type"/>
  <meta content="summary_large_image" name="twitter:card"/>
  <meta content="Scope Architect | Samaria Tech" name="twitter:title"/>
  <meta content="Configure and architect your custom software, web platform, or automation system with Samaria Tech." name="twitter:description"/>
  <meta content="https://samariatech.com/og-image.png" name="twitter:image"/>"""

if scope_target in scope_content and 'property="og:image"' not in scope_content:
    scope_content = scope_content.replace(scope_target, scope_replacement)
    with open(scope_path, 'w', encoding='utf-8') as f:
        f.write(scope_content)
    print("Updated src/templates/scope.html!")

# 3. Update all templates in src/templates/ with Webflow OG image
for fname in os.listdir('src/templates'):
    if fname.endswith('.html') and fname not in ['home.html', 'scope.html']:
        p = os.path.join('src/templates', fname)
        with open(p, 'r', encoding='utf-8') as f:
            t = f.read()
        modified = False
        if '6a180066e6ba27b81a7ef915/6a180066e6ba27b81a7ef9c3_OG-1' in t:
            t = t.replace('https://cdn.prod.website-files.com/6a180066e6ba27b81a7ef915/6a180066e6ba27b81a7ef9c3_OG-1%20(1).png', 'https://samariatech.com/og-image.png')
            modified = True
        if '6a180066e6ba27b81a7ef916/6a180066e6ba27b81a7ef91d_Zrzut' in t:
            t = t.replace('https://cdn.prod.website-files.com/6a180066e6ba27b81a7ef916/6a180066e6ba27b81a7ef91d_Zrzut%20ekranu%202026-04-1%20o%2008.51.22%201.jpg', 'https://samariatech.com/og-image.png')
            modified = True
        if modified:
            with open(p, 'w', encoding='utf-8') as f:
                f.write(t)
            print(f"Updated {fname} OG image!")

# 4. Update src/app/layout.tsx
layout_path = 'src/app/layout.tsx'
with open(layout_path, 'r', encoding='utf-8') as f:
    layout_content = f.read()

layout_content = layout_content.replace("url: '/icon-512.png'", "url: '/og-image.png'")
layout_content = layout_content.replace("images: ['/icon-512.png']", "images: ['/og-image.png']")
layout_content = layout_content.replace("width: 512,\n        height: 512,", "width: 1200,\n        height: 630,")

with open(layout_path, 'w', encoding='utf-8') as f:
    f.write(layout_content)
print("Updated src/app/layout.tsx!")
