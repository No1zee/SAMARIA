import re

# Load original MECHA paths
with open('src/templates/home.html', encoding='utf-8', errors='ignore') as f:
    text = f.read()

svg_match = re.search(r'<div class="footer-logo"><div class="is-svg is-footer-full w-embed"><svg[^>]*>(.*?)</svg>', text, re.DOTALL)
paths = re.findall(r'<path d="([^"]+)"', svg_match.group(1))

# Path 0: C, Path 1: E, Path 2: M, Path 3: H, Path 4: A
orig_C = paths[0]
orig_E = paths[1]
orig_M = paths[2]
orig_H = paths[3]
orig_A = paths[4]

def shift_path(path_str, dx):
    tokens = re.findall(r'[A-Za-z]|[-+]?\d*\.?\d+(?:[eE][-+]?\d+)?', path_str)
    out = []
    idx = 0
    cur_cmd = ''
    while idx < len(tokens):
        t = tokens[idx]
        if t.isalpha():
            cur_cmd = t
            out.append(t)
            idx += 1
        else:
            if cur_cmd in ('M', 'L'):
                x = float(tokens[idx]) + dx
                y = float(tokens[idx+1])
                out.append(f'{x:.3f}')
                out.append(f'{y:.3f}')
                idx += 2
            elif cur_cmd == 'H':
                x = float(tokens[idx]) + dx
                out.append(f'{x:.3f}')
                idx += 1
            elif cur_cmd == 'V':
                out.append(tokens[idx])
                idx += 1
            elif cur_cmd == 'C':
                x1 = float(tokens[idx]) + dx
                y1 = float(tokens[idx+1])
                x2 = float(tokens[idx+2]) + dx
                y2 = float(tokens[idx+3])
                x = float(tokens[idx+4]) + dx
                y = float(tokens[idx+5])
                out.extend([f'{x1:.3f}', f'{y1:.3f}', f'{x2:.3f}', f'{y2:.3f}', f'{x:.3f}', f'{y:.3f}'])
                idx += 6
            elif cur_cmd in ('Z', 'z'):
                idx += 1
            else:
                idx += 1
    # re-assemble path
    res = ''
    for item in out:
        if item.isalpha():
            res += item
        else:
            res += ' ' + item
    return res

# Normalize original letters to x=0
norm_M = shift_path(orig_M, 0.0) # min x is 0.0
norm_E = shift_path(orig_E, -358.357)
norm_C = shift_path(orig_C, -583.056)
norm_H = shift_path(orig_H, -843.321)
norm_A = shift_path(orig_A, -1126.51)

print('Normalized original letters:')
print('M width: 317.75')
print('E width: 207.18')
print('C width: 219.62')
print('H width: 245.53')
print('A width: 257.50')
