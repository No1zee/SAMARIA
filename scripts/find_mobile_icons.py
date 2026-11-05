import sys, re
sys.stdout.reconfigure(encoding='utf-8')

with open(r'c:\Projects\SAMARIA\src\templates\home.html', 'r', encoding='utf-8') as f:
    text = f.read()

# find mobile buttons or navigation elements
for m in re.finditer(r'<div[^>]*class="[^"]*(?:mobile|burger|menu-btn|nav-toggle|brand-logo|nav-logo)[^"]*"[^>]*>', text, re.IGNORECASE):
    print("Match:", m.group(0))
