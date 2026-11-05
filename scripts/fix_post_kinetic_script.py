import glob
import re

# Exact block from blog.html from function initScrollAnimations() up to document.querySelectorAll('[scroll-clip]')
with open('src/templates/blog.html', 'r', encoding='utf-8') as f:
    blog_content = f.read()

pattern_blog = r'(function initScrollAnimations\(\)\s*\{[\s\S]*?)(document\.querySelectorAll\(\'\[scroll-clip\]\'\))'
m_blog = re.search(pattern_blog, blog_content)
if not m_blog:
    print("Could not find block in blog.html")
    exit(1)

clean_block = m_blog.group(1)

# Now in each post template, replace from function initScrollAnimations() up to document.querySelectorAll('[scroll-clip]')
for pf in glob.glob('src/templates/post-*.html'):
    with open(pf, 'r', encoding='utf-8') as f:
        content = f.read()

    pattern_pf = r'function initScrollAnimations\(\)\s*\{[\s\S]*?(?=document\.querySelectorAll\(\'\[scroll-clip\]\'\))'
    if re.search(pattern_pf, content):
        content = re.sub(pattern_pf, clean_block, content)
        with open(pf, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Fixed {pf}")
    else:
        print(f"Pattern not found in {pf}")
