import re

cursor_css = """
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

# 1. Update home.html
with open('src/templates/home.html', 'r', encoding='utf-8') as f:
    home_content = f.read()

# Remove cursor DOM elements in home.html
dom_pattern_home = re.compile(
    r'<div class="cursor-wrap not-blend">[\s\S]*?<div class="custom-cursor art"></div></div>',
    re.MULTILINE
)
if dom_pattern_home.search(home_content):
    home_content = dom_pattern_home.sub('', home_content)
    print("Removed cursor DOM elements in home.html")
else:
    print("WARNING: cursor DOM pattern not found in home.html")

# Remove cursor scripts in home.html (between the form validation and previous script)
script_pattern_home = re.compile(
    r'<script>\s*const SELECTOR = \'a, button, \[href\], \.hoverable\';[\s\S]*?cursorRafId = requestAnimationFrame\(animate\);\s*\}\)\(\);\s*</script>',
    re.MULTILINE
)
if script_pattern_home.search(home_content):
    home_content = script_pattern_home.sub('', home_content)
    print("Removed cursor tracking scripts in home.html")
else:
    print("WARNING: cursor scripts pattern not found in home.html")

# Inject CSS before </head> in home.html
if '</head>' in home_content:
    home_content = home_content.replace('</head>', cursor_css + '</head>', 1)
    print("Injected native cursor CSS in home.html")

with open('src/templates/home.html', 'w', encoding='utf-8') as f:
    f.write(home_content)

# 2. Update blog.html
with open('src/templates/blog.html', 'r', encoding='utf-8') as f:
    blog_content = f.read()

# Remove cursor DOM elements in blog.html
dom_pattern_blog = re.compile(
    r'<div class="cursor-wrap not-blend">[\s\S]*?<div class="custom-cursor art"></div></div>',
    re.MULTILINE
)
if dom_pattern_blog.search(blog_content):
    blog_content = dom_pattern_blog.sub('', blog_content)
    print("Removed cursor DOM elements in blog.html")
else:
    print("WARNING: cursor DOM pattern not found in blog.html")

# Remove cursor scripts in blog.html
script_pattern_blog = re.compile(
    r'<script>\s*const SELECTOR = \'a, button, \[href\], \.hoverable\';[\s\S]*?requestAnimationFrame\(animate\);\s*\}\)\(\);\s*</script>',
    re.MULTILINE
)
if script_pattern_blog.search(blog_content):
    blog_content = script_pattern_blog.sub('', blog_content)
    print("Removed cursor tracking scripts in blog.html")
else:
    print("WARNING: cursor scripts pattern not found in blog.html")

# Inject CSS before </head> in blog.html
if '</head>' in blog_content:
    blog_content = blog_content.replace('</head>', cursor_css + '</head>', 1)
    print("Injected native cursor CSS in blog.html")

with open('src/templates/blog.html', 'w', encoding='utf-8') as f:
    f.write(blog_content)

# 3. Update 404.html
with open('src/templates/404.html', 'r', encoding='utf-8') as f:
    fof_content = f.read()

if '</head>' in fof_content:
    fof_content = fof_content.replace('</head>', cursor_css + '</head>', 1)
    print("Injected native cursor CSS in 404.html")

with open('src/templates/404.html', 'w', encoding='utf-8') as f:
    f.write(fof_content)

print("All templates updated.")
