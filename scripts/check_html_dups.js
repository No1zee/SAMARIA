const fs = require('fs');
const html = fs.readFileSync('src/templates/home.html', 'utf8');

const regex = /<html/gi;
let match;
while ((match = regex.exec(html)) !== null) {
  console.log('Found <html at index:', match.index);
}

const regexDoc = /<!DOCTYPE/gi;
while ((match = regexDoc.exec(html)) !== null) {
  console.log('Found <!DOCTYPE at index:', match.index);
}
console.log('Total file length:', html.length);
