import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('src/templates/home.html', 'r', encoding='utf-8') as f:
    text = f.read()

# Flight Orchestrator code
flight_code = """
<!-- Cinematic Sovereign Gold Coin Flight Orchestrator -->
<canvas id="coin-flight-overlay" style="position:fixed;top:0;left:0;width:100vw;height:100vh;pointer-events:none;z-index:9999999;display:none;"></canvas>

<script>
(function() {
  let fRenderer, fScene, fCam, fCoin;
  let isFlightReady = false;
  let isFlying = false;

  function initFlightSystem() {
    if (isFlightReady || typeof THREE === 'undefined') return;

    const canvas = document.getElementById('coin-flight-overlay');
    if (!canvas) return;

    fRenderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true, powerPreference: 'high-performance' });
    fRenderer.setSize(window.innerWidth, window.innerHeight);
    fRenderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    fRenderer.toneMapping = THREE.ACESFilmicToneMapping;
    fRenderer.toneMappingExposure = 1.35;
    fRenderer.outputColorSpace = THREE.SRGBColorSpace;

    fScene = new THREE.Scene();
    fCam = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 100);
    fCam.position.set(0, 0, 10);

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
    fScene.environment = envTexture;

    // 3-Point Lighting
    const hemiLight = new THREE.HemisphereLight(0xfff8ea, 0x44331b, 1.8);
    fScene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xfffae8, 3.2);
    keyLight.position.set(3.5, 4.5, 4.0);
    fScene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xffe8aa, 1.8);
    fillLight.position.set(-4.0, -1.5, 3.5);
    fScene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xffffff, 2.5);
    rimLight.position.set(-2.0, 4.0, -4.5);
    fScene.add(rimLight);

    // Textures
    const textureLoader = new THREE.TextureLoader();
    const diffuseFront = textureLoader.load('/assets/coin/sovereign_diffuse.png');
    const normalFront = textureLoader.load('/assets/coin/sovereign_normal.png');
    const roughnessFront = textureLoader.load('/assets/coin/sovereign_roughness.png');

    const diffuseBack = textureLoader.load('/assets/coin/sovereign_back_diffuse.png');
    const normalBack = textureLoader.load('/assets/coin/sovereign_back_normal.png');
    const roughnessBack = textureLoader.load('/assets/coin/sovereign_back_roughness.png');
    const edgeDiffuse = textureLoader.load('/assets/coin/sovereign_edge_diffuse.png');

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

    const COIN_RADIUS = 1.30;
    const COIN_THICKNESS = 0.125;
    const geometry = new THREE.CylinderGeometry(COIN_RADIUS, COIN_RADIUS, COIN_THICKNESS, 128, 1);
    geometry.rotateX(Math.PI / 2);

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

    fCoin = new THREE.Mesh(geometry, [edgeMaterial, frontMaterial, backMaterial]);

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
    fCoin.add(frontRim);

    const backRim = new THREE.Mesh(rimGeo, rimMat);
    backRim.position.z = -COIN_THICKNESS / 2;
    fCoin.add(backRim);

    fCoin.scale.setScalar(0.78);
    fScene.add(fCoin);

    window.addEventListener('resize', () => {
      if (!fRenderer || !fCam) return;
      fRenderer.setSize(window.innerWidth, window.innerHeight);
      fCam.aspect = window.innerWidth / window.innerHeight;
      fCam.updateProjectionMatrix();
    });

    isFlightReady = true;
  }

  function screenPxToWorld(px, py, pz, camera) {
    const ndcX = (px / window.innerWidth) * 2 - 1;
    const ndcY = -(py / window.innerHeight) * 2 + 1;
    const v = new THREE.Vector3(ndcX, ndcY, 0.5);
    v.unproject(camera);
    const dir = v.sub(camera.position).normalize();
    const dist = (pz - camera.position.z) / dir.z;
    return camera.position.clone().add(dir.multiplyScalar(dist));
  }

  window.__launchCoinToModal = function(onComplete) {
    initFlightSystem();
    if (!isFlightReady || isFlying) {
      if (onComplete) onComplete();
      return;
    }
    isFlying = true;

    const canvas = document.getElementById('coin-flight-overlay');
    const sidebarEl = document.getElementById('m-mecha-container');
    const sRect = sidebarEl ? sidebarEl.getBoundingClientRect() : { left: 80, top: window.innerHeight * 0.45, width: 200, height: 200 };
    const startX = sRect.left + sRect.width / 2;
    const startY = sRect.top + sRect.height / 2;

    let destX, destY;
    if (window.innerWidth > 991) {
      destX = window.innerWidth * 0.75;
      destY = window.innerHeight * 0.50;
    } else {
      destX = window.innerWidth * 0.50;
      destY = window.innerHeight * 0.22;
    }

    const startRotY = window.__coinMesh ? window.__coinMesh.rotation.y : 0;

    // Hide static sidebar coin
    if (sidebarEl) sidebarEl.style.opacity = '0';
    canvas.style.display = 'block';

    const flightState = { t: 0, rotY: startRotY };

    gsap.to(flightState, {
      t: 1,
      rotY: startRotY + Math.PI * 4, // 720 degree specular glint spin
      duration: 1.35,
      ease: 'power2.inOut',
      onUpdate: () => {
        const t = flightState.t;
        // Parabolic horizontal & vertical trajectory
        const curX = startX + (destX - startX) * t;
        const arcY = -Math.sin(Math.PI * t) * 150;
        const curY = (startY + (destY - startY) * t) + arcY;
        const curZ = Math.sin(Math.PI * t) * 2.8; // Z-depth pop towards camera
        const tiltX = 0.12 + Math.sin(Math.PI * t) * 0.32;

        const wPos = screenPxToWorld(curX, curY, curZ, fCam);
        fCoin.position.copy(wPos);
        fCoin.rotation.set(tiltX, flightState.rotY, 0);
        fRenderer.render(fScene, fCam);
      },
      onComplete: () => {
        canvas.style.display = 'none';
        isFlying = false;
        if (window.__modalCoinMesh) {
          window.__modalCoinMesh.rotation.y = flightState.rotY % (Math.PI * 2);
          window.__modalCoinMesh.visible = true;
        }
        if (onComplete) onComplete();
      }
    });
  };

  window.__returnCoinFromModal = function(onComplete) {
    initFlightSystem();
    if (!isFlightReady || isFlying) {
      if (onComplete) onComplete();
      return;
    }
    isFlying = true;

    const canvas = document.getElementById('coin-flight-overlay');
    const sidebarEl = document.getElementById('m-mecha-container');
    const sRect = sidebarEl ? sidebarEl.getBoundingClientRect() : { left: 80, top: window.innerHeight * 0.45, width: 200, height: 200 };
    const destX = sRect.left + sRect.width / 2;
    const destY = sRect.top + sRect.height / 2;

    let startX, startY;
    if (window.innerWidth > 991) {
      startX = window.innerWidth * 0.75;
      startY = window.innerHeight * 0.50;
    } else {
      startX = window.innerWidth * 0.50;
      startY = window.innerHeight * 0.22;
    }

    const startRotY = window.__modalCoinMesh ? window.__modalCoinMesh.rotation.y : 0;
    if (window.__modalCoinMesh) window.__modalCoinMesh.visible = false;

    canvas.style.display = 'block';

    const flightState = { t: 0, rotY: startRotY };

    gsap.to(flightState, {
      t: 1,
      rotY: startRotY - Math.PI * 4, // Reverse 720 spin
      duration: 1.15,
      ease: 'power2.inOut',
      onUpdate: () => {
        const t = flightState.t;
        const curX = startX + (destX - startX) * t;
        const arcY = -Math.sin(Math.PI * t) * 140;
        const curY = (startY + (destY - startY) * t) + arcY;
        const curZ = Math.sin(Math.PI * t) * 2.4;
        const tiltX = 0.12 - Math.sin(Math.PI * t) * 0.25;

        const wPos = screenPxToWorld(curX, curY, curZ, fCam);
        fCoin.position.copy(wPos);
        fCoin.rotation.set(tiltX, flightState.rotY, 0);
        fRenderer.render(fScene, fCam);
      },
      onComplete: () => {
        canvas.style.display = 'none';
        isFlying = false;
        if (sidebarEl) sidebarEl.style.opacity = '1';
        if (onComplete) onComplete();
      }
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFlightSystem);
  } else {
    setTimeout(initFlightSystem, 100);
  }
})();
</script>
"""

# Inject flight_code before </head> or right before </body>
if '<!-- Cinematic Sovereign Gold Coin Flight Orchestrator -->' not in text:
    text = text.replace('</body>', flight_code + '\n</body>')
    print("Injected Flight Orchestrator into </body>!")
else:
    print("Flight Orchestrator already present, will update.")

with open('src/templates/home.html', 'w', encoding='utf-8') as f:
    f.write(text)

print("Saved updated home.html with Flight Orchestrator!")
