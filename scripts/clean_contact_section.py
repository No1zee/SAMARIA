import re

def clean_contact():
    with open('src/templates/home.html', 'r', encoding='utf-8') as f:
        html = f.read()

    # 1. Remove the last remaining PE / VC infographic from contact section
    html = re.sub(
        r'<img[^>]*class="[^"]*is-infographic[^"]*"[^>]*src="[^"]*6a180066e6ba27b81a7ef9a4_Frame[^"]*"[^>]*/>',
        '<!-- Infographic removed -->',
        html
    )

    # 2. Fix duplicate title in modal-txts
    old_modal_txts = """<div class="modal-txts"><div class="is-h-m" contact-name="">Build with us, launch your next website, or discuss your tech needs with us.</div><div contact-name="">Build with us, launch your next website, or discuss your tech needs with us.</div></div>"""
    new_modal_txts = """<div class="modal-txts"><div class="is-h-m" contact-name="">Build with us, launch your next website, or discuss your tech needs with us.</div></div>"""
    if old_modal_txts in html:
        html = html.replace(old_modal_txts, new_modal_txts, 1)
        print("Cleaned duplicate modal title.")

    with open('src/templates/home.html', 'w', encoding='utf-8') as f:
        f.write(html)
    print("Successfully cleaned contact section and modal!")

if __name__ == '__main__':
    clean_contact()
