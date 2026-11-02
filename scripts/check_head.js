const fs = require('fs');
const html = fs.readFileSync('src/templates/home.html', 'utf8');
const headEnd = html.indexOf('</head>');
console.log('</head> index:', headEnd);
console.log(html.substring(headEnd - 300, headEnd + 10));
