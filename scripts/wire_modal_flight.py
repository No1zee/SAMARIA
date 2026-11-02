import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('src/templates/home.html', 'r', encoding='utf-8') as f:
    text = f.read()

# 1. Expose window.__modalCoinMesh in initThree
target_scene_add = "scene.add(model);"
replacement_scene_add = """scene.add(model);
  window.__modalCoinMesh = model;
  model.visible = false; // Initially hidden until flight docks!"""

if target_scene_add in text and "window.__modalCoinMesh = model;" not in text:
    text = text.replace(target_scene_add, replacement_scene_add, 1)
    print("Exposed window.__modalCoinMesh in initThree!")
else:
    print("window.__modalCoinMesh already exposed or target not found.")

# 2. Update openModal()
target_open = """function openModal() {
  if (modalOpen) return;
  modalOpen = true;
  lockScroll();

  gsap.set(modal, { display: 'flex', opacity: 1, pointerEvents: 'auto' });
  setupElements();
  requestAnimationFrame(initThree);"""

replacement_open = """function openModal() {
  if (modalOpen) return;
  modalOpen = true;
  lockScroll();

  gsap.set(modal, { display: 'flex', opacity: 1, pointerEvents: 'auto' });
  setupElements();
  requestAnimationFrame(initThree);

  if (window.__modalCoinMesh) window.__modalCoinMesh.visible = false;

  // Cinematic Parabolic Flight: Coin leads across viewport
  if (typeof window.__launchCoinToModal === 'function') {
    window.__launchCoinToModal(() => {
      if (window.__modalCoinMesh) window.__modalCoinMesh.visible = true;
    });
  }"""

if target_open in text:
    text = text.replace(target_open, replacement_open)
    print("Updated openModal() with launchCoinToModal!")
else:
    print("Notice: target_open not found directly.")

# 3. Update closeModal()
target_close = """function closeModal() {
  if (!modalOpen) return;
  modalOpen = false;

  gsap.to(['.modal-wrap', contactBg], {"""

replacement_close = """function closeModal() {
  if (!modalOpen) return;
  modalOpen = false;

  // Return Flight: Coin arcs back to left sidebar index
  if (typeof window.__returnCoinFromModal === 'function') {
    window.__returnCoinFromModal();
  }

  gsap.to(['.modal-wrap', contactBg], {"""

if target_close in text:
    text = text.replace(target_close, replacement_close)
    print("Updated closeModal() with returnCoinFromModal!")
else:
    print("Notice: target_close not found directly.")

with open('src/templates/home.html', 'w', encoding='utf-8') as f:
    f.write(text)

print("Modal flight wiring completed successfully!")
