"use client";

import React from "react";
import { motion, useTransform, useMotionTemplate } from "framer-motion";
import { useCelestial } from "@/components/providers/CelestialProvider";

interface CelestialTextProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
}

/**
 * useCelestialShadow
 * Calculates a dynamic text-shadow based on the celestial body's position.
 */
export function useCelestialShadow(intensity: number = 1) {
  const { lightX, lightY, glow, starFlash } = useCelestial();

  // Shadow Offset (Points away from light source)
  const shadowX = useTransform(lightX, [0, 1], [15 * intensity, -15 * intensity]);
  const shadowY = useTransform(lightY, [0, 1], [20 * intensity, -20 * intensity]);
  
  // Opacity & Blur based on light intensity
  const shadowBlur = useTransform(glow, [0, 1], [2 * intensity, 12 * intensity]);
  const shadowOpacity = useTransform(glow, [0, 1], [0.1 * intensity, 0.4 * intensity]);

  // Star Flash Reactivity (Briefly highlights the text)
  const flashBrightness = useTransform(starFlash, [0, 1], [1, 2]);

  const shadow = useMotionTemplate`${shadowX}px ${shadowY}px ${shadowBlur}px rgba(0,0,0,${shadowOpacity})`;
  
  return { shadow, flashBrightness };
}

export function CelestialText({ 
  children, 
  className = "", 
  intensity = 1,
  as = "span"
}: CelestialTextProps) {
  const { shadow, flashBrightness } = useCelestialShadow(intensity);
  const brightnessFilter = useMotionTemplate`brightness(${flashBrightness})`;

  const Component = motion[as as keyof typeof motion] || motion.span;

  return (
    <Component
      className={`inline-block ${className}`}
      style={{ 
        textShadow: shadow
      }}
    >
      <motion.span
        className="inline-block"
        style={{ 
          filter: brightnessFilter
        }}
      >
        {children}
      </motion.span>
    </Component>
  );
}
