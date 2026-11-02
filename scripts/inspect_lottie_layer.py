import json

d = json.load(open('public/assets/6a180066e6ba27b81a7ef938_data.json'))

for l in d['layers']:
    if l['nm'] in ('M', 'A 3'):
        print(f"=== Layer {l['nm']} ===")
        print(json.dumps(l, indent=2)[:1000])
