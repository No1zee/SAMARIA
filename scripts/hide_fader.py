def hide_fader():
    with open('src/templates/home.html', 'r', encoding='utf-8') as f:
        html = f.read()

    target = "/* Guarantee 3D Coin visibility & sizing regardless of Webflow IX3 state */"
    replacement = """/* Eliminate rogue Webflow blue page-fader */
.page-fader {
  display: none !important;
  opacity: 0 !important;
  visibility: hidden !important;
  pointer-events: none !important;
}

/* Guarantee 3D Coin visibility & sizing regardless of Webflow IX3 state */"""

    html = html.replace(target, replacement, 1)

    with open('src/templates/home.html', 'w', encoding='utf-8') as f:
        f.write(html)
    print("Successfully hidden page-fader!")

if __name__ == '__main__':
    hide_fader()
