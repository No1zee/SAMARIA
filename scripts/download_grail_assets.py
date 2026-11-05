import urllib.request
import os

base = "https://grail-app.com"
out_dir = r"C:\Users\Edward Magejo\.gemini\antigravity\brain\c38161f9-4a6f-468b-ab53-043340eb2182"

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}

for path in ['/assets/index-qyEp212_.js', '/assets/HomePage-B7z74ohK.css', '/assets/index-B4wO6xrz.css']:
    url = base + path
    filename = os.path.basename(path)
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req) as response:
            content = response.read()
            target = os.path.join(out_dir, "grail_" + filename)
            with open(target, 'wb') as f:
                f.write(content)
            print(f"Downloaded {filename}: {len(content)} bytes")
    except Exception as e:
        print(f"Error downloading {path}: {e}")
