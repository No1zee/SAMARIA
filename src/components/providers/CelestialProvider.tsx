"use client";

import { useScroll, useSpring, MotionValue, useTransform, useMotionValue } from "framer-motion";
import { createContext, useContext, ReactNode, useMemo, useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export type InteractionMode = "standard" | "gravity" | "zen";

interface CelestialContextType {
  progress: MotionValue<number>;
  x: MotionValue<number>;
  y: MotionValue<number>;
  sunX: MotionValue<number>;
  sunY: MotionValue<number>;
  moonX: MotionValue<number>;
  moonY: MotionValue<number>;
  cinematicInteraction: MotionValue<number>;
  lightX: MotionValue<number>; 
  lightY: MotionValue<number>; 
  starFlash: MotionValue<number>; 
  isCinematicMode: boolean;
  setIsCinematicMode: (val: boolean) => void;
  interactionMode: InteractionMode;
  setInteractionMode: (val: InteractionMode) => void;
  skyColor: MotionValue<string>;
  zenithColor: MotionValue<string>;
  horizonColor: MotionValue<string>;
  bodyScale: MotionValue<number>;
  glow: MotionValue<number>;
  lunarProgress: MotionValue<number>;
}

const CelestialContext = createContext<CelestialContextType | null>(null);

export function CelestialProvider({ children }: { children: ReactNode }) {
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const starFlash = useSpring(0, { stiffness: 100, damping: 30 });
  
  // ── MOUSE TRACKING ENGINE ─────────────────────────────────────────────────
  // Used for interactive lighting in CinematicText (Magnetic Effects)
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("pointermove", handlePointerMove);
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [x, y]);
  
  const pathname = usePathname();
  const [isCinematicMode, setIsCinematicMode] = useState(pathname === "/start-project");
  const cinematicInteraction = useSpring(isCinematicMode ? 1 : 0, { stiffness: 40, damping: 20 });

  // Keep cinematic interaction in sync with state
  useEffect(() => {
    cinematicInteraction.set(isCinematicMode ? 1 : 0);
  }, [isCinematicMode, cinematicInteraction]);

  // Keep state in sync with URL
  useEffect(() => {
    setIsCinematicMode(pathname === "/start-project");
  }, [pathname]);

  // ── ASTRONOMICAL PATH ENGINE ──────────────────────────────────────────────
  // We use a sinusoidal arc for 'y' height to mimic a natural celestial orbit.
  // x moves mostly horizontally, while y peaks at the meridian (center-top).
  
  // ── UNIFIED ORBITAL ENGINE ────────────────────────────────────────────────
  // Both follow the same arc: 92vh (behind mountains) -> 10vh (Zenith).

  // Sun: Active during DAY (0.25 -> 0.75)
  // Rises East at 0.25, Zenith at 0.50, Sets West at 0.75
  const sunX = useTransform(smoothProgress, 
    [0, 0.08, 0.20, 0.35, 0.50, 0.65, 1.0], 
    [95, 95, 72, 50, 28, 5, 5]
  );

  const sunY = useTransform(smoothProgress, (p) => {
    if (p < 0.08 || p > 0.65) return 92;
    // Local progress 0 to 1 over the 0.08 to 0.65 phase
    const local = (p - 0.08) / 0.57;
    return 92 - Math.sin(Math.PI * local) * 82;
  });

  // Moon: Active during NIGHT (0 -> 0.25 and 0.75 -> 1.0)
  // At 0: Zenith (50), At 0.25: Sets West (15), At 0.75: Rises East (85), At 1.0: Zenith (50)
  const moonX = useTransform(smoothProgress, 
    [0, 0.05, 0.10, 0.35, 0.65, 0.70, 1.0], 
    [50, 28, 5, 5, 95, 72, 50]
  );

  const moonY = useTransform(smoothProgress, (p) => {
    // Moon is above horizon in two segments: 0 -> 0.10 and 0.65 -> 1.0
    if (p > 0.10 && p < 0.65) return 92;
    
    let local = 0;
    if (p <= 0.10) {
      // Latter half of the moon's arch (Zenith to Set)
      local = ((p + 0.10) / 0.20); // 0.5 to 1.0
    } else {
      // First half of the moon's arch (Rise to Zenith)
      local = ((p - 0.65) / 0.70); // 0.0 to 0.5
    }
    
    return 92 - Math.sin(Math.PI * local) * 82;
  });



  // Normalized coordinates for lighting (relative to screen)
  const lightX = useTransform(sunX, (v) => v / 100);
  const lightY = useTransform(sunY, (p) => p / 100);

  // ── SKY COLOR ENGINE ─────────────────────────────────────────────────────
  // Transitions smoothly through eclipse totality, night, and various dawns
  // Using high-contrast Samurai Jack palette with proximity-aware totality
  
  // 1. Time-of-Day Sky Color Cycle (Harare CAT 24h Table)
  const zenithColor = useTransform(
    smoothProgress,
    [0.0, 0.07, 0.09, 0.10, 0.20, 0.35, 0.50, 0.60, 0.65, 0.75, 1.0],
    [
      "#080B1A", // 00:00 Deep midnight navy
      "#040716", // 04:00 Velvet black-blue
      "#0D1835", // 05:15 Deep cobalt twilight
      "#1A2040", // 06:00 Indigo overhead (Sunrise)
      "#4A88CC", // 08:00 Azure blue overhead
      "#1858A2", // 12:00 Zenith blue
      "#3078BC", // 16:00 Azure overhead
      "#1E2A60", // 18:00 Indigo-violet overhead
      "#100628", // 19:00 Dark violet overhead
      "#080315", // 20:30 Deep blue-purple night
      "#080B1A"  // 24:00 Deep midnight navy
    ]
  );

  const horizonColor = useTransform(
    smoothProgress,
    [0.0, 0.07, 0.09, 0.10, 0.20, 0.35, 0.50, 0.60, 0.65, 0.75, 1.0],
    [
      "#0D1030", // 00:00 Horizon navy
      "#080C26", // 04:00 Horizon velvet
      "#1A2B50", // 05:15 Horizon bright cobalt
      "#E8853A", // 06:00 Golden-amber sunrise
      "#90C8EE", // 08:00 Horizon azure
      "#E8F0FF", // 12:00 Horizon white glare
      "#88B8EC", // 16:00 Horizon azure 
      "#D04010", // 18:00 Scarlet-gold sunset
      "#601828", // 19:00 Rose horizon glow
      "#140A1C", // 20:30 Deep blue-purple
      "#0D1030"  // 24:00 Horizon navy
    ]
  );
  
  const skyColor = zenithColor; // Alias for backward compatibility




  // ── MOON ILLUSION (ALTITUDE SCALING) ──────────────────────────────────────
  // Bodies appear ~20% larger when near the horizon
  const bodyScale = useTransform(sunY, [5, 70], [1, 1.25]);

  // ── LUNAR ECLIPSE ENGINE ────────────────────────────────────────────────
  // Peaks at 85% scroll to turn the Moon into a "Blood Moon" during the Contact section
  const lunarProgress = useTransform(smoothProgress, [0.65, 0.85, 1.0], [0, 1, 0]);

  // Glow: Intensifies when Sun is high
  const glow = useTransform(smoothProgress, (p: number) => {
    // Natural glow peaks as it rises (noon-point)
    return 1 - Math.abs(p - 0.5) * 2;
  });

  const [interactionMode, setInteractionMode] = useState<InteractionMode>("standard");

  const value = useMemo<CelestialContextType>(() => {
    if (!smoothProgress || !x || !y) return {} as CelestialContextType;

    return {
      progress: smoothProgress,
      x,
      y,
      sunX,
      sunY,
      moonX,
      moonY,
      cinematicInteraction: cinematicInteraction,
      lightX,
      lightY,
      glow,
      starFlash,
      isCinematicMode,
      setIsCinematicMode,
      interactionMode,
      setInteractionMode,
      skyColor,
      zenithColor,
      horizonColor,
      bodyScale,
      lunarProgress
    };
  }, [smoothProgress, x, y, sunX, sunY, moonX, moonY, cinematicInteraction, lightX, lightY, glow, starFlash, isCinematicMode, interactionMode, skyColor, zenithColor, horizonColor, bodyScale, lunarProgress]);

  if (!value) return <>{children}</>;

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
