"use client";

import { useMemo } from 'react';
import { prepareWithSegments, walkLineRanges } from '@chenglou/pretext';

export function useBalancedWidth(text: string, font: string, maxWidth: number) {
  const balancedWidth = useMemo(() => {
    if (!text || maxWidth <= 0) return maxWidth;

    try {
      const prepared = prepareWithSegments(text, font);
      let tightestWidth = 0;
      
      walkLineRanges(prepared, maxWidth, (line) => {
        if (line.width > tightestWidth) {
          tightestWidth = line.width;
        }
      });

      return tightestWidth > 0 ? tightestWidth : maxWidth;
    } catch (e) {
      console.error("Pretext balanced width calculation failed:", e);
      return maxWidth;
    }
  }, [text, font, maxWidth]);

  return balancedWidth;
}
