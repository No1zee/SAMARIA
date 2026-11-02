import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('public/assets/mecha-shared.css', 'r', encoding='utf-8') as f:
    css = f.read()

for rule in css.split('}'):
    if any(k in rule for k in ['popup-three', 'is-m-model', 'form-model', 'modal-wrap']):
        print(rule.strip() + '}\n')
