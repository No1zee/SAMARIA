import sys
sys.stdout.reconfigure(encoding='utf-8')

# 1. Update public/assets/mecha-shared.css
with open('public/assets/mecha-shared.css', 'r', encoding='utf-8') as f:
    css = f.read()

badge_css_replacement = """
.w-webflow-badge,
a.w-webflow-badge,
[class*="webflow-badge"] {
  display: none !important;
  visibility: hidden !important;
  opacity: 0 !important;
  pointer-events: none !important;
  width: 0 !important;
  height: 0 !important;
  max-width: 0 !important;
  max-height: 0 !important;
  position: absolute !important;
  left: -99999px !important;
  top: -99999px !important;
  clip: rect(0, 0, 0, 0) !important;
  clip-path: inset(50%) !important;
}
"""

# Replace all occurrences of .w-webflow-badge { ... } in CSS
import re
new_css = re.sub(r'\.w-webflow-badge\s*\{[^}]*\}', badge_css_replacement, css)
new_css = re.sub(r'\.w-webflow-badge\s*>\s*img\s*\{[^}]*\}', '', new_css)

with open('public/assets/mecha-shared.css', 'w', encoding='utf-8') as f:
    f.write(new_css)
print("Updated public/assets/mecha-shared.css")

# 2. Update src/templates/home.html
with open('src/templates/home.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Add inline CSS to top <head>
css_rule = """
<style>
.w-webflow-badge, a.w-webflow-badge, [class*="webflow-badge"], a[href*="webflow.com?utm_campaign=brandjs"] {
  display: none !important;
  visibility: hidden !important;
  opacity: 0 !important;
  pointer-events: none !important;
  width: 0 !important;
  height: 0 !important;
  position: absolute !important;
  left: -99999px !important;
  top: -99999px !important;
}
</style>
<script>
(function() {
  function nukeBadge() {
    var badges = document.querySelectorAll('.w-webflow-badge, a[href*="webflow.com"]');
    for (var i = 0; i < badges.length; i++) {
      if (badges[i].className && badges[i].className.indexOf('w-webflow-badge') !== -1 || (badges[i].href && badges[i].href.indexOf('utm_campaign=brandjs') !== -1)) {
        badges[i].remove();
      }
    }
  }
  nukeBadge();
  document.addEventListener('DOMContentLoaded', nukeBadge);
  window.addEventListener('load', nukeBadge);
  if (window.MutationObserver) {
    new MutationObserver(nukeBadge).observe(document.documentElement, { childList: true, subtree: true });
  }
})();
</script>
"""

# Place it right after <head>
html = html.replace('<head>', '<head>' + css_rule, 1)

with open('src/templates/home.html', 'w', encoding='utf-8') as f:
    f.write(html)
print("Updated src/templates/home.html with badge nuke styles & script!")
