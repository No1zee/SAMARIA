import re

def svg_to_lottie_shape(path_str):
    tokens = re.findall(r'[A-Za-z]|[-+]?\d*\.?\d+(?:[eE][-+]?\d+)?', path_str)
    contours = []
    cur_v = []
    cur_i = []
    cur_o = []
    cur_x, cur_y = 0.0, 0.0
    start_x, start_y = 0.0, 0.0
    idx = 0
    cur_cmd = ''

    while idx < len(tokens):
        t = tokens[idx]
        if t.isalpha():
            cur_cmd = t
            idx += 1
            if cur_cmd in ('Z', 'z'):
                if cur_v:
                    contours.append({
                        'i': cur_i,
                        'o': cur_o,
                        'v': cur_v,
                        'c': True
                    })
                    cur_v, cur_i, cur_o = [], [], []
                continue
        else:
            if cur_cmd == 'M':
                if cur_v:
                    contours.append({
                        'i': cur_i,
                        'o': cur_o,
                        'v': cur_v,
                        'c': True
                    })
                    cur_v, cur_i, cur_o = [], [], []
                cur_x, cur_y = float(tokens[idx]), float(tokens[idx+1])
                start_x, start_y = cur_x, cur_y
                cur_v.append([cur_x, cur_y])
                cur_i.append([0.0, 0.0])
                cur_o.append([0.0, 0.0])
                idx += 2
                cur_cmd = 'L' # Subsequent coords after M are treated as L
            elif cur_cmd == 'L':
                cur_x, cur_y = float(tokens[idx]), float(tokens[idx+1])
                cur_v.append([cur_x, cur_y])
                cur_i.append([0.0, 0.0])
                cur_o.append([0.0, 0.0])
                idx += 2
            elif cur_cmd == 'H':
                cur_x = float(tokens[idx])
                cur_v.append([cur_x, cur_y])
                cur_i.append([0.0, 0.0])
                cur_o.append([0.0, 0.0])
                idx += 1
            elif cur_cmd == 'V':
                cur_y = float(tokens[idx])
                cur_v.append([cur_x, cur_y])
                cur_i.append([0.0, 0.0])
                cur_o.append([0.0, 0.0])
                idx += 1
            elif cur_cmd == 'C':
                x1, y1 = float(tokens[idx]), float(tokens[idx+1])
                x2, y2 = float(tokens[idx+2]), float(tokens[idx+3])
                x, y = float(tokens[idx+4]), float(tokens[idx+5])
                # previous vertex's out-tangent relative to that vertex
                cur_o[-1] = [round(x1 - cur_x, 3), round(y1 - cur_y, 3)]
                cur_x, cur_y = x, y
                cur_v.append([round(cur_x, 3), round(cur_y, 3)])
                cur_i.append([round(x2 - cur_x, 3), round(y2 - cur_y, 3)])
                cur_o.append([0.0, 0.0])
                idx += 6
            else:
                idx += 1

    if cur_v:
        contours.append({
            'i': cur_i,
            'o': cur_o,
            'v': cur_v,
            'c': True
        })

    return contours

test_path = "M 10 20 L 50 20 C 60 20 70 30 70 40 L 70 80 Z"
shapes = svg_to_lottie_shape(test_path)
print(f"Generated {len(shapes)} contours. First contour vertices: {len(shapes[0]['v'])}")
print(shapes[0])
