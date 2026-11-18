import urllib.request
import re

def verify():
    base = "http://localhost:3000"
    print("--- 1. Testing Root Page Metadata ---")
    req = urllib.request.urlopen(f"{base}/")
    html = req.read().decode('utf-8')
    assert req.status == 200, f"Root status {req.status}"
    
    assert 'property="og:image"' in html, "og:image missing"
    assert 'https://samariatech.com/og-image.png' in html, "samariatech og-image.png missing"
    assert 'name="twitter:image"' in html, "twitter:image missing"
    assert 'content="https://samariatech.com/og-image.png" name="twitter:image"' in html, "twitter:image url mismatch"
    assert '6a180066e6ba27b81a7ef9c3_OG-1' not in html, "Legacy Webflow OG-1 remains!"
    
    # Check favicon links in html
    assert '<link href="/favicon.ico"' in html, "favicon.ico link missing"
    assert '<link href="/favicon-32x32.png"' in html, "favicon-32x32 link missing"
    assert '<link href="/apple-touch-icon.png"' in html, "apple-touch-icon link missing"
    print("Root page metadata verified successfully!")

    print("\n--- 2. Testing Scope Page Metadata ---")
    req_scope = urllib.request.urlopen(f"{base}/scope")
    html_scope = req_scope.read().decode('utf-8')
    assert 'https://samariatech.com/og-image.png' in html_scope, "Scope og-image missing"
    assert '6a180066e6ba27b81a7ef9c3_OG-1' not in html_scope, "Scope legacy OG remains!"
    print("Scope page metadata verified successfully!")

    print("\n--- 3. Testing Blog Page Metadata ---")
    req_blog = urllib.request.urlopen(f"{base}/blog")
    html_blog = req_blog.read().decode('utf-8')
    assert 'https://samariatech.com/og-image.png' in html_blog, "Blog og-image missing"
    print("Blog page metadata verified successfully!")

    print("\n--- 4. Testing Static Asset Endpoints ---")
    assets = [
        "/og-image.png",
        "/og-image.webp",
        "/favicon.ico",
        "/favicon-16x16.png",
        "/favicon-32x32.png",
        "/favicon-48x48.png",
        "/apple-touch-icon.png",
        "/icon-192.png",
        "/icon-512.png",
    ]
    for asset in assets:
        r = urllib.request.urlopen(f"{base}{asset}")
        data = r.read()
        print(f"  [HTTP {r.status}] {asset:22} -> {len(data):,} bytes (Content-Type: {r.headers.get('Content-Type')})")
        assert r.status == 200, f"Failed to fetch {asset}"
        assert len(data) > 0, f"Empty asset: {asset}"

    print("\nALL VERIFICATIONS PASSED!")

if __name__ == "__main__":
    verify()
