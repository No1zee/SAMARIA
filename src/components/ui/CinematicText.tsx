"use client";

import { motion, useTransform } from "framer-motion";
import { useMemo, useRef, useState, useEffect } from "react";
import { useCelestial } from "@/components/providers/CelestialProvider";
import { prepareWithSegments, layoutWithLines } from "@chenglou/pretext";
import { useAdaptive } from "@/components/providers/AdaptiveProvider";

interface CinematicTextProps {
  children: string;
  className?: string;
  baseColor?: string;
  maxWidth?: number;
  fontSize?: number;
  fontFamily?: string;
  intensity?: number;
  horizontalAlign?: "left" | "center" | "right";
  letterSpacing?: number;
  lineHeight?: number;
  maxLines?: number;
}

interface CustomCSS extends React.CSSProperties {
  [key: string]: unknown;
}

interface LayoutLine {
  text: string;
  width: number;
  x: number;
  y: number;
  index: number;
}

/**
 * CinematicText
 * Performance Optimized Version of the scroll-aware text component.
 * 1. Offloads celestial gradient and shadow calculations to CSS Variables.
 * 2. Simplifies SVG filters for lower GPU cost.
 * 3. Optimized line-breaking via Pretext (Canvas-based).
 */
export default function CinematicText({
  children,
  className = "",
  baseColor = "rgba(242, 237, 216, 0.85)",
  maxWidth = 1500,
  fontSize = 128,
  fontFamily = "'Cinzel Decorative', serif",
  intensity = 1,
  horizontalAlign = "left",
  letterSpacing = 0,
  lineHeight = 1.15,
  maxLines,
}: CinematicTextProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const [fontsReady, setFontsReady] = useState(false);

  // Celestial context — scroll-driven light source
  const { sunX, sunY, lightX, lightY, glow, starFlash } = useCelestial();

  // Wait for fonts to load before doing any Canvas measurement
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.fonts.ready.then(() => setFontsReady(true));
  }, []);

  // ── Pretext Layout ──────────────────────────────────────────────────────────
  const preparedBlocks = useMemo(() => {
    if (!fontsReady) return null;
    try {
      const fontSpec = `${Math.floor(fontSize)}px ${fontFamily}`;
      const rawBlocks = children.split("\n");
      return rawBlocks.map((block) => ({
        text: block,
        prepared: prepareWithSegments(block, fontSpec),
      }));
    } catch (e) {
      console.error("[CinematicText] Prepare failed:", e);
      return null;
    }
  }, [children, fontSize, fontFamily, fontsReady]);

  const layoutInfo = useMemo(() => {
    if (!preparedBlocks || maxWidth <= 0) {
      return { lines: [] as LayoutLine[], totalWidth: 0, totalHeight: 0 };
    }

    try {
      const trackingPx = letterSpacing || 0;
      const computedLineHeight = fontSize * lineHeight;
      const allLines: { text: string; width: number }[] = [];

      for (const block of preparedBlocks) {
        const blockText = block.text;
        const blockMeasure = block.prepared;

        if (maxLines === 1) {
          const blockResult = layoutWithLines(blockMeasure, 10000, lineHeight);
          allLines.push({ text: blockText, width: blockResult.lines.reduce((acc, l) => acc + l.width, 0) });
        } else {
          const pretextWidthValue = (maxWidth * 0.92 - 4) - (blockText.length - 1) * trackingPx;
          const blockResult = layoutWithLines(blockMeasure, Math.max(1, pretextWidthValue), lineHeight);
          
          // Re-assemble lines to ensure no words are cut in half.
          // If a line does not end with space/hyphen and next doesn't start with space, they might be split.
          // Alternatively, we can inspect blockResult.lines and merge any split words.
          const processedLines: { text: string; width: number }[] = [];
          for (let i = 0; i < blockResult.lines.length; i++) {
            const line = blockResult.lines[i];
            if (i > 0 && processedLines.length > 0) {
              const prevLine = processedLines[processedLines.length - 1];
              // If previous line does not end with space/hyphen/punctuation, and current line doesn't start with space/hyphen/punctuation,
              // or if the text was split mid-word, merge the first word of current line back into the previous line.
              const prevText = prevLine.text;
              const currText = line.text;
              
              const prevEndsWithAlphanum = /[a-zA-Z0-9]$/.test(prevText);
              const currStartsWithAlphanum = /^[a-zA-Z0-9]/.test(currText);
              
              if (prevEndsWithAlphanum && currStartsWithAlphanum) {
                // Find the first word of current line to merge it back
                const match = currText.match(/^([a-zA-Z0-9]+)/);
                if (match) {
                  const firstWord = match[1];
                  prevLine.text += firstWord;
                  // recalculate width roughly or treat as same
                  prevLine.width += (firstWord.length * (fontSize * 0.5));
                  line.text = currText.slice(firstWord.length);
                }
              }
            }
            if (line.text.trim().length > 0) {
              processedLines.push({ text: line.text, width: line.width });
            }
          }
          
          allLines.push(...processedLines);
        }
      }

      // Constrain lines by maxLines if present
      const finalLines = maxLines ? allLines.slice(0, maxLines) : allLines;

      const totalWidth = finalLines.reduce((acc, line) => Math.max(acc, line.width), 0);
      const totalHeight = finalLines.length * computedLineHeight;

      const lines: LayoutLine[] = finalLines.map((line, idx) => {
        let startX = 0;
        if (horizontalAlign === "center") startX = Math.max(0, (totalWidth - line.width) / 2);
        else if (horizontalAlign === "right") startX = Math.max(0, totalWidth - line.width);

        return {
          text: line.text,
          width: line.width,
          x: startX,
          y: idx * computedLineHeight,
          index: idx,
        };
      });

      return { lines, totalWidth, totalHeight };
    } catch (e) {
      console.error("[CinematicText] Layout failed:", e);
      return { lines: [] as LayoutLine[], totalWidth: 0, totalHeight: 0 };
    }
  }, [preparedBlocks, fontSize, maxWidth, horizontalAlign, letterSpacing, lineHeight, maxLines]);

  const { mode } = useAdaptive();

  // ── Celestial State (CSS Variable Sync) ─────────────────────────────────────
  const celestialX = useTransform(sunX, (v) => `${v}%`);
  const celestialYCss = useTransform(sunY, (v) => `${v}vh`);

  const isCinematic = mode === "CINEMATIC";
  
  const glowColorVal = useTransform(glow, (g: number) => {
    const cg = g as number;
    const baseOpacity = isCinematic ? 0.85 : 0.95;
    return cg > 0.35 
      ? `rgba(201, 168, 76, ${Math.min(1, cg * baseOpacity * intensity)})`
      : `rgba(242, 237, 216, ${Math.max(0.5, Math.min(1, cg * 0.6 * intensity))})`; 
  });
  const flashVal = useTransform(starFlash, [0, 1], [1, 1.8]);

  // ── RESPONSIVE SCALING ENGINE ─────────────────────────────────────────────
  const [contentScale, setContentScale] = useState(1);
  const [measuredParentWidth, setMeasuredParentWidth] = useState(maxWidth);

  useEffect(() => {
    if (typeof window === "undefined") return;
    
    // Strict ResizeObserver bound to parent, not raw window.innerWidth
    const parent = containerRef.current?.parentElement || document.body;
    
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const width = entry.contentRect.width;
        if (width > 0 && width !== measuredParentWidth) {
           setMeasuredParentWidth(Math.min(maxWidth, width)); // Never exceed max
           setContentScale(Math.min(1, width / (maxWidth + 60)));
        }
      }
    });

    ro.observe(parent);
    
    // Fallback initial
    setMeasuredParentWidth(Math.min(maxWidth, window.innerWidth));
    setContentScale(Math.min(1, window.innerWidth / (maxWidth + 60)));
    
    return () => ro.disconnect();
  }, [maxWidth]);

  const containerStyle = useMemo(() => {
    if (!fontsReady || layoutInfo.totalWidth === 0) {
      return { opacity: 0, minHeight: `${fontSize * lineHeight}px` };
    }
    const trackingExtra = letterSpacing > 0 ? children.length * letterSpacing : 0;
    const finalWidth = layoutInfo.totalWidth + trackingExtra + 4;
    return {
      width: finalWidth,
      maxWidth: "100%",
      height: (layoutInfo.totalHeight + fontSize * 0.1) * contentScale,
      minHeight: (layoutInfo.totalHeight + fontSize * 0.1) * contentScale,
      whiteSpace: maxLines === 1 ? "nowrap" : "normal",
      textWrap: maxLines === 1 ? "nowrap" : "balance",
    } as React.CSSProperties;
  }, [fontsReady, layoutInfo, fontSize, lineHeight, letterSpacing, children.length, maxLines, contentScale]);

  return (
    <motion.span 
      ref={containerRef} 
      className={`cinematic-container isolate ${className} ${maxLines === 1 ? "whitespace-nowrap" : ""}`} 
      style={{ 
        ...containerStyle, 
        scale: contentScale,
        transformOrigin: horizontalAlign === "center" ? "center top" : "left top",
        "--cx": celestialX,
        "--cy": celestialYCss,
        "--glow-color": glowColorVal,
        "--flash": flashVal,
        "--shadow-x": useTransform(lightX, [0, 1], [`${6 * intensity}px`, `${-6 * intensity}px`]),
        "--shadow-y": useTransform(lightY, [0, 1], [`${8 * intensity}px`, `${-8 * intensity}px`]),
        "--shadow-blur": useTransform(glow, [0, 0.5, 1], ["1px", "4px", "8px"]),
        "--shadow-opacity": useTransform(glow, [0, 1], [0.05, 0.2]),
        "--fs": `${fontSize}px`,
        "--ff": fontFamily,
        "--ls": letterSpacing ? `${letterSpacing}px` : "normal",
        "--lh": lineHeight,
        "--base-color": baseColor,
      } as unknown as CustomCSS}
    >
      {!fontsReady && <span className="opacity-0 whitespace-pre">{children}</span>}

      {/* SVG Filter removed for Tartakovsky graphic crispness & High Performance */}

      {fontsReady && layoutInfo.lines.length > 0 && (
        <span className="cinematic-base-text">
          {layoutInfo.lines.map((line, i) => (
            <CinematicLine
              key={i}
              text={line.text}
              lineIndex={i}
              totalLines={layoutInfo.lines.length}
              intensity={intensity}
              mode={mode}
              fontSize={fontSize}
              lineHeight={lineHeight}
            />
          ))}
        </span>
      )}

      {fontsReady && layoutInfo.lines.length === 0 && (
        <span className="cinematic-base-text">
          {children}
        </span>
      )}
    </motion.span>
  );
}

function CinematicLine({
  text,
  lineIndex,
  totalLines,
  intensity,
  mode,
  fontSize,
  lineHeight
}: {
  text: string;
  lineIndex: number;
  totalLines: number;
  intensity: number;
  mode: string;
  fontSize: number;
  lineHeight: number;
}) {
  const { sunY: celestialY, glow } = useCelestial();
  const lineRef = useRef<HTMLSpanElement>(null);
  
  const isCinematic = mode === "CINEMATIC";

  const lineNorm = totalLines > 1 ? (lineIndex / (totalLines - 1)) * 2 - 1 : 0;
  
  const magneticEffects = useTransform(celestialY, (cy) => {
    if (!isCinematic) return { x: 0, scale: 1, rotate: 0 };
    
    const lineYPos = lineIndex * fontSize * lineHeight;
    const vh = typeof window !== 'undefined' ? window.innerHeight : 1000;
    const bodyYPos = (cy / 100) * vh; 
    
    const distY = Math.abs(lineYPos - bodyYPos);
    const threshold = 300; 
    
    if (distY < threshold) {
      const force = Math.pow(1 - distY / threshold, 2);
      return {
        x: lineNorm * 12 * force * intensity, 
        scale: 1 + (0.04 * force * intensity),
        rotate: lineNorm * 1.5 * force * intensity,
      };
    }
    
    return { x: 0, scale: 1, rotate: 0 };
  });

  const parallaxY = useTransform(celestialY, (cy) => {
    const base = lineNorm * (cy / 100 - 0.5) * 3 * intensity;
    return isCinematic ? base : 0;
  });

  const lineOpacity = useTransform(glow, (g: number) => {
    if (!isCinematic) return 1;
    // Starker Tartakovsky opacity curves
    const base = 0.95 + g * 0.05;
    return Math.min(1, base + Math.abs(lineNorm) * g * 0.05 * intensity);
  });

  return (
    <motion.span 
      ref={lineRef}
      className="block whitespace-nowrap! origin-center relative drop-shadow-[0px_4px_0px_rgba(0,0,0,0.85)] z-10" 
      style={{ 
        y: parallaxY, 
        opacity: lineOpacity,
        x: useTransform(magneticEffects, m => m.x),
        scale: useTransform(magneticEffects, m => m.scale),
        rotate: useTransform(magneticEffects, m => m.rotate),
        textShadow: isCinematic ? "var(--shadow-x) var(--shadow-y) 0px rgba(0,0,0,0.4)" : "none"
      } as unknown as CustomCSS}
    >
      {text}
    </motion.span>
  );
}
