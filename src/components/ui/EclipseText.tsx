"use client";

import { motion, useSpring, useTransform, useMotionTemplate } from "framer-motion";
import { useMemo, useRef, useState, useLayoutEffect } from "react";
import { useCelestial } from "@/components/providers/CelestialProvider";

interface EclipseTextProps {
  children: string;
  className?: string;
  baseColor?: string;
}

function CharacterWarp({ 
  char, 
  baseColor, 
  targetX, 
  targetY 
}: { 
  char: string; 
  baseColor: string; 
  targetX: number; 
  targetY: number 
}) {
  const { x, y, glow, lightX, lightY, starFlash } = useCelestial();

  // Shadow Offset (Points away from light source)
  const shadowX = useTransform(lightX, [0, 1], [15, -15]);
  const shadowY = useTransform(lightY, [0, 1], [20, -20]);
  const shadowBlur = useTransform(glow, [0, 0.5, 1], [2, 6, 12]);
  const shadowOpacity = useTransform(glow, [0, 1], [0.1, 0.35]);

  // Star Flash Reactivity
  const flashBrightness = useTransform(starFlash, [0, 1], [1, 2.8]);

  const celestialState = useTransform([x, y, glow], ([currentX, currentY, currentGlow]) => {
    const cx = currentX as number;
    const cy = currentY as number;
    const cg = currentGlow as number;

    const isSun = cg > 0;
    const glowColor = isSun 
      ? `rgba(201, 168, 76, ${cg * 0.95})`
      : `rgba(242, 237, 216, ${cg * 0.9})`;

    // --- 2D GRAVITATIONAL WARP ---
    const dx = targetX - cx;
    const dy = targetY - cy;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    const maxDisplacement = 45; 
    const falloffRadius = 25; 
    
    const intensity = distance < falloffRadius 
      ? maxDisplacement * Math.exp(-Math.pow(distance, 2) / (2 * Math.pow(falloffRadius/2.5, 2)))
      : 0;
    
    const angle = Math.atan2(dy, dx);
    const nudgeX = Math.cos(angle) * intensity;
    const nudgeY = Math.sin(angle) * (intensity * 0.4);

    return {
      gradient: `radial-gradient(circle at ${cx}% ${cy}vh, ${glowColor} 0%, ${baseColor} 180px)`,
      translateX: nudgeX,
      translateY: nudgeY
    };
  });

  const activeGrad = useTransform(celestialState, s => s.gradient);
  const activeX = useTransform(celestialState, s => s.translateX);
  const activeY = useTransform(celestialState, s => s.translateY);

  const springX = useSpring(activeX, { stiffness: 250, damping: 50 });
  const springY = useSpring(activeY, { stiffness: 250, damping: 50 });

  return (
    <motion.span
      style={{
        backgroundImage: activeGrad,
        backgroundClip: "text",
        WebkitBackgroundClip: "text",
        backgroundAttachment: "fixed",
        color: "transparent",
        display: "inline-block",
        x: springX,
        y: springY,
        whiteSpace: "pre",
        textShadow: useMotionTemplate`${shadowX}px ${shadowY}px ${shadowBlur}px rgba(0,0,0,${shadowOpacity})`,
        filter: useMotionTemplate`brightness(${flashBrightness})`
      }}
    >
      {char}
    </motion.span>
  );
}

export default function EclipseText({ 
  children, 
  className = "", 
  baseColor = "rgba(242, 237, 216, 0.4)" 
}: EclipseTextProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  
  // Self-Aware Position Detection
  useLayoutEffect(() => {
    const updatePosition = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        // Translate viewport pixels to vh/% relative to scroll-top
        const x = ((rect.left + rect.width/2) / window.innerWidth) * 100;
        const y = ((rect.top + rect.height/2) / window.innerHeight) * 100;
        setCoords({ x, y });
      }
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);
    return () => window.removeEventListener("resize", updatePosition);
  }, []);

  const characters = useMemo(() => children.split(""), [children]);

  return (
    <span ref={containerRef} className={className}>
      {characters.map((char, i) => (
        <CharacterWarp 
          key={i} 
          char={char} 
          baseColor={baseColor}
          targetX={coords.x}
          targetY={coords.y}
        />
      ))}
    </span>
  );
}

