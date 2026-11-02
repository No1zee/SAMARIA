import glob
import re

print("Applying enhanced fixes across templates and CSS...")

# 1. Update CSS files
css_files = [
    'public/assets/mecha-shared.css',
    'public/assets/mecha-xyz.webflow.shared.d529032f5.css'
]

for cf in css_files:
    with open(cf, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()

    # Update .logo_nav width
    content = re.sub(
        r'\.logo_nav\s*\{([^}]*?)width:\s*7\.375rem;',
        r'.logo_nav {\1width: 16.25rem;',
        content
    )

    # Update .preloader-logo-wrapper base width & height
    content = re.sub(
        r'(\.is-svg\.preloader-logo-wrapper\s*\{[^}]*?)width:\s*26\.875rem;\s*height:\s*5\.75rem;',
        r'\1width: min(90vw, 32rem); height: 3.2rem;',
        content
    )

    # Update .preloader-logo-wrapper variant width
    content = re.sub(
        r'(\.is-svg\.preloader-logo-wrapper:where\([^)]+\)[^{]*\{[^}]*?)width:\s*7\.375rem;',
        r'\1width: 16.25rem;',
        content
    )

    # Update mobile .preloader-logo-wrapper
    content = re.sub(
        r'(\.is-svg\.preloader-logo-wrapper\s*\{[^}]*?)width:\s*7\.375rem;\s*height:\s*1\.5625rem;',
        r'\1width: min(88vw, 16.25rem); height: auto; aspect-ratio: 2960 / 296;',
        content
    )

    with open(cf, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Updated {cf}")

# 2. Template replacements
templates = glob.glob('src/templates/*.html')

lottie_find_pattern = re.compile(
    r'if\s*\(isMobile\)\s*\{\s*function\s+tryFindInstance\(\)\s*\{.*?'
    r'startPreloaderAnimation\(\);\s*\}\s*\}\s*else\s*\{\s*'
    r'startPreloaderAnimation\(\);\s*\}',
    re.DOTALL
)

lottie_find_replacement = '''    let attempts = 0;
    function tryFindInstance() {
      attempts++;
      lottieInstance = lottieModule && lottieModule.lottie && lottieModule.lottie.getRegisteredAnimations().find(function (anim) {
        return anim.wrapper === lottieEl || lottieEl.contains(anim.wrapper);
      });
      if (lottieInstance && lottieInstance.totalFrames > 0) {
        startPreloaderAnimation();
      } else if (attempts < 60) {
        requestAnimationFrame(tryFindInstance);
      } else {
        startPreloaderAnimation();
      }
    }
    tryFindInstance();
  } else {
    startPreloaderAnimation();
  }'''

for t in templates:
    if '404' in t:
        continue
    with open(t, 'r', encoding='utf-8') as f:
        content = f.read()

    # Preloader wrapper style
    content = content.replace(
        '.preloader-logo-wrapper {width: 26.8rem; height: 5.7rem;}',
        '.preloader-logo-wrapper {width: min(90vw, 32rem); height: 3.2rem; aspect-ratio: 2960 / 296;}'
    )

    # Script 24 logoWrapper dimensions
    content = content.replace(
        "if (logoWrapper) gsap.set(logoWrapper, { width: '7.375rem', height: '1.625rem' });",
        "if (logoWrapper) gsap.set(logoWrapper, { width: '16.25rem', height: '1.625rem' });"
    )
    content = content.replace(
        "width: '7.375rem', height: '1.625rem', duration: 1.0",
        "width: '16.25rem', height: '1.625rem', duration: 1.0"
    )

    # TryFindInstance replacement
    old_lottie_block = '''if (isMobile) {
      function tryFindInstance() {
        lottieInstance = lottieModule.lottie.getRegisteredAnimations().find(function (anim) {
          return anim.wrapper === lottieEl || lottieEl.contains(anim.wrapper);
        });
        if (lottieInstance && lottieInstance.totalFrames > 0) {
          startPreloaderAnimation();
        } else {
          requestAnimationFrame(tryFindInstance);
        }
      }
      tryFindInstance();
    } else {
      lottieInstance = lottieModule.lottie.getRegisteredAnimations().find(function (anim) {
        return anim.wrapper === lottieEl || lottieEl.contains(anim.wrapper);
      });
      startPreloaderAnimation();
    }
  } else {
    startPreloaderAnimation();
  }'''

    if old_lottie_block in content:
        content = content.replace(old_lottie_block, lottie_find_replacement)
        print(f"Replaced tryFindInstance block in {t}")
    else:
        print(f"Notice: exact old_lottie_block not matched in {t}")

    with open(t, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Updated {t}")

# 3. Fix tests/verify_mecha_clone.mjs
verify_test_path = 'tests/verify_mecha_clone.mjs'
with open(verify_test_path, 'r', encoding='utf-8') as f:
    vt_content = f.read()

vt_content = vt_content.replace(
    "if (!title.includes('Mecha Capital'))",
    "if (!title.includes('Samaria Tech'))"
)
vt_content = vt_content.replace(
    "Starting Playwright verification of Mecha 1:1 Clone...",
    "Starting Playwright verification of Samaria Tech 1:1 Clone..."
)

with open(verify_test_path, 'w', encoding='utf-8') as f:
    f.write(vt_content)
print(f"Updated {verify_test_path}")

print("All enhanced fixes applied!")
