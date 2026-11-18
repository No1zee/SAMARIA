import re
import json
import os

def update():
    with open('src/templates/home.html', 'r', encoding='utf-8') as f:
        html = f.read()

    with open('scripts/project_case_studies.json', 'r', encoding='utf-8') as f:
        case_studies_data = json.load(f)

    # 1. Update Project 03 from Nexus Business Tools to Bambino
    # Let's inspect the What We Do section
    wwd_start = html.find('section-navi-group="What We Do"')
    team_start = html.find('section-navi-group="team"')
    if wwd_start == -1 or team_start == -1:
        print("Could not find What We Do or Team section boundaries")
        return

    wwd_content = html[wwd_start:team_start]

    # Replace Project 01 CTA button
    # From:
    # <a href="#contact" class="samaria-project-link action-button hoverable" open-modal="" aria-label="Discuss HEMS Architecture">
    #   Discuss Architecture <span>&rarr;</span>
    # </a>
    # To:
    # <a href="javascript:void(0)" role="button" class="samaria-project-link action-button hoverable open-case-study" data-project-index="0" aria-label="Explore HEMS Case Study">
    #   Explore Case Study <span>&rarr;</span>
    # </a>
    hems_old_cta = re.search(r'<a\s+href="#contact"\s+class="samaria-project-link action-button hoverable"\s+open-modal=""\s+aria-label="Discuss HEMS Architecture">\s*Discuss Architecture\s*<span>&rarr;</span>\s*</a>', wwd_content)
    if hems_old_cta:
        wwd_content = wwd_content[:hems_old_cta.start()] + """<a href="javascript:void(0)" role="button" class="samaria-project-link action-button hoverable open-case-study" data-project-index="0" aria-label="Explore HEMS Case Study">Explore Case Study <span>&rarr;</span></a>""" + wwd_content[hems_old_cta.end():]
        print("Updated HEMS CTA")
    else:
        print("Warning: HEMS CTA pattern not matched directly")

    # Replace Project 02 CTA button
    kinetic_old_cta = re.search(r'<a\s+href="#contact"\s+class="samaria-project-link action-button hoverable"\s+open-modal=""\s+aria-label="Explore Kinetic Engine">\s*Explore Engine\s*<span>&rarr;</span>\s*</a>', wwd_content)
    if kinetic_old_cta:
        wwd_content = wwd_content[:kinetic_old_cta.start()] + """<a href="javascript:void(0)" role="button" class="samaria-project-link action-button hoverable open-case-study" data-project-index="1" aria-label="Explore Kinetic Case Study">Explore Case Study <span>&rarr;</span></a>""" + wwd_content[kinetic_old_cta.end():]
        print("Updated Kinetic CTA")
    else:
        print("Warning: Kinetic CTA pattern not matched directly")

    # Make Project 01 & 02 media plates clickable triggers with hoverable cursor
    # Replace Project 01 media div
    wwd_content = re.sub(
        r'(<div class="samaria-project-media project-file hoverable" gsap-img="">\s*<img src="/assets/projects/hems_console.webp")',
        r'<div class="samaria-project-media project-file hoverable open-case-study" gsap-img="" data-project-index="0" role="button" tabindex="0" aria-label="Explore HEMS Case Study">\n        <img src="/assets/projects/hems_console.webp"',
        wwd_content
    )

    # Replace Project 02 media div
    wwd_content = re.sub(
        r'(<div class="samaria-project-media project-file hoverable" gsap-img="">\s*<img src="/assets/projects/kinetic_clipper.webp")',
        r'<div class="samaria-project-media project-file hoverable open-case-study" gsap-img="" data-project-index="1" role="button" tabindex="0" aria-label="Explore Kinetic Case Study">\n        <img src="/assets/projects/kinetic_clipper.webp"',
        wwd_content
    )

    # Now replace Project 03 (Nexus Business Tools) with Bambino
    # Old project 3:
    proj3_pattern = re.compile(
        r'<!-- Project 03: Nexus Business Tools.*?<!-- Project 03 end or end of section -->|'
        r'<!-- Project 03: Nexus Business Tools[\s\S]*?(?=</div>\s*<div class="navigation-section)',
        re.MULTILINE
    )

    bambino_section = """<!-- Project 03: Bambino (Interactive 3D Festival World) -->
  <section class="section is-regular is-last" scroll="investments" section-navi="section" video-scroll="section">
    <div class="title-li is-project is-simle" section-navi="main-menu-item" style="position: absolute; width: 1px; height: 1px; margin: -1px; padding: 0; overflow: hidden; clip: rect(0, 0, 0, 0); border: 0;">
      <div class="overflow-clip link-clip"><div class="is-caption is-mono" section-navi="order-number">03</div></div>
      <div class="overflow-clip link-clip"><div class="is-caption no-break" section-navi="main-section-title">Bambino</div></div>
    </div>

    <div class="samaria-project-row" data-project-index="2">
      <div class="samaria-project-media project-file hoverable open-case-study" gsap-img="" data-project-index="2" role="button" tabindex="0" aria-label="Explore Bambino Case Study">
        <img src="/assets/projects/bambino_world_map.webp" alt="Bambino Interactive 3D Festival World" class="project-image is-full" loading="lazy" />
      </div>

      <div class="samaria-project-info">
        <div class="samaria-project-meta">
          <span class="samaria-project-order" section-navi="order-number">03</span>
          <span class="samaria-project-tag" scroll-small-name="">3D WebGL</span>
          <span class="samaria-project-tag" scroll-small-name="">Interactive Spatial</span>
        </div>
        <h2 class="samaria-project-title" scroll-name="" section-navi="main-section-title">Bambino</h2>
        <p class="samaria-project-desc">
          An interactive 3D festival terrain and event management platform combining real-time spatial navigation, zone inspection, and instant ticketing.
        </p>
        <a href="javascript:void(0)" role="button" class="samaria-project-link action-button hoverable open-case-study" data-project-index="2" aria-label="Explore Bambino Case Study">
          Explore Case Study <span>&rarr;</span>
        </a>
      </div>
    </div>
  </section>
"""

    if proj3_pattern.search(wwd_content):
        wwd_content = proj3_pattern.sub(bambino_section, wwd_content)
        print("Replaced Project 03 with Bambino")
    else:
        print("Warning: Project 03 regex did not match, using fallback search")
        old_p3_idx = wwd_content.find('<!-- Project 03:')
        if old_p3_idx != -1:
            end_p3_idx = wwd_content.rfind('</section>') + len('</section>')
            wwd_content = wwd_content[:old_p3_idx] + bambino_section + wwd_content[end_p3_idx:]
            print("Fallback replaced Project 03 with Bambino")

    # Replace wwd_content in html
    html = html[:wwd_start] + wwd_content + html[team_start:]

    # Add Case Study Drawer CSS
    drawer_css = """
/* ============================================================================
 * SAMARIA EDITORIAL CASE STUDY DRAWER (.projects-detail-modal)
 * ============================================================================ */
.projects-detail-modal {
  position: fixed !important;
  inset: 0 !important;
  width: 100vw !important;
  height: 100vh !important;
  z-index: 2147483647 !important;
  display: none;
  pointer-events: none;
  overflow: hidden !important;
}

.projects-detail-modal.is-active {
  display: flex !important;
  pointer-events: auto !important;
}

.projects-detail-modal .details-fader {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  background: rgba(10, 12, 16, 0.75);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  opacity: 0;
  z-index: 1;
  cursor: pointer;
}

.projects-detail-modal .details-bg {
  position: absolute;
  inset: 0;
  top: 3.5vh;
  height: 96.5vh;
  width: 100%;
  background: #ffffff;
  color: #1a1c1e;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  overflow-y: auto !important;
  overflow-x: hidden !important;
  -webkit-overflow-scrolling: touch;
  z-index: 2;
  box-shadow: 0 -24px 64px rgba(0, 0, 0, 0.35);
  display: flex;
  flex-direction: column;
  padding: 0;
  transform: translateY(100%);
  will-change: transform;
}

.projects-detail-modal .close-project {
  position: sticky !important;
  top: 1.5rem !important;
  right: 2rem !important;
  margin: 1.5rem 2rem 0 auto !important;
  z-index: 100 !important;
  cursor: pointer !important;
  display: inline-flex !important;
  align-items: center !important;
  gap: 10px !important;
  padding: 8px 20px !important;
  border-radius: 9999px !important;
  background: rgba(255, 255, 255, 0.92) !important;
  backdrop-filter: blur(16px) !important;
  -webkit-backdrop-filter: blur(16px) !important;
  border: 1px solid rgba(0, 0, 0, 0.12) !important;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08) !important;
  font-family: inherit !important;
  font-size: 0.85rem !important;
  font-weight: 500 !important;
  color: #111 !important;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1) !important;
}

.projects-detail-modal .close-project:hover {
  background: #111 !important;
  color: #fff !important;
  border-color: #111 !important;
  transform: translateY(-2px) !important;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15) !important;
}

.projects-detail-modal .close-project:hover .action-line {
  background: #fff !important;
}

.projects-detail-modal .container.is-c-active {
  width: 100% !important;
  max-width: 1040px !important;
  margin: 0 auto !important;
  padding: 0.5rem 2rem 4rem !important;
  box-sizing: border-box !important;
  flex: 1 0 auto !important;
}

.projects-detail-modal .bottom-navi {
  display: grid !important;
  grid-template-columns: 1fr 1fr !important;
  width: 100% !important;
  max-width: 1040px !important;
  margin: auto auto 2.5rem !important;
  padding: 0 2rem !important;
  box-sizing: border-box !important;
  border-top: 1px solid rgba(0, 0, 0, 0.1) !important;
}

.projects-detail-modal .pr-navi {
  list-style: none !important;
  padding: 0 !important;
  margin: 0 !important;
}

.projects-detail-modal .pri-link {
  display: flex !important;
  align-items: center !important;
  gap: 12px !important;
  padding: 24px 16px !important;
  text-decoration: none !important;
  color: #111 !important;
  font-family: inherit !important;
  font-size: 1rem !important;
  font-weight: 500 !important;
  transition: all 0.2s ease !important;
  cursor: pointer !important;
}

.projects-detail-modal .pri-link.is-prev {
  justify-content: flex-start !important;
  border-right: 1px solid rgba(0, 0, 0, 0.1) !important;
}

.projects-detail-modal .pri-link.is-next {
  justify-content: flex-end !important;
}

.projects-detail-modal .pri-link:hover {
  background: rgba(0, 0, 0, 0.03) !important;
  color: #deb34a !important;
}

/* Interior Editorial 3-Act Design */
.cs-header {
  padding: 1rem 0 2.5rem;
}
.cs-meta-row {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 20px;
}
.cs-order-badge {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.78rem;
  letter-spacing: 0.12em;
  font-weight: 600;
  color: #111;
  background: rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 9999px;
  padding: 4px 14px;
}
.cs-tags {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
}
.cs-tag {
  font-family: inherit;
  font-size: 0.8rem;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.6);
  background: rgba(0, 0, 0, 0.03);
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 9999px;
  padding: 4px 12px;
}
.cs-title {
  font-size: clamp(2.4rem, 5vw, 3.8rem);
  font-weight: 700;
  line-height: 1.05;
  letter-spacing: -0.035em;
  color: #111;
  margin: 0 0 12px;
}
.cs-subtitle {
  font-size: clamp(1.1rem, 2vw, 1.35rem);
  color: rgba(0, 0, 0, 0.55);
  line-height: 1.45;
  margin: 0 0 24px;
  font-weight: 400;
}
.cs-tagline-box {
  background: #fafaf7;
  border-left: 3px solid #deb34a;
  border-radius: 0 10px 10px 0;
  padding: 20px 26px;
  margin-bottom: 32px;
}
.cs-tagline-quote {
  font-size: 1.25rem;
  font-style: italic;
  font-weight: 500;
  line-height: 1.5;
  color: #1f2124;
}
.cs-metrics-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-top: 24px;
}
@media (max-width: 640px) {
  .cs-metrics-grid {
    grid-template-columns: 1fr;
  }
}
.cs-metric-card {
  background: #f8f8f8;
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 10px;
  padding: 20px;
  text-align: center;
}
.cs-metric-val {
  font-family: 'JetBrains Mono', monospace;
  font-size: clamp(1.8rem, 3.2vw, 2.5rem);
  font-weight: 700;
  color: #deb34a;
  line-height: 1.1;
  margin-bottom: 6px;
}
.cs-metric-lbl {
  font-family: inherit;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: rgba(0, 0, 0, 0.55);
}

.cs-hairline {
  height: 1px;
  background: rgba(0, 0, 0, 0.08);
  margin: 48px 0;
}

.cs-act {
  padding: 10px 0;
}
.cs-act-kicker {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.78rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-weight: 600;
  color: #deb34a;
  margin-bottom: 12px;
}
.cs-act-headline {
  font-size: clamp(1.6rem, 3.2vw, 2.2rem);
  font-weight: 700;
  line-height: 1.25;
  letter-spacing: -0.025em;
  color: #111;
  margin: 0 0 24px;
}
.cs-act-body {
  margin-bottom: 32px;
}
.cs-p {
  font-size: 1.05rem;
  line-height: 1.78;
  color: rgba(0, 0, 0, 0.78);
  margin: 0 0 20px;
}
.cs-media-frame {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.06);
  background: #f2f2f2;
  margin: 36px 0 20px;
}
.cs-media-img {
  width: 100%;
  height: auto;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  display: block;
}
.cs-media-caption {
  font-size: 0.82rem;
  color: rgba(0, 0, 0, 0.55);
  padding: 12px 18px;
  background: #fafafa;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
  font-family: 'JetBrains Mono', monospace;
}

.cs-tech-section {
  margin-top: 44px;
  background: #fbfbfb;
  border: 1px solid rgba(0, 0, 0, 0.07);
  border-radius: 12px;
  padding: 32px 28px;
}
.cs-tech-title {
  font-size: 1.15rem;
  font-weight: 700;
  letter-spacing: -0.01em;
  color: #111;
  margin: 0 0 24px;
}
.cs-tech-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 18px;
}
@media (max-width: 768px) {
  .cs-tech-grid {
    grid-template-columns: 1fr;
  }
}
.cs-tech-card {
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 8px;
  padding: 16px 18px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
}
.cs-tech-label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #deb34a;
  margin-bottom: 6px;
}
.cs-tech-detail {
  font-size: 0.92rem;
  line-height: 1.5;
  color: rgba(0, 0, 0, 0.85);
  font-weight: 500;
}

.cs-outcomes-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin: 36px 0;
}
@media (max-width: 768px) {
  .cs-outcomes-grid {
    grid-template-columns: 1fr;
  }
}
.cs-outcome-card {
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 10px;
  padding: 24px 20px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.03);
}
.cs-outcome-metric {
  font-family: inherit;
  font-size: 1.15rem;
  font-weight: 700;
  color: #111;
  margin-bottom: 10px;
  padding-bottom: 10px;
  border-bottom: 2px solid #deb34a;
}
.cs-outcome-desc {
  font-size: 0.92rem;
  line-height: 1.6;
  color: rgba(0, 0, 0, 0.7);
  margin: 0;
}

.cs-cta-box {
  margin-top: 56px;
  background: #111316;
  color: #fff;
  border-radius: 14px;
  padding: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 28px;
  flex-wrap: wrap;
}
.cs-cta-content {
  flex: 1 1 360px;
}
.cs-cta-headline {
  font-size: 1.6rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  margin: 0 0 10px;
  color: #fff;
}
.cs-cta-desc {
  font-size: 0.98rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
}
.cs-cta-btn {
  background: #deb34a;
  color: #111;
  border: none;
  border-radius: 9999px;
  padding: 14px 28px;
  font-size: 0.92rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: all 0.25s ease;
  flex-shrink: 0;
}
.cs-cta-btn:hover {
  background: #fff;
  color: #111;
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(222, 179, 74, 0.35);
}

.samaria-project-media.open-case-study {
  cursor: pointer;
}
"""

    # Inject the CSS into the head before </head>
    if "/* SAMARIA EDITORIAL CASE STUDY DRAWER" not in html:
        head_close = html.find('</head>')
        html = html[:head_close] + f"<style>{drawer_css}</style>\n" + html[head_close:]
        print("Injected Case Study Drawer CSS into <head>")

    # Now replace the modal script block with our complete, high-performance modal controller
    # Serialize case studies data to JS object literal
    case_studies_js = json.dumps(case_studies_data['case_studies'], indent=2)

    new_modal_script = f"""<script>
  /**
   * Projects Detail Modal Orchestrator
   * Silky slide-up GSAP drawer with 3-act editorial scroll and Lenis integration.
   */
  (function () {{
    const CASE_STUDIES = {case_studies_js};

    const modal        = document.querySelector('.projects-detail-modal');
    if (!modal) return;
    const detailsFader = modal.querySelector('.details-fader');
    const detailsBg    = modal.querySelector('.details-bg');
    const closeBtn     = modal.querySelector('.close-project');
    const prevBtn      = modal.querySelector('.is-prev');
    const nextBtn      = modal.querySelector('.is-next');
    const modalContent = modal.querySelector('.container.is-c-active');

    let modalOpen    = false;
    let currentIndex = 0;

    // Register GSAP plugins
    if (typeof gsap !== 'undefined') {{
      if (typeof CustomEase !== 'undefined') {{
        try {{
          CustomEase.create('drawerEase', 'M0,0 C0.16,1 0.3,1 1,1');
        }} catch (e) {{}}
      }}
    }}

    const EASE_DRAWER = (typeof CustomEase !== 'undefined') ? 'drawerEase' : 'power2.out';
    const DUR_DRAWER  = 0.75;
    const DUR_FADER   = 0.4;

    function lockScroll() {{
      if (window.lenis && typeof window.lenis.stop === 'function') {{
        window.lenis.stop();
      }}
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    }}

    function unlockScroll() {{
      if (window.lenis && typeof window.lenis.start === 'function') {{
        window.lenis.start();
      }}
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }}

    function renderCaseStudy(cs) {{
      const prevIdx = (currentIndex - 1 + CASE_STUDIES.length) % CASE_STUDIES.length;
      const nextIdx = (currentIndex + 1) % CASE_STUDIES.length;

      // Update bottom navigation labels
      if (prevBtn) {{
        prevBtn.innerHTML = `<span class="is-caption">&larr; Previous (${{CASE_STUDIES[prevIdx].title}})</span>`;
      }}
      if (nextBtn) {{
        nextBtn.innerHTML = `<span class="is-caption">Next (${{CASE_STUDIES[nextIdx].title}}) &rarr;</span>`;
      }}

      // Build 3-act template
      const tagsHtml = (cs.tags || []).map(t => `<span class="cs-tag">${{t}}</span>`).join('');
      const metricsHtml = (cs.metrics || []).map(m => `
        <div class="cs-metric-card">
          <div class="cs-metric-val">${{m.value}}</div>
          <div class="cs-metric-lbl">${{m.label}}</div>
        </div>
      `).join('');

      const act1Paras = (cs.acts.act_1_hassle.paragraphs || []).map(p => `<p class="cs-p">${{p}}</p>`).join('');
      const act2Paras = (cs.acts.act_2_engine.paragraphs || []).map(p => `<p class="cs-p">${{p}}</p>`).join('');
      const act3Paras = (cs.acts.act_3_win.paragraphs || []).map(p => `<p class="cs-p">${{p}}</p>`).join('');

      const techStackHtml = (cs.acts.act_2_engine.tech_stack || []).map(item => `
        <div class="cs-tech-card">
          <div class="cs-tech-label">${{item.label}}</div>
          <div class="cs-tech-detail">${{item.detail}}</div>
        </div>
      `).join('');

      const outcomesHtml = (cs.acts.act_3_win.outcomes || []).map(out => `
        <div class="cs-outcome-card">
          <div class="cs-outcome-metric">${{out.metric}}</div>
          <p class="cs-outcome-desc">${{out.description}}</p>
        </div>
      `).join('');

      return `
        <div class="case-study-wrap" data-cs-id="${{cs.id}}">
          <!-- Editorial Header -->
          <header class="cs-header">
            <div class="cs-meta-row">
              <div class="cs-order-badge">PROJECT ${{cs.order}} / 03</div>
              <div class="cs-tags">${{tagsHtml}}</div>
            </div>
            <h1 class="cs-title">${{cs.title}}</h1>
            <p class="cs-subtitle">${{cs.subtitle}}</p>
            
            <div class="cs-tagline-box">
              <div class="cs-tagline-quote">&ldquo;${{cs.tagline}}&rdquo;</div>
            </div>

            <div class="cs-metrics-grid">
              ${{metricsHtml}}
            </div>
          </header>

          <div class="cs-hairline"></div>

          <!-- Act 1: The Hassle -->
          <section class="cs-act cs-act-1">
            <div class="cs-act-kicker">Act I &mdash; The Hassle</div>
            <h2 class="cs-act-headline">${{cs.acts.act_1_hassle.headline}}</h2>
            <div class="cs-act-body">
              ${{act1Paras}}
            </div>
            <div class="cs-media-frame">
              <img src="${{cs.media.primary}}" alt="${{cs.media.primary_alt}}" class="cs-media-img" loading="lazy" />
              <div class="cs-media-caption">${{cs.media.primary_alt}}</div>
            </div>
          </section>

          <div class="cs-hairline"></div>

          <!-- Act 2: The Engine -->
          <section class="cs-act cs-act-2">
            <div class="cs-act-kicker">Act II &mdash; The Engine</div>
            <h2 class="cs-act-headline">${{cs.acts.act_2_engine.headline}}</h2>
            <div class="cs-act-body">
              ${{act2Paras}}
            </div>
            
            <div class="cs-media-frame">
              <img src="${{cs.media.secondary}}" alt="${{cs.media.secondary_alt}}" class="cs-media-img" loading="lazy" />
              <div class="cs-media-caption">${{cs.media.secondary_alt}}</div>
            </div>

            <div class="cs-tech-section">
              <h3 class="cs-tech-title">System Architecture &amp; Engineering Specs</h3>
              <div class="cs-tech-grid">
                ${{techStackHtml}}
              </div>
            </div>
          </section>

          <div class="cs-hairline"></div>

          <!-- Act 3: The Technical Win -->
          <section class="cs-act cs-act-3">
            <div class="cs-act-kicker">Act III &mdash; The Technical Win</div>
            <h2 class="cs-act-headline">${{cs.acts.act_3_win.headline}}</h2>
            <div class="cs-act-body">
              ${{act3Paras}}
            </div>

            <div class="cs-outcomes-grid">
              ${{outcomesHtml}}
            </div>

            <!-- Conversion Action Callout -->
            <div class="cs-cta-box">
              <div class="cs-cta-content">
                <h3 class="cs-cta-headline">Engineering systems that perform in the real world.</h3>
                <p class="cs-cta-desc">Whether you need telemetry infrastructure, automated vision engines, or real-time spatial platforms, let's talk architecture.</p>
              </div>
              <button type="button" class="cs-cta-btn hoverable open-contact-from-cs" aria-label="Build With Us">
                Build With Us <span>&rarr;</span>
              </button>
            </div>
          </section>
        </div>
      `;
    }}

    function wireCsContentInteractions() {{
      const contactTrigger = modalContent.querySelector('.open-contact-from-cs');
      if (contactTrigger) {{
        contactTrigger.addEventListener('click', function(e) {{
          e.preventDefault();
          closeModal(function() {{
            const contactBtn = document.querySelector('[open-modal]');
            if (contactBtn) contactBtn.click();
          }});
        }});
      }}
    }}

    function openModal(index) {{
      if (modalOpen) return;
      modalOpen    = true;
      currentIndex = index;

      modalContent.innerHTML = renderCaseStudy(CASE_STUDIES[currentIndex]);
      wireCsContentInteractions();
      if (detailsBg) detailsBg.scrollTop = 0;

      lockScroll();

      // Show modal container
      modal.classList.add('is-active');
      gsap.set(modal, {{ display: 'flex', pointerEvents: 'auto' }});

      // Animate fader backdrop
      gsap.fromTo(detailsFader,
        {{ opacity: 0 }},
        {{ opacity: 1, duration: DUR_FADER, ease: 'power2.inOut' }}
      );

      // Slide up drawer from bottom
      gsap.fromTo(detailsBg,
        {{ y: '100%' }},
        {{ y: '0%', duration: DUR_DRAWER, ease: EASE_DRAWER }}
      );
    }}

    function closeModal(callback) {{
      if (!modalOpen) return;
      modalOpen = false;

      // Slide drawer back down
      gsap.to(detailsBg, {{
        y: '100%',
        duration: DUR_DRAWER * 0.7,
        ease: 'power2.in',
        onComplete: function() {{
          gsap.set(modal, {{ display: 'none', pointerEvents: 'none' }});
          modal.classList.remove('is-active');
          modalContent.innerHTML = '';
          unlockScroll();
          if (typeof callback === 'function') callback();
        }}
      }});

      // Fade out fader
      gsap.to(detailsFader, {{
        opacity: 0,
        duration: DUR_FADER,
        ease: 'power2.inOut'
      }});
    }}

    function navigateTo(newIndex) {{
      if (!modalOpen) return;
      const targetIndex = ((newIndex % CASE_STUDIES.length) + CASE_STUDIES.length) % CASE_STUDIES.length;
      if (targetIndex === currentIndex) return;

      // Fade out current content
      gsap.to(modalContent, {{
        opacity: 0,
        y: -10,
        duration: 0.22,
        ease: 'power2.in',
        onComplete: function() {{
          currentIndex = targetIndex;
          modalContent.innerHTML = renderCaseStudy(CASE_STUDIES[currentIndex]);
          wireCsContentInteractions();
          if (detailsBg) detailsBg.scrollTop = 0;

          gsap.fromTo(modalContent,
            {{ opacity: 0, y: 15 }},
            {{ opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }}
          );
        }}
      }});
    }}

    // Attach click listeners to cards and buttons
    document.querySelectorAll('.open-case-study').forEach(el => {{
      el.addEventListener('click', function(e) {{
        e.preventDefault();
        const idx = parseInt(this.getAttribute('data-project-index') || '0', 10);
        openModal(idx);
      }});
    }});

    // Close button & fader click
    if (closeBtn) {{
      closeBtn.addEventListener('click', function(e) {{
        e.preventDefault();
        closeModal();
      }});
    }}
    if (detailsFader) {{
      detailsFader.addEventListener('click', function(e) {{
        e.preventDefault();
        closeModal();
      }});
    }}

    // Prev / Next button clicks
    if (prevBtn) {{
      prevBtn.addEventListener('click', function(e) {{
        e.preventDefault();
        navigateTo(currentIndex - 1);
      }});
    }}
    if (nextBtn) {{
      nextBtn.addEventListener('click', function(e) {{
        e.preventDefault();
        navigateTo(currentIndex + 1);
      }});
    }}

    // Keyboard navigation (Esc, Left, Right)
    window.addEventListener('keydown', function(e) {{
      if (!modalOpen) return;
      if (e.key === 'Escape') {{
        closeModal();
      }} else if (e.key === 'ArrowRight') {{
        navigateTo(currentIndex + 1);
      }} else if (e.key === 'ArrowLeft') {{
        navigateTo(currentIndex - 1);
      }}
    }});

    // Global helper for testing or debugging
    window.openProjectModal = openModal;
    window.closeProjectModal = closeModal;
  }})();
</script>"""

    # Replace the existing modal script in html
    idx = html.find("const modal        = document.querySelector('.projects-detail-modal');")
    if idx != -1:
        s_start = html.rfind('<script', 0, idx)
        s_end = html.find('</script>', idx) + len('</script>')
        html = html[:s_start] + new_modal_script + html[s_end:]
        print("Replaced old modal script with new orchestrator")
    else:
        print("Warning: old modal script anchor not found!")

    with open('src/templates/home.html', 'w', encoding='utf-8') as f:
        f.write(html)
    print("Successfully wrote updated src/templates/home.html!")

if __name__ == '__main__':
    update()
