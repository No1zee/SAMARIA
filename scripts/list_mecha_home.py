import re

with open('src/templates/home.html', encoding='utf-8', errors='ignore') as f:
    lines = f.readlines()

for line_no, line in enumerate(lines, 1):
    for m in re.finditer(r'mecha', line, re.I):
        start = max(0, m.start() - 60)
        end = min(len(line), m.end() + 60)
        print(f"Line {line_no} [{m.start()}]: ...{line[start:end].strip()}...")
