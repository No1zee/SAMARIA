import os
import re

TARGET_FILE = os.path.join("src", "templates", "home.html")

COIN_SCRIPT = """
<!-- Three.js Local Standalone Engine -->
<script src="/assets/three.min.js"></script>

<style>
/* Guarantee 3D Coin visibility & sizing regardless of Webflow IX3 state */
#m-mecha-container {
  width: 100% !important;
  height: 380px !important;
  min-height: 300px !important;
  position: relative !important;
  visibility: visible !important;
  opacity: 1 !important;
  display: block !important;
  z-index: 15 !important;
  cursor: grab;
  touch-action: none;
}
#m-mecha-container canvas {
  width: 100% !important;
  height: 100% !important;
  display: block !important;
  visibility: visible !important;
  opacity: 1 !important;
  position: absolute !important;
  top: 0 !important;
  left: 0 !important;
}
.sidebar-video.is-3d,
.embed-three,
.video-wrapper {
  visibility: visible !important;
  opacity: 1 !important;
  overflow: visible !important;
}
</style>

<div id="m-mecha-container"></div>

<script>
(function() {
  function initCoin() {
    if (typeof THREE === 'undefined') {
      setTimeout(initCoin, 50);
      return;
    }

    const container = document.getElementById('m-mecha-container');
    if (!container) return;

    // Clear any existing children
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }

    const width = container.clientWidth || 400;
    const height = container.clientHeight || 380;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 50);
    camera.position.set(0, 0, 4.3);

    // 2. High-precision PBR Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    container.appendChild(renderer.domElement);

    // 3. Studio Lighting (22K Gold Sovereign warm highlights)
    const ambientLight = new THREE.AmbientLight(0xfff6e5, 1.2);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffeaaf, 3.2);
    keyLight.position.set(4, 5, 5);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xd49b42, 2.0);
    fillLight.position.set(-4, -2, 4);
    scene.add(fillLight);

    const backLight = new THREE.DirectionalLight(0xfff1cc, 2.4);
    backLight.position.set(0, 4, -6);
    scene.add(backLight);

    const gleamLight = new THREE.PointLight(0xfffae8, 3.0, 12);
    gleamLight.position.set(0, 2, 4);
    scene.add(gleamLight);

    // 4. Load 22K Sovereign Gold Textures
    const textureLoader = new THREE.TextureLoader();
    const diffuseFront = textureLoader.load('/assets/coin/sovereign_diffuse.png', () => renderer.render(scene, camera));
    const normalFront = textureLoader.load('/assets/coin/sovereign_normal.png', () => renderer.render(scene, camera));
    const roughnessFront = textureLoader.load('/assets/coin/sovereign_roughness.png');

    const diffuseBack = textureLoader.load('/assets/coin/sovereign_back_diffuse.png', () => renderer.render(scene, camera));
    const edgeDiffuse = textureLoader.load('/assets/coin/sovereign_edge_diffuse.png', () => renderer.render(scene, camera));

    diffuseFront.colorSpace = THREE.SRGBColorSpace;
    diffuseBack.colorSpace = THREE.SRGBColorSpace;
    edgeDiffuse.colorSpace = THREE.SRGBColorSpace;
    edgeDiffuse.wrapS = THREE.RepeatWrapping;
    edgeDiffuse.repeat.set(6, 1);

    const SOVEREIGN_GOLD = 0xd2a748;

    const frontMaterial = new THREE.MeshPhysicalMaterial({
      color: SOVEREIGN_GOLD,
      metalness: 0.95,
      roughness: 0.35,
      roughnessMap: roughnessFront,
      map: diffuseFront,
      normalMap: normalFront,
      normalScale: new THREE.Vector2(1.35, 1.35),
      clearcoat: 0.25,
      clearcoatRoughness: 0.22,
    });

    const backMaterial = new THREE.MeshPhysicalMaterial({
      color: SOVEREIGN_GOLD,
      metalness: 0.95,
      roughness: 0.35,
      roughnessMap: roughnessFront,
      map: diffuseBack,
      normalMap: normalFront,
      normalScale: new THREE.Vector2(1.35, 1.35),
      clearcoat: 0.25,
      clearcoatRoughness: 0.22,
    });

    const edgeMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xba9038,
      metalness: 0.95,
      roughness: 0.42,
      map: edgeDiffuse,
      bumpMap: edgeDiffuse,
      bumpScale: 0.02,
    });

    // 5. Coin Mesh
    const COIN_RADIUS = 1.25;
    const COIN_THICKNESS = 0.125;
    const geometry = new THREE.CylinderGeometry(COIN_RADIUS, COIN_RADIUS, COIN_THICKNESS, 128, 1);
    geometry.rotateX(Math.PI / 2);

    const materials = [edgeMaterial, frontMaterial, backMaterial];
    const coin = new THREE.Mesh(geometry, materials);
    scene.add(coin);

    // Raised Upset Rim Ring
    const rimGeo = new THREE.TorusGeometry(COIN_RADIUS - 0.012, 0.018, 20, 128);
    const rimMat = new THREE.MeshPhysicalMaterial({
      color: 0xd9ab48,
      metalness: 0.95,
      roughness: 0.32,
      clearcoat: 0.3,
    });
    const frontRim = new THREE.Mesh(rimGeo, rimMat);
    frontRim.position.z = COIN_THICKNESS / 2;
    coin.add(frontRim);

    const backRim = new THREE.Mesh(rimGeo, rimMat);
    backRim.position.z = -COIN_THICKNESS / 2;
    coin.add(backRim);

    // Initial render
    renderer.render(scene, camera);

    // 6. Interactive Drag & Spin Physics
    let isDragging = false;
    let pointerStart = { x: 0, y: 0 };
    let velocity = { x: 0, y: 0 };
    let dragRotation = { x: 0, y: 0 };

    function getPoint(e) {
      if (e.touches && e.touches.length > 0) {
        return { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
      return { x: e.clientX, y: e.clientY };
    }

    function onPointerDown(e) {
      if (!container.contains(e.target)) return;
      isDragging = true;
      const p = getPoint(e);
      pointerStart.x = p.x;
      pointerStart.y = p.y;
      velocity.x = 0;
      velocity.y = 0;
      container.style.cursor = 'grabbing';
    }

    function onPointerMove(e) {
      if (!isDragging) return;
      const p = getPoint(e);
      const dx = p.x - pointerStart.x;
      const dy = p.y - pointerStart.y;
      pointerStart.x = p.x;
      pointerStart.y = p.y;

      const sensitivity = 0.008;
      dragRotation.y += dx * sensitivity;
      dragRotation.x += dy * sensitivity;

      velocity.x = dx * sensitivity;
      velocity.y = dy * sensitivity;
    }

    function onPointerUp() {
      if (isDragging) {
        isDragging = false;
        container.style.cursor = 'grab';
      }
    }

    window.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);

    window.addEventListener('touchstart', onPointerDown, { passive: true });
    window.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('touchend', onPointerUp);

    // 7. Scroll-linked 3D rotation
    let scrollRotationY = 0;
    function onScroll() {
      const maxScroll = (document.documentElement.scrollHeight - window.innerHeight) || 1;
      const progress = window.scrollY / maxScroll;
      scrollRotationY = progress * Math.PI * 4; // 2 complete revolutions over the page
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // 8. Resize Handler
    function onResize() {
      const w = container.clientWidth || 400;
      const h = container.clientHeight || 380;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    }
    window.addEventListener('resize', onResize);

    // 9. Animation Loop
    let clock = new THREE.Clock();
    function animate() {
      requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Inertia decay
      if (!isDragging) {
        dragRotation.y += velocity.x;
        dragRotation.x += velocity.y;
        velocity.x *= 0.94;
        velocity.y *= 0.94;

        // Subtle ambient continuous spin
        dragRotation.y += 0.004;
      }

      // Combine scroll scrub + interactive drag + subtle floating tilt
      coin.rotation.y = scrollRotationY + dragRotation.y;
      coin.rotation.x = dragRotation.x + Math.sin(elapsedTime * 1.2) * 0.04;
      coin.rotation.z = Math.cos(elapsedTime * 0.9) * 0.03;

      // Subtle vertical floating bob
      coin.position.y = Math.sin(elapsedTime * 1.5) * 0.05;

      // Move gleam light
      gleamLight.position.x = Math.sin(elapsedTime * 0.8) * 3;
      gleamLight.position.y = Math.cos(elapsedTime * 0.6) * 2;

      renderer.render(scene, camera);
    }
    animate();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCoin);
  } else {
    initCoin();
  }
})();
</script>
"""

def apply_fix():
    with open(TARGET_FILE, "r", encoding="utf-8") as f:
        html = f.read()

    # 1. Clean up duplicate/conflicting importmaps
    html = re.sub(r'<script type="importmap">.*?</script>\s*', '', html, flags=re.DOTALL)

    # 2. Add Three.js to head if not present
    if '/assets/three.min.js' not in html:
        html = html.replace('</head>', '<script src="/assets/three.min.js"></script>\n</head>')

    # 3. Remove FOUC hidden visibility rules on [scroll="video"] and [scroll="embed"]
    html = re.sub(
        r'html\.w-mod-js:not\(\.w-mod-ix3\):is\(\[scroll="embed"\]\)[^{]*\{visibility:\s*hidden\s*!important;\}',
        '/* scroll embed rule cleared */',
        html
    )
    html = re.sub(
        r'html\.w-mod-js:not\(\.w-mod-ix3\):is\(\[scroll="video"\]\)[^{]*\{visibility:\s*hidden\s*!important;\}',
        '/* scroll video rule cleared */',
        html
    )

    # 4. Strip scroll="video", scroll="embed", and preloader-clip from sidebar video container
    html = html.replace('<div class="video-wrapper" scroll="video">', '<div class="video-wrapper">')
    html = html.replace('<div class="sidebar-video is-3d" scroll="embed">', '<div class="sidebar-video is-3d">')
    html = html.replace('<div class="embed-three w-embed w-script" preloader-clip="">', '<div class="embed-three w-embed w-script">')

    # 5. Replace entire contents of embed-three with the self-contained COIN_SCRIPT
    embed_idx = html.find('class="embed-three')
    if embed_idx != -1:
        closing_div = html.find('</div>', embed_idx)
        # Find where the previous script ended
        end_script = html.find('</div>', html.find('id="m-mecha-container"', embed_idx))
        next_tag = html.find('</div>', end_script + 1) # end of embed-three
        
        # Replace the innerHTML of .embed-three
        inner_start = html.find('>', embed_idx) + 1
        inner_end = next_tag
        html = html[:inner_start] + COIN_SCRIPT + html[inner_end:]
        print("✓ Successfully replaced .embed-three inner content with self-contained 3D Coin script.")

    with open(TARGET_FILE, "w", encoding="utf-8") as f:
        f.write(html)

    print("✓ Successfully updated home.html!")

if __name__ == "__main__":
    apply_fix()
