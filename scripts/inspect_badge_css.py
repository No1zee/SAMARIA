import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('public/assets/mecha-shared.css', 'r', encoding='utf-8') as f:
    css = f.read()

for rule in css.split('}'):
    if 'w-webflow-badge' in rule:
        print(rule.strip() + '}\n')
