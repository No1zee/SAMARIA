with open('src/templates/home.html', 'r', encoding='utf-8') as f:
    content = f.read()

# -------------------------------------------------------------
# 1. SIDEBAR NAV: Update 01 Apex Web Platform -> HEMS
# -------------------------------------------------------------
old_nav_apex = '<div class="is-caption no-break" section-navi="section-title">Apex Web Platform</div>'
new_nav_hems = '<div class="is-caption no-break" section-navi="section-title">HEMS</div>'
assert old_nav_apex in content, "old_nav_apex not found"
content = content.replace(old_nav_apex, new_nav_hems, 1)

# -------------------------------------------------------------
# 2. PROJECT 01: Apex Web Platform -> HEMS
# -------------------------------------------------------------
old_p1_hidden = '<div class="is-caption no-break" section-navi="main-section-title">apex web platform</div>'
new_p1_hidden = '<div class="is-caption no-break" section-navi="main-section-title">HEMS</div>'
assert old_p1_hidden in content, "old_p1_hidden not found"
content = content.replace(old_p1_hidden, new_p1_hidden, 1)

old_p1_card = """    <div class="samaria-project-row">
      <div class="samaria-project-media project-vid project-file hoverable" gsap-img="">
        <video loop="" muted="" playsinline="" poster="https://cdn.prod.website-files.com/69e776c5f7729eda0138d932/69eab0a15f1a891d41f61e84_jfground.jpg" preload="none" class="project-image is-full">
          <source src="https://widelabco.sfo3.cdn.digitaloceanspaces.com/Greenwaycomputervision%20Short2.webm" type="video/webm" />
        </video>
      </div>

      <div class="samaria-project-info">
        <div class="samaria-project-meta">
          <span class="samaria-project-order" section-navi="order-number">01</span>
          <span class="samaria-project-tag" scroll-small-name="">Web Engineering</span>
          <span class="samaria-project-tag" scroll-small-name="">Robotics &amp; AI</span>
        </div>
        <h2 class="samaria-project-title" scroll-name="" section-navi="main-section-title">Apex Web Platform</h2>
        <p class="samaria-project-desc">
          An interactive spatial diorama and computer vision pipeline engineered for large-scale venues, combining real-time telemetry with sub-second rendering.
        </p>
        <a href="https://www.apexplatform.tech/" target="_blank" class="samaria-project-link action-button hoverable" aria-label="Explore Apex Web Platform">
          Explore Platform <span>&rarr;</span>
        </a>
      </div>
    </div>"""

new_p1_card = """    <div class="samaria-project-row">
      <div class="samaria-project-media project-file hoverable" gsap-img="">
        <img src="/assets/projects/hems_console.webp" alt="HEMS Emergency Ambulance Telemetry Platform" class="project-image is-full" loading="lazy" />
      </div>

      <div class="samaria-project-info">
        <div class="samaria-project-meta">
          <span class="samaria-project-order" section-navi="order-number">01</span>
          <span class="samaria-project-tag" scroll-small-name="">Emergency Telemetry</span>
          <span class="samaria-project-tag" scroll-small-name="">Mobile &amp; Cloud</span>
        </div>
        <h2 class="samaria-project-title" scroll-name="" section-navi="main-section-title">HEMS</h2>
        <p class="samaria-project-desc">
          A mission-critical emergency ambulance monitoring and telemetry platform. Features sub-minute GPS tracking, ruggedized Android hardware integration, offline-first mobile sync, and a real-time dispatch operations console.
        </p>
        <a href="#contact" class="samaria-project-link action-button hoverable" open-modal="" aria-label="Discuss HEMS Architecture">
          Discuss Architecture <span>&rarr;</span>
        </a>
      </div>
    </div>"""

assert old_p1_card in content, "old_p1_card not found"
content = content.replace(old_p1_card, new_p1_card, 1)

# -------------------------------------------------------------
# 3. PROJECT 02: Pulse Application -> Kinetic
# -------------------------------------------------------------
old_p2_hidden = '<div class="is-caption no-break" section-navi="main-section-title">Pulse Application</div>'
new_p2_hidden = '<div class="is-caption no-break" section-navi="main-section-title">Kinetic</div>'
assert old_p2_hidden in content, "old_p2_hidden not found"
content = content.replace(old_p2_hidden, new_p2_hidden, 1)

old_p2_card = """    <div class="samaria-project-row is-reversed">
      <div class="samaria-project-media project-file hoverable" gsap-img="">
        <img src="https://cdn.prod.website-files.com/6a180066e6ba27b81a7ef915/6a180066e6ba27b81a7ef974_image%2035830.png" alt="Pulse Application" class="project-image is-full" loading="lazy" />
      </div>

      <div class="samaria-project-info">
        <div class="samaria-project-meta">
          <span class="samaria-project-order" section-navi="order-number">02</span>
          <span class="samaria-project-tag" scroll-small-name="">Web Application</span>
          <span class="samaria-project-tag" scroll-small-name="">Full-Stack</span>
        </div>
        <h2 class="samaria-project-title" scroll-name="" section-navi="main-section-title">Pulse Application</h2>
        <p class="samaria-project-desc">
          High-performance web architecture and intuitive application interface engineered to streamline complex technical operations and multi-tier workflows.
        </p>
        <a href="https://www.aescape.com/" target="_blank" class="samaria-project-link action-button hoverable" aria-label="Explore Pulse Application">
          Explore Application <span>&rarr;</span>
        </a>
      </div>
    </div>"""

new_p2_card = """    <div class="samaria-project-row is-reversed">
      <div class="samaria-project-media project-file hoverable" gsap-img="">
        <img src="/assets/projects/kinetic_clipper.webp" alt="Kinetic Autonomous Sports Highlight Extraction Pipeline" class="project-image is-full" loading="lazy" />
      </div>

      <div class="samaria-project-info">
        <div class="samaria-project-meta">
          <span class="samaria-project-order" section-navi="order-number">02</span>
          <span class="samaria-project-tag" scroll-small-name="">Computer Vision</span>
          <span class="samaria-project-tag" scroll-small-name="">AI Automation</span>
        </div>
        <h2 class="samaria-project-title" scroll-name="" section-navi="main-section-title">Kinetic</h2>
        <p class="samaria-project-desc">
          An autonomous, high-performance video extraction engine designed for automated sports highlights. Combines real-time audio spike detection, multimodal Gemini Vision confirmation, and sub-second video segmentation.
        </p>
        <a href="#contact" class="samaria-project-link action-button hoverable" open-modal="" aria-label="Explore Kinetic Engine">
          Explore Engine <span>&rarr;</span>
        </a>
      </div>
    </div>"""

assert old_p2_card in content, "old_p2_card not found"
content = content.replace(old_p2_card, new_p2_card, 1)

# -------------------------------------------------------------
# 4. TEAM SECTION: Edward Magejo (BSc in Information Systems)
# -------------------------------------------------------------
# Mobile Bio
old_edward_bio_m = "<p>Directing end-to-end web architecture, system design, and API integrations across mission-critical web platforms.</p>"
new_edward_bio_m = "<p>Holds a BSc in Information Systems. Directing end-to-end web architecture, system design, and API integrations across mission-critical platforms.</p>"
assert old_edward_bio_m in content, "old_edward_bio_m not found"
content = content.replace(old_edward_bio_m, new_edward_bio_m, 1)

# Desktop Bio
old_edward_bio_d = "<p>Overseeing end-to-end cloud infrastructure, full-stack architecture, and custom 3D web platform development for enterprise and high-growth ventures.</p>"
new_edward_bio_d = "<p>Holds a BSc in Information Systems. Overseeing end-to-end cloud infrastructure, full-stack architecture, and custom 3D web platform development for enterprise and high-growth ventures.</p>"
assert old_edward_bio_d in content, "old_edward_bio_d not found"
content = content.replace(old_edward_bio_d, new_edward_bio_d, 1)

# Mobile Table
old_edward_table_m = """<div class="item-numbers is-mobile-x"><div class="line is-animated" contained-line=""></div><p class="is-caption" scroll-line-name="">Core Stack</p><p class="is-caption is-op-50" scroll-line-name="">TypeScript / Next.js</p></div><div class="item-numbers is-mobile-x"><div class="line is-animated" contained-line=""></div><p class="is-caption" scroll-line-name="">Backend &amp; APIs</p><p class="is-caption is-op-50" scroll-line-name="">Node.js / Python</p></div><div class="item-numbers is-mobile-x"><div class="line is-animated" contained-line=""></div><p class="is-caption" scroll-line-name="">Interactive 3D</p><p class="is-caption is-op-50" scroll-line-name="">Three.js / WebGL</p></div><div class="item-numbers is-mobile-x"><div class="line is-animated" contained-line=""></div><p class="is-caption" scroll-line-name="">Cloud Architecture</p><p class="is-caption is-op-50" scroll-line-name="">Distributed Systems</p></div><div class="item-numbers is-mobile-x"><div class="line is-animated" contained-line=""></div><div class="line is-animated is-bottom" contained-line=""></div><p class="is-caption" scroll-line-name="">Delivery Focus</p><p class="is-caption is-op-50" scroll-line-name="">Production Scale</p></div>"""
new_edward_table_m = """<div class="item-numbers is-mobile-x"><div class="line is-animated" contained-line=""></div><p class="is-caption" scroll-line-name="">Education</p><p class="is-caption is-op-50" scroll-line-name="">BSc Information Systems</p></div><div class="item-numbers is-mobile-x"><div class="line is-animated" contained-line=""></div><p class="is-caption" scroll-line-name="">Core Stack</p><p class="is-caption is-op-50" scroll-line-name="">TypeScript / Next.js</p></div><div class="item-numbers is-mobile-x"><div class="line is-animated" contained-line=""></div><p class="is-caption" scroll-line-name="">Backend &amp; APIs</p><p class="is-caption is-op-50" scroll-line-name="">Node.js / Python</p></div><div class="item-numbers is-mobile-x"><div class="line is-animated" contained-line=""></div><p class="is-caption" scroll-line-name="">Interactive 3D</p><p class="is-caption is-op-50" scroll-line-name="">Three.js / WebGL</p></div><div class="item-numbers is-mobile-x"><div class="line is-animated" contained-line=""></div><div class="line is-animated is-bottom" contained-line=""></div><p class="is-caption" scroll-line-name="">Cloud Architecture</p><p class="is-caption is-op-50" scroll-line-name="">Distributed Systems</p></div>"""
assert old_edward_table_m in content, "old_edward_table_m not found"
content = content.replace(old_edward_table_m, new_edward_table_m, 1)

# Desktop Table
old_edward_table_d = """<div class="item-numbers"><div class="line is-animated" contained-line=""></div><p class="is-caption is-op-50" scroll-line-name="">Core Stack</p><p class="is-caption is-op-50" scroll-line-name="">TypeScript / Next.js</p></div><div class="item-numbers"><div class="line is-animated" contained-line=""></div><p class="is-caption is-op-50" scroll-line-name="">Backend &amp; APIs</p><p class="is-caption is-op-50" scroll-line-name="">Node.js / Python</p></div><div class="item-numbers"><div class="line is-animated" contained-line=""></div><p class="is-caption is-op-50" scroll-line-name="">Interactive 3D</p><p class="is-caption is-op-50" scroll-line-name="">Three.js / WebGL</p></div><div class="item-numbers"><div class="line is-animated" contained-line=""></div><p class="is-caption is-op-50" scroll-line-name="">Cloud Architecture</p><p class="is-caption is-op-50" scroll-line-name="">Distributed Systems</p></div><div class="item-numbers"><div class="line is-animated" contained-line=""></div><div class="line is-bottom is-animated" contained-line=""></div><p class="is-caption is-op-50" scroll-line-name="">Delivery Focus</p><p class="is-caption is-op-50" scroll-line-name="">Production Scale</p></div>"""
new_edward_table_d = """<div class="item-numbers"><div class="line is-animated" contained-line=""></div><p class="is-caption is-op-50" scroll-line-name="">Education</p><p class="is-caption is-op-50" scroll-line-name="">BSc Information Systems</p></div><div class="item-numbers"><div class="line is-animated" contained-line=""></div><p class="is-caption is-op-50" scroll-line-name="">Core Stack</p><p class="is-caption is-op-50" scroll-line-name="">TypeScript / Next.js</p></div><div class="item-numbers"><div class="line is-animated" contained-line=""></div><p class="is-caption is-op-50" scroll-line-name="">Backend &amp; APIs</p><p class="is-caption is-op-50" scroll-line-name="">Node.js / Python</p></div><div class="item-numbers"><div class="line is-animated" contained-line=""></div><p class="is-caption is-op-50" scroll-line-name="">Interactive 3D</p><p class="is-caption is-op-50" scroll-line-name="">Three.js / WebGL</p></div><div class="item-numbers"><div class="line is-animated" contained-line=""></div><div class="line is-bottom is-animated" contained-line=""></div><p class="is-caption is-op-50" scroll-line-name="">Cloud Architecture</p><p class="is-caption is-op-50" scroll-line-name="">Distributed Systems</p></div>"""
assert old_edward_table_d in content, "old_edward_table_d not found"
content = content.replace(old_edward_table_d, new_edward_table_d, 1)

# -------------------------------------------------------------
# 5. TEAM SECTION: Divine Mwale (BSc Software Engineering, Full-Stack Engineer & Designer)
# -------------------------------------------------------------
# 1) Mobile toggle:
old_divine_toggle = '<div class="is-place"><div class="is-caption">Divine Mwale</div><div class="is-caption is-op-50" scroll-small-name="">Frontend &amp; UI/UX Engineer</div>'
new_divine_toggle = '<div class="is-place"><div class="is-caption">Divine Mwale</div><div class="is-caption is-op-50" scroll-small-name="">Full-Stack Engineer &amp; Designer</div>'
assert old_divine_toggle in content, "old_divine_toggle not found"
content = content.replace(old_divine_toggle, new_divine_toggle, 1)

# 2) Mobile dropdown:
old_divine_dropdown = '<div class="team-bio-m"><div class="is-caption">Divine Mwale</div><div class="is-caption is-op-50" scroll-small-name="">Frontend &amp; UI/UX Engineer</div>'
new_divine_dropdown = '<div class="team-bio-m"><div class="is-caption">Divine Mwale</div><div class="is-caption is-op-50" scroll-small-name="">Full-Stack Engineer &amp; Designer</div>'
assert old_divine_dropdown in content, "old_divine_dropdown not found"
content = content.replace(old_divine_dropdown, new_divine_dropdown, 1)

# 3) Desktop tags:
old_divine_tags = '<div class="is-caption" scroll-small-name="">Divine Mwale</div><div class="is-caption" scroll-small-name="">Founding Partner</div><div class="is-caption is-op-50" scroll-small-name="">Frontend &amp; UI/UX Engineer</div>'
new_divine_tags = '<div class="is-caption" scroll-small-name="">Divine Mwale</div><div class="is-caption" scroll-small-name="">Founding Partner</div><div class="is-caption is-op-50" scroll-small-name="">Full-Stack Engineer &amp; Designer</div>'
assert old_divine_tags in content, "old_divine_tags not found"
content = content.replace(old_divine_tags, new_divine_tags, 1)

# Bios
old_divine_bio_m = "<p>Building fast, accessible user interfaces, responsive layouts, and interactive web experiences with modern frameworks.</p>"
new_divine_bio_m = "<p>Holds a BSc in Software Engineering. Full-stack engineer and designer crafting high-performance web applications, responsive design systems, and resilient backend services.</p>"
assert old_divine_bio_m in content, "old_divine_bio_m not found"
content = content.replace(old_divine_bio_m, new_divine_bio_m, 1)

old_divine_bio_d = "<p>Specializing in state-of-the-art frontend engineering, fluid gesture mechanics, responsive design systems, and inclusive WCAG 2.2 accessibility.</p>"
new_divine_bio_d = "<p>Holds a BSc in Software Engineering. Full-stack engineer and designer specializing in end-to-end web architecture, fluid interaction mechanics, responsive design systems, and inclusive accessibility.</p>"
assert old_divine_bio_d in content, "old_divine_bio_d not found"
content = content.replace(old_divine_bio_d, new_divine_bio_d, 1)

# Mobile Table
old_divine_table_m = """<div class="item-numbers is-mobile-x"><div class="line is-animated" contained-line=""></div><p class="is-caption" scroll-line-name="">Frontend Architecture</p><p class="is-caption is-op-50" scroll-line-name="">React / Modern Web</p></div><div class="item-numbers is-mobile-x"><div class="line is-animated" contained-line=""></div><p class="is-caption" scroll-line-name="">Design Systems</p><p class="is-caption is-op-50" scroll-line-name="">Tailwind / CSS-in-JS</p></div><div class="item-numbers is-mobile-x"><div class="line is-animated" contained-line=""></div><p class="is-caption" scroll-line-name="">Interaction Design</p><p class="is-caption is-op-50" scroll-line-name="">Motion Physics / GSAP</p></div><div class="item-numbers is-mobile-x"><div class="line is-animated" contained-line=""></div><p class="is-caption" scroll-line-name="">Accessibility</p><p class="is-caption is-op-50" scroll-line-name="">WCAG 2.2 AAA Standard</p></div><div class="item-numbers is-mobile-x"><div class="line is-animated" contained-line=""></div><div class="line is-animated is-bottom" contained-line=""></div><p class="is-caption" scroll-line-name="">Core Web Vitals</p><p class="is-caption is-op-50" scroll-line-name="">Sub-Second LCP</p></div>"""
new_divine_table_m = """<div class="item-numbers is-mobile-x"><div class="line is-animated" contained-line=""></div><p class="is-caption" scroll-line-name="">Education</p><p class="is-caption is-op-50" scroll-line-name="">BSc Software Engineering</p></div><div class="item-numbers is-mobile-x"><div class="line is-animated" contained-line=""></div><p class="is-caption" scroll-line-name="">Core Discipline</p><p class="is-caption is-op-50" scroll-line-name="">Full-Stack &amp; Design</p></div><div class="item-numbers is-mobile-x"><div class="line is-animated" contained-line=""></div><p class="is-caption" scroll-line-name="">Core Stack</p><p class="is-caption is-op-50" scroll-line-name="">React / Node.js / TypeScript</p></div><div class="item-numbers is-mobile-x"><div class="line is-animated" contained-line=""></div><p class="is-caption" scroll-line-name="">Design Systems</p><p class="is-caption is-op-50" scroll-line-name="">UI/UX &amp; GSAP Motion</p></div><div class="item-numbers is-mobile-x"><div class="line is-animated" contained-line=""></div><div class="line is-animated is-bottom" contained-line=""></div><p class="is-caption" scroll-line-name="">Performance</p><p class="is-caption is-op-50" scroll-line-name="">Sub-Second LCP</p></div>"""
assert old_divine_table_m in content, "old_divine_table_m not found"
content = content.replace(old_divine_table_m, new_divine_table_m, 1)

# Desktop Table
old_divine_table_d = """<div class="item-numbers"><div class="line is-animated" contained-line=""></div><p class="is-caption is-op-50" scroll-line-name="">Frontend Architecture</p><p class="is-caption is-op-50" scroll-line-name="">React / Modern Web</p></div><div class="item-numbers"><div class="line is-animated" contained-line=""></div><p class="is-caption is-op-50" scroll-line-name="">Design Systems</p><p class="is-caption is-op-50" scroll-line-name="">Tailwind / CSS-in-JS</p></div><div class="item-numbers"><div class="line is-animated" contained-line=""></div><p class="is-caption is-op-50" scroll-line-name="">Interaction Design</p><p class="is-caption is-op-50" scroll-line-name="">Motion Physics / GSAP</p></div><div class="item-numbers"><div class="line is-animated" contained-line=""></div><p class="is-caption is-op-50" scroll-line-name="">Accessibility</p><p class="is-caption is-op-50" scroll-line-name="">WCAG 2.2 AAA Standard</p></div><div class="item-numbers"><div class="line is-animated" contained-line=""></div><div class="line is-bottom is-animated" contained-line=""></div><p class="is-caption is-op-50" scroll-line-name="">Core Web Vitals</p><p class="is-caption is-op-50" scroll-line-name="">Sub-Second LCP</p></div>"""
new_divine_table_d = """<div class="item-numbers"><div class="line is-animated" contained-line=""></div><p class="is-caption is-op-50" scroll-line-name="">Education</p><p class="is-caption is-op-50" scroll-line-name="">BSc Software Engineering</p></div><div class="item-numbers"><div class="line is-animated" contained-line=""></div><p class="is-caption is-op-50" scroll-line-name="">Core Discipline</p><p class="is-caption is-op-50" scroll-line-name="">Full-Stack &amp; Design</p></div><div class="item-numbers"><div class="line is-animated" contained-line=""></div><p class="is-caption is-op-50" scroll-line-name="">Core Stack</p><p class="is-caption is-op-50" scroll-line-name="">React / Node.js / TypeScript</p></div><div class="item-numbers"><div class="line is-animated" contained-line=""></div><p class="is-caption is-op-50" scroll-line-name="">Design Systems</p><p class="is-caption is-op-50" scroll-line-name="">UI/UX &amp; GSAP Motion</p></div><div class="item-numbers"><div class="line is-animated" contained-line=""></div><div class="line is-bottom is-animated" contained-line=""></div><p class="is-caption is-op-50" scroll-line-name="">Performance</p><p class="is-caption is-op-50" scroll-line-name="">Sub-Second LCP</p></div>"""
assert old_divine_table_d in content, "old_divine_table_d not found"
content = content.replace(old_divine_table_d, new_divine_table_d, 1)

# -------------------------------------------------------------
# 6. TEAM SECTION: Munashe Simango (LLB, Compliance & Data Protection)
# -------------------------------------------------------------
# 1) Mobile toggle:
old_munashe_toggle = '<div class="is-place"><div class="is-caption">Munashe Simango</div><div class="is-caption is-op-50" scroll-small-name="">Cloud &amp; DevOps Systems Engineer</div>'
new_munashe_toggle = '<div class="is-place"><div class="is-caption">Munashe Simango</div><div class="is-caption is-op-50" scroll-small-name="">Compliance &amp; Data Protection</div>'
assert old_munashe_toggle in content, "old_munashe_toggle not found"
content = content.replace(old_munashe_toggle, new_munashe_toggle, 1)

# 2) Mobile dropdown:
old_munashe_dropdown = '<div class="team-bio-m"><div class="is-caption">Munashe Simango</div><div class="is-caption is-op-50" scroll-small-name="">Cloud &amp; DevOps Systems Engineer</div>'
new_munashe_dropdown = '<div class="team-bio-m"><div class="is-caption">Munashe Simango</div><div class="is-caption is-op-50" scroll-small-name="">Compliance &amp; Data Protection</div>'
assert old_munashe_dropdown in content, "old_munashe_dropdown not found"
content = content.replace(old_munashe_dropdown, new_munashe_dropdown, 1)

# 3) Desktop tags:
old_munashe_tags = '<div class="is-caption" scroll-small-name="">Munashe Simango</div><div class="is-caption" scroll-small-name="">Founding Partner</div><div class="is-caption is-op-50" scroll-small-name="">Cloud &amp; DevOps Systems Engineer</div>'
new_munashe_tags = '<div class="is-caption" scroll-small-name="">Munashe Simango</div><div class="is-caption" scroll-small-name="">Founding Partner</div><div class="is-caption is-op-50" scroll-small-name="">Compliance &amp; Data Protection</div>'
assert old_munashe_tags in content, "old_munashe_tags not found"
content = content.replace(old_munashe_tags, new_munashe_tags, 1)

# Bios
old_munashe_bio_m = "<p>Specializing in high-availability deployments, backend pipelines, database optimization, and resilient cloud infrastructure.</p>"
new_munashe_bio_m = "<p>Holds an LLB degree. Leading legal compliance, data protection governance, regulatory alignment, and secure operational frameworks.</p>"
assert old_munashe_bio_m in content, "old_munashe_bio_m not found"
content = content.replace(old_munashe_bio_m, new_munashe_bio_m, 1)

old_munashe_bio_d = "<p>Leading reliable cloud architecture, continuous integration and deployment pipelines, container orchestration, and multi-region database stability.</p>"
new_munashe_bio_d = "<p>Holds an LLB degree. Directing legal compliance, enterprise data protection, regulatory oversight, and privacy governance across software systems and client deployments.</p>"
assert old_munashe_bio_d in content, "old_munashe_bio_d not found"
content = content.replace(old_munashe_bio_d, new_munashe_bio_d, 1)

# Mobile Table
old_munashe_table_m = """<div class="item-numbers is-mobile-x"><div class="line is-animated" contained-line=""></div><p class="is-caption" scroll-line-name="">Cloud Infrastructure</p><p class="is-caption is-op-50" scroll-line-name="">AWS / GCP / Cloud Run</p></div><div class="item-numbers is-mobile-x"><div class="line is-animated" contained-line=""></div><p class="is-caption" scroll-line-name="">CI/CD Automation</p><p class="is-caption is-op-50" scroll-line-name="">Docker &amp; GitHub Actions</p></div><div class="item-numbers is-mobile-x"><div class="line is-animated" contained-line=""></div><p class="is-caption" scroll-line-name="">Database Systems</p><p class="is-caption is-op-50" scroll-line-name="">PostgreSQL / Redis</p></div><div class="item-numbers is-mobile-x"><div class="line is-animated" contained-line=""></div><p class="is-caption" scroll-line-name="">Observability</p><p class="is-caption is-op-50" scroll-line-name="">Telemetry &amp; Uptime</p></div><div class="item-numbers is-mobile-x"><div class="line is-animated" contained-line=""></div><div class="line is-animated is-bottom" contained-line=""></div><p class="is-caption" scroll-line-name="">Security</p><p class="is-caption is-op-50" scroll-line-name="">Zero-Trust Hardening</p></div>"""
new_munashe_table_m = """<div class="item-numbers is-mobile-x"><div class="line is-animated" contained-line=""></div><p class="is-caption" scroll-line-name="">Education</p><p class="is-caption is-op-50" scroll-line-name="">Bachelor of Laws (LLB)</p></div><div class="item-numbers is-mobile-x"><div class="line is-animated" contained-line=""></div><p class="is-caption" scroll-line-name="">Governance</p><p class="is-caption is-op-50" scroll-line-name="">Compliance &amp; Policy</p></div><div class="item-numbers is-mobile-x"><div class="line is-animated" contained-line=""></div><p class="is-caption" scroll-line-name="">Privacy Focus</p><p class="is-caption is-op-50" scroll-line-name="">Data Protection &amp; Security</p></div><div class="item-numbers is-mobile-x"><div class="line is-animated" contained-line=""></div><p class="is-caption" scroll-line-name="">Risk Auditing</p><p class="is-caption is-op-50" scroll-line-name="">Regulatory Verification</p></div><div class="item-numbers is-mobile-x"><div class="line is-animated" contained-line=""></div><div class="line is-animated is-bottom" contained-line=""></div><p class="is-caption" scroll-line-name="">Standards</p><p class="is-caption is-op-50" scroll-line-name="">Zero-Trust &amp; Integrity</p></div>"""
assert old_munashe_table_m in content, "old_munashe_table_m not found"
content = content.replace(old_munashe_table_m, new_munashe_table_m, 1)

# Desktop Table
old_munashe_table_d = """<div class="item-numbers"><div class="line is-animated" contained-line=""></div><p class="is-caption is-op-50" scroll-line-name="">Cloud Infrastructure</p><p class="is-caption is-op-50" scroll-line-name="">AWS / GCP / Cloud Run</p></div><div class="item-numbers"><div class="line is-animated" contained-line=""></div><p class="is-caption is-op-50" scroll-line-name="">CI/CD Automation</p><p class="is-caption is-op-50" scroll-line-name="">Docker &amp; GitHub Actions</p></div><div class="item-numbers"><div class="line is-animated" contained-line=""></div><p class="is-caption is-op-50" scroll-line-name="">Database Systems</p><p class="is-caption is-op-50" scroll-line-name="">PostgreSQL / Redis</p></div><div class="item-numbers"><div class="line is-animated" contained-line=""></div><p class="is-caption is-op-50" scroll-line-name="">Observability</p><p class="is-caption is-op-50" scroll-line-name="">Telemetry &amp; Uptime</p></div><div class="item-numbers"><div class="line is-animated" contained-line=""></div><div class="line is-bottom is-animated" contained-line=""></div><p class="is-caption is-op-50" scroll-line-name="">Security</p><p class="is-caption is-op-50" scroll-line-name="">Zero-Trust Hardening</p></div>"""
new_munashe_table_d = """<div class="item-numbers"><div class="line is-animated" contained-line=""></div><p class="is-caption is-op-50" scroll-line-name="">Education</p><p class="is-caption is-op-50" scroll-line-name="">Bachelor of Laws (LLB)</p></div><div class="item-numbers"><div class="line is-animated" contained-line=""></div><p class="is-caption is-op-50" scroll-line-name="">Governance</p><p class="is-caption is-op-50" scroll-line-name="">Compliance &amp; Policy</p></div><div class="item-numbers"><div class="line is-animated" contained-line=""></div><p class="is-caption is-op-50" scroll-line-name="">Privacy Focus</p><p class="is-caption is-op-50" scroll-line-name="">Data Protection &amp; Security</p></div><div class="item-numbers"><div class="line is-animated" contained-line=""></div><p class="is-caption is-op-50" scroll-line-name="">Risk Auditing</p><p class="is-caption is-op-50" scroll-line-name="">Regulatory Verification</p></div><div class="item-numbers"><div class="line is-animated" contained-line=""></div><div class="line is-bottom is-animated" contained-line=""></div><p class="is-caption is-op-50" scroll-line-name="">Standards</p><p class="is-caption is-op-50" scroll-line-name="">Zero-Trust &amp; Integrity</p></div>"""
assert old_munashe_table_d in content, "old_munashe_table_d not found"
content = content.replace(old_munashe_table_d, new_munashe_table_d, 1)

# Write updated file
with open('src/templates/home.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("SUCCESS: All updates cleanly applied to src/templates/home.html!")
