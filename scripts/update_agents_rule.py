rule_path = r'C:\Users\Edward Magejo\.gemini\config\AGENTS.md'

with open(rule_path, 'r', encoding='utf-8') as f:
    content = f.read()

new_rule = """

## Strict Invariant: Zero Helper Text & Template Filler (All Projects)
- **ABSOLUTE PROHIBITION**: Never introduce or retain unnecessary helper text, explanatory micro-copy, or visual crutches across any UI or web project.
  1. **No Obvious Micro-Instructions**: Strictly prohibit tags or hints telling users how to interact with obvious elements (e.g., *"drag to rotate"*, *"scroll to explore"*, *"click here"*, *"more"*, *"swipe"*). Affordance must be communicated exclusively through visual hierarchy, elevation, cursor styling, and fluid motion physics.
  2. **No Redundant Secondary Tags**: Omit redundant sub-labels or trailing indicator pills that duplicate primary navigational links or card titles.
  3. **Purge Template Remnants & Filler**: When adapting, cloning, or scaffolding templates (Webflow, Tailwind, shadcn, etc.), aggressively scrub all template artifacts before delivery:
     - Placeholder affiliations, dummy career metrics, and fabricated company bullet points.
     - Mismatched template stats (e.g., currency symbols on uptime metrics, repeated mock percentages).
     - Dead anchor links (e.g., `href="#investments"`), filler comments, and designer/platform watermark tags.
  4. **Clean Form Semantics**: Form inputs must rely on crisp, concise label hierarchy; avoid repetitive placeholder noise (e.g., prefer clean semantic labels over redundant `"Enter your name here"` placeholders).
"""

if 'Strict Invariant: Zero Helper Text & Template Filler' not in content:
    content = content.rstrip() + new_rule
    with open(rule_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print('AGENTS.md updated successfully!')
else:
    print('Rule already present in AGENTS.md')
