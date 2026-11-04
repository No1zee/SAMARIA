from playwright.sync_api import sync_playwright

url = "https://pagespeed.web.dev/analysis/https-www-samariatech-co-zw/th1h60ngfy?hl=en-GB&form_factor=mobile"

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1440, "height": 900})
    page.goto(url, wait_until='networkidle')

    details = page.evaluate('''() => {
        const audit = Array.from(document.querySelectorAll('.lh-audit')).find(a => {
            const t = a.querySelector('.lh-audit__title');
            return t && t.textContent.includes('prohibited ARIA');
        });
        if (!audit) return null;
        const items = Array.from(audit.querySelectorAll('.lh-node, .lh-snippet, code'));
        return {
            title: audit.querySelector('.lh-audit__title').textContent.trim(),
            snippets: items.map(i => i.textContent.trim())
        };
    }''')
    print("Prohibited ARIA Audit Details:", details)
    browser.close()
