with open('src/templates/home.html', 'r', encoding='utf-8') as f:
    html = f.read()

ALTERNATING_CSS = """
<style>
/* ============================================================================
 * SAMARIA ALTERNATING EDITORIAL SHOWCASE
 * Clean Left/Right Alternating Project Presentation
 * ============================================================================ */
.samaria-project-row {
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  gap: 56px;
  align-items: center;
  padding: 80px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  position: relative;
  width: 100%;
}

.samaria-project-row.is-reversed {
  grid-template-columns: 0.85fr 1.15fr;
}

.samaria-project-row.is-reversed .samaria-project-media {
  order: 2;
}

.samaria-project-row.is-reversed .samaria-project-info {
  order: 1;
}

.samaria-project-media {
  position: relative;
  border-radius: 4px;
  overflow: hidden;
  background: #EBEBEB;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(0, 0, 0, 0.08);
  aspect-ratio: 16 / 10;
  width: 100%;
  will-change: transform;
}

.samaria-project-media video,
.samaria-project-media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.samaria-project-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 8px;
}

.samaria-project-meta {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.samaria-project-order {
  font-family: 'JetBrains Mono', monospace;
  font-size: 13px;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.45);
}

.samaria-project-tag {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 4px 10px;
  background: rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 2px;
  color: rgba(0, 0, 0, 0.65);
}

.samaria-project-title {
  font-family: 'Cinzel', serif;
  font-size: clamp(30px, 3vw, 42px);
  font-weight: 400;
  letter-spacing: -0.01em;
  line-height: 1.15;
  color: #0F0F11;
  text-transform: capitalize;
  margin-bottom: 18px;
}

.samaria-project-desc {
  font-size: 15px;
  line-height: 1.65;
  color: rgba(15, 15, 17, 0.72);
  margin-bottom: 28px;
  max-width: 440px;
}

.samaria-project-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #0F0F11;
  text-decoration: none;
  font-weight: 600;
  padding-bottom: 4px;
  border-bottom: 1px solid #0F0F11;
  align-self: flex-start;
  transition: opacity 0.2s;
}

.samaria-project-link:hover {
  opacity: 0.55;
}

@media screen and (max-width: 991px) {
  .samaria-project-row,
  .samaria-project-row.is-reversed {
    grid-template-columns: 1fr;
    gap: 32px;
    padding: 50px 0;
  }
  .samaria-project-row.is-reversed .samaria-project-media {
    order: 1;
  }
  .samaria-project-row.is-reversed .samaria-project-info {
    order: 2;
  }
}
</style>
"""

NEW_INVESTMENTS_SECTION = """<div class="navigation-section is-1" id="investments" section-navi="section-wrapper" section-navi-group="What We Do">
  <div class="title-li is-investments" section-navi="main-menu-item">
    <div class="is-svg is-list-divider w-embed">
      <svg fill="none" height="100%" viewbox="0 0 13 15" width="100%" xmlns="http://www.w3.org/2000/svg">
        <line stroke="currentColor" x1="10" y1="7.5" y2="7.5"></line>
        <line stroke="currentColor" x1="0.5" x2="0.5" y1="2" y2="13"></line>
      </svg>
    </div>
    <div class="overflow-clip link-clip">
      <div class="is-caption no-break" section-navi="main-section-title">What We Do</div>
    </div>
    <div class="line is-bottom is-animated" preloader-line-h=""></div>
    <div class="line is-top is-animated" preloader-line-h=""></div>
  </div>

  <!-- Project 01: Apex Web Platform (Image LEFT, Text RIGHT) -->
  <section class="section is-regular" scroll="investments" section-navi="section" video-scroll="section">
    <div class="title-li is-project is-simle" section-navi="main-menu-item" style="display:none;">
      <div class="overflow-clip link-clip"><div class="is-caption is-mono" section-navi="order-number">01</div></div>
      <div class="overflow-clip link-clip"><div class="is-caption no-break" section-navi="main-section-title">apex web platform</div></div>
    </div>

    <div class="samaria-project-row">
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
    </div>
  </section>

  <!-- Project 02: Pulse Application (Text LEFT, Image RIGHT) -->
  <section class="section is-regular" scroll="investments" section-navi="section" video-scroll="section">
    <div class="title-li is-project is-simle" section-navi="main-menu-item" style="display:none;">
      <div class="overflow-clip link-clip"><div class="is-caption is-mono" section-navi="order-number">02</div></div>
      <div class="overflow-clip link-clip"><div class="is-caption no-break" section-navi="main-section-title">Pulse Application</div></div>
    </div>

    <div class="samaria-project-row is-reversed">
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
    </div>
  </section>

  <!-- Project 03: Nexus Business Tools (Image LEFT, Text RIGHT) -->
  <section class="section is-regular is-last" scroll="investments" section-navi="section" video-scroll="section">
    <div class="title-li is-project is-simle" section-navi="main-menu-item" style="display:none;">
      <div class="overflow-clip link-clip"><div class="is-caption is-mono" section-navi="order-number">03</div></div>
      <div class="overflow-clip link-clip"><div class="is-caption no-break" section-navi="main-section-title">nexus business tools</div></div>
    </div>

    <div class="samaria-project-row">
      <div class="samaria-project-media project-vid project-file hoverable" gsap-img="">
        <video loop="" muted="" playsinline="" poster="https://cdn.prod.website-files.com/69e776c5f7729eda0138d932/69fd4fcaa991161138c8438c_Group%202147203558%20(4).avif" preload="none" class="project-image is-full">
          <source src="https://widelabco.sfo3.cdn.digitaloceanspaces.com/Pojazd%20Sand.webm" type="video/webm" />
        </video>
      </div>

      <div class="samaria-project-info">
        <div class="samaria-project-meta">
          <span class="samaria-project-order" section-navi="order-number">03</span>
          <span class="samaria-project-tag" scroll-small-name="">Custom Tooling</span>
          <span class="samaria-project-tag" scroll-small-name="">Web Systems</span>
        </div>
        <h2 class="samaria-project-title" scroll-name="" section-navi="main-section-title">Nexus Business Tools</h2>
        <p class="samaria-project-desc">
          Proprietary operational software, internal workflow automation, and distributed telemetry infrastructure tailored for physical intelligence systems.
        </p>
        <a href="#contact" class="samaria-project-link action-button hoverable" open-modal="" aria-label="Discuss Nexus Requirements">
          Discuss Requirements <span>&rarr;</span>
        </a>
      </div>
    </div>
  </section>
</div>"""

# 1. Add CSS before </head>
head_pos = html.find('</head>')
if ALTERNATING_CSS.strip() not in html:
    html = html[:head_pos] + ALTERNATING_CSS + '\n' + html[head_pos:]

# 2. Replace investments section
start_tag = '<div class="navigation-section is-1" id="investments"'
end_tag = '<div class="navigation-section is-2"'

start_idx = html.find(start_tag)
end_idx = html.find(end_tag)

if start_idx == -1 or end_idx == -1:
    print(f"Error: tags not found (start={start_idx}, end={end_idx})")
    exit(1)

html_updated = html[:start_idx] + NEW_INVESTMENTS_SECTION + '\n' + html[end_idx:]

with open('src/templates/home.html', 'w', encoding='utf-8') as f:
    f.write(html_updated)

print("Successfully updated src/templates/home.html with Alternating What We Do Showcase!")
