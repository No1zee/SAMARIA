import sys, time
sys.stdout.reconfigure(encoding='utf-8')
from playwright.sync_api import sync_playwright

url = "https://pagespeed.web.dev/analysis/https-www-samariatech-co-zw/th1h60ngfy?hl=en-GB&form_factor=mobile"

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1440, "height": 900})
    
    print(f"Navigating to {url} ...")
    page.goto(url, wait_until='networkidle', timeout=60000)
    time.sleep(6)

    data = page.evaluate('''() => {
        // Collect category scores
        const wrappers = Array.from(document.querySelectorAll('.lh-gauge__wrapper'));
        const scores = wrappers.map(w => {
            const label = w.querySelector('.lh-gauge__label');
            const pct = w.querySelector('.lh-gauge__percentage');
            return {
                category: label ? label.textContent.trim() : '',
                score: pct ? pct.textContent.trim() : ''
            };
        });

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

        // Collect top opportunities and audits
        const auditItems = Array.from(document.querySelectorAll('.lh-audit'));
        const audits = auditItems.map(el => {
            const title = el.querySelector('.lh-audit__title');
            const val = el.querySelector('.lh-audit__display-text');
            const desc = el.querySelector('.lh-audit__description');
            const cls = el.getAttribute('class') || '';
            return {
                title: title ? title.textContent.trim() : '',
                displayValue: val ? val.textContent.trim() : '',
                description: desc ? desc.textContent.trim() : '',
                failed: cls.includes('fail') || cls.includes('metricsavings')
            };
        }).filter(a => a.title && (a.displayValue || a.failed));

        return {
            scores: scores.slice(0, 4),
            metrics: metrics,
            audits: audits.slice(0, 30)
        };
    }''')

    print("Mobile Category Scores:", data['scores'])
    print("\nMobile Metrics:")
    for m in data['metrics']:
        print(f"  {m['title']}: {m['value']}")

    print("\nTop Mobile Opportunities & Failed Audits:")
    for a in data['audits']:
        print(f"  - {a['title']} | {a['displayValue']}")

    page.screenshot(path="C:/Users/Edward Magejo/.gemini/antigravity/brain/c38161f9-4a6f-468b-ab53-043340eb2182/pagespeed_mobile.png", full_page=True)
    print("Screenshot saved to pagespeed_mobile.png")
    browser.close()
