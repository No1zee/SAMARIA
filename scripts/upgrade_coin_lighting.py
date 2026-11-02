import sys

def upgrade_lighting():
    with open('src/templates/home.html', 'r', encoding='utf-8') as f:
        html = f.read()

    # Locate the script block for the sidebar coin
    start_marker = "<!-- Three.js Local Standalone Engine -->"
    end_marker = "</script>\n\n<script type=\"text/javascript\" src=\"/assets/jquery-3.5.1.min.dc5e7f18c8.js\""

    if start_marker not in html:
        print("Could not find start_marker in home.html")
        sys.exit(1)

    start_idx = html.find(start_marker)
    # Find the closing script tag for this block
    close_idx = html.find("</script>", start_idx + 100)
    # The block ends after the inner script closing tag
    # Let's find the second </script> after start_marker
    first_script_close = html.find("</script>", start_idx)
    second_script_close = html.find("</script>", first_script_close + 10)

    old_block = html[start_idx:second_script_close + len("</script>")]

    new_block = """<!-- Three.js Local Standalone Engine -->
<script src="/assets/three.min.js"></script>

<style>
/* Guarantee 3D Coin visibility & sizing regardless of Webflow IX3 state */
#m-mecha-container {
  width: 100% !important;
  height: 380px !important;
  min-height: 320px !important;
  position: relative !important;
  visibility: visible !important;
  opacity: 1 !important;
  display: block !important;
  z-index: 15 !important;
  cursor: grab;
  touch-action: none;
  background: transparent !important;
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
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 50);
    camera.position.set(0, 0, 4.2);

    // 2. High-precision PBR Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    // 3. Studio HDRI Reflection Map (Procedural Warm Softbox Studio)
    const envCanvas = document.createElement('canvas');
    envCanvas.width = 1024;
    envCanvas.height = 512;
    const eCtx = envCanvas.getContext('2d');
    
    // Smooth vertical radiant gradient: warm studio ceiling down to dark floor
    const grad = eCtx.createLinearGradient(0, 0, 0, 512);
    grad.addColorStop(0.0, '#ffffff'); // bright overhead sky
    grad.addColorStop(0.25, '#fff5db'); // warm key fill
    grad.addColorStop(0.48, '#e6be65'); // rich 22K gold horizon
    grad.addColorStop(0.55, '#a07828'); // warm gold ground
    grad.addColorStop(0.75, '#3d2e12'); // deep warm low tone
    grad.addColorStop(1.0, '#151008'); // floor
    eCtx.fillStyle = grad;
    eCtx.fillRect(0, 0, 1024, 512);

    // Add soft studio softbox panels for realistic metallic specular cuts
    eCtx.fillStyle = 'rgba(255, 255, 255, 0.95)';
    eCtx.filter = 'blur(12px)';
    eCtx.fillRect(150, 60, 220, 140);
    eCtx.fillRect(600, 80, 260, 120);
    eCtx.filter = 'none';

    const envTexture = new THREE.CanvasTexture(envCanvas);
    envTexture.mapping = THREE.EquirectangularReflectionMapping;
    scene.environment = envTexture;

    // 4. Balanced Studio Lighting
    const hemiLight = new THREE.HemisphereLight(0xfff8ea, 0x44331b, 1.8);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xfffae8, 3.0);
    keyLight.position.set(3.5, 4.5, 4.0);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xffe8aa, 1.8);
    fillLight.position.set(-4.0, -1.5, 3.5);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xffffff, 2.5);
    rimLight.position.set(-2.0, 4.0, -4.5);
    scene.add(rimLight);

    const gleamLight = new THREE.PointLight(0xfff5d8, 2.0, 15);
    gleamLight.position.set(0, 2.5, 3.5);
    scene.add(gleamLight);

    // 5. Load 22K Sovereign Gold Textures
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

    const SOVEREIGN_GOLD = 0xdeb34a; // Authentic 22K Crown Gold alloy

    const frontMaterial = new THREE.MeshPhysicalMaterial({
      color: SOVEREIGN_GOLD,
      metalness: 0.88,
      roughness: 0.28,
      roughnessMap: roughnessFront,
      map: diffuseFront,
      normalMap: normalFront,
      normalScale: new THREE.Vector2(1.2, 1.2),
      clearcoat: 0.35,
      clearcoatRoughness: 0.2,
      envMapIntensity: 1.4,
    });

    const backMaterial = new THREE.MeshPhysicalMaterial({
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
    });

    const edgeMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xc89d38,
      metalness: 0.90,
      roughness: 0.35,
      map: edgeDiffuse,
      bumpMap: edgeDiffuse,
      bumpScale: 0.02,
      envMapIntensity: 1.2,
    });

    // 6. Coin Cylinder Geometry
    const COIN_RADIUS = 1.30;
    const COIN_THICKNESS = 0.125;
    const geometry = new THREE.CylinderGeometry(COIN_RADIUS, COIN_RADIUS, COIN_THICKNESS, 128, 1);
    geometry.rotateX(Math.PI / 2);

    // Order: [0: edge, 1: front (Z+), 2: back (Z-)]
    const materials = [edgeMaterial, frontMaterial, backMaterial];
    const coin = new THREE.Mesh(geometry, materials);
    scene.add(coin);

    // Raised Upset Rim Ring on both faces
    const rimGeo = new THREE.TorusGeometry(COIN_RADIUS - 0.012, 0.018, 24, 128);
    const rimMat = new THREE.MeshPhysicalMaterial({
      color: 0xdeb34a,
      metalness: 0.90,
      roughness: 0.25,
      clearcoat: 0.4,
      envMapIntensity: 1.5,
    });
    const frontRim = new THREE.Mesh(rimGeo, rimMat);
    frontRim.position.z = COIN_THICKNESS / 2;
    coin.add(frontRim);

    const backRim = new THREE.Mesh(rimGeo, rimMat);
    backRim.position.z = -COIN_THICKNESS / 2;
    coin.add(backRim);

    // Initial orientation: front face facing forward with slight 3D angle
    coin.rotation.set(0.12, 0.25, 0.0);

    // Initial render
    renderer.render(scene, camera);

    // 7. Interactive Drag & Spin Physics
    let isDragging = false;
    let pointerStart = { x: 0, y: 0 };
    let velocity = { x: 0, y: 0 };
    let dragRotation = { x: 0.12, y: 0.25 };

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

    // 8. Scroll-linked 3D rotation
    let scrollRotationY = 0;
    function onScroll() {
      const maxScroll = (document.documentElement.scrollHeight - window.innerHeight) || 1;
      const progress = window.scrollY / maxScroll;
      scrollRotationY = progress * Math.PI * 4; // 2 complete revolutions across full page scroll
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // 9. Resize Handler
    function onResize() {
      const w = container.clientWidth || 400;
      const h = container.clientHeight || 380;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    }
    window.addEventListener('resize', onResize);

    // 10. Animation Loop
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
        dragRotation.y += 0.005;
      }

      // Combine scroll scrub + interactive drag + subtle floating tilt
      coin.rotation.y = scrollRotationY + dragRotation.y;
      coin.rotation.x = dragRotation.x + Math.sin(elapsedTime * 1.2) * 0.04;
      coin.rotation.z = Math.cos(elapsedTime * 0.9) * 0.03;

      // Subtle vertical floating bob
      coin.position.y = Math.sin(elapsedTime * 1.5) * 0.04;

      // Dynamic studio specular sweep
      gleamLight.position.x = Math.sin(elapsedTime * 0.8) * 3.5;
      gleamLight.position.y = Math.cos(elapsedTime * 0.6) * 2.5;

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
</script>"""

    html = html.replace(old_block, new_block)
    with open('src/templates/home.html', 'w', encoding='utf-8') as f:
        f.write(html)

    print("Successfully upgraded sidebar coin lighting & PBR environment!")

if __name__ == '__main__':
    upgrade_lighting()
