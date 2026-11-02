import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('public/assets/mecha-shared.css', 'r', encoding='utf-8') as f:
    css = f.read()

for rule in css.split('}'):
    if 'form-popup' in rule or 'form-model' in rule:
        print(rule.strip() + '}\n')
