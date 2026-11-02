import re

def update_projects():
    with open('src/templates/home.html', 'r', encoding='utf-8') as f:
        html = f.read()

    # ==========================================
    # 1. SECTION 1: BAMBINO WORLD
    # ==========================================
    # Title
    html = re.sub(
        r'<h1 gsap-title="" scroll-name="" section-navi="section-name">(?:Web &amp; Software <br/>Development|Tomorrow <br/>Recycling)</h1>',
        '<h1 gsap-title="" scroll-name="" section-navi="section-name">Bambino <br/>World</h1>',
        html
    )

    # Tags
    html = re.sub(
        r'<div class="section-tags" scroll-fade=""><div class="is-caption"[^>]*>.*?</div>\s*</div>',
        '<div class="section-tags" scroll-fade=""><div class="is-caption" scroll-small-name="">3D WebGL Platform</div><div class="is-caption" scroll-small-name="">Spatial Mapping</div><div class="is-caption" scroll-small-name="">Event Logistics</div></div>',
        html
    )

    # Description
    old_s1_desc = """Samaria Tech's Apex Web Platform uses AI and robotics to boost recycling. In eight months, automation raised recovery by 25%, cut manual work, halved Greenville plant staff, and GreenWay saves $1M monthly with real-time data."""
    new_s1_desc = """Bambino World is an interactive spatial platform and 3D architectural diorama engineered for large-scale venues. Powered by Three.js and React 19, the platform maps over 10,000 square meters of grounds with real-time drone telemetry, interactive zone navigation, and sub-second asset rendering with Lenis momentum scrolling."""
    html = html.replace(old_s1_desc, new_s1_desc)

    # S1 Stats
    s1_stats_old = """<div class="stats-columns" line-container=""><div class="item-numbers"><div class="line is-animated" contained-line=""></div><p class="is-caption is-op-50" scroll-line-name="">increase in user conversion</p><p class="is-caption is-op-50" id="w-node-_8a51fbb9-697c-3327-7af3-c53c01d03af6-1a7ef8f9" scroll-line-name="">25%</p></div><div class="item-numbers"><div class="line is-animated" contained-line=""></div><p class="is-caption is-op-50" scroll-line-name="">reduction in page load latency</p><p class="is-caption is-op-50" id="w-node-_8a51fbb9-697c-3327-7af3-c53c01d03afc-1a7ef8f9" scroll-line-name="">52%</p></div><div class="item-numbers"><div class="line is-animated" contained-line=""></div><p class="is-caption is-op-50" scroll-line-name="">automated deployment pipelines</p><p class="is-caption is-op-50" id="w-node-_8a51fbb9-697c-3327-7af3-c53c01d03b02-1a7ef8f9" scroll-line-name="">76%</p></div></div>"""
    s1_stats_new = """<div class="stats-columns" line-container=""><div class="item-numbers"><div class="line is-animated" contained-line=""></div><p class="is-caption is-op-50" scroll-line-name="">GROUNDS MAPPED</p><p class="is-caption is-op-50" id="w-node-_8a51fbb9-697c-3327-7af3-c53c01d03af6-1a7ef8f9" scroll-line-name="">10,000+ m²</p></div><div class="item-numbers"><div class="line is-animated" contained-line=""></div><p class="is-caption is-op-50" scroll-line-name="">SPATIAL PERFORMANCE</p><p class="is-caption is-op-50" id="w-node-_8a51fbb9-697c-3327-7af3-c53c01d03afc-1a7ef8f9" scroll-line-name="">60 FPS WebGL</p></div><div class="item-numbers"><div class="line is-animated" contained-line=""></div><p class="is-caption is-op-50" scroll-line-name="">INTERACTIVE ZONES</p><p class="is-caption is-op-50" id="w-node-_8a51fbb9-697c-3327-7af3-c53c01d03b02-1a7ef8f9" scroll-line-name="">6 Areas</p></div></div>"""
    html = html.replace(s1_stats_old, s1_stats_new)

    # ==========================================
    # 2. SECTION 2: KINETIK CLIPPER
    # ==========================================
    # Title
    html = re.sub(
        r'<h1 gsap-title="" scroll-name="" section-navi="section-name">Pulse Application</h1>',
        '<h1 gsap-title="" scroll-name="" section-navi="section-name">Kinetik <br/>Clipper</h1>',
        html
    )

    # Tags
    old_s2_tags = """<div class="section-tags"><div class="is-caption" scroll-small-name="">pulseapp.io</div><div class="is-caption" scroll-small-name="">Web Application</div><div class="is-caption" scroll-small-name="">Full-Stack Cloud</div></div>"""
    new_s2_tags = """<div class="section-tags"><div class="is-caption" scroll-small-name="">Computer Vision</div><div class="is-caption" scroll-small-name="">AI Video Pipeline</div><div class="is-caption" scroll-small-name="">YOLOv8 Automation</div></div>"""
    html = html.replace(old_s2_tags, new_s2_tags)

    # Description
    old_s2_desc = """Pulse Application is a New York-based startup that developed the world’s first AI-automated massage platform using 3D body mapping. It scales high-end wellness by digitizing human touch, removing the labor constraints of traditional therapy."""
    new_s2_desc = """Kinetik Clipper is an automated video intelligence and sports clipping pipeline. Utilizing custom YOLOv8 neural network models, optical character recognition (OCR), and sub-pixel motion tracking, Kinetik automatically analyzes broadcast footage, detects key match events, and generates broadcast-ready highlight packages in seconds."""
    html = html.replace(old_s2_desc, new_s2_desc)

    # S2 Stats
    s2_stats_old = """<div class="stats-columns" line-container=""><div class="item-numbers"><div class="line is-animated" contained-line=""></div><p class="is-caption is-op-50" scroll-line-name="">Daily User Sessions</p><p class="is-caption is-op-50" id="w-node-_3e03e106-02b6-a9f3-e206-5e6d88cc9892-1a7ef8f9" scroll-line-name="">25,000+</p></div><div class="item-numbers"><div class="line is-animated" contained-line=""></div><p class="is-caption is-op-50" scroll-line-name="">Average Response Time</p><p class="is-caption is-op-50" id="w-node-_3e03e106-02b6-a9f3-e206-5e6d88cc9898-1a7ef8f9" scroll-line-name="">180ms</p></div><div class="item-numbers"><div class="line is-animated" contained-line=""></div><p class="is-caption is-op-50" scroll-line-name="">Platform Reliability</p><p class="is-caption is-op-50" id="w-node-_3e03e106-02b6-a9f3-e206-5e6d88cc989e-1a7ef8f9" scroll-line-name="">99.98%</p></div></div>"""
    s2_stats_new = """<div class="stats-columns" line-container=""><div class="item-numbers"><div class="line is-animated" contained-line=""></div><p class="is-caption is-op-50" scroll-line-name="">ACTION DETECTION</p><p class="is-caption is-op-50" id="w-node-_3e03e106-02b6-a9f3-e206-5e6d88cc9892-1a7ef8f9" scroll-line-name="">Custom YOLOv8</p></div><div class="item-numbers"><div class="line is-animated" contained-line=""></div><p class="is-caption is-op-50" scroll-line-name="">CLIPPING THROUGHPUT</p><p class="is-caption is-op-50" id="w-node-_3e03e106-02b6-a9f3-e206-5e6d88cc9898-1a7ef8f9" scroll-line-name="">4x Real-Time</p></div><div class="item-numbers"><div class="line is-animated" contained-line=""></div><p class="is-caption is-op-50" scroll-line-name="">TRACKING ACCURACY</p><p class="is-caption is-op-50" id="w-node-_3e03e106-02b6-a9f3-e206-5e6d88cc989e-1a7ef8f9" scroll-line-name="">99.2% Sub-Pixel</p></div></div>"""
    html = html.replace(s2_stats_old, s2_stats_new)

    # ==========================================
    # 3. SECTION 3: REMOTE WORKFORCE TRACKING (HEMS)
    # ==========================================
    # Title
    html = re.sub(
        r'<h1 gsap-title="" scroll-name="" section-navi="section-name">The non-fiction <br/>revolution</h1>',
        '<h1 gsap-title="" scroll-name="" section-navi="section-name">Remote Workforce <br/>Tracking</h1>',
        html
    )

    # Tags
    old_s3_tags = """<div class="section-tags"><div class="is-caption" scroll-small-name="">Venture capital</div><div class="is-caption" scroll-small-name="">robotics</div><div class="is-caption" scroll-small-name="">Samaria Tech</div></div>"""
    new_s3_tags = """<div class="section-tags"><div class="is-caption" scroll-small-name="">Mobile App (Kotlin/Expo)</div><div class="is-caption" scroll-small-name="">Remote Sign-In</div><div class="is-caption" scroll-small-name="">Fleet Telemetry</div></div>"""
    html = html.replace(old_s3_tags, new_s3_tags)

    # Description
    old_s3_desc = """Samaria Tech designs, builds, and maintains high-performance websites and production software for growing businesses. We solve technical problems with clean code, fast load times, and dependable architecture. No fluff, no bloated stacks—just solid systems built to run your business."""
    new_s3_desc = """HEMS is a mission-critical mobile application and remote workforce management platform built for emergency medical teams and mobile field crews. Built with a native Kotlin background service and Expo SDK 58, the platform delivers persistent background GPS telemetry, cryptographic session token signing, and sub-second cloud synchronization to Google Cloud in africa-south1."""
    html = html.replace(old_s3_desc, new_s3_desc)

    # S3 Stats
    s3_stats_old = """<div class="stats-columns" line-container=""><div class="item-numbers"><div class="line is-animated" contained-line=""></div><p class="is-caption is-op-50" scroll-line-name="">WEB PLATFORMS </p><p class="is-caption is-op-50" id="w-node-_6168438e-6b7d-de9b-d631-d2de7b135dc3-1a7ef8f9" scroll-line-name="">PRODUCTION CLOUD</p></div><div class="item-numbers"><div class="line is-animated" contained-line=""></div><p class="is-caption is-op-50" scroll-line-name="">INTERNAL TOOLING </p><p class="is-caption is-op-50" id="w-node-_6168438e-6b7d-de9b-d631-d2de7b135dc9-1a7ef8f9" scroll-line-name="">SYSTEM SCALING</p></div></div>"""
    s3_stats_new = """<div class="stats-columns" line-container=""><div class="item-numbers"><div class="line is-animated" contained-line=""></div><p class="is-caption is-op-50" scroll-line-name="">APP ARCHITECTURE</p><p class="is-caption is-op-50" id="w-node-_6168438e-6b7d-de9b-d631-d2de7b135dc3-1a7ef8f9" scroll-line-name="">Native Kotlin + Expo</p></div><div class="item-numbers"><div class="line is-animated" contained-line=""></div><p class="is-caption is-op-50" scroll-line-name="">GPS PERSISTENCE</p><p class="is-caption is-op-50" id="w-node-_6168438e-6b7d-de9b-d631-d2de7b135dc9-1a7ef8f9" scroll-line-name="">99.98% Background</p></div><div class="item-numbers"><div class="line is-animated" contained-line=""></div><p class="is-caption is-op-50" scroll-line-name="">LOCATION SYNC LATENCY</p><p class="is-caption is-op-50" id="w-node-_6168438e-6b7d-de9b-d631-d2de7b135dc5-1a7ef8f9" scroll-line-name="">&lt; 800ms</p></div></div>"""
    html = html.replace(s3_stats_old, s3_stats_new)

    with open('src/templates/home.html', 'w', encoding='utf-8') as f:
        f.write(html)
    print("Successfully updated all 3 project sections in home.html!")

if __name__ == '__main__':
    update_projects()
