with open('src/templates/home.html', 'r', encoding='utf-8') as f:
    text = f.read()

import re
matches = re.findall(r'<div[^>]*class="[^"]*is-more[^"]*"[^>]*>.*?</div>', text)
print('Matches for is-more:', matches)
