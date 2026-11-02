import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('src/templates/home.html', 'r', encoding='utf-8') as f:
    text = f.read()

start = text.find('class="cw_team')
end = text.find('</section>', start)
print(text[start:end])
