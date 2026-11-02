const fs = require('fs');
const html = fs.readFileSync('src/templates/home.html', 'utf8');
const idx = html.indexOf('class="embed-three');
console.log(html.substring(idx - 1000, idx));
