import re

home_path = 'src/templates/home.html'
with open(home_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update HTML: give mobile-three the ID m-mobile-mecha-container
old_mobile_render = '<div class="mobile-render"><div class="mobile-three"></div></div>'
new_mobile_render = '<div class="mobile-render"><div class="mobile-three" id="m-mobile-mecha-container"></div></div>'
assert old_mobile_render in content, "old_mobile_render not found"
content = content.replace(old_mobile_render, new_mobile_render)

# 2. Add static coin inside the full-screen mobile navigation drawer
# Look for </nav> or end of bold-nav-full__tile
target_nav_ul_end = '</ul></div></nav>'
assert target_nav_ul_end in content, "target_nav_ul_end not found"
static_seal_nav = """</ul><div class="mobile-nav-seal" style="display:flex; justify-content:center; align-items:center; padding:2rem 0 1rem 0; width:100%;"><img src="/assets/coin/sovereign_diffuse.png" alt="Samaria Sovereign Seal" style="width:110px; height:110px; aspect-ratio:1/1; object-fit:contain; opacity:0.9; filter:drop-shadow(0 10px 25px rgba(212, 175, 55, 0.22));" loading="lazy"/></div></div></nav>"""
content = content.replace(target_nav_ul_end, static_seal_nav)

# 3. Add CSS for mobile dynamic coin
css_marker = '#m-mecha-container canvas {'
pos = content.find(css_marker)
assert pos != -1, "css_marker not found"
end_brace = content.find('}', pos)

mobile_coin_css = """
/* Mobile Dynamic 3D Sovereign Coin */
@media screen and (max-width: 991px) {
  .mobile-render {
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
    width: 100% !important;
    height: 300px !important;
    min-height: 260px !important;
    margin: 1.25rem auto 2rem auto !important;
    position: relative !important;
    touch-action: none !important;
    cursor: grab;
  }
  .mobile-three,
  #m-mobile-mecha-container {
    width: 100% !important;
    max-width: 320px !important;
    height: 100% !important;
    position: relative !important;
    display: block !important;
    touch-action: none !important;
    cursor: grab;
  }
  #m-mobile-mecha-container canvas {
    width: 100% !important;
    height: 100% !important;
    display: block !important;
    position: absolute !important;
    top: 0 !important;
    left: 0 !important;
  }
}
@media screen and (min-width: 992px) {
  .mobile-render {
    display: none !important;
  }
}
"""

content = content[:end_brace+1] + mobile_coin_css + content[end_brace+1:]

# 4. Refactor initCoin to setupCoinInstance
# Find the exact start and end of initCoin()
start_init = content.find('function initCoin() {')
end_init_marker = "window.addEventListener('three-engine-ready', initCoin);"
end_init = content.find(end_init_marker, start_init)
assert start_init != -1 and end_init != -1, "initCoin boundaries not found"

setup_code = """function setupCoinInstance(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    // Clear any existing children
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }

    const width = container.clientWidth || (containerId === 'm-mobile-mecha-container' ? Math.min(window.innerWidth - 40, 320) : 400);
    const height = container.clientHeight || (containerId === 'm-mobile-mecha-container' ? 300 : 380);

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 50);
    camera.position.set(0, 0, 4.4);

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
    const normalBack = textureLoader.load('/assets/coin/sovereign_back_normal.png', () => renderer.render(scene, camera));
    const roughnessBack = textureLoader.load('/assets/coin/sovereign_back_roughness.png');
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
      roughnessMap: roughnessBack,
      map: diffuseBack,
      normalMap: normalBack,
      normalScale: new THREE.Vector2(1.2, 1.2),
      clearcoat: 0.35,
      clearcoatRoughness: 0.2,
      envMapIntensity: 1.4,
    });

    const edgeMaterial = new THREE.MeshPhysicalMaterial({
      color: SOVEREIGN_GOLD,
      metalness: 0.90,
      roughness: 0.32,
      map: edgeDiffuse,
      clearcoat: 0.3,
      envMapIntensity: 1.2,
    });

    // 6. Geometry: Sovereign Struck Coin with Reeding Edge
    const COIN_RADIUS = 1.35;
    const COIN_THICKNESS = 0.16;

    const coin = new THREE.Group();
    scene.add(coin);

    // Front Face (Obverse)
    const faceGeo = new THREE.CircleGeometry(COIN_RADIUS, 128);
    const frontMesh = new THREE.Mesh(faceGeo, frontMaterial);
    frontMesh.position.z = COIN_THICKNESS / 2;
    coin.add(frontMesh);

    // Back Face (Reverse)
    const backMesh = new THREE.Mesh(faceGeo, backMaterial);
    backMesh.position.z = -COIN_THICKNESS / 2;
    backMesh.rotation.y = Math.PI;
    coin.add(backMesh);

    // Edge Reeding (Cylinder side without caps)
    const edgeGeo = new THREE.CylinderGeometry(COIN_RADIUS, COIN_RADIUS, COIN_THICKNESS, 128, 1, true);
    const edgeMesh = new THREE.Mesh(edgeGeo, edgeMaterial);
    edgeMesh.rotation.x = Math.PI / 2;
    coin.add(edgeMesh);

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

    container.addEventListener('touchstart', onPointerDown, { passive: true });
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
      if (container.clientWidth > 0 && container.clientHeight > 0) {
        const w = container.clientWidth;
        const h = container.clientHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      }
    }
    window.addEventListener('resize', onResize);

    // 10. Animation Loop
    let animStartTime = performance.now();
    let isVisible = true;
    let animId = null;

    function animate() {
      if (!isVisible) {
        animId = null;
        return;
      }
      animId = requestAnimationFrame(animate);
      const elapsedTime = (performance.now() - animStartTime) * 0.001;

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

    const coinObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        isVisible = entry.isIntersecting;
        if (isVisible && !animId) {
          animId = requestAnimationFrame(animate);
        }
      });
    }, { rootMargin: '25% 0px' });
    coinObs.observe(container);
  }

  function initCoin() {
    if (typeof THREE === 'undefined') {
      setTimeout(initCoin, 20);
      return;
    }
    setupCoinInstance('m-mecha-container');
    setupCoinInstance('m-mobile-mecha-container');
  }
"""

content = content[:start_init] + setup_code + "\n  " + content[end_init:]

with open(home_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Successfully updated home.html with mobile dynamic coin and drawer static seal!")
