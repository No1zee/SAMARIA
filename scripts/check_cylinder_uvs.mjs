import * as THREE from 'three';

const geo = new THREE.CylinderGeometry(1, 1, 0.1, 16, 1);
// Check top cap vertices (y > 0.04)
// Top cap is index group 1
console.log('Geometry groups:', geo.groups);
const uvs = geo.attributes.uv;
const pos = geo.attributes.position;

// Let's find vertices on top cap
console.log('\nTop cap sample vertices (before rotateX):');
for (let i = 0; i < pos.count; i++) {
  const y = pos.getY(i);
  if (y > 0.04) {
    const x = pos.getX(i);
    const z = pos.getZ(i);
    const u = uvs.getX(i);
    const v = uvs.getY(i);
    // Print for x = 0, z = 1, x = 1, z = 0, etc.
    if (Math.abs(x) < 0.01 || Math.abs(z) < 0.01 || Math.abs(x) > 0.95 || Math.abs(z) > 0.95) {
      console.log(`pos=(${x.toFixed(2)}, ${y.toFixed(2)}, ${z.toFixed(2)}) -> uv=(${u.toFixed(2)}, ${v.toFixed(2)})`);
    }
  }
}
