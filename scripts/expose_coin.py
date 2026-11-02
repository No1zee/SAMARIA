def expose_coin():
    with open('src/templates/home.html', 'r', encoding='utf-8') as f:
        html = f.read()

    target = "    const coin = new THREE.Mesh(geometry, materials);\n    scene.add(coin);"
    replacement = "    const coin = new THREE.Mesh(geometry, materials);\n    window.__coinMesh = coin;\n    scene.add(coin);"

    if target in html:
        html = html.replace(target, replacement, 1)
        with open('src/templates/home.html', 'w', encoding='utf-8') as f:
            f.write(html)
        print("Exposed window.__coinMesh in home.html")
    else:
        print("Target not found")

if __name__ == '__main__':
    expose_coin()
