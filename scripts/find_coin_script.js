const fs = require('fs');
const html = fs.readFileSync('src/templates/home.html', 'utf8');
const idx = html.indexOf('m-mecha-container');
console.log('m-mecha-container at index:', idx);
if (idx !== -1) {
  console.log(html.substring(idx - 200, idx + 1000));
}
