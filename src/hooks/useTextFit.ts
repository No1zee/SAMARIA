"use client";

import { useMemo, useState, useEffect } from "react";
import { prepareWithSegments, layoutWithLines } from "@chenglou/pretext";

interface TextFitOptions {
  maxWidth: number;
  maxHeight: number;
  font: string;
  lineHeight: number;
  initialFontSize: number;
  minFontSize?: number;
  maxLines?: number;
  letterSpacing?: number;
}

/**
 * useTextFit — binary-searches for the largest font size where the text
 * fits within `maxWidth × maxHeight` using Pretext for line-break geometry.
 *
 * IMPORTANT: The `font` parameter must match the ACTUAL rendered font
 * (e.g. "'Cinzel Decorative', serif"), not a fallback like "Inter".
 * Canvas measures against whatever font string you provide — if it doesn't
 * match what the browser renders, widths will be wrong.
 */
export function useTextFit(text: string, options: TextFitOptions): number {
  const [fontsReady, setFontsReady] = useState(false);
  const minFontSize = options.minFontSize ?? 10;

  // Wait for fonts — same pattern as CinematicText to keep measurements in sync
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.fonts.ready.then(() => setFontsReady(true));
  }, []);

  const fontSize = useMemo(() => {
    // Return the declared initial size on server and before fonts load
    // to avoid a hydration mismatch on first paint.
    if (!fontsReady || !text || options.maxWidth <= 0) {
      return options.initialFontSize;
    }

    const letterSpacingRatio = options.letterSpacing ? options.letterSpacing / options.initialFontSize : 0;
    const numChars = text.length;
    
    // Safety buffer for decorative fonts and anti-aliasing (8% padding + 8px)
    const effectiveMaxWidth = options.maxWidth * 0.90 - 8; 

    // Binary search for optimal font size (faster than linear scan)
    let lo = minFontSize;
    let hi = options.initialFontSize;
    let bestSize = minFontSize;

    while (lo <= hi) {
      const mid = Math.floor((lo + hi) / 2);

      try {
        const fontSpec = `${mid}px ${options.font}`;
        const prepared = prepareWithSegments(text, fontSpec);
        // Subtract total tracking from available width before Pretext measures
        const trackingPx = letterSpacingRatio * mid;
        const pretextWidth = effectiveMaxWidth - (numChars - 1) * trackingPx;
        const { height, lines } = layoutWithLines(
          prepared,
          Math.max(1, pretextWidth),
          options.lineHeight
        );

        const linesOk = !options.maxLines || lines.length <= options.maxLines;
        const heightOk = height <= options.maxHeight;

        if (linesOk && heightOk) {
          bestSize = mid;
          lo = mid + 1; // try larger
        } else {
          hi = mid - 1; // too big, try smaller
        }
      } catch (e) {
        console.error("[useTextFit] Pretext error:", e);
        hi = mid - 1;
      }
    }

    return bestSize;
  }, [
    text,
    fontsReady,
    options.maxWidth,
    options.maxHeight,
    options.maxLines,
    options.font,
    options.lineHeight,
    options.initialFontSize,
    options.letterSpacing,
    minFontSize,
  ]);

  return fontSize;
}
