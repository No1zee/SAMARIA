const fs = require('fs');
const html = fs.readFileSync('src/templates/home.html', 'utf8');

const start = html.indexOf('class="sidebar-video');
const end = html.indexOf('</div>', html.indexOf('animate();', start));
console.log(html.substring(end, end + 800));
