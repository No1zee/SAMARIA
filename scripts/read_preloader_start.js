const fs = require('fs');
const html = fs.readFileSync('src/templates/home.html', 'utf8');
console.log(html.substring(156500, 158500));
