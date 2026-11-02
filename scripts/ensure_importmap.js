const fs = require('fs');

let html = fs.readFileSync('src/templates/home.html', 'utf8');

// Ensure importmap exists in head
if (!html.includes('<script type="importmap">')) {
  const headEndTag = '</head>';
  const importMapScript = `<script type="importmap">
{
  "imports": {
    "three": "/assets/three.module.js",
    "three/addons/": "https://unpkg.com/three@0.160.0/examples/jsm/"
  }
}
</script>
`;
  html = html.replace(headEndTag, importMapScript + headEndTag);
  fs.writeFileSync('src/templates/home.html', html, 'utf8');
  console.log('Successfully inserted importmap into <head>');
} else {
  console.log('Importmap already present');
}
