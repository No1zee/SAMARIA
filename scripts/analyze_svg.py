import re

with open('src/templates/home.html', encoding='utf-8', errors='ignore') as f:
    text = f.read()

svg_match = re.search(r'<div class="footer-logo"><div class="is-svg is-footer-full w-embed"><svg[^>]*>(.*?)</svg>', text, re.DOTALL)
if svg_match:
    paths = re.findall(r'<path d="([^"]+)"', svg_match.group(1))
    for i, p in enumerate(paths):
        # find all absolute coordinates by looking at M, L, C, V, H
        tokens = re.findall(r'[A-Za-z]|[-+]?\d*\.?\d+(?:[eE][-+]?\d+)?', p)
        xs = []
        ys = []
        idx = 0
        cur_cmd = ''
        cur_x, cur_y = 0.0, 0.0
        while idx < len(tokens):
            t = tokens[idx]
            if t.isalpha():
                cur_cmd = t
                idx += 1
            else:
                if cur_cmd == 'M' or cur_cmd == 'L':
                    cur_x, cur_y = float(tokens[idx]), float(tokens[idx+1])
                    xs.append(cur_x)
                    ys.append(cur_y)
                    idx += 2
                elif cur_cmd == 'H':
                    cur_x = float(tokens[idx])
                    xs.append(cur_x)
                    idx += 1
                elif cur_cmd == 'V':
                    cur_y = float(tokens[idx])
                    ys.append(cur_y)
                    idx += 1
                elif cur_cmd == 'C':
                    cur_x, cur_y = float(tokens[idx+4]), float(tokens[idx+5])
                    xs.append(cur_x)
                    ys.append(cur_y)
                    idx += 6
                elif cur_cmd == 'Z' or cur_cmd == 'z':
                    idx += 1
                else:
                    idx += 1
        print(f'Path {i}: x=[{min(xs):.1f}, {max(xs):.1f}] w={max(xs)-min(xs):.1f}, y=[{min(ys):.1f}, {max(ys):.1f}] h={max(ys)-min(ys):.1f}')
