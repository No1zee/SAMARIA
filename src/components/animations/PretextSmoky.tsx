import { motion, useAnimationFrame } from "framer-motion";
import React, { useRef, useState, useMemo, useEffect, useId } from "react";
import { prepareWithSegments, layoutWithLines } from "@chenglou/pretext";

interface PretextSmokyProps {
  text: string;
  className?: string;
  fontSize?: number;
  fontFamily?: string;
  maxWidth?: number;
  minWidth?: number;
}

interface LayoutCharacter {
  char: string;
  x: number;
  y: number;
  width: number;
  index: number;
}

export function PretextSmoky({ 
  text, 
  className = "", 
  fontSize = 24, 
  fontFamily = "Inter, sans-serif",
  maxWidth = 1000,
  minWidth = 120
}: PretextSmokyProps) {
  const [isHovered, setIsHovered] = useState(false);
  const filterRef = useRef<SVGFETurbulenceElement>(null);
  const [seed, setSeed] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Async mount to avoid React 19 cascading renders
    queueMicrotask(() => setMounted(true));
  }, []);

  // Pretext Layout Calculation at Character level
  const { characters, totalWidth, totalHeight } = useMemo(() => {
    if (!mounted) return { characters: [], totalWidth: 0, totalHeight: 0 };

    try {
      const fontSpec = `${fontSize}px ${fontFamily}`;
      const prepared = prepareWithSegments(text, fontSpec);
      const effectiveMaxWidth = Math.max(minWidth, maxWidth);
      const { lines, height: totalHeight, width: totalWidth } = layoutWithLines(prepared, effectiveMaxWidth, 1.2);
      
      const chars: LayoutCharacter[] = [];
      let currentY = 0;

      lines.forEach((line: { text: string; y: number }) => {
        let currentX = 0;
        line.text.split("").forEach((char: string) => {
          chars.push({
            char,
            x: currentX,
            y: line.y || currentY, 
            width: fontSize * 0.6, 
            index: chars.length
          });
          currentX += fontSize * 0.55; 
        });
        currentY += fontSize * 1.2;
      });

      return { characters: chars, totalWidth, totalHeight };
    } catch (e) {
      console.warn("Pretext advanced layout failed.", e);
      return { characters: [], totalWidth: 0, totalHeight: 0 };
    }
  }, [text, fontSize, fontFamily, maxWidth, mounted]);

  // Stabilize random values for React Purity and consistent animation durations
  // Trick 9: Pretext Character Desync
  // Using stable-random logic avoids react-hooks/purity errors during render
  const charAnimations = useMemo(() => {
    return characters.map((_, i) => {
      // Deterministic pseudo-random values based on index
      const seed = (i + 1) * 123.456;
      const getPseudoRand = (s: number) => {
        const x = Math.sin(s) * 10000;
        return x - Math.floor(x);
      };
      
      return {
        xDuration: 2 + getPseudoRand(seed),
        yDuration: 2 + getPseudoRand(seed + 1),
        rotateDuration: 3 + getPseudoRand(seed + 2)
      };
    });
  }, [characters]);

  useAnimationFrame((time) => {
    if (filterRef.current) {
      const freq = 0.012 + Math.sin(time / 1500) * 0.006;
      filterRef.current.setAttribute("baseFrequency", `${freq} ${freq * 1.5}`);
      if (Math.floor(time / 150) !== Math.floor((time - 16) / 150)) {
         setSeed(s => (s + 1) % 100);
      }
    }
  });

  const baseId = useId();
  const filterId = `pretext-smoke-${baseId.replace(/:/g, "")}`;

  return (
    <span 
      className={`relative inline-block ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ 
        isolation: 'isolate',
        minWidth: totalWidth || 'auto',
        minHeight: totalHeight || 'auto'
      }}
    >
      <svg className="absolute opacity-0 pointer-events-none" width="0" height="0">
        <filter id={filterId} x="-50%" y="-50%" width="200%" height="200%">
          <feTurbulence
            ref={filterRef}
            type="turbulence"
            baseFrequency="0.015 0.03"
            numOctaves="4"
            seed={seed}
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale={isHovered ? "28" : "10"}
            xChannelSelector="R"
            yChannelSelector="G"
          />
          <feGaussianBlur in="SourceGraphic" stdDeviation={isHovered ? "1.2" : "0.5"} result="blur" />
          <feMerge>
            <feMergeNode in="noise" />
            <feMergeNode in="blur" />
          </feMerge>
          <feComposite in="blur" in2="SourceGraphic" operator="in" />
        </filter>
      </svg>

      <span 
        className="relative z-10 block"
        style={{ 
          filter: `url(#${filterId})`,
          height: totalHeight || 'auto',
          width: totalWidth || 'auto'
        }}
      >
        {characters.map((item, i) => {
          const anim = charAnimations[i] || { xDuration: 2, yDuration: 2, rotateDuration: 3 };
          return (
            <motion.span 
              key={i}
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: 1,
                x: isHovered ? [0, Math.sin(i) * 2, 0] : 0,
                y: isHovered ? [0, Math.cos(i) * 2, 0] : 0,
                rotate: isHovered ? [0, Math.sin(i) * 5, 0] : 0
              }}
              transition={{ 
                opacity: { duration: 0.5, delay: i * 0.02 },
                x: { duration: anim.xDuration, repeat: Infinity, ease: "easeInOut" },
                y: { duration: anim.yDuration, repeat: Infinity, ease: "easeInOut" },
                rotate: { duration: anim.rotateDuration, repeat: Infinity, ease: "easeInOut" }
              }}
              className="absolute inline-block whitespace-pre"
              style={{ 
                left: item.x, 
                top: item.y,
                fontSize: fontSize,
                fontFamily: fontFamily
              }}
            >
              {item.char}
            </motion.span>
          );
        })}
        {/* Fallback for SEO and non-mounted state */}
        {!mounted && <span className="opacity-0">{text}</span>}
      </span>

      {/* Atmospheric Ember/Smoke Wisps */}
      <span className="absolute inset-0 pointer-events-none overflow-visible">
        {[...Array(12)].map((_, i) => (
          <Wisp key={i} delay={i * 0.4} active={isHovered} />
        ))}
      </span>
    </span>
  );
}

function Wisp({ delay, active }: { delay: number, active: boolean }) {
  return (
    <motion.span
      initial={{ y: "80%", x: "50%", opacity: 0, scale: 0.5 }}
      animate={active ? { 
        y: ["80%", "-140%"], 
        x: ["45%", "55%", "40%", "60%", "50%"],
        opacity: [0, 0.4, 0.2, 0.5, 0],
        scale: [1, 2, 5, 8],
      } : { opacity: 0 }}
      transition={{ 
        duration: 6, 
        repeat: Infinity, 
        delay,
        ease: "linear" 
      }}
      className="absolute top-0 left-0 w-8 h-8 rounded-full bg-brand-gold/15 blur-2xl"
    />
  );
}
