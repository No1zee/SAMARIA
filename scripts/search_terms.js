const fs = require('fs');
const html = fs.readFileSync('src/templates/home.html', 'utf8');

const terms = ['discipline', 'upside', 'PE', 'VC'];
for (const term of terms) {
  let idx = 0;
  let count = 0;
  while ((idx = html.toLowerCase().indexOf(term.toLowerCase(), idx)) !== -1) {
    count++;
    if (count <= 3) {
      console.log(`Term "${term}" at index ${idx}:`);
      console.log(html.substring(Math.max(0, idx - 100), Math.min(html.length, idx + 150)));
    }
    idx += term.length;
  }
  console.log(`Total occurrences of "${term}": ${count}\n`);
}
