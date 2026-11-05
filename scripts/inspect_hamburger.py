import sys
sys.stdout.reconfigure(encoding='utf-8')

with open(r'c:\Projects\SAMARIA\src\templates\home.html', 'r', encoding='utf-8') as f:
    text = f.read()

pos = text.find('bold-nav-full__hamburger-bar')
if pos != -1:
    print(text[max(0, pos-400):min(len(text), pos+600)])
