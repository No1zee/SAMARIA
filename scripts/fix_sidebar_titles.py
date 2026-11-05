with open('src/templates/home.html', 'r', encoding='utf-8') as f:
    c = f.read()

# Replace style="display:none;" on title-li with accessible offscreen
c = c.replace(
    'class="title-li is-project is-simle" section-navi="main-menu-item" style="display:none;"',
    'class="title-li is-project is-simle" section-navi="main-menu-item" style="position: absolute; width: 1px; height: 1px; margin: -1px; padding: 0; overflow: hidden; clip: rect(0, 0, 0, 0); border: 0;"'
)

with open('src/templates/home.html', 'w', encoding='utf-8') as f:
    f.write(c)

print("Updated title-li visibility in home.html")
