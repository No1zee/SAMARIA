from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1440, "height": 900})
    page.goto('http://localhost:3000', wait_until='networkidle')

    cursor_info = page.evaluate('''() => {
        const customCursor = document.querySelector('.custom-cursor');
        const arrowCursor = document.querySelector('.arrow-cursor');
        const handCursor = document.querySelector('.hand-cursor');
        const cursorWrap = document.querySelector('.cursor-wrap');
        const bodyCursor = window.getComputedStyle(document.body).cursor;
        const link = document.querySelector('a');
        const linkCursor = link ? window.getComputedStyle(link).cursor : null;

        return {
            hasCustomCursor: !!customCursor,
            hasArrowCursor: !!arrowCursor,
            hasHandCursor: !!handCursor,
            hasCursorWrap: !!cursorWrap,
            bodyCursor: bodyCursor,
            linkCursor: linkCursor
        };
    }''')
    print("Cursor Verification:", cursor_info)
    browser.close()
