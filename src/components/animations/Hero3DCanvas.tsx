"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function Hero3DCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    let renderer: THREE.WebGLRenderer | null = null;
    let frameId: number | null = null;
    let isVisible = true;

    // 1. Scene Setup
    const scene = new THREE.Scene();

    // Atmospheric fog: Royal Obsidian colour matches the page background
    // FogExp2 gives a natural exponential fall-off that sells depth very well
    scene.fog = new THREE.FogExp2(0x1a1a1b, 0.045);

    // Perspective Camera for depth
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.z = 20;

    // 2. Renderer creation with performance safety guards
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(window.innerWidth, window.innerHeight);
      containerRef.current.appendChild(renderer.domElement);
    } catch (e) {
      console.warn("WebGL not supported, falling back to 2D background", e);
      return;
    }

    // 3. Procedural Geometry: Neo-Ancient Armillary Sphere (Concentric Orbits)
    const group = new THREE.Group();
    scene.add(group);

    const brassColor = new THREE.Color("#C5A059");
    const materials: THREE.Material[] = [];
    const geometries: THREE.BufferGeometry[] = [];

    // Orbit parameters
    const ringCounts = 5;
    const ringRadii = [3.5, 4.8, 6.0, 7.2, 8.5];
    const ringSpeeds = [0.003, -0.002, 0.004, -0.001, 0.002];
    const rings: THREE.LineLoop[] = [];

    // Create concentric gold orbit rings
    for (let i = 0; i < ringCounts; i++) {
      const radius = ringRadii[i];
      const segments = 64;
      const points: THREE.Vector3[] = [];

      for (let j = 0; j <= segments; j++) {
        const theta = (j / segments) * Math.PI * 2;
        points.push(new THREE.Vector3(Math.cos(theta) * radius, Math.sin(theta) * radius, 0));
      }

      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      geometries.push(geometry);

      // Thicker lines for outer rings, semi-transparent for depth
      const material = new THREE.LineBasicMaterial({
        color: brassColor,
        transparent: true,
        opacity: 0.15 + (i * 0.05),
        blending: THREE.AdditiveBlending,
      });
      materials.push(material);

      const ring = new THREE.LineLoop(geometry, material);
      
      // Randomize initial orientations to make it sphere-like
      ring.rotation.x = Math.random() * Math.PI;
      ring.rotation.y = Math.random() * Math.PI;
      
      group.add(ring);
      rings.push(ring);
    }

    // Add some floating orbital particles (like dust or data packets)
    const particleCount = 40;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const particleSpeeds: number[] = [];

    for (let i = 0; i < particleCount; i++) {
      const r = 3 + Math.random() * 6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);

      particleSpeeds.push(0.01 + Math.random() * 0.02);
    }

    particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometries.push(particleGeometry);

    const particleMaterial = new THREE.PointsMaterial({
      color: new THREE.Color("#F6BD67"),
      size: 0.08,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });
    materials.push(particleMaterial);

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    group.add(particles);

    // 4. Interaction tracking
    // velocityX/Y give us a spring-like overshoot/settle feel
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0, vx: 0, vy: 0 };

    const handleMouseMove = (e: MouseEvent) => {
      // Normalize to -1 to 1
      mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // 5. Resize Handling
    const handleResize = () => {
      if (!renderer) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    // 6. Intersection Observer: Pause loop when section is out of viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(containerRef.current);

    // 7. Animation Loop
    const animate = () => {
      frameId = requestAnimationFrame(animate);

      // Only perform rendering if element is inside viewport
      if (!isVisible || !renderer) return;

      // Spring-damped mouse tracking for organic, heavy drag sensation
      // Using a simple spring: acceleration toward target, then damped
      const springStrength = 0.04;
      const dampening = 0.82;
      mouse.vx = (mouse.vx + (mouse.targetX - mouse.x) * springStrength) * dampening;
      mouse.vy = (mouse.vy + (mouse.targetY - mouse.y) * springStrength) * dampening;
      mouse.x += mouse.vx;
      mouse.y += mouse.vy;

      // Group rotation influenced by spring-damped mouse (parallax)
      group.rotation.y = mouse.x * 0.3;
      group.rotation.x = -mouse.y * 0.3;

      // Rotate individual rings at different speeds
      rings.forEach((ring, idx) => {
        const speed = ringSpeeds[idx];
        ring.rotation.z += speed;
        // Subtle tilt oscillation
        ring.rotation.x += Math.sin(speed * 10) * 0.001;
      });

      // Slowly spin the whole group for constant dynamic action
      group.rotation.z += 0.0015;

      renderer.render(scene, camera);
    };

    animate();

    // 8. Cleanup
    return () => {
      observer.disconnect();
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);

      if (frameId) {
        cancelAnimationFrame(frameId);
      }

      if (containerRef.current && renderer && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }

      // Dispose webgl entities to prevent memory leaks
      geometries.forEach((g) => g.dispose());
      materials.forEach((m) => m.dispose());
      if (renderer) renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0 pointer-events-none w-full h-full"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
