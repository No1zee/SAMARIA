"use client";

import { motion, useAnimationFrame } from "framer-motion";
import React, { useRef, useState, useEffect, useId, useMemo } from "react";
import { prepareWithSegments, layoutWithLines } from "@chenglou/pretext";

interface PretextSmokyProps {
  text: string;
  className?: string;
  fontSize?: number;
  fontFamily?: string;
  maxWidth?: number;
}

interface CustomCSS extends React.CSSProperties {
  [key: string]: unknown;
}

// PretextSmoky: Uses actual Pretext for accurate text geometry, then applies
// per-frame SVG turbulence displacement for a living, smoky aesthetic.
// Text is rendered naturally (no character splitting) — browser kerning stays intact.
// Pretext provides accurate bounding for the SVG filter region.
export function PretextSmoky({ 
  text, 
  className = "",
  fontSize,
  fontFamily = "'Cinzel Decorative', serif",
  maxWidth = 1000,
}: PretextSmokyProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [fontsReady, setFontsReady] = useState(false);
  const filterRef = useRef<SVGFETurbulenceElement>(null);
  const [seed, setSeed] = useState(0);
  const baseId = useId();
  const filterId = `pretext-smoke-${baseId.replace(/[^a-zA-Z0-9]/g, "")}`;

  // Wait for fonts — consistent with CinematicText
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.fonts.ready.then(() => setFontsReady(true));
  }, []);

  // Use Pretext for accurate text geometry (used for filter bounds)
  const textGeometry = useMemo(() => {
    if (!fontsReady || !fontSize) return null;
    try {
      const fontSpec = `${Math.floor(fontSize)}px ${fontFamily}`;
      const prepared = prepareWithSegments(text, fontSpec);
      const result = layoutWithLines(prepared, maxWidth, 1.2);
      const totalWidth = result.lines.reduce(
        (acc, line) => Math.max(acc, line.width),
        0
      );
      return { width: totalWidth, height: result.height, lines: result.lines };
    } catch {
      return null;
    }
  }, [text, fontSize, fontFamily, maxWidth, fontsReady]);

  useAnimationFrame((time) => {
    if (filterRef.current) {
      const freq = 0.012 + Math.sin(time / 2000) * 0.004;
      filterRef.current.setAttribute("baseFrequency", `${freq} ${freq * 1.5}`);
      // Only update seed ~6.7 times per second to avoid thrashing
      if (Math.floor(time / 150) !== Math.floor((time - 16) / 150)) {
        setSeed((s) => (s + 1) % 100);
      }
    }
  });

  return (
    <motion.span
      className={`smoky-container ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        "--smoky-width": textGeometry ? `${textGeometry.width}px` : "auto",
        "--fs": fontSize ? `${fontSize}px` : "inherit",
        "--ff": fontFamily,
        "--filter-url": `url(#${filterId})`,
      } as any}
    >
      {/* SVG filter definition — bounds informed by Pretext geometry */}
      <svg className="absolute opacity-0 pointer-events-none w-0 h-0 overflow-hidden" aria-hidden>
        <defs>
          <filter id={filterId} x="-20%" y="-40%" width="140%" height="180%">
            <feTurbulence
              ref={filterRef}
              type="turbulence"
              baseFrequency="0.015 0.03"
              numOctaves={3}
              seed={seed}
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale={isHovered ? "20" : "6"}
              xChannelSelector="R"
              yChannelSelector="G"
              result="displaced"
            />
          </filter>
        </defs>
      </svg>

      {/* The text itself — naturally kerned, filter applied as a whole */}
      <motion.span
        className="smoky-text-layer"
        style={{ fontSize: "var(--fs)", fontFamily: "var(--ff)" } as CustomCSS}
        animate={{
          opacity: isHovered ? [1, 0.85, 1] : 1,
        }}
        transition={{
          opacity: { duration: 2, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        {text}
      </motion.span>

      {/* Atmospheric ember wisps — only on hover */}
      {isHovered && (
        <span className="absolute inset-0 pointer-events-none overflow-visible" aria-hidden>
          {[...Array(6)].map((_, i) => (
            <Wisp key={i} delay={i * 0.6} />
          ))}
        </span>
      )}
    </motion.span>
  );
}

function Wisp({ delay }: { delay: number }) {
  return (
    <motion.span
      initial={{ y: "90%", x: "50%", opacity: 0, scale: 0.5 }}
      animate={{
        y: ["90%", "-120%"],
        x: ["45%", "55%", "40%", "60%", "50%"],
        opacity: [0, 0.3, 0.2, 0.4, 0],
        scale: [1, 2, 4, 6],
      }}
      transition={{
        duration: 5,
        repeat: Infinity,
        delay,
        ease: "linear",
      }}
      className="absolute top-0 left-0 w-8 h-8 rounded-full bg-brand-gold/15 blur-2xl pointer-events-none"
    />
  );
}
