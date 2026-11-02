import os
import sys

SKILL_PATH = r"C:\Users\Edward Magejo\.gemini\config\skills\awwwards-design-craft\SKILL.md"

def update_skill():
    with open(SKILL_PATH, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Update Step 2 in Workflow Modes
    old_step_2 = """#### Step 2: The Interactive Design Intake Interview
Ask the user the **5 Core Aesthetic Questions** (in plain text or via `ask_question`):
1. **Visual Tone & Archetype:** What emotional impression should the site leave? (e.g., *Tactile Organic Luxury*, *Swiss Minimalist Editorial*, *Warm Playful Humanism*, *Cinematic Dark Elegance*)."""

    new_step_2 = """#### Step 2: The Interactive Design Intake Interview
Ask the user the **Core Aesthetic Questions** (in plain text or via `ask_question`):
1. **Design Archetype Selection (From Catalog):** Which codified Awwwards Archetype fits this project?
   - **Archetype 01: The Architectural Spine & Physical Artifact (Mecha Standard)** — Asymmetric two-column grid, persistent left navigational spine with 3D struck hero artifact, hairline vector lines, anti-AI human engineering copy.
   - **Archetype 02: Editorial Ledger & Monastic Typography** — Hairline-ruled ledger lists, wide high-contrast serif headlines, high-density metadata tables.
   - **Archetype 03: Tactile Organic Paper & Craft Luxury** — Warm stone/parchment surfaces, diffuse ambient shadows, artisanal typography.
   - **Archetype 04: Dark Minimalist Cinematic Instrument** — Deep obsidian canvas, razor-sharp technical mono accents, precision hardware feel.
   - **Custom Hybrid:** Synthesize an original aesthetic code from custom parameters.
   *(Note: This catalog is modular and continuously updated as new award-winning design options are codified).*
2. **Visual Tone & Impression:** What emotional impression should the site leave? (e.g., *Vanguard Industrial Tech*, *Tactile Organic Luxury*, *Swiss Minimalist Editorial*, *Cinematic Dark Elegance*)."""

    if old_step_2 in content:
        content = content.replace(old_step_2, new_step_2, 1)
        print("Updated Step 2 intake questions.")
    else:
        print("Warning: old_step_2 not found exactly.")

    # 2. Append the Multi-Design Catalog section before "## The Gut-Change-Add Decision Matrix"
    target_matrix = "## The Gut-Change-Add Decision Matrix (Awwwards Elevation Protocol)"

    catalog_section = """## The Awwwards Multi-Design Archetype Catalog

This catalog serves as an extensible library of verified Awwwards Site of the Day / Developer Award design systems. When designing a new site or elevating an existing project, select an archetype from this catalog to instantly anchor the structural layout, typography, anti-AI standards, and interaction physics. The catalog is designed to be updated regularly as new award-winning designs are codified.

---

### Archetype 01: The Architectural Spine & Physical Artifact (Mecha Standard)

A high-performance editorial layout engineered for deep-tech companies, industrial platforms, venture studios, and vanguard digital agencies. It rejects generic SaaS hero templates in favor of a rigid structural grid and a tangible 3D physical centerpiece.

#### 1. Best For & Domain Fit
- Vanguard engineering firms, deep-tech platforms, robotic automation, advanced software agencies, venture capital / private equity holding companies, high-end technical consultancies.

#### 2. Structural Anatomy: The Persistent Navigational Spine
- **Two-Column Asymmetric Grid**:
  - **Left Fixed Column (Navigational Spine, ~380px–440px)**: Houses the persistent brand mark, an interactive 3D hero artifact (e.g., struck coin, mechanical component, or instrument), and an indexed section directory (`01 TOMORROW RECYCLING`, `02 PULSE`, etc.) with hairline progress indicators.
  - **Right Fluid Column**: Large-scale editorial typography, manifesto statements, investment/capability dossiers, and interactive modals.
- **Hairline Vector Delimiters**:
  - Sections and sidebar columns are delineated strictly by hairline vector borders (`1px solid var(--border-color)`).
  - Borders are animated in via directional scale transforms (`transform: scaleX(0)` or `scaleY(0)` to `1`), creating an architectural drafting aesthetic.

#### 3. Strict Anti-AI Copy & Element Standards
- **Zero Buzzword Policy**:
  - Banned words: *"bespoke"*, *"delve"*, *"testament"*, *"tapestry"*, *"game-changer"*, *"unleash"*, *"empower"*, *"seamless"*.
  - Use plainspoken, high-density human engineering statements:
    - *Avoid*: "We deliver bespoke cutting-edge AI-driven solutions that transform possibilities."
    - *Use*: "Modern software powers the real economy. Samaria Tech builds reliable web platforms, high-speed websites, and practical software solutions."
- **Zero Slop Elements**:
  - No pulsing neon green/blue "status" dots.
  - No multi-color gradient blur halos behind text or containers.
  - No generic "floating tech card soup" with rounded borders and drop shadows.
  - No decorative AI noise; every visual element must have physical or organizational purpose.
- **Concrete Team Attribution**:
  - Name real engineers and partners with crisp titles (e.g. "Managing Partner", "Senior Systems Engineer"), accompanied by black-and-white portraits with high-contrast crop.

#### 4. Precision GSAP Animation & Easing Choreography
- **Industrial Mechanical Easing**:
  - Never use generic bouncy or elastic eases. Use calibrated cubic-beziers:
    ```javascript
    gsap.registerPlugin(CustomEase);
    CustomEase.create('lineEase', '0.85, 0, 0.15, 1'); // Snappy mechanical line wipe
    CustomEase.create('menuEase', 'M0,0 C0.82,0 0.18,1 1,1'); // Confident deceleration
    ```
- **Monospaced Countdown Preloader**:
  - A persistent full-screen veil featuring a tabular numeric counter (`00` to `100`) progressing synchronously with SVG lettermark paths or Lottie geometry.
  - On 100%, the preloader veil translates up or fades while the page un-pushes (`gsap.to(pageWrapper, { y: 0, duration: 1.2, ease: 'lineEase' })`) and grid lines draw in.
- **SplitText Inset Masking**:
  - Text lines are split and wrapped in a clipping container using `clip-path: inset(0 0 -0.3em 0)` with nested child spans (`yPercent: 150` to `0`).
  - Guarantees razor-sharp bottom-up typographic reveals with zero DOM layout reflow or line-height jitter.

#### 5. Interactive 3D Physical Artifact Protocol (Three.js)
When integrating an interactive 3D object (e.g. struck coin, hardware module, lens) into the navigational spine:
1. **Explicit Planar UV Projection Invariant**:
   - Never rely on Three.js default polar cap UVs on `CylinderGeometry`, which rotate the texture 90° sideways.
   - Always remap cap UVs explicitly to guarantee upright orientation:
     ```javascript
     const pos = geometry.attributes.position;
     const uvs = geometry.attributes.uv;
     for (let i = 0; i < pos.count; i++) {
       const z = pos.getZ(i), x = pos.getX(i), y = pos.getY(i);
       if (z > COIN_THICKNESS * 0.2) {
         uvs.setXY(i, (x / (2 * COIN_RADIUS)) + 0.5, (y / (2 * COIN_RADIUS)) + 0.5);
       } else if (z < -COIN_THICKNESS * 0.2) {
         uvs.setXY(i, (-x / (2 * COIN_RADIUS)) + 0.5, (y / (2 * COIN_RADIUS)) + 0.5);
       }
     }
     uvs.needsUpdate = true;
     ```
2. **Procedural Studio HDRI Softbox Environment**:
   - Standalone metallic materials (`MeshPhysicalMaterial`, `metalness >= 0.85`) reflect black without an environment map.
   - Generate a procedural warm equirectangular canvas gradient texture with softbox specular cuts to achieve radiant 22K metallic luster without external asset loading delays.
3. **Dual Interaction Physics**:
   - **Scroll Scrub**: Continuous Y-axis revolution synchronized with global page scroll.
   - **Pointer Drag Inertia**: Pointer down/move/up with velocity decay (`velocity *= 0.94`) and ambient floating tilt.
   - **Standalone Bundling**: Bundle Three.js locally (`/assets/three.min.js`) rather than relying on brittle CDN import maps.

---

"""

    if target_matrix in content:
        content = content.replace(target_matrix, catalog_section + target_matrix, 1)
        print("Inserted Multi-Design Archetype Catalog before Decision Matrix.")
    else:
        content = content + "\n\n" + catalog_section
        print("Appended Multi-Design Archetype Catalog to end of file.")

    with open(SKILL_PATH, 'w', encoding='utf-8') as f:
        f.write(content)

    print("Skill update completed successfully!")

if __name__ == '__main__':
    update_skill()
