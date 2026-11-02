const fs = require('fs');
const html = fs.readFileSync('src/templates/home.html', 'utf8');
const regex = /from\s+['"]three['"]/g;
let match;
while ((match = regex.exec(html)) !== null) {
  console.log('Match at', match.index);
  console.log(html.substring(match.index - 80, match.index + 120));
}
console.log('Total length of home.html:', html.length);
