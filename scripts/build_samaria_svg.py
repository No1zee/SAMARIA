import re
import os
import sys

# Add script directory to sys.path so it can find glyphs_data
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from glyphs_data import GLYPHS

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
                out.append(cur_cmd)
                idx += 1
            else:
                idx += 1
    res = ''
    for item in out:
        if item.isalpha():
            res += item
        else:
            res += ' ' + item
    return res

def create_samaria_tech_svg():
    letters = [
        ('S', GLYPHS['S'][0], GLYPHS['S'][1]),
        ('A', GLYPHS['A'][0], GLYPHS['A'][1]),
        ('M', GLYPHS['M'][0], GLYPHS['M'][1]),
        ('A', GLYPHS['A'][0], GLYPHS['A'][1]),
        ('R', GLYPHS['R'][0], GLYPHS['R'][1]),
        ('I', GLYPHS['I'][0], GLYPHS['I'][1]),
        ('A', GLYPHS['A'][0], GLYPHS['A'][1]),
        ('SPACE', '', 104.0),
        ('T', GLYPHS['T'][0], GLYPHS['T'][1]),
        ('E', GLYPHS['E'][0], GLYPHS['E'][1]),
        ('C', GLYPHS['C'][0], GLYPHS['C'][1]),
        ('H', GLYPHS['H'][0], GLYPHS['H'][1]),
    ]

    LETTER_GAP = 36.0
    cur_x = 0.0
    shifted_letters = []

    for name, path_str, w in letters:
        if name == 'SPACE':
            cur_x += w
            continue
        shifted = shift_path(path_str, cur_x)
        shifted_letters.append((name, shifted, cur_x, w))
        cur_x += w + LETTER_GAP

    total_width = cur_x - LETTER_GAP
    return shifted_letters, total_width

if __name__ == '__main__':
    shifted_letters, total_w = create_samaria_tech_svg()
    print(f"Total logo width: {total_w:.2f}, Height: 296")
    print(f"Successfully built {len(shifted_letters)} letter paths for SAMARIA TECH!")
