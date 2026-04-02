"use client";

import { useRef, useEffect } from "react";
import * as THREE from "three";

/**
 * Trick 9: 3D Cel-Shaded Identity
 * A sharp, toon-shaded 3D diamond representing the "Digital Blade."
 */
export default function WarriorLogo() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const width = 120;
    const height = 120;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    let frameId: number;
    let renderer: THREE.WebGLRenderer;
    
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    } catch (e) {
      console.error("WarriorLogo: Failed to create WebGL context", e);
      return;
    }
    
    renderer.setSize(width, height);
    containerRef.current.appendChild(renderer.domElement);

    // Geometry: Stylized Diamond / Blade Tip
    const geometry = new THREE.OctahedronGeometry(1, 0);
    
    // Toon / Cel Shader
    const material = new THREE.MeshToonMaterial({
      color: 0xC5A059, // Brand Gold
      gradientMap: null, // We'll let the default toon shader handle the steps
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Lights (Necessary for Toon Shading)
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(2, 2, 2);
    scene.add(light);
    scene.add(new THREE.AmbientLight(0x404040));

    camera.position.z = 2.5;

    const animate = () => {
      mesh.rotation.y += 0.01;
      mesh.rotation.x += 0.005;
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(frameId);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} className="w-24 h-24 hover:scale-110 transition-transform cursor-pointer" />;
}
