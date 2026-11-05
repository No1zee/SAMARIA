import re

file_path = r'c:\Projects\SAMARIA\src\templates\home.html'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Custom CSS
css_to_add = """
/* Samaria Sovereign Seal */
.footer-illu {
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
  margin-top: 5rem !important;
  margin-bottom: 4.5rem !important;
  width: 100% !important;
}

.footer-illu .is-footer-img {
  width: 320px !important;
  max-width: 80vw !important;
  height: auto !important;
  aspect-ratio: 1 / 1 !important;
  object-fit: contain !important;
  filter: drop-shadow(0 20px 50px rgba(212, 175, 55, 0.22));
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), filter 0.6s ease;
  cursor: pointer;
}

.footer-illu .is-footer-img:hover {
  transform: scale(1.03) rotate(1.5deg);
  filter: drop-shadow(0 25px 60px rgba(212, 175, 55, 0.32));
}

.is-svg.is-f {
  display: flex !important;
  visibility: visible !important;
  justify-content: center !important;
  align-items: center !important;
  width: 100% !important;
  padding: 1.5rem 0 !important;
  position: absolute !important;
  inset: auto auto 0px !important;
  transform: none !important;
  pointer-events: none;
}

.is-svg.is-f .is-footer-img {
  width: 150px !important;
  height: auto !important;
  aspect-ratio: 1 / 1 !important;
  object-fit: contain !important;
  opacity: 0.9;
  filter: drop-shadow(0 12px 30px rgba(212, 175, 55, 0.15));
}

@media screen and (max-height: 720px) {
  .is-svg.is-f {
    display: none !important;
  }
}

@media screen and (max-width: 767px) {
  .footer-illu {
    margin-top: 3.5rem !important;
    margin-bottom: 3rem !important;
  }
  .footer-illu .is-footer-img {
    width: 220px !important;
    filter: drop-shadow(0 15px 35px rgba(212, 175, 55, 0.2));
  }
}
"""

marker = '.is-marquee-gallery .viewport-video video { width: auto !important; }'
assert marker in content, "Marker for CSS not found"
content = content.replace(marker, marker + "\n" + css_to_add)

# 2. Replace chip in .is-svg.is-f
target1 = '<div class="is-svg is-f"><img alt="" class="is-svg is-img is-footer-img" height="516" loading="eager" sizes="(max-width: 767px) 100vw, 864px" src="https://cdn.prod.website-files.com/6a180066e6ba27b81a7ef915/6a180066e6ba27b81a7ef9bc_Warstwa_1%20(1).png" srcset="https://cdn.prod.website-files.com/6a180066e6ba27b81a7ef915/6a180066e6ba27b81a7ef9bc_Warstwa_1%2520(1)-p-500.png 500w, https://cdn.prod.website-files.com/6a180066e6ba27b81a7ef915/6a180066e6ba27b81a7ef9bc_Warstwa_1%2520(1)-p-800.png 800w, https://cdn.prod.website-files.com/6a180066e6ba27b81a7ef915/6a180066e6ba27b81a7ef9bc_Warstwa_1%20(1).png 868w" width="864"/></div>'
replacement1 = '<div class="is-svg is-f"><img alt="Samaria Sovereign Seal" class="is-svg is-img is-footer-img" height="516" loading="eager" src="/assets/coin/sovereign_diffuse.png" width="516"/></div>'
assert target1 in content, "Target 1 not found"
content = content.replace(target1, replacement1, 1)

# 3. Replace chip in .footer-illu
target2 = '<div class="footer-illu"><img alt="" class="is-svg is-img is-footer-img" height="516" loading="eager" sizes="(max-width: 767px) 100vw, 864px" src="https://cdn.prod.website-files.com/6a180066e6ba27b81a7ef915/6a180066e6ba27b81a7ef9bc_Warstwa_1%20(1).png" srcset="https://cdn.prod.website-files.com/6a180066e6ba27b81a7ef915/6a180066e6ba27b81a7ef9bc_Warstwa_1%2520(1)-p-500.png 500w, https://cdn.prod.website-files.com/6a180066e6ba27b81a7ef915/6a180066e6ba27b81a7ef9bc_Warstwa_1%2520(1)-p-800.png 800w, https://cdn.prod.website-files.com/6a180066e6ba27b81a7ef915/6a180066e6ba27b81a7ef9bc_Warstwa_1%20(1).png 868w" width="864"/></div>'
replacement2 = '<div class="footer-illu"><img alt="Samaria Sovereign Seal" class="is-svg is-img is-footer-img" height="516" loading="eager" src="/assets/coin/sovereign_diffuse.png" width="516"/></div>'
assert target2 in content, "Target 2 not found"
content = content.replace(target2, replacement2, 1)

# 4. Replace mobile hamburger M icon with Samaria S icon
target_m = '<div class="hamb-icon"><div class="is-svg is-m-icon w-embed"><svg fill="none" height="100%" viewbox="0 0 10 10" width="100%" xmlns="http://www.w3.org/2000/svg">\n<path d="M0 9.45724V0H1.36205L4.62582 7.90245H4.65152L7.8896 0H9.25164V9.45724H8.12089V2.27436H8.09519L5.1398 9.45724H4.11184L1.15646 2.27436H1.13076V9.45724H0Z" fill="currentColor"></path>\n</svg></div></div>'
replacement_s = '<div class="hamb-icon"><div class="is-svg is-m-icon w-embed"><svg fill="none" height="100%" viewbox="0 0 10 10" width="100%" xmlns="http://www.w3.org/2000/svg">\n<path d="M2.2 1.5h5.6c.7 0 1.2.5 1.2 1.2v1.1c0 .7-.5 1.2-1.2 1.2H3.8v.8h4c.7 0 1.2.5 1.2 1.2v1.5c0 .7-.5 1.2-1.2 1.2H2.2c-.7 0-1.2-.5-1.2-1.2V6.2h1.6v1.3h4.6v-1.1H3.4c-.7 0-1.2-.5-1.2-1.2V2.7c0-.7.5-1.2 1.2-1.2zm.4 1.5v1h4.4v-1H2.6z" fill="currentColor"></path>\n</svg></div></div>'
if target_m in content:
    content = content.replace(target_m, replacement_s, 1)
    print("Replaced mobile M icon with Samaria S icon")
else:
    # Try with \r\n if \n doesn't match
    target_m_crlf = target_m.replace('\n', '\r\n')
    if target_m_crlf in content:
        content = content.replace(target_m_crlf, replacement_s.replace('\n', '\r\n'), 1)
        print("Replaced mobile M icon with Samaria S icon (CRLF)")

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Successfully applied Samaria Sovereign Seal and S icon to home.html!")
