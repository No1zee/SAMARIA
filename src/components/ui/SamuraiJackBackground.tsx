// components/ui/SamuraiJackBackground.tsx
"use client";

import { useEffect, useState } from "react";
import { motion, useTransform, MotionValue, useScroll, useSpring, AnimatePresence, useMotionTemplate } from "framer-motion";
import { useCelestial } from "@/components/providers/CelestialProvider";
import { SamariaLogoSVG } from "@/components/animations/SamariaLogoSVG";

interface Star {
  left: string;
  top: string;
  size: number;
  twinkleDelay: string;
  twinkleDuration: string;
}

interface CloudData {
  id: number;
  left: string;
  top: string;
  scale: number;
  opacity: number;
  duration: string;
  delay: string;
  pathIndex: number;
  bobOffset: number;
}

interface CustomCSS extends React.CSSProperties {
  [key: string]: unknown;
}

interface Particle {
  width: string;
  height: string;
  left: string;
  opacity: number;
  blur: string;
  duration: string;
  delay: string;
}

interface MistData {
  id: number;
  left: string;
  top: string;
  width: string;
  opacity: number;
  duration: string;
  delay: string;
}

const CLOUD_DESIGNS = [
  // Design 1: The Massive Cumulus Anvil (Classic Samurai Jack deep overlapping scallops)
  {
    viewBox: "0 0 900 350",
    layers: [
      {
        // Shadow silhouette (pushed down and right)
        path: "M 150 280 L 750 280 C 850 280 880 210 800 180 C 780 170 750 180 730 180 C 750 120 650 60 550 90 C 530 50 400 10 320 80 C 250 40 120 70 150 160 C 80 130 20 180 60 240 C 20 270 80 280 150 280 Z",
        opacity: 0.15, offset: [15, 20]
      },
      {
        // Core cloud body
        path: "M 150 280 L 750 280 C 850 280 880 210 800 180 C 780 170 750 180 730 180 C 750 120 650 60 550 90 C 530 50 400 10 320 80 C 250 40 120 70 150 160 C 80 130 20 180 60 240 C 20 270 80 280 150 280 Z",
        opacity: 1
      },
      {
        // Sweeping detached mist bars beneath the body
        path: "M 100 310 L 400 310 M 480 305 L 850 305 M 50 330 L 250 330 M 600 325 L 900 325",
        stroke: true, strokeWidth: 15, opacity: 0.8
      },
      {
        // Inner highlighted structural rim contours (classic Ukiyo-e detailing)
        path: "M 600 105 C 670 90 730 130 715 170 M 360 85 C 420 50 500 50 540 85 M 170 165 C 150 110 220 70 280 90 M 120 280 L 780 280",
        stroke: true, strokeWidth: 4, opacity: 0.4
      }
    ]
  },
  // Design 2: The Sweeping Kasumi (Low altitude stretching wind cloud)
  {
    viewBox: "0 0 1100 350",
    layers: [
      {
        // Shadow silhouette (pushed down and left for high altitude depth)
        path: "M 150 220 L 950 220 C 1050 220 1060 170 980 150 C 990 120 950 90 900 110 C 850 130 780 130 730 110 C 680 50 500 60 450 120 C 370 50 200 70 180 150 C 110 110 30 150 80 200 C 40 220 80 220 150 220 Z",
        opacity: 0.15, offset: [-20, 15]
      },
      {
        // Core cloud body
        path: "M 150 220 L 950 220 C 1050 220 1060 170 980 150 C 990 120 950 90 900 110 C 850 130 780 130 730 110 C 680 50 500 60 450 120 C 370 50 200 70 180 150 C 110 110 30 150 80 200 C 40 220 80 220 150 220 Z",
        opacity: 1
      },
      {
        // High-speed separated mist blocks dragging behind
        path: "M 80 250 L 500 250 M 580 260 L 1050 260 M 200 285 L 850 285",
        stroke: true, strokeWidth: 12, opacity: 0.8
      },
      {
        // Deep internal swoops acting as shadow/highlight curves
        path: "M 920 120 C 960 100 1000 150 970 190 M 480 120 C 520 80 620 70 680 100 M 230 140 C 270 90 350 90 400 130 M 120 220 L 980 220",
        stroke: true, strokeWidth: 4, opacity: 0.4
      }
    ]
  }
] as const;

interface LayerData {
  path: string;
  opacity: number;
  offset?: readonly [number, number];
  stroke?: boolean;
  strokeWidth?: number;
}

function UkiyoCloud({ cloud, progress }: { cloud: CloudData; progress: MotionValue<number> }) {
  const cloudColor = useTransform(
    progress,
    [0.4, 0.6, 0.8, 1],
    ["#D4AF37", "#CB984A", "#E5B9B9", "#D4AF37"]
  );

  const design = CLOUD_DESIGNS[cloud.pathIndex];

  return (
    <motion.svg
      viewBox={design.viewBox}
      className="absolute"
      animate={{ y: [0, -cloud.bobOffset, 0] }}
      transition={{ duration: 8 + cloud.bobOffset, repeat: Infinity, ease: "easeInOut" }}
      style={{
        left: cloud.left,
        top: cloud.top,
        width: `${design.viewBox.split(" ")[2]}px`,
        scale: cloud.scale,
        opacity: cloud.opacity,
        animation: `cloud-drift ${cloud.duration} linear infinite`,
        animationDelay: cloud.delay,
        color: cloudColor
      }}
    >
      {design.layers.map((layer: LayerData, j) => (
        <path
          key={j}
          d={layer.path}
          fill={layer.stroke ? "none" : "currentColor"}
          stroke={layer.stroke ? "currentColor" : "none"}
          strokeWidth={layer.stroke ? (layer.strokeWidth || 3) : 0}
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={layer.opacity}
          transform={layer.offset ? `translate(${layer.offset[0]}, ${layer.offset[1]})` : undefined}
        />
      ))}
    </motion.svg>
  );
}

function MistBand({ mist, progress }: { mist: MistData; progress: MotionValue<number> }) {
  const mistColor = useTransform(
    progress,
    [0.4, 0.7, 1],
    ["#D4AF37", "#E5B9B9", "#FFFFFF"]
  );

  return (
    <motion.svg
      viewBox="0 0 400 20"
      className="absolute"
      style={{
        left: mist.left,
        top: mist.top,
        width: mist.width,
        opacity: mist.opacity,
        animation: `mist-drift ${mist.duration} linear infinite`,
        animationDelay: mist.delay,
        color: mistColor
      }}
    >
      <path d="M0 10 H100 C150 10 150 0 200 0 H300 C350 0 350 20 400 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
      <path d="M50 15 H150 C200 15 200 5 250 5 H350" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.3" />
    </motion.svg>
  );
}

function ShootingStar() {
  // Removed for Tartakovsky clarity.
  return null;
}

export default function SamuraiJackBackground() {
  const [isMounted, setIsMounted] = useState(false);
  const { scrollYProgress } = useScroll();
  const { 
    progress, isCinematicMode, interactionMode,
    sunX, sunY: celestialSunY, moonX, moonY: celestialMoonY, 
    cinematicInteraction,
    skyColor, zenithColor: celestialZenith, horizonColor: celestialHorizon, bodyScale, lunarProgress
  } = useCelestial();
  
  const isZen = interactionMode === "zen";

  const zenithColor = useTransform(celestialZenith, (c) => isZen ? "#000000" : c);
  const horizonColor = useTransform(celestialHorizon, (c) => isZen ? "#05070A" : c);

  const skyBackground = useMotionTemplate`linear-gradient(to bottom, ${zenithColor}, ${horizonColor})`;
  
  const rimLightOpacity = useTransform(progress, [0.75, 1], [0, 0.4]);

  const sunXPos = useTransform(sunX, (v) => `${v}%`);
  const sunYPos = useTransform(celestialSunY, (v) => `${v}vh`);
  const moonXPos = useTransform(moonX, (v) => `${v}%`);
  const moonYPos = useTransform(celestialMoonY, (v) => `${v + 15}vh`);

  // Consolidated high-performance spring for celestial weighting
  const mouseXValue = useSpring(0, { stiffness: 40, damping: 25 });
  const mouseYValue = useSpring(0, { stiffness: 40, damping: 25 });

  // 2. ATMOSPHERE TRANSFORMATION
  // We now use the unified vertical linear gradient from the provider

  // ── VISIBILITY ENGINE ─────────────────────────────────────────────────────
  // Moon: visible at NIGHT (0-25% and 75-100%), hidden during DAY
  const moonOpacity = useTransform(progress, (p) => {
    if (isZen) return 0.2; // Dim in Zen mode
    if (p < 0.05) return 0.9;                      // Deep Night
    if (p < 0.12) return 0.9 * (1 - (p-0.05)/0.07); // Morning fade-out
    if (p < 0.60) return 0;                        // High Day
    if (p < 0.75) return 0.9 * ((p-0.60)/0.15);    // Evening rise
    return 0.9;                                    // Blood Moon Night
  });

  const moonGlowColor = useTransform(
    lunarProgress,
    (lunar) => {
      if (lunar > 0.1) return `rgba(139, 0, 0, ${0.4 * lunar})`;
      return `rgba(242, 237, 216, 0.4)`;
    }
  );

  const moonColor = useTransform(
    lunarProgress,
    (lunar) => {
      const baseColor = "#F2EDD8";
      if (lunar > 0.1) return interpolateHex(baseColor, "#8B0000", lunar);
      return baseColor;
    }
  );

  const craterOpacity = useTransform(
    lunarProgress,
    (lunar) => {
      if (lunar > 0.1) return 0.1 * (1 - lunar); 
      return 0.15;
    }
  );

  // Helper for Blood Moon blending
  function interpolateHex(hex1: string, hex2: string, weight: number) {
    const parse = (h: string) => h.replace("#", "").match(/.{2}/g)?.map(x => parseInt(x, 16)) || [0,0,0];
    const [r1, g1, b1] = parse(hex1);
    const [r2, g2, b2] = parse(hex2);
    const r = Math.round(r1 * (1-weight) + r2 * weight);
    const g = Math.round(g1 * (1-weight) + g2 * weight);
    const b = Math.round(b1 * (1-weight) + b2 * weight);
    return `#${[r, g, b].map(x => x.toString(16).padStart(2, "0")).join("")}`;
  }
  // Sun: hidden at night, rises at dawn, sets at dusk
  const sunOpacity = useTransform(progress, (p) => {
    if (isZen) return 0.1; // Dim in Zen mode
    if (p < 0.05) return 0;                        // Night
    if (p < 0.15) return (p - 0.05) / 0.10;       // Sunrise
    if (p < 0.60) return 1;                        // Full Day
    if (p < 0.75) return 1 - (p - 0.60) / 0.15;   // Sunset
    return 0;                                      // Night
  });

  const sunScale = bodyScale;
  const moonScale = bodyScale;

  const morphProgress = useTransform(
    [progress, cinematicInteraction] as [MotionValue<number>, MotionValue<number>],
    (latest: number[]) => {
      const [p, i] = latest;
      return (i > 0 ? 1 : (p > 0.85 ? (p - 0.85) / 0.15 : 0));
    }
  );

  // Stars: visible during BOTH night phases (start and end of scroll)
  const starsOpacity = useTransform(
    progress,
    [0, 0.05, 0.12, 0.65, 0.75, 1.0],
    [0.85, 0.85, 0, 0, 0.85, 0.85]
  );
  const cloudsOpacity = useTransform(
    [progress, cinematicInteraction] as [MotionValue<number>, MotionValue<number>],
    (latest: any) => {
      if (isZen) return 0.05; // Almost invisible in Zen mode
      const p = latest[0];
      const i = latest[1];
      const natural = p > 0.4 ? (p < 0.6 ? 0.6 : 0.4) : 0;
      return i > 0.5 ? natural * (1 - (i - 0.5) * 2) : natural;
    }
  );
  const cloudsY = useTransform(progress, [0.4, 1], [40, 0]);

  const embersOpacity = useTransform(
    [progress, cinematicInteraction] as [MotionValue<number>, MotionValue<number>],
    (latest: any) => {
      const p = latest[0];
      const i = latest[1];
      const natural = p < 0.4 ? 0.4 : p > 0.8 ? 0.6 : 0.3;
      return i > 0.5 ? natural * (1 - (i - 0.5) * 1.5) : natural;
    }
  );
  const embersColor = useTransform(progress, [0, 0.5, 1], ["#C42B2B", "#C9A84C", "#F2EDD8"]);

  const mountainBrightness = useTransform(progress, [0.5, 1], [1, 1.6]);
  const mountainFilter = useTransform(
    mountainBrightness, 
    (brightness) => `brightness(${brightness})`
  );

  const mountainBackY = useTransform(progress, [0, 1], [0, -60]);
  const mountainMidY = useTransform(progress, [0, 1], [0, -100]);
  const mountainFrontY = useTransform(progress, [0, 1], [0, -150]);

  const hazeOpacity = useTransform(progress, [0.55, 0.8, 1], [0, 0.4, 0.2]);

  const starsParallaxX = useTransform(scrollYProgress, [0, 1], ["-15px", "15px"]);
  const starsParallaxY = useTransform(scrollYProgress, [0, 1], ["-10vh", "10vh"]);

  const mouseX = mouseXValue;
  const mouseY = mouseYValue;

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const moveX = (clientX / window.innerWidth - 0.5) * 35;
      const moveY = (clientY / window.innerHeight - 0.5) * 35;
      mouseXValue.set(moveX);
      mouseYValue.set(moveY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseXValue, mouseYValue]);

  const [stars, setStars] = useState<Star[]>([]);
  const [clouds, setClouds] = useState<CloudData[]>([]);
  const [mistBands, setMistBands] = useState<MistData[]>([]);
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    queueMicrotask(() => {
      setIsMounted(true);
      
      // We are forcing 3 massive, monolithic cloud structures
      setClouds([
        {
          id: 0, left: "-20%", top: "45%", scale: 2.5, opacity: 0.85,
          duration: "160s", delay: "0s", pathIndex: 0, bobOffset: 8
        },
        {
          id: 1, left: "40%", top: "30%", scale: 3.5, opacity: 0.7,
          duration: "240s", delay: "-40s", pathIndex: 1, bobOffset: 12
        },
        {
          id: 2, left: "10%", top: "60%", scale: 1.8, opacity: 0.6,
          duration: "120s", delay: "-80s", pathIndex: 0, bobOffset: 5
        }
      ]);
      
      // Few, stark mist bands
      setMistBands([...Array(3)].map((_, i) => ({
        id: i, left: `${Math.random() * 80}%`, top: `${Math.random() * 10 + 60}%`,
        width: `${Math.random() * 800 + 400}px`, opacity: Math.random() * 0.2 + 0.1,
        duration: `${Math.random() * 60 + 80}s`, delay: `${Math.random() * -60}s`
      })));
      setParticles([]); // No floating particles
      setStars([]); // Minimalist sky
    });
  }, []);

  return (
    <motion.div 
      style={{ background: skyBackground, opacity: isMounted ? 1 : 0 }}
      className={`fixed inset-0 -z-10 pointer-events-none overflow-hidden select-none font-sans transition-colors duration-1000 ${isCinematicMode ? "cinematic-mode" : ""}`}
    >
      <style jsx global>{`
        @keyframes twinkle { 0%, 100% { opacity: 0.3; transform: scale(1); } 50% { opacity: 1; transform: scale(1.2); } }
        .star-twinkle { animation: twinkle var(--twinkle-duration) ease-in-out infinite; }
        @keyframes cloud-drift { from { transform: translateX(100vw); } to { transform: translateX(-150%); } }
        @keyframes mist-drift { from { transform: translateX(100vw); } to { transform: translateX(-200%); } }
      `}</style>
      
      {/* 1. SCATTERED STARS */}
      <motion.div style={{ opacity: starsOpacity as any, translateX: starsParallaxX as any, translateY: starsParallaxY as any } as any} className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        <svg className="w-full h-full">
          <filter id="starBlur"><feGaussianBlur stdDeviation="0.4" /></filter>
          {stars.map((star, i) => (
            <circle
              key={i}
              cx={star.left}
              cy={star.top}
              r={star.size}
              fill="white"
              filter="url(#starBlur)"
              className="star-twinkle"
              style={{
                "--twinkle-duration": star.twinkleDuration,
                "--twinkle-delay": star.twinkleDelay,
              } as any}
            />
          ))}
        </svg>
        <ShootingStar />
      </motion.div>

      <motion.div style={{ opacity: cloudsOpacity as any, y: cloudsY as any } as any} className="absolute inset-0 z-0">
        {clouds.map((cloud) => ( <UkiyoCloud key={cloud.id} cloud={cloud} progress={progress} /> ))}
      </motion.div>

      {/* 3. THE MOON (Tartakovsky Vector Art) */}
       <motion.div 
        style={{ 
          left: moonXPos as any, 
          top: moonYPos as any, 
          opacity: moonOpacity as any, 
          scale: moonScale as any,
          translateX: mouseXValue as any, 
          translateY: mouseYValue as any,
          x: "-50%", 
          y: "-50%",
          zIndex: 10 
        } as any}
        className="absolute w-[80px] h-[80px] md:w-[120px] md:h-[120px] flex items-center justify-center pointer-events-none"
      >
        <motion.div 
          style={{ backgroundColor: moonColor as any }}
          className="w-[85%] h-[85%] rounded-full relative overflow-hidden"
        >
          {/* Tartakovsky Styled Lunar Mare (Abstract jagged shapes) */}
          <motion.svg viewBox="0 0 200 200" style={{ opacity: craterOpacity as any }} className="absolute w-full h-full text-black">
             <path d="M 40,60 Q 70,20 120,40 Q 150,20 160,70 Q 120,100 80,120 Q 30,100 40,60 Z" fill="currentColor" />
             <path d="M 110,140 Q 150,110 170,140 Q 150,180 120,170 Q 90,150 110,140 Z" fill="currentColor" />
             <path d="M 30,110 Q 60,90 70,130 Q 50,160 30,140 Z" fill="currentColor" />
             <circle cx="140" cy="90" r="14" fill="currentColor" />
             <circle cx="75" cy="155" r="9" fill="currentColor" />
          </motion.svg>
          
          {/* Stylized Flat Crescent Shadow Arc */}
          <div className="absolute inset-0 rounded-full border-12 border-black opacity-15 translate-x-[18px] translate-y-[6px] pointer-events-none" />
        </motion.div>
      </motion.div>

      {/* 4. THE SUN / SEAL (z-35) */}
      <motion.div 
        style={{ 
          left: sunXPos as any, 
          top: sunYPos as any, 
          opacity: sunOpacity as any, 
          scale: sunScale as any,
          translateX: mouseX as any, 
          translateY: mouseY as any,
          x: "-50%", 
          y: "-50%",
          zIndex: 10
        } as any}
        className="absolute w-[90px] h-[90px] md:w-[140px] md:h-[140px] flex items-center justify-center overflow-visible pointer-events-none"
      >
        <div className="w-full h-full relative flex items-center justify-center">
            <motion.div 
              style={{ opacity: sunOpacity as any }}
              className="absolute inset-[0%] z-0 flex items-center justify-center"
            >
              <svg viewBox="0 0 200 200" className="w-[180%] h-[180%] absolute opacity-100">
                 <g className="animate-[spin_120s_linear_infinite] origin-center">
                   {/* 12 Major Sun Rays (Thick, majestic, extending far outward) */}
                   {Array.from({ length: 12 }).map((_, i) => (
                     <g key={`major-ray-${i}`} transform={`rotate(${i * 30} 100 100)`}>
                        <polygon points="96,48 104,48 101,15 99,15" fill="#FFE270" opacity="0.7" />
                     </g>
                   ))}
                   {/* 12 Minor Sun Rays (Accents in deeper gold, slightly shorter and narrower) */}
                   {Array.from({ length: 12 }).map((_, i) => (
                     <g key={`minor-ray-${i}`} transform={`rotate(${i * 30 + 15} 100 100)`}>
                        <polygon points="98,48 102,48 100.5,25 99.5,25" fill="#E8A317" opacity="0.5" />
                     </g>
                   ))}
                 </g>
                 
                 {/* Solid Multi-Ring Core */}
                 <circle cx="100" cy="100" r="50" fill="#FFE270" />
                 <circle cx="100" cy="100" r="40" fill="#E8A317" />
                 <circle cx="100" cy="100" r="28" fill="#FFE270" />
              </svg>
            </motion.div>

            <SamariaLogoSVG 
              progress={cinematicInteraction as any} 
              className="w-full h-full drop-shadow-[0_0_15px_rgba(201,168,76,0.8)] relative z-10" 
            />
            
            <AnimatePresence>
              {isCinematicMode && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0, rotate: -45 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{ delay: 0.2, duration: 1.2, ease: "circOut" }}
                  style={{ opacity: 0.9 } as any}
                  className="absolute top-[-5%] right-[-5%] w-32 h-32 z-50 pointer-events-none"
                >
                  <div className="absolute inset-0 bg-radial from-white via-ivory-glow/40 to-transparent blur-xl" />
                  <div className="absolute inset-[42%] bg-white rounded-full shadow-[0_0_20px_white]" />
                  <div className="absolute top-1/2 left-0 w-full h-px bg-linear-to-r from-transparent via-white to-transparent scale-x-150 rotate-45" />
                  <div className="absolute top-1/2 left-0 w-full h-px bg-linear-to-r from-transparent via-white to-transparent scale-x-150 -rotate-45" />
                </motion.div>
              )}
            </AnimatePresence>
        </div>
      </motion.div>

      <motion.div className="absolute inset-0 z-10">
        {mistBands.map((mist) => ( <MistBand key={mist.id} mist={mist} progress={progress} /> ))}
      </motion.div>

      {/* 5. LAYERED OBSIDIAN MOUNTAINS */}
      <motion.div style={{ filter: mountainFilter as any }} className="absolute inset-x-0 bottom-0 w-full h-[38.2vh] z-20 pointer-events-none">
        
        <motion.div style={{ y: mountainBackY }} className="absolute inset-x-0 bottom-[-600px] w-[140%] h-[calc(100%+600px)] translate-x-[-20%]">
          <svg viewBox="0 0 1000 1200" preserveAspectRatio="none" className="w-full h-full">
            <path d="M0 1200 L0 220 L150 160 L350 240 L550 140 L750 220 L900 180 L1000 240 L1000 1200 Z" fill="#2E1C33" stroke="#1A0F1A" strokeWidth="2" />
          </svg>
          <motion.div style={{ opacity: hazeOpacity as any }} className="absolute inset-0 bg-linear-to-t from-metallic-brass/10 via-transparent to-transparent" />
        </motion.div>

        <motion.div style={{ y: mountainMidY }} className="absolute inset-x-0 bottom-[-600px] w-[120%] h-[calc(100%+600px)] translate-x-[-10%]">
          <svg viewBox="0 0 1000 1200" preserveAspectRatio="none" className="w-full h-full">
            <path d="M0 1200 L0 260 L120 190 L280 260 L450 150 L650 240 L800 140 L950 250 L1000 210 L1000 1200 Z" fill="#1C1021" stroke="#09050A" strokeWidth="2" />
          </svg>
          <motion.div style={{ opacity: hazeOpacity as any }} className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent" />
        </motion.div>

        <motion.div style={{ y: mountainFrontY }} className="absolute inset-x-0 bottom-[-600px] w-full h-[calc(100%+600px)]">
          <svg viewBox="0 0 1000 1200" preserveAspectRatio="none" className="w-full h-full">
            <path d="M0 1200 L0 270 L100 160 L240 250 L400 90 L550 210 L720 110 L880 240 L950 140 L1000 260 L1000 1200 Z" fill="#040205" />
            <motion.path d="M100 160 L120 180 M400 120 L430 150 M720 110 L750 140" fill="none" stroke="white" strokeWidth="3" style={{ opacity: rimLightOpacity as any }} />
            <path d="M0 270 L100 160 L240 250 L400 90 L550 210 L720 110 L880 240 L950 140 L1000 260" fill="none" stroke="rgba(201,168,76,0.3)" strokeWidth="2" />
          </svg>
        </motion.div>
      </motion.div>

      {/* Digital Atmosphere (Optional overlays could go here) */}

      {/* 7. DIGITAL EMBERS */}
      <div className="absolute inset-0 pointer-events-none z-30">
        {particles.map((p: Particle, i: number) => (
          <motion.div key={i} className="absolute rounded-full" style={{ width: p.width, height: p.height, left: p.left, bottom: `-20px`, backgroundColor: (embersColor as unknown) as string, opacity: (embersOpacity as unknown) as number, filter: `blur(${p.blur})`, animation: `ember-drift ${p.duration} linear infinite`, animationDelay: p.delay }} />
        ))}
      </div>
    </motion.div>
  );
}
