"use client";

import { motion, useSpring, useTransform, useMotionValue } from "framer-motion";
import { useCelestial } from "@/components/providers/CelestialProvider";
import { useRef, useEffect, useState } from "react";

const ITEMS = [
  { id: 1, label: "Infrastructure", x: 20, y: 15, mass: 1.2 },
  { id: 2, label: "Cinematic UI", x: 70, y: 25, mass: 0.8 },
  { id: 3, label: "Advisory", x: 40, y: 65, mass: 1.5 },
  { id: 4, label: "Systems", x: 80, y: 70, mass: 1.0 },
  { id: 5, label: "The Forge", x: 15, y: 80, mass: 2.0 },
];

export default function GravityOrbit() {
  const { x, y, interactionMode } = useCelestial();
  const containerRef = useRef<HTMLDivElement>(null);
  
  if (interactionMode !== "gravity") return null;

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-50 overflow-hidden"
    >
      {ITEMS.map((item) => (
        <GravityNode 
          key={item.id} 
          item={item} 
          mouseX={x} 
          mouseY={y} 
        />
      ))}
      
      {/* Visual Indicator of Gravity Well around cursor */}
      <motion.div
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
        className="w-40 h-40 border border-metallic-brass/10 rounded-full bg-metallic-brass/5 blur-xl pointer-events-none"
      />
    </div>
  );
}

function GravityNode({ item, mouseX, mouseY }: { item: any, mouseX: any, mouseY: any }) {
  const nodeX = useMotionValue(item.x * (typeof window !== 'undefined' ? window.innerWidth / 100 : 800));
  const nodeY = useMotionValue(item.y * (typeof window !== 'undefined' ? window.innerHeight / 100 : 600));

  const springConfig = { stiffness: 50, damping: 20, mass: item.mass };
  const sx = useSpring(nodeX, springConfig);
  const sy = useSpring(nodeY, springConfig);

  // Attraction Logic
  useEffect(() => {
    const interval = setInterval(() => {
      const mx = mouseX.get();
      const my = mouseY.get();
      const nx = nodeX.get();
      const ny = nodeY.get();

      const dx = mx - nx;
      const dy = my - ny;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Simple gravitational pull if within 400px
      if (dist < 400 && dist > 20) {
        const force = (400 - dist) / 50; 
        nodeX.set(nx + (dx / dist) * force);
        nodeY.set(ny + (dy / dist) * force);
      } else {
        // Drift back to home or just stay floaty
        const centerX = item.x * window.innerWidth / 100;
        const centerY = item.y * window.innerHeight / 100;
        nodeX.set(nx + (centerX - nx) * 0.01);
        nodeY.set(ny + (centerY - ny) * 0.01);
      }
    }, 16);

    return () => clearInterval(interval);
  }, [mouseX, mouseY, nodeX, nodeY, item.x, item.y]);

  return (
    <motion.div
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={1}
      style={{ x: sx, y: sy }}
      className="absolute pointer-events-auto cursor-grab active:cursor-grabbing"
    >
      <div className="px-6 py-3 border border-white/20 bg-black/60 backdrop-blur-md clip-blade-sm flex flex-col items-center">
        <div className="w-1 h-1 rounded-full bg-metallic-brass mb-2 animate-pulse" />
        <span className="text-[10px] font-ui text-off-white tracking-[0.4em] uppercase whitespace-nowrap">
          {item.label}
        </span>
      </div>
    </motion.div>
  );
}
