import sys

replacement_code = """function initThree() {
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

  // High-precision PBR Renderer for 22K Sovereign Gold Coin
  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setSize(w, h);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.35;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  threeContainer.appendChild(renderer.domElement);

  scene = new THREE.Scene();

  const aspect = w / h;
  camera = new THREE.PerspectiveCamera(38, aspect, 0.1, 50);
  camera.position.set(0, 0, 4.2);

  // Procedural Studio HDRI Environment for Specular Cuts
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

  const SOVEREIGN_GOLD = 0xdeb34a; // 22K Crown Gold

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

  // Explicit Planar UV Mapping: Upright & Vertically Aligned
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

  // Size and position in contact modal
  model.scale.setScalar(1.22);
  autoRotY = -Math.PI / 3;
  let modalRotX = 0.12;
  model.rotation.set(modalRotX, autoRotY, 0);

  scene.add(model);

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

  window.addEventListener('resize', () => {
    if (!renderer || !camera) return;
    const rw = threeContainer.clientWidth;
    const rh = threeContainer.clientHeight;
    if (rw === 0 || rh === 0) return;
    renderer.setSize(rw, rh);
    camera.aspect = rw / rh;
    camera.updateProjectionMatrix();
  });

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

with open('src/templates/home.html', 'r', encoding='utf-8') as f:
    text = f.read()

start_marker = 'function initThree() {'
end_marker = 'function setupElements() {'

start_pos = text.find(start_marker)
end_pos = text.find(end_marker)

if start_pos == -1 or end_pos == -1:
    print("Error: Could not locate initThree or setupElements!")
    sys.exit(1)

text = text[:start_pos] + replacement_code + '\n' + text[end_pos:]

# Also update actionBtn animation to do a coin spin
old_action = """if (actionBtn) {
  actionBtn.addEventListener('click', () => {
    gsap.to({ t: 0 }, {
      t: 1, duration: 0.4, yoyo: true, repeat: 1,
      onUpdate: function () { model.rotation.x = Math.sin(this.targets()[0].t * Math.PI) * 0.3; },
      onComplete: () => { if (model) model.rotation.x = 0; }
    });
  });
}"""

new_action = """if (actionBtn) {
  actionBtn.addEventListener('click', () => {
    if (model) {
      gsap.to(model.rotation, {
        y: model.rotation.y + Math.PI * 2,
        duration: 1.2,
        ease: 'power3.out'
      });
    }
  });
}"""

if old_action in text:
    text = text.replace(old_action, new_action)
    print("Updated actionBtn spin handler successfully!")
else:
    print("Notice: old_action not found directly, skipping actionBtn replacement.")

with open('src/templates/home.html', 'w', encoding='utf-8') as f:
    f.write(text)

print("SUCCESS: 3D Coin successfully injected into contact modal in src/templates/home.html!")
