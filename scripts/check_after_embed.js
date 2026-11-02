const fs = require('fs');
const html = fs.readFileSync('src/templates/home.html', 'utf8');
const idx = html.indexOf('initCoin();\n  }\n})();\n</script>');
console.log(html.substring(idx + 30, idx + 1000));
