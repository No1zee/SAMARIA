"use client";

import { useScroll, useSpring, MotionValue, useTransform } from "framer-motion";
import { createContext, useContext, ReactNode, useMemo } from "react";

interface CelestialContextType {
  progress: MotionValue<number>;
  x: MotionValue<number>;
  y: MotionValue<number>;
  glow: MotionValue<number>;
}

const CelestialContext = createContext<CelestialContextType | null>(null);

export function CelestialProvider({ children }: { children: ReactNode }) {
  const { scrollYProgress } = useScroll();
  
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const lerp = (input: number, inputRange: number[], outputRange: number[]) => {
    for (let i = 0; i < inputRange.length - 1; i++) {
        const start = inputRange[i];
        const end = inputRange[i + 1];
        if (input >= start && input <= end) {
            const t = (input - start) / (end - start);
            return outputRange[i] + t * (outputRange[i + 1] - outputRange[i]);
        }
    }
    return input <= inputRange[0] ? outputRange[0] : outputRange[outputRange.length - 1];
  };

  const x = useTransform(smoothProgress, (p) => {
    if (p < 0.5) return lerp(p, [0, 0.22, 0.45], [76.4, 50, 14.6]);
    if (p < 0.55) return 14.6;
    return lerp(p, [0.55, 0.77, 1], [14.6, 50, 76.4]);
  });

  const y = useTransform(smoothProgress, (p) => {
    if (p < 0.5) return lerp(p, [0, 0.22, 0.45], [40, -5, 95]);
    if (p < 0.55) return 95;
    return lerp(p, [0.55, 0.77, 1], [95, 0, 32]);
  });

  const glow = useTransform(smoothProgress, (p) => {
    if (p < 0.45) return 1 - (p / 0.45);
    if (p < 0.55) return 0;
    return Math.min(1, ((p - 0.55) / 0.45) * 5);
  });

  const value = useMemo(() => ({
    progress: smoothProgress,
    x,
    y,
    glow,
  }), [smoothProgress, x, y, glow]);

  return (
    <CelestialContext.Provider value={value}>
      {children}
    </CelestialContext.Provider>
  );
}

export function useCelestial() {
  const context = useContext(CelestialContext);
  if (!context) {
    throw new Error("useCelestial must be used within a CelestialProvider");
  }
  return context;
}
