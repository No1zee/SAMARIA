const fs = require('fs');
const html = fs.readFileSync('src/templates/home.html', 'utf8');
const idx = html.indexOf("import * as THREE from 'three'");
if (idx !== -1) {
  console.log(html.substring(idx - 100, idx + 1200));
}
