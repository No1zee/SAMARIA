"use client";

import { useMemo } from 'react';
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
  const minFontSize = options.minFontSize || 10;

  const fontSize = useMemo(() => {
    if (!text || options.maxWidth <= 0) return options.initialFontSize;

    let currentSize = options.initialFontSize;
    const step = 1;

    while (currentSize > minFontSize) {
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
  }, [text, options.maxWidth, options.maxHeight, options.font, options.lineHeight, options.initialFontSize, minFontSize]);

  return fontSize;
}
