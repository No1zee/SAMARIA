const fs = require('fs');
const html = fs.readFileSync('src/templates/home.html', 'utf8');
const mapIdx = html.indexOf('importmap');
console.log('importmap index:', mapIdx);
