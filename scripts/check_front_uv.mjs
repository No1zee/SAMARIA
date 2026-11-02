import * as THREE from 'three';

// Let's inspect what rotation is needed for CylinderGeometry top cap UVs
const geo = new THREE.CylinderGeometry(1, 1, 0.1, 32, 1);
geo.rotateX(Math.PI / 2);

// After rotateX(Math.PI / 2):
// We want:
// Top of coin (x = 0, y = 1, z = 0.05) -> should have uv = (0.5, 1.0) [top of image]
// Bottom of coin (x = 0, y = -1, z = 0.05) -> should have uv = (0.5, 0.0) [bottom of image]
// Left of coin (x = -1, y = 0, z = 0.05) -> should have uv = (0.0, 0.5) [left of image]
// Right of coin (x = 1, y = 0, z = 0.05) -> should have uv = (1.0, 0.5) [right of image]

const uvs = geo.attributes.uv;
const pos = geo.attributes.position;

console.log('--- Current mapping for front cap (z > 0.04) ---');
for (let i = 0; i < pos.count; i++) {
  const z = pos.getZ(i);
  if (z > 0.04) {
    const x = pos.getX(i);
    const y = pos.getY(i);
    const u = uvs.getX(i);
    const v = uvs.getY(i);
    if (Math.abs(x) < 0.01 && Math.abs(y - 1.0) < 0.01) {
      console.log(`Top (x=0, y=1): uv=(${u.toFixed(2)}, ${v.toFixed(2)})`);
    }
    if (Math.abs(x) < 0.01 && Math.abs(y + 1.0) < 0.01) {
      console.log(`Bottom (x=0, y=-1): uv=(${u.toFixed(2)}, ${v.toFixed(2)})`);
    }
    if (Math.abs(x + 1.0) < 0.01 && Math.abs(y) < 0.01) {
      console.log(`Left (x=-1, y=0): uv=(${u.toFixed(2)}, ${v.toFixed(2)})`);
    }
    if (Math.abs(x - 1.0) < 0.01 && Math.abs(y) < 0.01) {
      console.log(`Right (x=1, y=0): uv=(${u.toFixed(2)}, ${v.toFixed(2)})`);
    }
  }
}
