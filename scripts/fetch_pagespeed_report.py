import sys, time
sys.stdout.reconfigure(encoding='utf-8')
from playwright.sync_api import sync_playwright

url = "https://pagespeed.web.dev/analysis/https-www-samariatech-co-zw/mitjj6gnhn?form_factor=desktop&category=performance&category=accessibility&category=best-practices&category=seo&category=agentic-browsing&hl=en-GB&utm_source=lh-chrome-ext"

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1440, "height": 900})
    
    print(f"Navigating to {url} ...")
    page.goto(url, wait_until='networkidle', timeout=60000)
    time.sleep(6)

    data = page.evaluate('''() => {
        // Collect category scores
        const categoryElements = Array.from(document.querySelectorAll('.lh-category-header, [role="tab"], .lh-gauge__wrapper'));
        
        // Collect all metrics
        const metricElements = Array.from(document.querySelectorAll('.lh-metric'));
        const metrics = metricElements.map(el => {
            const title = el.querySelector('.lh-metric__title');
            const val = el.querySelector('.lh-metric__value');
            return {
                title: title ? title.textContent.trim() : '',
                value: val ? val.textContent.trim() : ''
            };
        });

        // Collect all audit items
        const auditItems = Array.from(document.querySelectorAll('.lh-audit'));
        const audits = auditItems.map(el => {
            const title = el.querySelector('.lh-audit__title');
            const val = el.querySelector('.lh-audit__display-text');
            const score = el.getAttribute('class');
            return {
                title: title ? title.textContent.trim() : '',
                displayValue: val ? val.textContent.trim() : '',
                className: score || ''
            };
        }).filter(a => a.title);

        return {
            pageTitle: document.title,
            metrics: metrics,
            audits: audits.slice(0, 35)
        };
    }''')

    print("Page Title:", data['pageTitle'])
    print("\nMetrics:")
    for m in data['metrics']:
        print(f"  {m['title']}: {m['value']}")

    print("\nKey Audits:")
    for a in data['audits']:
        print(f"  - {a['title']} | {a['displayValue']} (class: {a['className'][:40]})")

    page.screenshot(path="C:/Users/Edward Magejo/.gemini/antigravity/brain/c38161f9-4a6f-468b-ab53-043340eb2182/pagespeed_desktop.png", full_page=True)
    print("Full page screenshot saved.")
    browser.close()
