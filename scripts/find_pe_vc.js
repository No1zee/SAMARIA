const fs = require('fs');
const html = fs.readFileSync('src/templates/home.html', 'utf8');

const regex = /PE\s*DISCIPLINE|VC\s*UPSIDE/gi;
let match;
while ((match = regex.exec(html)) !== null) {
  console.log(`Found match "${match[0]}" at ${match.index}`);
  console.log(html.substring(Math.max(0, match.index - 200), Math.min(html.length, match.index + 300)));
  console.log('-----------------------------------------');
}
