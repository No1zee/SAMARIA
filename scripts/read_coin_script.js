const fs = require('fs');
const html = fs.readFileSync('src/templates/home.html', 'utf8');
const start = html.indexOf('<!-- Three.js Local Standalone Engine -->');
const end = html.indexOf('</script>', start + 500);
console.log(html.substring(start, end + 10));
