with open(r'c:\Projects\SAMARIA\src\templates\home.html', 'r', encoding='utf-8') as f:
    text = f.read()

target_m = '<div class="hamb-icon"><div class="is-svg is-m-icon w-embed"><svg fill="none" height="100%" viewbox="0 0 10 10" width="100%" xmlns="http://www.w3.org/2000/svg">\n<path d="M0 9.45724V0H1.36205L4.62582 7.90245H4.65152L7.8896 0H9.25164V9.45724H8.12089V2.27436H8.09519L5.1398 9.45724H4.11184L1.15646 2.27436H1.13076V9.45724H0Z" fill="currentColor"></path>\n</svg></div></div>'
print("Found target_m:", target_m in text)
if not target_m in text:
    pos = text.find('hamb-icon')
    print("Found around hamb-icon:")
    print(repr(text[pos:pos+350]))
