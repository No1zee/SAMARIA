with open('src/templates/home.html', 'r', encoding='utf-8') as f:
    text = f.read()

idx = text.find('m-popup-container')
if idx != -1:
    print('=== Container definition ===')
    print(text[max(0, idx-200):min(len(text), idx+400)])

    # Search for script using m-popup-container
    script_idx = text.find('m-popup-container', idx + 50)
    if script_idx != -1:
        print('\n=== Script using m-popup-container ===')
        print(text[max(0, script_idx-100):min(len(text), script_idx+1200)])
else:
    print('m-popup-container not found')
