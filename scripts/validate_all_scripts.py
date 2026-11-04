from bs4 import BeautifulSoup
import subprocess
import tempfile
import os

for path in ['src/templates/home.html', 'src/templates/blog.html']:
    with open(path, 'r', encoding='utf-8') as f:
        soup = BeautifulSoup(f.read(), 'html.parser')
    scripts = soup.find_all('script')
    inline_scripts = [s.string for s in scripts if s.string and s.string.strip()]
    print(f"Checking {len(inline_scripts)} inline scripts in {path}...")
    for i, s in enumerate(inline_scripts):
        with tempfile.NamedTemporaryFile('w', suffix='.js', delete=False, encoding='utf-8') as tmp:
            tmp.write(s)
            tmp_name = tmp.name
        res = subprocess.run(['node', '-c', tmp_name], capture_output=True, text=True)
        os.remove(tmp_name)
        if res.returncode != 0:
            print(f"ERROR in script {i}: {res.stderr}")
        else:
            # OK
            pass
    print(f"All scripts validated in {path}!")
