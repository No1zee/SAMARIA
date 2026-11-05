file_path = r'c:\Projects\SAMARIA\src\templates\home.html'
with open(file_path, 'r', encoding='utf-8') as f:
    text = f.read()

target = '<a class="top-link hoverable w-inline-block" href="#contact"><div class="is-caption">Contact</div></a>'
replacement = '<a class="top-link hoverable w-inline-block" href="#contact"><div class="is-caption">Contact</div></a><a class="top-link hoverable w-inline-block" href="/scope"><div class="is-caption">Scope</div></a>'

if target in text:
    new_text = text.replace(target, replacement, 1)
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(new_text)
    print("Inserted Scope link into top-nav successfully!")
else:
    print("Target not found")
