import fs from 'fs';
let html = fs.readFileSync('src/templates/home.html', 'utf8');
let idx = html.indexOf('const materials = [edgeMaterial');
console.log('idx:', idx);
if (idx !== -1) {
  console.log(JSON.stringify(html.substring(idx - 100, idx + 200)));
}
