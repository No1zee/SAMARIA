"use client";

import { useEffect, useState, useMemo } from 'react';
import { prepare, layout } from '@chenglou/pretext';

interface TextFitOptions {
  maxWidth: number;
  maxHeight: number;
  font: string;
  lineHeight: number;
  initialFontSize: number;
  minFontSize?: number;
}

export function useTextFit(text: string, options: TextFitOptions) {
  const [fontSize, setFontSize] = useState(options.initialFontSize);
  const minFontSize = options.minFontSize || 10;

  useEffect(() => {
    if (!text || options.maxWidth <= 0) return;

    let currentSize = options.initialFontSize;
    const step = 1;

    const findFittingSize = () => {
      while (currentSize > minFontSize) {
        // Construct font string for pretext (e.g. "16px Inter")
        // We assume the font family is passed in the options
        const fontSpec = `${currentSize}px ${options.font}`;
        
        try {
          const prepared = prepare(text, fontSpec);
          const { height } = layout(prepared, options.maxWidth, options.lineHeight * (currentSize / options.initialFontSize));

          if (height <= options.maxHeight) {
            return currentSize;
          }
        } catch (e) {
          console.error("Pretext measurement failed:", e);
          break;
        }
        
        currentSize -= step;
      }
      return currentSize;
    };

    const fittedSize = findFittingSize();
    setFontSize(fittedSize);
  }, [text, options.maxWidth, options.maxHeight, options.font, options.lineHeight, options.initialFontSize, minFontSize]);

  return fontSize;
}
