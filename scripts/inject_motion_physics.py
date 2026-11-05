import re
import glob

MOTION_PHYSICS_SCRIPT = """
<script>
/**
 * SAMARIA LUXURY EDITORIAL MOTION PHYSICS SUITE
 * High-performance spring physics via GSAP quickTo
 * - Magnetic CTA button spring attraction (max 12px, power4.out)
 * - 3D Perspective card tilt with inertia (max ±6deg, power4.out)
 * - Adaptive mobile micro-scale compression (scale 0.98 on touch)
 */
(function() {
  function initMotionPhysics() {
    if (typeof window === 'undefined' || !window.gsap) return;

    var isTouch = window.matchMedia('(pointer: coarse)').matches || ('ontouchstart' in window);

    // 1. MOBILE & TOUCH ADAPTATION (Zero-cost touch micro-scale)
    if (isTouch) {
      var touchTargets = document.querySelectorAll(
        '.action-button, .bold-nav-full__hamburger, .close-popup, .close-project, .close-burger, .top-link, .project-cover, .ci_team, .blog-holder'
      );
      touchTargets.forEach(function(el) {
        el.addEventListener('touchstart', function() {
          gsap.to(el, { scale: 0.98, duration: 0.15, ease: 'power2.out', overwrite: 'auto' });
        }, { passive: true });
        el.addEventListener('touchend', function() {
          gsap.to(el, { scale: 1, duration: 0.35, ease: 'power2.out', overwrite: 'auto' });
        }, { passive: true });
        el.addEventListener('touchcancel', function() {
          gsap.to(el, { scale: 1, duration: 0.35, ease: 'power2.out', overwrite: 'auto' });
        }, { passive: true });
      });
      return; // Gracefully bypass mouse magnetic & tilt calculations on touch devices
    }

    // 2. MAGNETIC CTA & BUTTON PHYSICS (Desktop)
    var magneticTargets = document.querySelectorAll(
      '.action-button, .bold-nav-full__hamburger, .close-popup, .close-project, .close-burger, .top-link'
    );

    magneticTargets.forEach(function(el) {
      var xTo = gsap.quickTo(el, 'x', { duration: 0.4, ease: 'power4.out' });
      var yTo = gsap.quickTo(el, 'y', { duration: 0.4, ease: 'power4.out' });
      var rect = null;

      el.addEventListener('mouseenter', function() {
        rect = el.getBoundingClientRect();
      });

      el.addEventListener('mousemove', function(e) {
        if (!rect) rect = el.getBoundingClientRect();
        var centerX = rect.left + rect.width / 2;
        var centerY = rect.top + rect.height / 2;
        var deltaX = e.clientX - centerX;
        var deltaY = e.clientY - centerY;

        // Max 12px luxury displacement clamp
        var maxDist = 12;
        var clampedX = Math.max(-maxDist, Math.min(maxDist, deltaX * 0.35));
        var clampedY = Math.max(-maxDist, Math.min(maxDist, deltaY * 0.35));

        xTo(clampedX);
        yTo(clampedY);
      });

      el.addEventListener('mouseleave', function() {
        rect = null;
        xTo(0);
        yTo(0);
      });
    });

    // 3. 3D PERSPECTIVE CARD TILT WITH INERTIA (Desktop)
    var tiltTargets = document.querySelectorAll(
      '.project-vid, .project-file:not(.is-mini), .ci_team, .blog-holder'
    );

    tiltTargets.forEach(function(card) {
      gsap.set(card, { transformPerspective: 1000, transformStyle: 'preserve-3d' });

      var rotXTo = gsap.quickTo(card, 'rotationX', { duration: 0.5, ease: 'power4.out' });
      var rotYTo = gsap.quickTo(card, 'rotationY', { duration: 0.5, ease: 'power4.out' });
      var scaleTo = gsap.quickTo(card, 'scale', { duration: 0.5, ease: 'power4.out' });
      var cardRect = null;

      card.addEventListener('mouseenter', function() {
        cardRect = card.getBoundingClientRect();
        scaleTo(1.015);
      });

      card.addEventListener('mousemove', function(e) {
        if (!cardRect) cardRect = card.getBoundingClientRect();
        var x = e.clientX - cardRect.left;
        var y = e.clientY - cardRect.top;
        var normX = (x / cardRect.width) * 2 - 1;
        var normY = (y / cardRect.height) * 2 - 1;

        // Tight ±6deg luxury tilt
        var tiltX = -normY * 6;
        var tiltY = normX * 6;

        rotXTo(tiltX);
        rotYTo(tiltY);
      });

      card.addEventListener('mouseleave', function() {
        cardRect = null;
        rotXTo(0);
        rotYTo(0);
        scaleTo(1);
      });
    });
  }

  if (document.readyState === 'complete') {
    initMotionPhysics();
  } else {
    window.addEventListener('load', initMotionPhysics);
  }
})();
</script>
"""

KINETIC_3D_SCRIPT_REPLACEMENT = """
function initScrollAnimations() {

    document.querySelectorAll('[scroll-name]').forEach(function (nameEl) {
      var split = new SplitText(nameEl, { type: 'lines' });
      var lines = [];

      split.lines.forEach(function (line) {
        var mask = document.createElement('span');
        mask.className = 'kinetic-3d-wrap';
        mask.style.cssText = 'display:block; overflow:hidden; perspective:1000px; transform-style:preserve-3d; clip-path: inset(0 0 -0.25em 0);';
        var inner = document.createElement('span');
        inner.className = 'kinetic-3d-inner';
        inner.style.cssText = 'display:block; transform-origin: 50% 100% -25px; will-change: transform, opacity, filter; backface-visibility: hidden;';
        inner.innerHTML = line.innerHTML;
        mask.appendChild(inner);
        line.innerHTML = '';
        line.appendChild(mask);
        lines.push(inner);
      });

      gsap.set(lines, { yPercent: 120, rotateX: 35, opacity: 0, filter: 'blur(6px)' });

      setupElement(nameEl,
        function () {
          gsap.killTweensOf(lines);
          gsap.to(lines, {
            yPercent: 0,
            rotateX: 0,
            opacity: 1,
            filter: 'blur(0px)',
            duration: 1.15,
            ease: 'power3.out',
            stagger: { each: 0.045 },
            overwrite: 'auto'
          });
        },
        function () {
          gsap.killTweensOf(lines);
          gsap.to(lines, {
            yPercent: 120,
            rotateX: 35,
            opacity: 0,
            filter: 'blur(6px)',
            duration: 0.75,
            ease: 'power2.inOut',
            stagger: { each: 0.025, from: 'end' },
            overwrite: 'auto'
          });
        }
      );
    });

    document.querySelectorAll('[scroll-small-name]').forEach(function (nameEl) {
      var split = new SplitText(nameEl, { type: 'lines' });
      var lines = [];

      split.lines.forEach(function (line) {
        var mask = document.createElement('span');
        mask.className = 'kinetic-3d-wrap';
        mask.style.cssText = 'display:block; overflow:hidden; perspective:1000px; transform-style:preserve-3d; clip-path: inset(0 0 -0.2em 0);';
        var inner = document.createElement('span');
        inner.className = 'kinetic-3d-inner';
        inner.style.cssText = 'display:block; transform-origin: 50% 100% -15px; will-change: transform, opacity, filter; backface-visibility: hidden;';
        inner.innerHTML = line.innerHTML;
        mask.appendChild(inner);
        line.innerHTML = '';
        line.appendChild(mask);
        lines.push(inner);
      });

      gsap.set(lines, { yPercent: 110, rotateX: 30, opacity: 0, filter: 'blur(4px)' });

      ScrollTrigger.create({
        trigger: nameEl,
        start: 'top 90%',
        end: 'bottom top',
        onEnter: function () {
          gsap.killTweensOf(lines);
          gsap.to(lines, {
            yPercent: 0,
            rotateX: 0,
            opacity: 1,
            filter: 'blur(0px)',
            duration: 0.95,
            ease: 'power3.out',
            stagger: { each: 0.035 },
            overwrite: 'auto'
          });
        },
        onLeaveBack: function () {
          gsap.killTweensOf(lines);
          gsap.to(lines, {
            yPercent: 110,
            rotateX: 30,
            opacity: 0,
            filter: 'blur(4px)',
            duration: 0.65,
            ease: 'power2.inOut',
            stagger: { each: 0.02, from: 'end' },
            overwrite: 'auto'
          });
        },
      });
    });
"""

targets = [
    'src/templates/home.html',
    'src/templates/blog.html',
    'src/templates/post-a-new-economy-is-knocking.html',
    'src/templates/post-engineering-the-systems-of-abundance.html',
    'src/templates/post-turning-sci-fi-into-economic-fact.html',
    'src/templates/post-we-engineer-the-future-economy-in-the-real-world-not-in-theory.html'
]

# Upgrade post templates to 3D kinetic typography
post_files = glob.glob('src/templates/post-*.html')
for pf in post_files:
    with open(pf, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Replace the old flat 2D scroll-name with 3D perspective lift
    pattern = r'function initScrollAnimations\(\)\s*\{[\s\S]*?document\.querySelectorAll\(\'\[scroll-small-name\]\'\)[\s\S]*?\}\);'
    if re.search(pattern, content):
        content = re.sub(pattern, KINETIC_3D_SCRIPT_REPLACEMENT.strip(), content)
        with open(pf, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Upgraded 3D kinetic typography in {pf}")
    else:
        print(f"Pattern not found in {pf}")

# Inject Motion Physics script before </body> in all target templates
for tf in targets:
    with open(tf, 'r', encoding='utf-8') as f:
        content = f.read()

    # Remove any previous instance if already present
    content = re.sub(r'<script>\s*\/\*\*[\s\S]*?SAMARIA LUXURY EDITORIAL MOTION PHYSICS SUITE[\s\S]*?<\/script>', '', content)

    # Insert right before </body>
    if '</body>' in content:
        content = content.replace('</body>', MOTION_PHYSICS_SCRIPT + '\n</body>')
        with open(tf, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Injected Motion Physics Suite into {tf}")
    else:
        print(f"No </body> in {tf}")
