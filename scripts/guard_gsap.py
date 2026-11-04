import re

with open('src/templates/home.html', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Guard [scroll-name]
pattern_scroll_name = re.compile(
    r'(document\.querySelectorAll\(\'\[scroll-name\]\'\)\.forEach\(function\s*\(nameEl\)\s*\{[\s\S]*?lines\.push\(inner\);\s*\}\);)(\s*gsap\.set\(lines,)',
    re.MULTILINE
)
content = pattern_scroll_name.sub(r'\1\n      if (!lines.length) return;\2', content)

# 2. Guard [scroll-small-name]
pattern_small_name = re.compile(
    r'(document\.querySelectorAll\(\'\[scroll-small-name\]\'\)\.forEach\(function\s*\(nameEl\)\s*\{[\s\S]*?lines\.push\(inner\);\s*\}\);)(\s*gsap\.set\(lines,)',
    re.MULTILINE
)
content = pattern_small_name.sub(r'\1\n      if (!lines.length) return;\2', content)

# 3. Guard [line-container] nameLines
pattern_line_container = re.compile(
    r'gsap\.set\(nameLines,\s*\{[^}]+\}\);',
    re.MULTILINE
)
content = pattern_line_container.sub(
    r'if (nameLines.length > 0) gsap.set(nameLines, { yPercent: 110, rotateX: 30, opacity: 0, filter: \'blur(4px)\' });',
    content
)

with open('src/templates/home.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Applied GSAP safety guards to src/templates/home.html")
