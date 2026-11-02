async function check() {
  const res = await fetch('http://localhost:3000');
  const html = await res.text();
  console.log('Does served HTML contain three.min.js?', html.includes('/assets/three.min.js'));
  console.log('Does served HTML contain importmap?', html.includes('<script type="importmap">'));
  console.log("Does served HTML contain import * as THREE from 'three'?", html.includes("import * as THREE from 'three'"));
}
check();
