const fs = require('fs');
const html = fs.readFileSync('src/templates/home.html', 'utf8');

const regex = /preloader/gi;
let match;
const matches = [];
while ((match = regex.exec(html)) !== null) {
  matches.push(match.index);
}
console.log('Total matches for preloader:', matches.length);
for (let idx of matches.slice(0, 5)) {
  console.log('--- At', idx);
  console.log(html.substring(idx - 50, idx + 200));
}
