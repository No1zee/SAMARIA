"use client";

import { useRef, useState, useEffect } from "react";
import CinematicText from "./CinematicText";

interface CelestialHeadingProps {
  as?: "h1" | "h2" | "h3" | "h4" | "div";
  text: string;
  fontSize?: number;
  className?: string;
  intensity?: number;
  baseColor?: string;
  lineHeight?: number;
  maxLines?: number;
}

/**
 * CinematicHeading — auto-width wrapper around CinematicText.
 * Measures its container width so CinematicText can do accurate
 * Pretext line-breaking without overflowing.
 *
 * Uses Cinzel Decorative (the actual heading font) for Canvas measurement.
 */
export default function CelestialHeading({
  as: Tag = "h2",
  text,
  fontSize,
  className = "",
  intensity = 1,
  baseColor,
  lineHeight = 1.05,
  maxLines,
}: CelestialHeadingProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [availableWidth, setAvailableWidth] = useState(1500);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    const update = () => {
      setAvailableWidth(containerRef.current?.offsetWidth || 1500);
    };
    update();

    // Use ResizeObserver for more accurate updates (Pretext best practice)
    const ro = new ResizeObserver(update);
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  // Responsive defaults based on heading level
  const defaultSize = Tag === "h1" ? 128 : Tag === "h2" ? 80 : Tag === "h3" ? 48 : 36;
  const rawSize = fontSize || defaultSize;
  const size = isMobile ? Math.max(28, rawSize * 0.55) : rawSize;

  return (
    <div ref={containerRef} className="w-full">
      <Tag className={`font-heading uppercase ${className}`}>
        <CinematicText
          fontSize={size}
          maxWidth={availableWidth}
          intensity={intensity}
          baseColor={baseColor}
          lineHeight={lineHeight}
          maxLines={maxLines}
        >
          {text}
        </CinematicText>
      </Tag>
    </div>
  );
}
