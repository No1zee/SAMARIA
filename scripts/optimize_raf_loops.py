import re

with open('src/templates/home.html', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Optimize Footer Logo Reveal loop (lines 960-997)
old_footer_anim = """      if (!window._isPageTransitioning) {
        wrap.style.transform = translateY === 0
          ? ''
          : 'translate3d(0,' + translateY + 'px,0)';
      }
      rafId = requestAnimationFrame(animate);
    }
    window.addEventListener('wheel', onWheel, { passive: true });
    rafId = requestAnimationFrame(animate);"""

new_footer_anim = """      if (!window._isPageTransitioning) {
        wrap.style.transform = translateY === 0
          ? ''
          : 'translate3d(0,' + translateY + 'px,0)';
      }
      if (Math.abs(target - progress) > 0.0005 || Math.abs(accumulatedDelta) > 0.01 || fall.active) {
        rafId = requestAnimationFrame(animate);
      } else {
        rafId = null;
        if (progress !== 0 && target === 0) {
          progress = 0;
          wrap.style.transform = '';
        }
      }
    }
    window.addEventListener('wheel', function(e) {
      onWheel(e);
      if (!rafId) rafId = requestAnimationFrame(animate);
    }, { passive: true });
    rafId = requestAnimationFrame(animate);"""

if old_footer_anim in content:
    content = content.replace(old_footer_anim, new_footer_anim)
    print("Optimized Footer Reveal loop (LF)")
else:
    old_footer_crlf = old_footer_anim.replace('\n', '\r\n')
    new_footer_crlf = new_footer_anim.replace('\n', '\r\n')
    if old_footer_crlf in content:
        content = content.replace(old_footer_crlf, new_footer_crlf)
        print("Optimized Footer Reveal loop (CRLF)")
    else:
        print("WARNING: Footer reveal pattern not matched")

# 2. Optimize Custom Cursor loop (lines 1963-1976)
old_cursor_anim = """  function animate() {
    requestAnimationFrame(animate);
    spring.x += (mouse.x - spring.x) * 0.14;
    spring.y += (mouse.y - spring.y) * 0.14;

    const cx = spring.x - window.innerWidth  / 2;
    const cy = spring.y - window.innerHeight / 2;

    cursors.forEach(el => {
      el.style.transform = `translate3d(${cx}px, ${cy}px, 0px) scale3d(1,1,1)`;
    });
  }

  requestAnimationFrame(animate);"""

new_cursor_anim = """  let cursorRafId = null;
  function animate() {
    const dx = mouse.x - spring.x;
    const dy = mouse.y - spring.y;
    spring.x += dx * 0.18;
    spring.y += dy * 0.18;

    const cx = spring.x - window.innerWidth  / 2;
    const cy = spring.y - window.innerHeight / 2;

    cursors.forEach(el => {
      el.style.transform = `translate3d(${cx}px, ${cy}px, 0px) scale3d(1,1,1)`;
    });

    if (Math.abs(dx) > 0.08 || Math.abs(dy) > 0.08) {
      cursorRafId = requestAnimationFrame(animate);
    } else {
      cursorRafId = null;
    }
  }

  window.addEventListener('mousemove', () => {
    if (!cursorRafId) cursorRafId = requestAnimationFrame(animate);
  }, { passive: true });
  cursorRafId = requestAnimationFrame(animate);"""

if old_cursor_anim in content:
    content = content.replace(old_cursor_anim, new_cursor_anim)
    print("Optimized Cursor loop (LF)")
else:
    old_cursor_crlf = old_cursor_anim.replace('\n', '\r\n')
    new_cursor_crlf = new_cursor_anim.replace('\n', '\r\n')
    if old_cursor_crlf in content:
        content = content.replace(old_cursor_crlf, new_cursor_crlf)
        print("Optimized Cursor loop (CRLF)")
    else:
        print("WARNING: Cursor loop pattern not matched")

# 3. Optimize Sidebar Coin loop (IntersectionObserver lifecycle)
old_coin_anim = """    let animStartTime = performance.now();
    function animate() {
      requestAnimationFrame(animate);
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
    animate();"""

new_coin_anim = """    let animStartTime = performance.now();
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
    coinObs.observe(container);"""

if old_coin_anim in content:
    content = content.replace(old_coin_anim, new_coin_anim)
    print("Optimized Sidebar Coin loop (LF)")
else:
    old_coin_crlf = old_coin_anim.replace('\n', '\r\n')
    new_coin_crlf = new_coin_anim.replace('\n', '\r\n')
    if old_coin_crlf in content:
        content = content.replace(old_coin_crlf, new_coin_crlf)
        print("Optimized Sidebar Coin loop (CRLF)")
    else:
        print("WARNING: Sidebar coin loop pattern not matched")

# 4. Optimize Modal Coin loop (only run while modal is open)
old_modal_anim = """  function animate() {
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
  animate();"""

new_modal_anim = """  let modalAnimId = null;
  function animate() {
    if (!modalOpen) {
      modalAnimId = null;
      return;
    }
    modalAnimId = requestAnimationFrame(animate);
    if (!isModalDragging) {
      autoRotY += AUTO_SPEED;
    }
    if (model) {
      model.rotation.y = autoRotY;
      model.rotation.x = modalRotX;
    }
    renderer.render(scene, camera);
  }
  modalAnimId = requestAnimationFrame(animate);"""

if old_modal_anim in content:
    content = content.replace(old_modal_anim, new_modal_anim)
    print("Optimized Modal Coin loop (LF)")
else:
    old_modal_crlf = old_modal_anim.replace('\n', '\r\n')
    new_modal_crlf = new_modal_anim.replace('\n', '\r\n')
    if old_modal_crlf in content:
        content = content.replace(old_modal_crlf, new_modal_crlf)
        print("Optimized Modal Coin loop (CRLF)")
    else:
        print("WARNING: Modal coin loop pattern not matched")

# Also restart modal animate when modal opens
old_open_call = "function openModal() {"
new_open_call = """function openModal() {
  if (typeof initThree === 'function' && renderer) {
    if (typeof modalAnimId !== 'undefined' && !modalAnimId) {
      modalAnimId = requestAnimationFrame(animate);
    }
  }"""

if old_open_call in content:
    content = content.replace(old_open_call, new_open_call)
    print("Hooked modal open animate restart")

with open('src/templates/home.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Saved all RAF optimizations to home.html")
