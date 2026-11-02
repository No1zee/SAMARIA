import subprocess

code = '''
import * as THREE from "three";
const geo = new THREE.CylinderGeometry(1, 1, 0.1, 4, 1);
const uvs = geo.attributes.uv.array;
const pos = geo.attributes.position.array;
for (let i = 0; i < pos.length / 3; i++) {
  const x = pos[i*3], y = pos[i*3+1], z = pos[i*3+2];
  if (y > 0.04) {
    const u = uvs[i*2], v = uvs[i*2+1];
    console.log(`pos=(${x.toFixed(2)},${y.toFixed(2)},${z.toFixed(2)}) -> uv=(${u.toFixed(2)},${v.toFixed(2)})`);
  }
}
'''
with open('tmp_uv.mjs', 'w') as f:
    f.write(code)

res = subprocess.run(['node', 'tmp_uv.mjs'], capture_output=True, text=True)
print(res.stdout)
