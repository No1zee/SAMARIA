// components/ui/SamuraiJackBackground.tsx
"use client";

import { useEffect, useState, useMemo } from "react";
import { motion, useTransform, MotionValue } from "framer-motion";
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
  speedMultiplier: number;
  bobOffset: number;
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

// ☁️ [PREMIUM] Authentic Ukiyo-e Cloud Designs
const CLOUD_DESIGNS = [
  { // Type 1: Imperial Kumo (Scrolled Scallop)
    viewBox: "0 0 180 80",
    layers: [
      { path: "M20 50 C20 30 45 30 45 45 C45 25 75 25 75 45 C75 20 105 20 105 45 C105 30 130 30 130 50 L130 55 C130 40 105 35 105 55 C105 35 75 40 75 55 C75 40 45 45 45 55 C45 45 20 50 20 55 Z", opacity: 0.15, offset: [2, 5] as [number, number] },
      { path: "M10 45 C10 25 35 25 35 40 C35 20 65 20 65 40 C65 15 95 15 95 40 C95 25 120 25 120 45 L120 50 C120 35 95 30 95 50 C95 30 65 35 65 50 C65 35 35 40 35 50 C35 40 10 45 10 50 Z", opacity: 1 },
      { path: "M30 40 A5 5 0 1 1 35 45 M60 38 A6 6 0 1 1 68 45 M90 40 A5 5 0 1 1 95 45", opacity: 0.3, stroke: true } // Internal scrolls
    ]
  },
  { // Type 2: Kasumi Band (Trailing Mist)
    viewBox: "0 0 240 40",
    layers: [
      { path: "M10 20 H200 C220 20 220 5 200 5 H180 M210 20 H230 C245 20 245 35 230 35 H150", opacity: 0.2, offset: [0, 4] as [number, number] },
      { path: "M0 15 H190 C210 15 210 0 190 0 H170 M200 15 H220 C235 15 235 30 220 30 H140", opacity: 1 }
    ]
  },
  { // Type 3: The Swallow Wisp (Sharp T-Scroll)
    viewBox: "0 0 140 60",
    layers: [
      { path: "M5 30 Q35 5 70 30 Q105 5 135 30 L135 32 Q105 10 70 35 Q35 10 5 35 Z M80 25 C95 20 95 40 80 40", opacity: 0.2, offset: [1, 3] as [number, number] },
      { path: "M0 25 Q30 0 65 25 Q100 0 130 25 L130 27 Q100 5 65 30 Q30 5 0 30 Z M75 20 C90 15 90 35 75 35", opacity: 1 }
    ]
  }
] as const;

interface LayerData {
  path: string;
  opacity: number;
  offset?: [number, number];
  stroke?: boolean;
}

function UkiyoCloud({ cloud, progress }: { cloud: CloudData; progress: MotionValue<number> }) {
  // Sync cloud color with transition (More vibrant gold at day, pink at twilight)
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
      animate={{ 
        y: [0, -cloud.bobOffset, 0],
      }}
      transition={{ 
        duration: 8 + cloud.bobOffset, 
        repeat: Infinity, 
        ease: "easeInOut" 
      }}
      style={{
        left: cloud.left,
        top: cloud.top,
        width: `${design.viewBox.split(" ")[2]}px`,
        scale: cloud.scale,
        opacity: cloud.opacity,
        animation: `cloud-drift ${cloud.duration} linear infinite`,
        animationDelay: cloud.delay,
        color: cloudColor as any
      }}
    >
      {design.layers.map((layer: LayerData, j) => (
        <path
          key={j}
          d={layer.path}
          fill={layer.stroke ? "none" : "currentColor"}
          stroke={layer.stroke ? "currentColor" : "none"}
          strokeWidth={layer.stroke ? "1.5" : "0"}
          opacity={layer.opacity}
          transform={layer.offset ? `translate(${layer.offset[0]}, ${layer.offset[1]})` : undefined}
          strokeLinecap="round"
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
        color: mistColor as any
      }}
    >
      <path 
        d="M0 10 H100 C150 10 150 0 200 0 H300 C350 0 350 20 400 20" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        strokeLinecap="round"
        opacity="0.6"
      />
      <path 
        d="M50 15 H150 C200 15 200 5 250 5 H350" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="1" 
        strokeLinecap="round"
        opacity="0.3"
      />
    </motion.svg>
  );
}

export default function SamuraiJackBackground() {
  const [isMounted, setIsMounted] = useState(false);
  const { x, y, progress } = useCelestial();

  // 1. POSITIONING (Synchronized)
  const celestialX = useTransform(x, (v: number) => `${v}%`);
  const celestialY = useTransform(y, (v: number) => `${v}vh`);

  // 2. ATMOSPHERE TRANSFORMATION
  const bgColor = useTransform(
    progress,
    [0, 0.4, 0.7, 1],
    ["#09090A", "#1A0F1A", "#2D162D", "#4A2511"]
  );

  const moonOpacity = useTransform(progress, [0, 0.22, 0.45], [0.8, 0.5, 0]);
  const moonScale = useTransform(progress, [0, 0.45], [1, 0.8]);
  
  const sunOpacity = useTransform(progress, [0.55, 0.77, 1], [0, 1, 1]);
  const sunScale = useTransform(progress, [0.55, 0.77, 1], [0.8, 1.2, 1.1]);

  // 3. MORPH LOGIC (Calibrated to 100% scroll)
  const morphProgress = useTransform(progress, [0.85, 1.0], [0, 1]);

  // 4. WEATHER & PARTICLES
  const starsOpacity = useTransform(progress, [0, 0.3], [0.6, 0]);
  const cloudsOpacity = useTransform(progress, [0.4, 0.6, 1], [0, 0.6, 0.4]); 
  const cloudsY = useTransform(progress, [0.4, 1], [40, 0]);

  const embersOpacity = useTransform(progress, [0, 0.4, 0.8, 1], [0.4, 0.2, 0.6, 0.3]);
  const embersColor = useTransform(
    progress,
    [0, 0.5, 1],
    ["#C42B2B", "#C9A84C", "#F2EDD8"]
  );

  // Depth Reaction
  const mountainBrightness = useTransform(progress, [0.5, 1], [1, 1.6]);
  const mountainFilter = useTransform(mountainBrightness, (v) => `brightness(${v})`);
  
  // Parallax Offsets (Increased Travel for more depth)
  const mountainBackY = useTransform(progress, [0, 1], [0, -60]);
  const mountainMidY = useTransform(progress, [0, 1], [0, -100]);
  const mountainFrontY = useTransform(progress, [0, 1], [0, -150]);

  // Mist/Haze Opacity (z-gap visibility)
  const hazeOpacity = useTransform(progress, [0.55, 0.8, 1], [0, 0.4, 0.2]);


  // 6. GLOW AURA
  const sunGlowOpacity = useTransform(progress, [0.85, 1.0], [0.2, 0]);
  const sunGlowScale = useTransform(progress, [0.85, 1.0], [1.2, 0.8]);

  const [stars, setStars] = useState<Star[]>([]);
  const [clouds, setClouds] = useState<CloudData[]>([]);
  const [mistBands, setMistBands] = useState<MistData[]>([]);
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    setIsMounted(true);
    
    // Night Stars (Static & Twinkling)
    setStars([...Array(40)].map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 80}%`,
      size: Math.random() * 2.2 + 0.5,
      twinkleDelay: `${Math.random() * 5}s`,
      twinkleDuration: `${Math.random() * 4 + 2}s`
    })));

    // [UPGRADED] Premium Cloud State
    setClouds([...Array(8)].map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 50 + 10}%`,
      scale: Math.random() * 1.5 + 1.2,
      opacity: Math.random() * 0.4 + 0.3,
      duration: `${Math.random() * 40 + 80}s`,
      delay: `${Math.random() * -120}s`,
      pathIndex: Math.floor(Math.random() * CLOUD_DESIGNS.length),
      speedMultiplier: Math.random() * 0.5 + 0.5,
      bobOffset: Math.random() * 15 + 5
    })));

    // [NEW] Dynamic Kasumi Mist Bands
    setMistBands([...Array(6)].map((_, i) => ({
      id: i,
      left: `${Math.random() * 80}%`,
      top: `${Math.random() * 30 + 55}%`, // Concentrated at bottom 45% (lower)
      width: `${Math.random() * 400 + 300}px`,
      opacity: Math.random() * 0.3 + 0.1,
      duration: `${Math.random() * 30 + 50}s`,
      delay: `${Math.random() * -60}s`
    })));

    setParticles([...Array(30)].map(() => ({
      width: `${Math.random() * 3 + 1}px`,
      height: `${Math.random() * 3 + 1}px`,
      left: `${Math.random() * 100}%`,
      opacity: Math.random() * 0.5 + 0.2,
      blur: `${Math.random() * 1.5}px`,
      duration: `${Math.random() * 10 + 15}s`,
      delay: `${Math.random() * 20}s`
    })));
  }, []);

  return (
    <motion.div 
      style={{ 
        backgroundColor: bgColor,
        opacity: isMounted ? 1 : 0 
      }}
      className="fixed inset-0 -z-10 pointer-events-none overflow-hidden select-none font-sans"
    >
      <style jsx global>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.9; }
        }
        @keyframes cloud-drift {
          from { transform: translateX(100vw); }
          to { transform: translateX(-150%); }
        }
        @keyframes mist-drift {
          from { transform: translateX(100vw); }
          to { transform: translateX(-200%); }
        }
      `}</style>
      
      {/* 1. SCATTERED STARS (z-0) */}
      <motion.svg 
        style={{ opacity: starsOpacity }}
        className="absolute inset-0 w-full h-full z-0"
      >
        <filter id="starBlur">
          <feGaussianBlur stdDeviation="0.4" />
        </filter>
        {stars.map((star, i) => (
          <circle
            key={i}
            cx={star.left}
            cy={star.top}
            r={star.size}
            fill="white"
            filter="url(#starBlur)"
            style={{
              animation: `twinkle ${star.twinkleDuration} ease-in-out infinite`,
              animationDelay: star.twinkleDelay
            }}
          />
        ))}
      </motion.svg>

      {/* 2. PREMIUM UKIYO-E CLOUDS (z-5) */}
      <motion.div 
        style={{ opacity: cloudsOpacity, y: cloudsY }}
        className="absolute inset-0 z-5"
      >
        {clouds.map((cloud) => (
          <UkiyoCloud 
            key={cloud.id} 
            cloud={cloud} 
            progress={progress}
          />
        ))}
      </motion.div>

      {/* 3. THE MOON (z-10) */}
      <motion.div 
        style={{ 
          left: celestialX,
          top: celestialY, 
          opacity: moonOpacity, 
          scale: moonScale,
          translateX: "-50%",
          translateY: "-50%"
        }}
        className="absolute w-64 h-64 flex items-center justify-center z-10"
      >
        <div className="w-32 h-32 rounded-full bg-ivory-glow/20 blur-xl absolute" />
        <div className="w-24 h-24 rounded-full bg-ivory-glow shadow-[0_0_40px_rgba(242,237,216,0.3)]" />
      </motion.div>

      {/* 4. THE SUN / SEAL (z-10) */}
      <motion.div 
        style={{ 
          left: celestialX,
          top: celestialY, 
          opacity: sunOpacity, 
          scale: sunScale,
          translateX: "-50%",
          translateY: "-50%"
        }}
        className="absolute w-[400px] h-[400px] md:w-[600px] md:h-[600px] flex items-center justify-center overflow-visible z-10"
      >
        <div className="w-full h-full relative flex items-center justify-center">
            <SamariaLogoSVG 
                progress={morphProgress} 
                className="w-full h-full drop-shadow-[0_0_50px_rgba(201,168,76,0.4)]" 
            />
            
            <motion.div 
              style={{ 
                  opacity: sunGlowOpacity,
                  scale: sunGlowScale
              }}
              className="absolute inset-0 rounded-full bg-radial from-metallic-brass/20 via-transparent to-transparent blur-3xl -z-1"
            />
        </div>
      </motion.div>

      {/* 5. DYNAMIC KASUMI MIST (z-15) - Passing in front of Clouds & Sun */}
      <motion.div 
        className="absolute inset-0 z-15"
      >
        {mistBands.map((mist) => (
          <MistBand 
            key={mist.id} 
            mist={mist} 
            progress={progress}
          />
        ))}
      </motion.div>

      {/* 5. LAYERED OBSIDIAN MOUNTAINS (z-20) */}
      <motion.div 
        style={{ filter: mountainFilter }}
        className="absolute inset-x-0 bottom-0 w-full h-[45vh] md:h-[75vh] z-20"
      >
        {/* Back Row - Farthest/Lightest Obsidian */}
        <motion.div 
            style={{ y: mountainBackY }} 
            className="absolute bottom-0 left-0 w-[140%] h-[50%] translate-x-[-20%]"
        >
          <svg viewBox="0 0 1000 300" preserveAspectRatio="none" className="w-full h-full">
            <path d="M0 300 L0 220 L150 160 L350 240 L550 140 L750 220 L900 180 L1000 240 L1000 300 Z" fill="#1A1A1D" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
          </svg>
          {/* Atmospheric Mist 1 */}
          <motion.div 
            style={{ opacity: hazeOpacity }}
            className="absolute inset-0 bg-linear-to-t from-metallic-brass/5 via-transparent to-transparent"
          />
        </motion.div>

        {/* Mid Row - Middle Ground */}
        <motion.div 
            style={{ y: mountainMidY }} 
            className="absolute bottom-0 left-0 w-[120%] h-[75%] translate-x-[-10%]"
        >
          <svg viewBox="0 0 1000 300" preserveAspectRatio="none" className="w-full h-full">
            <path d="M0 300 L0 260 L120 190 L280 260 L450 150 L650 240 L800 140 L950 250 L1000 210 L1000 300 Z" fill="#121214" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
          </svg>
          {/* Atmospheric Mist 2 */}
          <motion.div 
            style={{ opacity: hazeOpacity }}
            className="absolute inset-0 bg-linear-to-t from-[#1A0F1A]/40 via-transparent to-transparent" 
          />
        </motion.div>

        {/* Front Row - Closest/Darkest */}
        <motion.div 
            style={{ y: mountainFrontY }} 
            className="absolute bottom-0 left-0 w-full h-full"
        >
          <svg viewBox="0 0 1000 300" preserveAspectRatio="none" className="w-full h-full">
            {/* Main Peak Body */}
            <path d="M0 300 L0 270 L100 160 L240 250 L400 90 L550 210 L720 110 L880 240 L950 140 L1000 260 L1000 300 Z" fill="#080809" />
            
            {/* Rim-Light Peak Highlights (Reacts to Sun) */}
            <motion.path 
              d="M100 160 L120 180 M400 90 L430 120 M720 110 L750 140" 
              fill="none" 
              stroke="white" 
              strokeWidth="2" 
              style={{ opacity: useTransform(progress, [0.75, 1], [0, 0.4]) }}
              className="drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]"
            />
            
            {/* Front Silhouette Stroke */}
            <path d="M0 270 L100 160 L240 250 L400 90 L550 210 L720 110 L880 240 L950 140 L1000 260" fill="none" stroke="rgba(201,168,76,0.15)" strokeWidth="1" />
          </svg>
        </motion.div>
      </motion.div>

      {/* 6. TORII GATE (z-30) */}
      <svg viewBox="0 0 100 100" className="absolute bottom-[14.6%] left-[9%] w-32 h-32 text-metallic-brass opacity-25 z-30">
        <path fill="currentColor" d="M10 25h80v5H10zM25 20l5-8h40l5 8zM20 35h60v3H20zM35 30v60h5V30zM60 30v60h5V30z" />
        <path fill="currentColor" d="M15 22c5-3 15-5 35-5s30 2 35 5l-2 3c-5-2-15-4-33-4s-28 2-33 4z" />
      </svg>

      {/* 7. DIGITAL EMBERS (z-30) */}
      <div className="absolute inset-0 pointer-events-none z-30">
        {particles.map((p, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: p.width,
              height: p.height,
              left: p.left,
              bottom: `-20px`,
              backgroundColor: embersColor as any,
              opacity: embersOpacity as any,
              filter: `blur(${p.blur})`,
              animation: `ember-drift ${p.duration} linear infinite`,
              animationDelay: p.delay
            }}
          />
        ))}
      </div>

      {/* 8. GOLDEN RATIO Φ GRID (z-30) */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.10] z-30">
        <div className="absolute top-[38.2%] left-0 w-full h-px bg-metallic-brass" />
        <div className="absolute top-[61.8%] left-0 w-full h-px bg-metallic-brass" />
        <div className="absolute top-0 left-[38.2%] w-px h-full bg-metallic-brass" />
        <div className="absolute top-0 left-[61.8%] w-px h-full bg-metallic-brass" />
      </div>

    </motion.div>
  );
}
