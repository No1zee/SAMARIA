with open(r'c:\Projects\SAMARIA\src\templates\home.html', 'r', encoding='utf-8') as f:
    text = f.read()

target1 = '<div class="is-svg is-f"><img alt="" class="is-svg is-img is-footer-img" height="516" loading="eager" sizes="(max-width: 767px) 100vw, 864px" src="https://cdn.prod.website-files.com/6a180066e6ba27b81a7ef915/6a180066e6ba27b81a7ef9bc_Warstwa_1%20(1).png" srcset="https://cdn.prod.website-files.com/6a180066e6ba27b81a7ef915/6a180066e6ba27b81a7ef9bc_Warstwa_1%2520(1)-p-500.png 500w, https://cdn.prod.website-files.com/6a180066e6ba27b81a7ef915/6a180066e6ba27b81a7ef9bc_Warstwa_1%2520(1)-p-800.png 800w, https://cdn.prod.website-files.com/6a180066e6ba27b81a7ef915/6a180066e6ba27b81a7ef9bc_Warstwa_1%20(1).png 868w" width="864"/></div>'
print("Found target1:", target1 in text)

target2 = '<div class="footer-illu"><img alt="" class="is-svg is-img is-footer-img" height="516" loading="eager" sizes="(max-width: 767px) 100vw, 864px" src="https://cdn.prod.website-files.com/6a180066e6ba27b81a7ef915/6a180066e6ba27b81a7ef9bc_Warstwa_1%20(1).png" srcset="https://cdn.prod.website-files.com/6a180066e6ba27b81a7ef915/6a180066e6ba27b81a7ef9bc_Warstwa_1%2520(1)-p-500.png 500w, https://cdn.prod.website-files.com/6a180066e6ba27b81a7ef915/6a180066e6ba27b81a7ef9bc_Warstwa_1%2520(1)-p-800.png 800w, https://cdn.prod.website-files.com/6a180066e6ba27b81a7ef915/6a180066e6ba27b81a7ef9bc_Warstwa_1%20(1).png 868w" width="864"/></div>'
print("Found target2:", target2 in text)
