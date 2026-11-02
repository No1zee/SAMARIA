with open('src/templates/home.html', 'r', encoding='utf-8') as f:
    text = f.read()

idx = text.find('/assets/M_Mecha._v2.glb')
start = text.rfind('<script', 0, idx)
end = text.find('</script>', idx) + len('</script>')
print(text[start:end])
