import os, re

def update_home():
    with open('src/templates/home.html', 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Replace THREE.Clock
    old_clock = "let clock = new THREE.Clock();\n    function animate() {\n      requestAnimationFrame(animate);\n      const elapsedTime = clock.getElapsedTime();"
    new_clock = "let animStartTime = performance.now();\n    function animate() {\n      requestAnimationFrame(animate);\n      const elapsedTime = (performance.now() - animStartTime) * 0.001;"
    if old_clock in content:
        content = content.replace(old_clock, new_clock)
        print("Replaced THREE.Clock in home.html (LF)")
    else:
        old_clock_crlf = old_clock.replace('\n', '\r\n')
        new_clock_crlf = new_clock.replace('\n', '\r\n')
        if old_clock_crlf in content:
            content = content.replace(old_clock_crlf, new_clock_crlf)
            print("Replaced THREE.Clock in home.html (CRLF)")
        else:
            print("WARNING: THREE.Clock pattern not matched")

    # 2. Update CSS in home.html
    css_pattern = re.compile(
        r'/\* GPU-Stepped Film Grain.*?\*/\s*\.samaria-noise-overlay\s*\{.*?'
        r'/\* 3D Water Ripple Card Overlay \*/\s*\.card-ripple-canvas\s*\{.*?\.project-vid, \.project-file\s*\{\s*position:\s*relative;\s*\}',
        re.DOTALL
    )

    new_css = """/* GPU-Stepped Film Grain (0% CPU, Compositor-Only Hardware Tiling) */
.samaria-noise-overlay {
  position: fixed;
  top: -100%;
  left: -100%;
  width: 300%;
  height: 300%;
  pointer-events: none;
  opacity: 0.04;
  z-index: 9999;
  background-image: url("/noise.png");
  background-repeat: repeat;
  will-change: transform;
  transform: translate3d(0, 0, 0);
  animation: 2.5s steps(5, end) infinite noise-grain;
}
@keyframes noise-grain {
  0%   { transform: translate3d(0, 0, 0); }
  20%  { transform: translate3d(-3%, -6%, 0); }
  40%  { transform: translate3d(-8%, 3%, 0); }
  60%  { transform: translate3d(4%, -10%, 0); }
  80%  { transform: translate3d(-3%, 7%, 0); }
  100% { transform: translate3d(0, 0, 0); }
}
@media (prefers-reduced-motion: reduce) {
  .samaria-noise-overlay {
    animation: none !important;
  }
}

/* 3D Water Ripple Card Overlay (Flyweight Single Shared Canvas) */
.card-ripple-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100% !important;
  height: 100% !important;
  pointer-events: none;
  z-index: 5;
  opacity: 0;
  transition: opacity 0.28s cubic-bezier(0.16, 1, 0.3, 1);
  will-change: opacity;
}
.card-ripple-canvas.is-active {
  opacity: 1;
}
.project-vid, .project-file {
  position: relative;
}"""

    if css_pattern.search(content):
        content = css_pattern.sub(new_css, content)
        print("Updated CSS in home.html")
    else:
        print("WARNING: CSS pattern not matched in home.html")

    # 3. Update Ripple Script at bottom of home.html
    script_pattern = re.compile(
        r'<script>\s*\(function\(\)\s*\{\s*// Only activate WebGL water ripple mesh on desktop.*?</script>\s*</body>\s*</html>',
        re.DOTALL
    )

    new_script = """<script>
(function() {
  // Only activate WebGL water ripple mesh on desktop with pointer/hover support
  if (window.matchMedia('(pointer: coarse)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  function initWaterRippleCards() {
    if (typeof THREE === 'undefined') {
      window.addEventListener('three-engine-ready', initWaterRippleCards, { once: true });
      setTimeout(initWaterRippleCards, 60);
      return;
    }

    const cards = document.querySelectorAll('.project-vid[gsap-img], .project-file[gsap-img]');
    if (!cards.length) return;

    // Single shared canvas & WebGL pipeline (Flyweight pattern: 1 context total)
    const sharedCanvas = document.createElement('canvas');
    sharedCanvas.className = 'card-ripple-canvas';

    let renderer = null;
    let scene = null;
    let camera = null;
    let mat = null;
    let mesh = null;
    let activeCard = null;
    let isHovered = false;
    let rafId = null;
    let startTime = performance.now();

    let targetHover = 0.0;
    let curHover = 0.0;
    let targetMouse = new THREE.Vector2(0, 0);
    let curMouse = new THREE.Vector2(0, 0);

    let globalScrollVelocity = 0;
    let lastScrollY = window.scrollY;
    let scrollVelocityTimer = null;

    window.addEventListener('scroll', function() {
      const curY = window.scrollY;
      globalScrollVelocity = (curY - lastScrollY) * 0.02;
      lastScrollY = curY;
      clearTimeout(scrollVelocityTimer);
      scrollVelocityTimer = setTimeout(function() {
        globalScrollVelocity = 0;
      }, 100);
    }, { passive: true });

    if (window.lenis) {
      window.lenis.on('scroll', function(e) {
        if (e && typeof e.velocity === 'number') {
          globalScrollVelocity = e.velocity * 0.015;
        }
      });
    }

    const textureLoader = new THREE.TextureLoader();
    const textureCache = new Map();

    // Shared plane geometry with 32x18 subdivision (627 vertices)
    const rippleGeo = new THREE.PlaneGeometry(2, 2, 32, 18);

    const vShader = `
      uniform float uTime;
      uniform float uHover;
      uniform vec2 uMouse;
      uniform float uScrollVelocity;
      varying vec2 vUv;

      void main() {
        vUv = uv;
        vec3 pos = position;

        vec2 normPos = pos.xy;
        float dist = distance(normPos, uMouse);

        // 15% Central Dead Zone: preserve readability inside the focal area
        float rippleZone = smoothstep(0.12, 0.45, dist);

        // Dual-Drive Energy: ambient scroll velocity + interactive cursor hover
        float waveEnergy = (uHover * 0.038 + abs(uScrollVelocity) * 0.025) * rippleZone;

        float waveX = sin(dist * 18.0 - uTime * 4.2) * waveEnergy;
        float waveY = cos(dist * 16.0 - uTime * 3.8) * waveEnergy;

        pos.x += waveX;
        pos.y += waveY;

        gl_Position = vec4(pos, 1.0);
      }
    `;

    const fShader = `
      uniform sampler2D uTexture;
      uniform float uHover;
      varying vec2 vUv;

      void main() {
        vec2 uv = vUv;
        float shift = uHover * 0.003;
        float r = texture2D(uTexture, uv + vec2(shift, 0.0)).r;
        float g = texture2D(uTexture, uv).g;
        float b = texture2D(uTexture, uv - vec2(shift, 0.0)).b;
        gl_FragColor = vec4(r, g, b, 1.0);
      }
    `;

    function initSharedEngine() {
      if (renderer) return;

      renderer = new THREE.WebGLRenderer({
        canvas: sharedCanvas,
        alpha: true,
        antialias: false,
        powerPreference: 'high-performance'
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));

      scene = new THREE.Scene();
      camera = new THREE.Camera();

      mat = new THREE.ShaderMaterial({
        vertexShader: vShader,
        fragmentShader: fShader,
        uniforms: {
          uTexture: { value: null },
          uTime: { value: 0.0 },
          uHover: { value: 0.0 },
          uMouse: { value: new THREE.Vector2(0, 0) },
          uScrollVelocity: { value: 0.0 },
        },
        transparent: true,
        depthWrite: false,
      });

      mesh = new THREE.Mesh(rippleGeo, mat);
      scene.add(mesh);
    }

    function renderLoop(now) {
      if (!activeCard) {
        rafId = null;
        return;
      }

      curHover += (targetHover - curHover) * 0.12;
      curMouse.lerp(targetMouse, 0.15);

      const elapsed = (now - startTime) * 0.001;

      if (mat) {
        mat.uniforms.uTime.value = elapsed;
        mat.uniforms.uHover.value = curHover;
        mat.uniforms.uMouse.value.copy(curMouse);
        mat.uniforms.uScrollVelocity.value = globalScrollVelocity;
      }

      if (renderer && scene && camera) {
        renderer.render(scene, camera);
      }

      if (isHovered || curHover > 0.003 || Math.abs(globalScrollVelocity) > 0.003) {
        rafId = requestAnimationFrame(renderLoop);
      } else {
        sharedCanvas.classList.remove('is-active');
        rafId = null;
        activeCard = null;
      }
    }

    function updateMousePos(card, e) {
      const rect = card.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return;
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetMouse.set(x, y);
    }

    function activateCard(card, e) {
      const imgEl = card.querySelector('img');
      const vidEl = card.querySelector('video');
      const srcUrl = imgEl ? (imgEl.currentSrc || imgEl.src) : (vidEl ? (vidEl.poster || '') : '');
      if (!srcUrl) return;

      initSharedEngine();
      activeCard = card;
      isHovered = true;
      targetHover = 1.0;

      if (sharedCanvas.parentNode !== card) {
        card.appendChild(sharedCanvas);
      }

      let tex = textureCache.get(srcUrl);
      if (!tex) {
        tex = textureLoader.load(srcUrl);
        tex.minFilter = THREE.LinearFilter;
        tex.generateMipmaps = false;
        textureCache.set(srcUrl, tex);
      }
      mat.uniforms.uTexture.value = tex;

      const rect = card.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        renderer.setSize(rect.width, rect.height, false);
      }

      if (e) {
        updateMousePos(card, e);
      }

      sharedCanvas.classList.add('is-active');
      if (!rafId) {
        rafId = requestAnimationFrame(renderLoop);
      }
    }

    function deactivateCard(card) {
      if (activeCard === card) {
        isHovered = false;
        targetHover = 0.0;
      }
    }

    cards.forEach(function(card) {
      card.addEventListener('mouseenter', function(e) {
        activateCard(card, e);
      }, { passive: true });

      card.addEventListener('mousemove', function(e) {
        if (activeCard === card) {
          updateMousePos(card, e);
        }
      }, { passive: true });

      card.addEventListener('mouseleave', function() {
        deactivateCard(card);
      }, { passive: true });
    });

    window.addEventListener('resize', function() {
      if (activeCard && renderer) {
        const rect = activeCard.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
          renderer.setSize(rect.width, rect.height, false);
        }
      }
    }, { passive: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initWaterRippleCards);
  } else {
    setTimeout(initWaterRippleCards, 150);
  }
})();
</script>
</body></html>"""

    if script_pattern.search(content):
        content = script_pattern.sub(new_script, content)
        print("Updated ripple script in home.html")
    else:
        print("WARNING: Ripple script pattern not matched in home.html")

    with open('src/templates/home.html', 'w', encoding='utf-8') as f:
        f.write(content)
    print("Saved home.html")

def update_secondary(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    css_pattern = re.compile(
        r'/\* GPU-Stepped Film Grain.*?\*/\s*\.samaria-noise-overlay\s*\{.*?'
        r'/\* 3D Water Ripple Card Overlay \*/\s*\.card-ripple-canvas\s*\{.*?opacity:\s*0;\s*transition:\s*opacity\s*0\.35s.*?\}',
        re.DOTALL
    )

    new_css = """/* GPU-Stepped Film Grain (0% CPU, Compositor-Only Hardware Tiling) */
.samaria-noise-overlay {
  position: fixed;
  top: -100%;
  left: -100%;
  width: 300%;
  height: 300%;
  pointer-events: none;
  opacity: 0.04;
  z-index: 9999;
  background-image: url("/noise.png");
  background-repeat: repeat;
  will-change: transform;
  transform: translate3d(0, 0, 0);
  animation: 2.5s steps(5, end) infinite noise-grain;
}
@keyframes noise-grain {
  0%   { transform: translate3d(0, 0, 0); }
  20%  { transform: translate3d(-3%, -6%, 0); }
  40%  { transform: translate3d(-8%, 3%, 0); }
  60%  { transform: translate3d(4%, -10%, 0); }
  80%  { transform: translate3d(-3%, 7%, 0); }
  100% { transform: translate3d(0, 0, 0); }
}
@media (prefers-reduced-motion: reduce) {
  .samaria-noise-overlay {
    animation: none !important;
  }
}

/* 3D Water Ripple Card Overlay */
.card-ripple-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100% !important;
  height: 100% !important;
  pointer-events: none;
  z-index: 5;
  opacity: 0;
  transition: opacity 0.28s cubic-bezier(0.16, 1, 0.3, 1);
  will-change: opacity;
}"""

    if css_pattern.search(content):
        content = css_pattern.sub(new_css, content)
        print(f"Updated CSS in {filepath}")
    else:
        print(f"WARNING: CSS pattern not matched in {filepath}")

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Saved {filepath}")

if __name__ == '__main__':
    update_home()
    update_secondary('src/templates/blog.html')
    update_secondary('src/templates/404.html')
