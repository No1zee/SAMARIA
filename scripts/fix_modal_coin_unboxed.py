import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('src/templates/home.html', 'r', encoding='utf-8') as f:
    text = f.read()

# 1. Add Unboxed CSS for Contact Modal
css_marker = 'div#m-popup-container {'
if css_marker not in text:
    print("Error: Could not locate css_marker")
    sys.exit(1)

unboxed_css = """/* Contact Modal Unboxed & Full-Width 3D Coin Layout */
.contact-modal .modal-wrap {
  display: flex !important;
  width: 100% !important;
  height: 100% !important;
}

.contact-modal .form-popup {
  flex: 1 1 50% !important;
  max-width: 50% !important;
  width: 50% !important;
}

.contact-modal .form-model {
  flex: 1 1 50% !important;
  max-width: 50% !important;
  width: 50% !important;
  height: 100% !important;
  padding: 0 !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  overflow: visible !important;
}

.contact-modal .popup-three {
  width: 100% !important;
  max-width: none !important;
  height: 100% !important;
  max-height: none !important;
  aspect-ratio: auto !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  overflow: visible !important;
}

.contact-modal .is-svg.is-m-model {
  width: 100% !important;
  height: 100% !important;
  max-width: none !important;
  max-height: none !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  overflow: visible !important;
}

div#m-popup-container {
  width: 100% !important;
  height: 100% !important;
  min-height: 80vh !important;
  position: relative !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  overflow: visible !important;
}

#m-popup-container canvas {
  display: block !important;
  width: 100% !important;
  height: 100% !important;
}

@media (max-width: 991px) {
  .contact-modal .modal-wrap {
    flex-flow: column !important;
    overflow: auto !important;
  }
  .contact-modal .form-popup {
    flex: 1 1 100% !important;
    max-width: 100% !important;
    width: 100% !important;
  }
  .contact-modal .form-model {
    order: -1 !important;
    flex: none !important;
    width: 100% !important;
    max-width: 100% !important;
    height: 42vh !important;
    min-height: 280px !important;
    padding: 1rem 0 !important;
  }
  div#m-popup-container {
    min-height: 280px !important;
    height: 42vh !important;
  }
}
"""

# Replace the old small media query with our comprehensive unboxed rules
old_css_snippet = """@media (max-width: 991px) {
div#m-popup-container {
    min-height: 50dvh !important;
}
.is-marquee-gallery .viewport-video video {
width: auto !important;
}
}"""

if old_css_snippet in text:
    text = text.replace(old_css_snippet, unboxed_css + "\n.is-marquee-gallery .viewport-video video { width: auto !important; }")
    print("Replaced CSS snippet successfully!")
else:
    # Just inject unboxed_css before </head>
    text = text.replace('</head>', f'<style>\n{unboxed_css}\n</style>\n</head>')
    print("Injected unboxed CSS into <head>!")

# 2. Update initThree in JavaScript
start_marker = 'function initThree() {'
end_marker = 'function setupElements() {'

start_pos = text.find(start_marker)
end_pos = text.find(end_marker)

if start_pos == -1 or end_pos == -1:
    print("Error: Could not locate initThree or setupElements!")
    sys.exit(1)

new_init_three = """function initThree() {
  if (renderer) return;

  threeContainer.getBoundingClientRect();

  const w = threeContainer.clientWidth;
  const h = threeContainer.clientHeight;

  if (w === 0 || h === 0) {
    requestAnimationFrame(initThree);
    return;
  }

  const oldCanvas = threeContainer.querySelector('canvas');
  if (oldCanvas) oldCanvas.remove();

  // High-precision PBR Renderer
  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setSize(w, h);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.35;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  threeContainer.appendChild(renderer.domElement);

  scene = new THREE.Scene();

  const aspect = w / h;
  camera = new THREE.PerspectiveCamera(36, aspect, 0.1, 50);

  // Procedural Studio HDRI Environment
  const envCanvas = document.createElement('canvas');
  envCanvas.width = 1024;
  envCanvas.height = 512;
  const eCtx = envCanvas.getContext('2d');
  const grad = eCtx.createLinearGradient(0, 0, 0, 512);
  grad.addColorStop(0.0, '#ffffff');
  grad.addColorStop(0.25, '#fff5db');
  grad.addColorStop(0.48, '#e6be65');
  grad.addColorStop(0.55, '#a07828');
  grad.addColorStop(0.75, '#3d2e12');
  grad.addColorStop(1.0, '#151008');
  eCtx.fillStyle = grad;
  eCtx.fillRect(0, 0, 1024, 512);

  eCtx.fillStyle = 'rgba(255, 255, 255, 0.95)';
  eCtx.filter = 'blur(12px)';
  eCtx.fillRect(150, 60, 220, 140);
  eCtx.fillRect(600, 80, 260, 120);
  eCtx.filter = 'none';

  const envTexture = new THREE.CanvasTexture(envCanvas);
  envTexture.mapping = THREE.EquirectangularReflectionMapping;
  scene.environment = envTexture;

  // Balanced 3-Point Studio Lighting
  const hemiLight = new THREE.HemisphereLight(0xfff8ea, 0x44331b, 1.8);
  scene.add(hemiLight);

  const keyLight = new THREE.DirectionalLight(0xfffae8, 3.2);
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

  // Load 22K Sovereign Gold PBR Relief Textures
  const textureLoader = new THREE.TextureLoader();
  const diffuseFront = textureLoader.load('/assets/coin/sovereign_diffuse.png', () => updateCameraFraming());
  const normalFront = textureLoader.load('/assets/coin/sovereign_normal.png', () => updateCameraFraming());
  const roughnessFront = textureLoader.load('/assets/coin/sovereign_roughness.png');

  const diffuseBack = textureLoader.load('/assets/coin/sovereign_back_diffuse.png', () => updateCameraFraming());
  const normalBack = textureLoader.load('/assets/coin/sovereign_back_normal.png', () => updateCameraFraming());
  const roughnessBack = textureLoader.load('/assets/coin/sovereign_back_roughness.png');
  const edgeDiffuse = textureLoader.load('/assets/coin/sovereign_edge_diffuse.png', () => updateCameraFraming());

  diffuseFront.colorSpace = THREE.SRGBColorSpace;
  diffuseBack.colorSpace = THREE.SRGBColorSpace;
  edgeDiffuse.colorSpace = THREE.SRGBColorSpace;
  edgeDiffuse.wrapS = THREE.RepeatWrapping;
  edgeDiffuse.repeat.set(6, 1);

  const SOVEREIGN_GOLD = 0xdeb34a;

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
    color: 0xc89d38,
    metalness: 0.90,
    roughness: 0.35,
    map: edgeDiffuse,
    bumpMap: edgeDiffuse,
    bumpScale: 0.02,
    envMapIntensity: 1.2,
  });

  // Coin Cylinder Geometry
  const COIN_RADIUS = 1.30;
  const COIN_THICKNESS = 0.125;
  const geometry = new THREE.CylinderGeometry(COIN_RADIUS, COIN_RADIUS, COIN_THICKNESS, 128, 1);
  geometry.rotateX(Math.PI / 2);

  // Planar UV Mapping
  const pos = geometry.attributes.position;
  const uvs = geometry.attributes.uv;
  for (let i = 0; i < pos.count; i++) {
    const z = pos.getZ(i);
    const x = pos.getX(i);
    const y = pos.getY(i);
    if (z > COIN_THICKNESS * 0.2) {
      uvs.setXY(i, (x / (2 * COIN_RADIUS)) + 0.5, (y / (2 * COIN_RADIUS)) + 0.5);
    } else if (z < -COIN_THICKNESS * 0.2) {
      uvs.setXY(i, (-x / (2 * COIN_RADIUS)) + 0.5, (y / (2 * COIN_RADIUS)) + 0.5);
    }
  }
  uvs.needsUpdate = true;

  const materials = [edgeMaterial, frontMaterial, backMaterial];
  model = new THREE.Mesh(geometry, materials);

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
  model.add(frontRim);

  const backRim = new THREE.Mesh(rimGeo, rimMat);
  backRim.position.z = -COIN_THICKNESS / 2;
  model.add(backRim);

  // Proportionate scale with ample breathing room
  model.scale.setScalar(0.78);
  autoRotY = -Math.PI / 3;
  let modalRotX = 0.12;
  model.rotation.set(modalRotX, autoRotY, 0);

  scene.add(model);

  function updateCameraFraming() {
    if (!renderer || !camera || !threeContainer) return;
    const rw = threeContainer.clientWidth;
    const rh = threeContainer.clientHeight;
    if (rw === 0 || rh === 0) return;

    renderer.setSize(rw, rh);
    const currentAspect = rw / rh;
    camera.aspect = currentAspect;

    // Mathematically guarantee coin NEVER clips on either horizontal or vertical axes
    // Visual radius with safety factor
    const radius = COIN_RADIUS * 0.78 * 1.02; // ~1.034
    const vFovRad = (camera.fov * Math.PI) / 180;
    
    // Target: coin diameter occupies at most 62% of viewport on the restrictive axis
    const maxOccupancy = 0.62;
    const distForHeight = (radius / maxOccupancy) / Math.tan(vFovRad / 2);
    const distForWidth = (radius / maxOccupancy) / (Math.tan(vFovRad / 2) * currentAspect);
    
    const targetDist = Math.max(distForHeight, distForWidth, 4.8);
    camera.position.set(0, 0, targetDist);
    camera.updateProjectionMatrix();
    renderer.render(scene, camera);
  }

  updateCameraFraming();

  gsap.to({ y: autoRotY }, {
    y: 0,
    duration: 2.4,
    ease: 'power3.out',
    onUpdate: function () {
      autoRotY = this.targets()[0].y;
    },
    onComplete: () => {
      autoRotY = 0;
    }
  });

  // Modal Interactive Drag Physics
  let isModalDragging = false;
  let pointerStart = { x: 0, y: 0 };
  threeContainer.style.cursor = 'grab';

  function getPt(e) {
    if (e.touches && e.touches.length > 0) return { x: e.touches[0].clientX, y: e.touches[0].clientY };
    return { x: e.clientX, y: e.clientY };
  }

  threeContainer.addEventListener('mousedown', (e) => {
    isModalDragging = true;
    const p = getPt(e);
    pointerStart.x = p.x;
    pointerStart.y = p.y;
    threeContainer.style.cursor = 'grabbing';
  });

  window.addEventListener('mousemove', (e) => {
    if (!isModalDragging || !model) return;
    const p = getPt(e);
    const dx = p.x - pointerStart.x;
    const dy = p.y - pointerStart.y;
    pointerStart.x = p.x;
    pointerStart.y = p.y;
    autoRotY += dx * 0.008;
    modalRotX = Math.max(-0.6, Math.min(0.6, modalRotX + dy * 0.008));
  });

  window.addEventListener('mouseup', () => {
    if (isModalDragging) {
      isModalDragging = false;
      threeContainer.style.cursor = 'grab';
    }
  });

  threeContainer.addEventListener('touchstart', (e) => {
    isModalDragging = true;
    const p = getPt(e);
    pointerStart.x = p.x;
    pointerStart.y = p.y;
  }, { passive: true });

  window.addEventListener('touchmove', (e) => {
    if (!isModalDragging || !model) return;
    const p = getPt(e);
    const dx = p.x - pointerStart.x;
    const dy = p.y - pointerStart.y;
    pointerStart.x = p.x;
    pointerStart.y = p.y;
    autoRotY += dx * 0.008;
    modalRotX = Math.max(-0.6, Math.min(0.6, modalRotX + dy * 0.008));
  }, { passive: true });

  window.addEventListener('touchend', () => {
    isModalDragging = false;
  });

  window.addEventListener('resize', updateCameraFraming);

  function animate() {
    requestAnimationFrame(animate);
    if (!isModalDragging) {
      autoRotY += AUTO_SPEED;
    }
    if (model) {
      model.rotation.y = autoRotY;
      model.rotation.x = modalRotX;
    }
    renderer.render(scene, camera);
  }
  animate();
}
"""

text = text[:start_pos] + new_init_three + '\n' + text[end_pos:]

with open('src/templates/home.html', 'w', encoding='utf-8') as f:
    f.write(text)

print("SUCCESS: Modal coin unboxed styles and dynamic auto-framing successfully applied!")
