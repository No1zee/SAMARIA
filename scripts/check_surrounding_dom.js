const fs = require('fs');
const html = fs.readFileSync('src/templates/home.html', 'utf8');
const idx = html.indexOf('id="m-mecha-container"');
console.log(html.substring(idx - 600, idx + 400));
