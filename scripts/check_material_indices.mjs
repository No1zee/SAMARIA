import * as THREE from 'three';

const geo = new THREE.CylinderGeometry(1, 1, 0.1, 8, 1);
geo.rotateX(Math.PI / 2);

console.log('Groups:');
for (const g of geo.groups) {
  console.log(`materialIndex: ${g.materialIndex}, start: ${g.start}, count: ${g.count}`);
}

const pos = geo.attributes.position;
const norm = geo.attributes.normal;
for (const g of geo.groups) {
  let avgZ = 0;
  let avgNormZ = 0;
  for (let i = g.start; i < g.start + g.count; i++) {
    // using index
    const idx = geo.index.getX(i);
    avgZ += pos.getZ(idx);
    avgNormZ += norm.getZ(idx);
  }
  avgZ /= g.count;
  avgNormZ /= g.count;
  console.log(`Group materialIndex ${g.materialIndex}: avg pos.z = ${avgZ.toFixed(3)}, avg normal.z = ${avgNormZ.toFixed(3)}`);
}
