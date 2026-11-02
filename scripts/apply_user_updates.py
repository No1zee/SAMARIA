import re

def apply_all():
    with open('src/templates/home.html', 'r', encoding='utf-8') as f:
        html = f.read()

    # --- 1. FIX THE BACK OF THE COIN ---
    # Load normalBack and roughnessBack
    old_texture_loader = """    const diffuseBack = textureLoader.load('/assets/coin/sovereign_back_diffuse.png', () => renderer.render(scene, camera));
    const edgeDiffuse = textureLoader.load('/assets/coin/sovereign_edge_diffuse.png', () => renderer.render(scene, camera));

    diffuseFront.colorSpace = THREE.SRGBColorSpace;
    diffuseBack.colorSpace = THREE.SRGBColorSpace;"""

    new_texture_loader = """    const diffuseBack = textureLoader.load('/assets/coin/sovereign_back_diffuse.png', () => renderer.render(scene, camera));
    const normalBack = textureLoader.load('/assets/coin/sovereign_back_normal.png', () => renderer.render(scene, camera));
    const roughnessBack = textureLoader.load('/assets/coin/sovereign_back_roughness.png');
    const edgeDiffuse = textureLoader.load('/assets/coin/sovereign_edge_diffuse.png', () => renderer.render(scene, camera));

    diffuseFront.colorSpace = THREE.SRGBColorSpace;
    diffuseBack.colorSpace = THREE.SRGBColorSpace;"""

    if old_texture_loader in html:
        html = html.replace(old_texture_loader, new_texture_loader, 1)
        print("Updated texture loading for back face.")
    else:
        print("Warning: old_texture_loader not found.")

    # Update backMaterial
    old_back_mat = """    const backMaterial = new THREE.MeshPhysicalMaterial({
      color: SOVEREIGN_GOLD,
      metalness: 0.88,
      roughness: 0.28,
      roughnessMap: roughnessFront,
      map: diffuseBack,
      normalMap: normalFront,
      normalScale: new THREE.Vector2(1.2, 1.2),
      clearcoat: 0.35,
      clearcoatRoughness: 0.2,
      envMapIntensity: 1.4,
    });"""

    new_back_mat = """    const backMaterial = new THREE.MeshPhysicalMaterial({
      color: SOVEREIGN_GOLD,
      metalness: 0.88,
      roughness: 0.28,
      roughnessMap: roughnessBack,
      map: diffuseBack,
      normalMap: normalBack,
      normalScale: new THREE.Vector2(1.2, 1.2),
      clearcoat: 0.35,
      clearcoatRoughness: 0.2,
      envMapIntensity: 1.4,
    });"""

    if old_back_mat in html:
        html = html.replace(old_back_mat, new_back_mat, 1)
        print("Updated backMaterial to use sovereign_back_normal and sovereign_back_roughness.")
    else:
        print("Warning: old_back_mat not found.")

    # --- 2. REMOVE "PE DISCIPLINE VC UPSIDE" INFOGRAPHIC ---
    # Desktop infographic
    html = re.sub(
        r'<div class="hero-infographics"[^>]*>.*?</div>',
        '<!-- Hero infographic removed per user specification -->',
        html,
        flags=re.DOTALL
    )
    # Mobile infographic
    html = re.sub(
        r'<img[^>]*class="[^"]*is-infographic is-hero is-mobile[^"]*"[^>]*/>',
        '<!-- Mobile infographic removed -->',
        html
    )
    print("Removed PE discipline / VC upside infographics.")

    # --- 3. REPLACE "INVESTMENTS" WITH "WHAT WE DO" ---
    # Top navbar
    html = html.replace('<div class="is-caption">INVESTMENTS</div>', '<div class="is-caption">WHAT WE DO</div>')
    # Fullscreen / mobile nav
    html = html.replace('<span class="bold-nav-full__link-text">Investments</span>', '<span class="bold-nav-full__link-text">What We Do</span>')
    # Sidebar main section title
    html = html.replace('section-navi="main-section-title">Investments</div>', 'section-navi="main-section-title">What We Do</div>')
    # Section navi group attribute
    html = html.replace('section-navi-group="Investments"', 'section-navi-group="What We Do"')
    
    print("Replaced 'Investments' with 'What We Do'.")

    with open('src/templates/home.html', 'w', encoding='utf-8') as f:
        f.write(html)
    print("Successfully updated src/templates/home.html!")

if __name__ == '__main__':
    apply_all()
