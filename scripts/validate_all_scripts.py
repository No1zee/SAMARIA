from bs4 import BeautifulSoup
import subprocess
import tempfile
import os
import glob

for path in glob.glob('src/templates/*.html'):
    with open(path, 'r', encoding='utf-8') as f:
        soup = BeautifulSoup(f.read(), 'html.parser')
    scripts = soup.find_all('script')
    inline_scripts = [s.string for s in scripts if s.string and s.string.strip()]
    errors = 0
    for i, s in enumerate(inline_scripts):
        if 'application/ld+json' in str(scripts[i].get('type', '')) or 'importmap' in str(scripts[i].get('type', '')) or 'module' in str(scripts[i].get('type', '')):
            continue
        with tempfile.NamedTemporaryFile('w', suffix='.js', delete=False, encoding='utf-8') as tmp:
            tmp.write(s)
            tmp_name = tmp.name
        res = subprocess.run(['node', '-c', tmp_name], capture_output=True, text=True)
        os.remove(tmp_name)
        if res.returncode != 0:
            print(f"ERROR in {path} script {i}: {res.stderr}")
            errors += 1
    print(f"{path}: checked {len(inline_scripts)} scripts, {errors} errors.")
