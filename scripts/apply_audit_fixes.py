import re

# 1. Update public/robots.txt
robots_txt = """User-agent: *
Allow: /

Sitemap: https://www.samariatech.co.zw/sitemap.xml
"""
with open('public/robots.txt', 'w', encoding='utf-8') as f:
    f.write(robots_txt)
print("Updated public/robots.txt")

# 2. Create public/sitemap.xml
sitemap_xml = """<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.samariatech.co.zw/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://www.samariatech.co.zw/blog</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://www.samariatech.co.zw/blog-posts/a-new-economy-is-knocking</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://www.samariatech.co.zw/blog-posts/engineering-the-systems-of-abundance</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://www.samariatech.co.zw/blog-posts/turning-sci-fi-into-economic-fact</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://www.samariatech.co.zw/blog-posts/we-engineer-the-future-economy-in-the-real-world-not-in-theory</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
</urlset>
"""
with open('public/sitemap.xml', 'w', encoding='utf-8') as f:
    f.write(sitemap_xml)
print("Created public/sitemap.xml")

# 3. Update src/templates/home.html with accessible labels
with open('src/templates/home.html', 'r', encoding='utf-8') as f:
    home = f.read()

# Hamburger button aria-label
home = home.replace(
    '<button class="bold-nav-full__hamburger" data-navigation-toggle="toggle">',
    '<button class="bold-nav-full__hamburger" data-navigation-toggle="toggle" aria-label="Toggle navigation menu">'
)

# Preloader logo link
home = home.replace(
    '<a class="is-svg preloader-logo-wrapper w-inline-block" href="#top">',
    '<a class="is-svg preloader-logo-wrapper w-inline-block" href="#top" aria-label="Samaria Tech">'
)

# Navbar logo link
home = home.replace(
    '<a class="logo_nav w-inline-block" href="#">',
    '<a class="logo_nav w-inline-block" href="#" aria-label="Samaria Tech Homepage">'
)

# Modal close buttons
home = home.replace(
    '<div class="close-popup hoverable">',
    '<div class="close-popup hoverable" role="button" tabindex="0" aria-label="Close contact dialog">'
)
home = home.replace(
    '<div class="close-project">',
    '<div class="close-project" role="button" tabindex="0" aria-label="Close project details">'
)
home = home.replace(
    '<div class="close-burger">',
    '<div class="close-burger" role="button" tabindex="0" aria-label="Close navigation menu">'
)

# Project links
home = home.replace(
    'href="https://www.apexplatform.tech/" target="_blank"><img',
    'href="https://www.apexplatform.tech/" target="_blank" aria-label="View Apex Web Platform website"><img'
)
home = home.replace(
    'href="https://www.aescape.com/" target="_blank"><img',
    'href="https://www.aescape.com/" target="_blank" aria-label="View Aescape website"><img'
)
home = home.replace(
    'href="#contact" target="_blank"><img',
    'href="#contact" aria-label="Contact Samaria Tech for custom tooling"><img'
)

# Team LinkedIn links
home = home.replace(
    'class="author-photo hoverable w-inline-block" hover-arrow="" href="https://www.linkedin.com/in/edward-tanaka-magejo" target="_blank">',
    'class="author-photo hoverable w-inline-block" hover-arrow="" href="https://www.linkedin.com/in/edward-tanaka-magejo" target="_blank" aria-label="Edward Tanaka Magejo LinkedIn profile">'
)
home = home.replace(
    'class="link-absolute hoverable w-inline-block" hover-arrow="" href="https://www.linkedin.com/in/edward-tanaka-magejo" scroll-name="" target="_blank">',
    'class="link-absolute hoverable w-inline-block" hover-arrow="" href="https://www.linkedin.com/in/edward-tanaka-magejo" scroll-name="" target="_blank" aria-label="Edward Tanaka Magejo profile">'
)
home = home.replace(
    'class="author-photo hoverable w-inline-block" hover-arrow="" href="https://www.linkedin.com/in/matt-sweeney" target="_blank">',
    'class="author-photo hoverable w-inline-block" hover-arrow="" href="https://www.linkedin.com/in/matt-sweeney" target="_blank" aria-label="Matt Sweeney LinkedIn profile">'
)
home = home.replace(
    'class="link-absolute hoverable w-inline-block" hover-arrow="" href="https://www.linkedin.com/in/matt-sweeney" scroll-name="" target="_blank">',
    'class="link-absolute hoverable w-inline-block" hover-arrow="" href="https://www.linkedin.com/in/matt-sweeney" scroll-name="" target="_blank" aria-label="Matt Sweeney profile">'
)
home = home.replace(
    'class="author-photo hoverable w-inline-block" hover-arrow="" href="https://www.linkedin.com/company/samaria-tech" target="_blank">',
    'class="author-photo hoverable w-inline-block" hover-arrow="" href="https://www.linkedin.com/company/samaria-tech" target="_blank" aria-label="Samaria Tech LinkedIn company page">'
)
home = home.replace(
    'class="link-absolute hoverable w-inline-block" hover-arrow="" href="https://www.linkedin.com/company/samaria-tech" scroll-name="" target="_blank">',
    'class="link-absolute hoverable w-inline-block" hover-arrow="" href="https://www.linkedin.com/company/samaria-tech" scroll-name="" target="_blank" aria-label="Samaria Tech LinkedIn company page">'
)

# Miscellaneous icon links
home = re.sub(
    r'<a class="overflow-clip link-clip is-r w-inline-block" href="#">\s*</a>',
    r'<a class="overflow-clip link-clip is-r w-inline-block" href="#what-we-do" aria-label="Explore project details"></a>',
    home
)

with open('src/templates/home.html', 'w', encoding='utf-8') as f:
    f.write(home)
print("Updated src/templates/home.html with accessible attributes")

# 4. Update src/templates/blog.html
with open('src/templates/blog.html', 'r', encoding='utf-8') as f:
    blog = f.read()

# Hamburger button
blog = blog.replace(
    '<button data-navigation-toggle="toggle" class="bold-nav-full__hamburger">',
    '<button data-navigation-toggle="toggle" class="bold-nav-full__hamburger" aria-label="Toggle navigation menu">'
)

# Preloader logo
blog = blog.replace(
    '<a href="/" class="is-svg preloader-logo-wrapper',
    '<a href="/" aria-label="Samaria Tech Homepage" class="is-svg preloader-logo-wrapper'
)

# Modal close buttons
blog = blog.replace(
    '<div class="close-popup hoverable">',
    '<div class="close-popup hoverable" role="button" tabindex="0" aria-label="Close contact dialog">'
)
blog = blog.replace(
    '<div class="close-burger">',
    '<div class="close-burger" role="button" tabindex="0" aria-label="Close navigation menu">'
)

# Ensure all video elements have preload="none"
blog = re.sub(r'<video(?![^>]*\bpreload=)', '<video preload="none"', blog)

with open('src/templates/blog.html', 'w', encoding='utf-8') as f:
    f.write(blog)
print("Updated src/templates/blog.html with accessible attributes")
