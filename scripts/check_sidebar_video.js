const fs = require('fs');
const html = fs.readFileSync('src/templates/home.html', 'utf8');

const start = html.indexOf('class="sidebar-video');
console.log(html.substring(start, start + 1200));
