from PIL import Image
import numpy as np

for name in ['sovereign_diffuse.png', 'sovereign_back_diffuse.png', 'sovereign_edge_diffuse.png']:
    im = Image.open(f'public/assets/coin/{name}').convert('RGB')
    arr = np.array(im).astype(np.int32)
    r, g, b = arr[:,:,0], arr[:,:,1], arr[:,:,2]
    blue_mask = (b > r + 30) & (b > 100)
    count = np.sum(blue_mask)
    print(f'{name}: blue pixels count = {count}')
    if count > 0:
        y_indices, x_indices = np.where(blue_mask)
        print(f'  First blue pixel at ({x_indices[0]}, {y_indices[0]}): R={r[y_indices[0], x_indices[0]]}, G={g[y_indices[0], x_indices[0]]}, B={b[y_indices[0], x_indices[0]]}')
