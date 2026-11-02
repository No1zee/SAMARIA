import fs from 'fs';

let html = fs.readFileSync('src/templates/home.html', 'utf8');

// Find where the coin geometry is created
const oldGeoCode = `    const materials = [edgeMaterial, frontMaterial, backMaterial];
    const coin = new THREE.Mesh(geometry, materials);
    scene.add(coin);`;

const newGeoCode = `    // Perfect Planar UV Mapping: Guarantees 100% upright face artwork
    const pos = geometry.attributes.position;
    const uvs = geometry.attributes.uv;
    for (let i = 0; i < pos.count; i++) {
      const z = pos.getZ(i);
      const x = pos.getX(i);
      const y = pos.getY(i);
      if (z > COIN_THICKNESS * 0.2) {
        // Front face: perfectly upright
        uvs.setXY(i, (x / (2 * COIN_RADIUS)) + 0.5, (y / (2 * COIN_RADIUS)) + 0.5);
      } else if (z < -COIN_THICKNESS * 0.2) {
        // Back face: perfectly upright & un-mirrored
        uvs.setXY(i, (-x / (2 * COIN_RADIUS)) + 0.5, (y / (2 * COIN_RADIUS)) + 0.5);
      }
    }
    uvs.needsUpdate = true;

    const materials = [edgeMaterial, frontMaterial, backMaterial];
    const coin = new THREE.Mesh(geometry, materials);
    scene.add(coin);`;

if (!html.includes(oldGeoCode)) {
  console.error('Could not find oldGeoCode in home.html');
  process.exit(1);
}

html = html.replace(oldGeoCode, newGeoCode);
fs.writeFileSync('src/templates/home.html', html, 'utf8');
console.log('Successfully applied planar UV fix to home.html');
