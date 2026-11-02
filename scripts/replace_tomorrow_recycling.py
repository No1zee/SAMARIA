def replace_recycling():
    with open('src/templates/home.html', 'r', encoding='utf-8') as f:
        html = f.read()

    # 1. Heading
    html = html.replace(
        '<h1 gsap-title="" scroll-name="" section-navi="section-name">Tomorrow <br/>Recycling</h1>',
        '<h1 gsap-title="" scroll-name="" section-navi="section-name">Web &amp; Software <br/>Development</h1>'
    )

    # 2. Tags
    old_tags = '<div class="is-caption" scroll-small-name="">apexplatform.tech</div><div class="is-caption" scroll-small-name="">web engineering</div><div class="is-caption" scroll-small-name="">robotics &amp; AI</div>'
    new_tags = '<div class="is-caption" scroll-small-name="">web engineering</div><div class="is-caption" scroll-small-name="">custom software</div><div class="is-caption" scroll-small-name="">cloud &amp; APIs</div>'
    html = html.replace(old_tags, new_tags)

    # 3. Clean up the tomorrowweb systems links
    html = html.replace('href="https://www.tomorrowweb systems.com/"', 'href="#contact"')

    with open('src/templates/home.html', 'w', encoding='utf-8') as f:
        f.write(html)
    print("Successfully replaced Tomorrow Recycling with Web & Software Development in home.html!")

if __name__ == '__main__':
    replace_recycling()
