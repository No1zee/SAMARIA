const fs = require('fs');
const html = fs.readFileSync('src/templates/home.html', 'utf8');

const idx = html.indexOf('.preloader-wrap');
while (idx !== -1) {
  // search for script around it
  const scriptIdx = html.indexOf('preloader-wrap', idx + 15);
  if (scriptIdx === -1) break;
  console.log('Match at', scriptIdx);
  console.log(html.substring(scriptIdx - 100, scriptIdx + 300));
  break;
}

// Also search for gsap animation on preloader
const matchGsap = html.indexOf('preloader');
let pos = 0;
while ((pos = html.indexOf('preloader', pos)) !== -1) {
  if (html.substring(pos - 30, pos).includes('gsap') || html.substring(pos, pos + 30).includes('to(')) {
    console.log('GSAP Preloader at', pos);
    console.log(html.substring(pos - 50, pos + 250));
  }
  pos += 9;
}
