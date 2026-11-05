with open('src/templates/home.html', 'r', encoding='utf-8') as f:
    text = f.read()

start_idx = text.find('id="investments"')
# Find next top level section or wrapper
end_idx = text.find('id="teams"')
print(f"Start index: {start_idx}, End index: {end_idx}")
snippet = text[start_idx:start_idx+600]
print("Snippet at start:\n", snippet)
snippet_end = text[end_idx-400:end_idx]
print("\nSnippet before teams:\n", snippet_end)
