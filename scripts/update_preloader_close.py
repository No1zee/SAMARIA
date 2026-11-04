with open('src/templates/home.html', 'r', encoding='utf-8') as f:
    content = f.read()

target = """      tl.to(overlay, {
        opacity: 0, duration: 0.3, ease: 'power2.inOut',
        onComplete: function () {
          gsap.set(overlay, { display: 'none', backgroundColor: 'white' });
        }
      }, 0.15);"""

replacement = """      tl.to(overlay, {
        opacity: 0, duration: 0.3, ease: 'power2.inOut',
        onComplete: function () {
          gsap.set(overlay, { display: 'none', backgroundColor: 'white' });
          gsap.set(preloader, { display: 'none', pointerEvents: 'none' });
          ScrollTrigger.refresh();
          window.dispatchEvent(new Event('preloader:done'));
        }
      }, 0.15);"""

if target in content:
    content = content.replace(target, replacement)
    print("Updated overlay close (LF)")
else:
    target_crlf = target.replace('\n', '\r\n')
    replacement_crlf = replacement.replace('\n', '\r\n')
    if target_crlf in content:
        content = content.replace(target_crlf, replacement_crlf)
        print("Updated overlay close (CRLF)")
    else:
        print("WARNING: target not found")

with open('src/templates/home.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Saved home.html")
