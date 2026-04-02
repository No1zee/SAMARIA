"use client";

import { useEffect, useState } from 'react';
import { prepareWithSegments, walkLineRanges } from '@chenglou/pretext';

export function useBalancedWidth(text: string, font: string, maxWidth: number) {
  const [balancedWidth, setBalancedWidth] = useState(maxWidth);

  useEffect(() => {
    if (!text || maxWidth <= 0) return;

    try {
      const prepared = prepareWithSegments(text, font);
      let tightestWidth = 0;
      
      // walkLineRanges calls the callback for each line to find the widest line
      walkLineRanges(prepared, maxWidth, (line) => {
        if (line.width > tightestWidth) {
          tightestWidth = line.width;
        }
      });

      if (tightestWidth > 0) {
        setBalancedWidth(tightestWidth);
      }
    } catch (e) {
      console.error("Pretext balanced width calculation failed:", e);
    }
  }, [text, font, maxWidth]);

  return balancedWidth;
}
