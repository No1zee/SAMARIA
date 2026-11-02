def apply_uv():
    with open('src/templates/home.html', 'r', encoding='utf-8') as f:
        html = f.read()

    target = "    geometry.rotateX(Math.PI / 2);"
    if target not in html:
        print("Target not found")
        return

    replacement = """    geometry.rotateX(Math.PI / 2);

    // Explicit Planar UV Mapping: Guarantees coin face is 100% upright & vertically aligned
    const pos = geometry.attributes.position;
    const uvs = geometry.attributes.uv;
    for (let i = 0; i < pos.count; i++) {
      const z = pos.getZ(i);
      const x = pos.getX(i);
      const y = pos.getY(i);
      if (z > COIN_THICKNESS * 0.2) {
        // Front face (Z+): perfectly upright, top at +Y
        uvs.setXY(i, (x / (2 * COIN_RADIUS)) + 0.5, (y / (2 * COIN_RADIUS)) + 0.5);
      } else if (z < -COIN_THICKNESS * 0.2) {
        // Back face (Z-): perfectly upright & un-mirrored
        uvs.setXY(i, (-x / (2 * COIN_RADIUS)) + 0.5, (y / (2 * COIN_RADIUS)) + 0.5);
      }
    }
    uvs.needsUpdate = true;"""

    html = html.replace(target, replacement, 1)

    with open('src/templates/home.html', 'w', encoding='utf-8') as f:
        f.write(html)
    print("Successfully injected explicit planar UV mapping!")

if __name__ == '__main__':
    apply_uv()
