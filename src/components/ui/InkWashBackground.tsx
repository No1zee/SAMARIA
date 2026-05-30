"use client";

import { useRef, useEffect } from "react";
import * as THREE from "three";
import { prepareWithSegments, layoutWithLines } from "@chenglou/pretext";

/**
 * Trick 3: Interactive Sumi-e Ink Shader
 * A WebGL background that reacts to the mouse like ink diffuses in water.
 */
export default function InkWashBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    let frameId: number;
    let renderer: THREE.WebGLRenderer;
    
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    } catch (e) {
      console.error("InkWashBackground: Failed to create WebGL context", e);
      return;
    }
    
    // Case 3: Create a canvas for Pretext text rendering
    const textCanvas = document.createElement('canvas');
    const textCtx = textCanvas.getContext('2d')!;
    textCanvas.width = 1024;
    textCanvas.height = 1024;

    const renderTextToTexture = () => {
      textCtx.clearRect(0, 0, textCanvas.width, textCanvas.height);
      textCtx.fillStyle = 'white';
      
      const text = "PRECISION • DISCIPLINE • TRANSFORMATION • SPEED • HONOR • TECHNOLOGY • SPIRIT";
      const font = "900 48px Orbitron"; // Warrior UI font
      
      try {
        const prepared = prepareWithSegments(text, font);
        const { lines } = layoutWithLines(prepared, 800, 70); // Layout text with specific width and line height
        
        lines.forEach((line, i) => {
          textCtx.fillText(line.text, 50, 100 + i * 70);
        });
      } catch (e) {
        console.error("Pretext texture render failed:", e);
      }
      
      return new THREE.CanvasTexture(textCanvas);
    };

    const textTexture = renderTextToTexture();
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      uniform float uTime;
      uniform vec2 uMouse;
      uniform vec2 uResolution;
      uniform sampler2D uTextTexture;
      varying vec2 vUv;

      // Simplistic noise for ink diffusion
      float noise(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
      }

      void main() {
        vec2 st = gl_FragCoord.xy / uResolution.xy;
        float d = distance(st, uMouse);
        
        // Use Case 3: Sample the Pretext-generated text texture
        vec4 textTex = texture2D(uTextTexture, vUv);
        
        // The "Ink" color (Spirit Red / Black blend)
        vec3 colorA = vec3(0.02, 0.02, 0.03); // Ink Black
        vec3 colorB = vec3(0.85, 0.1, 0.1);  // Spirit Red
        
        float strength = smoothstep(0.4, 0.0, d + sin(uTime + st.x * 10.0) * 0.05);
        
        // Mix in the text texture with diffusion
        float textStrength = textTex.r * smoothstep(0.7, 0.2, d + cos(uTime * 0.5) * 0.1);
        vec3 finalColor = mix(colorA, colorB, (strength + textStrength) * 0.2);
        
        // Add some "grain" to look like parchment
        float n = noise(st * 100.0 + uTime * 0.01);
        finalColor += n * 0.02;

        gl_FragColor = vec4(finalColor, 1.0);
      }
    `;

    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0.5, 0.5) },
        uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
        uTextTexture: { value: textTexture }
      },
      vertexShader,
      fragmentShader
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const handleMouseMove = (e: MouseEvent) => {
      material.uniforms.uMouse.value.x = e.clientX / window.innerWidth;
      material.uniforms.uMouse.value.y = 1.0 - (e.clientY / window.innerHeight);
    };

    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      material.uniforms.uResolution.value.x = window.innerWidth;
      material.uniforms.uResolution.value.y = window.innerHeight;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    const animate = (time: number) => {
      material.uniforms.uTime.value = time * 0.001;
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      
      geometry.dispose();
      material.dispose();
      textTexture.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} className="fixed inset-0 -z-10 opacity-30 pointer-events-none" />;
}
