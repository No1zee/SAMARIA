import os
import re
import sys
from bs4 import BeautifulSoup

sys.stdout.reconfigure(encoding='utf-8')

TARGET_FILE = os.path.join("src", "templates", "home.html")

def update_templates():
    with open(TARGET_FILE, "r", encoding="utf-8") as f:
        html = f.read()

    # 1. Page Title & Meta Description
    html = html.replace(
        "<title>Samaria Tech | Robotics &amp; AI Investment in Legacy Ind.</title>",
        "<title>Samaria Tech | Web Development, Software &amp; Tech Solutions</title>"
    )
    html = re.sub(
        r'content="Samaria Tech deploys physical automation into waste management, healthcare, and landscaping[^"]*"',
        'content="Samaria Tech builds high-performance websites, custom web applications, and practical tech solutions for businesses."',
        html
    )

    # 2. Hero Headline
    html = html.replace(
        "Robotics will knock over the global economy. Samaria Tech deploys physical automation into legacy industries",
        "Modern software powers the real economy. Samaria Tech builds reliable web platforms, high-speed websites, and practical software solutions."
    )

    # 3. Nav Action Button
    html = html.replace(
        "Join the revolution",
        "Start a Project"
    )

    # 4. Hero Stats Tags
    # Replace PHYSICAL AUTOMATION and INDUSTRIAL SCALE
    html = html.replace(
        "PHYSICAL AUTOMATION ",
        "WEB PLATFORMS "
    ).replace(
        "PHYSICAL AUTOMATION",
        "WEB PLATFORMS"
    )
    html = html.replace(
        "INDUSTRIAL SCALE",
        "PRODUCTION CLOUD"
    )

    # Replace OPERATIONAL BUSINESSES and GROWTH
    html = html.replace(
        "OPERATIONAL BUSINESSES ",
        "INTERNAL TOOLING "
    ).replace(
        "OPERATIONAL BUSINESSES",
        "INTERNAL TOOLING"
    )
    html = html.replace(
        ">GROWTH<",
        ">SYSTEM SCALING<"
    )

    # 5. Remove the Badge Completely (Asset Longevity / Proven block)
    badge_pattern = r'<div class="item-numbers"><div contained-line="" class="line is-animated"></div><div contained-line="" class="line is-bottom is-animated"></div><p scroll-line-name="" class="is-caption is-op-50">Asset Longevity</p><p scroll-line-name="" id="w-node-_6168438e-6b7d-de9b-d631-d2de7b135dd0-1a7ef8f9" class="is-caption is-op-50">Proven</p></div>'
    if badge_pattern in html:
        html = html.replace(badge_pattern, "")
        print("✓ Removed Asset Longevity / Proven badge container completely.")
    else:
        # Fallback regex removal
        html = re.sub(
            r'<div class="item-numbers"[^>]*>.*?Asset Longevity.*?Proven.*?</p></div>',
            '',
            html,
            flags=re.DOTALL
        )
        print("✓ Removed badge via regex fallback.")

    # 6. Case Study 01 (Tomorrow Recycling -> Apex Cloud Platform)
    html = html.replace("Tomorrow Recycling", "Apex Web Platform")
    html = html.replace("tomorrow recycling", "apex web platform")
    html = html.replace("tomorrowrecycling.com", "apexplatform.tech")
    html = html.replace("waste management", "web engineering")
    html = html.replace("robotics & AI", "cloud platform")
    html = html.replace("increase in material recovery rate", "increase in user conversion")
    html = html.replace("headcount reduction", "reduction in page load latency")
    html = html.replace("automated sortation", "automated deployment pipelines")

    # 7. Case Study 02 (AeSCAPE -> Pulse SaaS Application)
    html = html.replace("Aescape", "Pulse Application")
    html = html.replace("AeSCAPE", "Pulse Application")
    html = html.replace("aescaPe.com", "pulseapp.io")
    html = html.replace("HealthCare", "Web Application")
    html = html.replace("Healthcare", "Web Application")
    html = html.replace("DeepTech", "Full-Stack")
    html = html.replace("Massages Delivered", "Daily User Sessions")
    html = html.replace("Monthly Partner Revenue", "Infrastructure Uptime")
    html = html.replace("Guest Satisfaction Rate", "Client CSAT Score")
    html = html.replace("Estimated Audience Reach", "Monthly Web Traffic")
    html = html.replace("Social Media Sentiment", "Core Web Vitals Benchmark")
    html = html.replace(">Positive<", ">100/100<")

    # 8. Case Study 03 (Tomorrow Landscaping -> Nexus Business Engine)
    html = html.replace("tomorrow landscaping", "nexus business tools")
    html = html.replace("business upscale", "custom tooling")
    html = html.replace("landscaping", "web systems")

    # 9. Engineering Philosophy (Anti-AI Hallmark Tone)
    html = html.replace(
        "The non-fiction revolution",
        "Software built to work. Not to impress a slide deck."
    )
    html = html.replace(
        "The non-fiction<br/>revolution",
        "Software built to work. <br/>Not to impress a slide deck."
    )

    # Paragraph in Philosophy section
    old_buys_builds = "Samaria Tech buys and builds operationally complex businesses in fragmented industries, deploying automation and physical AI to drive growth and harden operations. Built for venture-scale returns with private equity risk profiles."
    new_philosophy_text = "Samaria Tech designs, builds, and maintains high-performance websites and production software for growing businesses. We solve technical problems with clean code, fast load times, and dependable architecture. No fluff, no bloated stacks—just solid systems built to run your business."
    html = html.replace(old_buys_builds, new_philosophy_text)

    # 10. Team Section Header
    html = re.sub(
        r"The edge isn&#x27;t the <br/>thesis\. It&#x27;s the people <br/>executing it\.",
        "The code is only as good as <br/>the engineers <br/>behind it.",
        html
    )
    html = html.replace(
        "The edge isn't the thesis. It's the people executing it.",
        "The code is only as good as the engineers behind it."
    )

    # 11. Engineering Team: Edward Magejo, Divine Mwale, Munashe Simango
    # Parse HTML with BeautifulSoup to cleanly replace the first 3 ci_team cards and remove the rest
    soup = BeautifulSoup(html, "html.parser")
    cl_team = soup.find("div", class_="cl_team")
    if cl_team:
        team_items = cl_team.find_all("div", class_="ci_team")
        print(f"Found {len(team_items)} team cards to update.")

        engineers = [
            {
                "name": "Edward Magejo",
                "role": "Lead Solutions Architect & Full-Stack Engineer",
                "bio": "Directing end-to-end web architecture, system design, and API integrations across mission-critical web platforms.",
                "tags": [("Full-Stack", "Architecture"), ("APIs", "Cloud Systems"), ("Engineering", "Lead")]
            },
            {
                "name": "Divine Mwale",
                "role": "Frontend & UI/UX Engineer",
                "bio": "Building fast, accessible user interfaces, responsive layouts, and interactive web experiences with modern frameworks.",
                "tags": [("Frontend", "Next.js"), ("UI/UX Design", "Design Systems"), ("Performance", "Speed")]
            },
            {
                "name": "Munashe Simango",
                "role": "Cloud & DevOps Systems Engineer",
                "bio": "Specializing in high-availability deployments, backend pipelines, database optimization, and resilient cloud infrastructure.",
                "tags": [("Cloud Systems", "DevOps"), ("Databases", "Optimization"), ("Backend", "Pipelines")]
            }
        ]

        for i in range(min(3, len(team_items))):
            card = team_items[i]
            eng = engineers[i]

            # Update Name
            for cap in card.find_all("div", class_="is-caption"):
                if cap.get_text(strip=True) in ["Ryan McKillen", "Matt Sweeney", "Grant Wilson", "Dan Cintra", "Chase Keesling", "Matthew Goetz"]:
                    cap.string = eng["name"]

            # Update Role
            for role_el in card.find_all("div", class_=lambda c: c and "is-caption" in c and "is-op-50" in c):
                role_el.string = eng["role"]

            # Update Bio paragraph
            p_bio = card.find("p")
            if p_bio:
                p_bio.string = eng["bio"]

        # If more than 3 cards, remove excess cards so the team is strictly Edward, Divine, and Munashe
        while len(team_items) > 3:
            removed = team_items.pop()
            removed.decompose()

        html = str(soup)
        print("✓ Updated team members to Edward Magejo, Divine Mwale, and Munashe Simango.")

    # 12. Contact Section Heading
    # User request: "on the contact section heading write build with us, launch your next website, or discuss you tech needs with us."
    contact_h2_old = "Invest with us, share an opportunity, or make an inquiry."
    contact_h2_new = "Build with us, launch your next website, or discuss your tech needs with us."
    html = html.replace(contact_h2_old, contact_h2_new)

    html = html.replace("Invest with us or share an opportunities", "Build with us, launch your next website, or discuss your tech needs with us.")
    html = html.replace("Future of robotics \u2028begins here", "Build with us, launch your next website, or discuss your tech needs with us.")

    # 13. Form Submit Button: "Submit / Send"
    html = re.sub(
        r'<input([^>]*class="submit-button[^"]*"[^>]*)value="Submit"',
        r'<input\1value="Submit / Send"',
        html
    )
    html = re.sub(
        r'<input([^>]*value="Submit"[^>]*)class="submit-button',
        r'<input\1value="Submit / Send" class="submit-button',
        html
    )

    with open(TARGET_FILE, "w", encoding="utf-8") as f:
        f.write(html)

    print("✓ All text updates applied cleanly to home.html!")

if __name__ == "__main__":
    update_templates()
