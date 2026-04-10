"use client";

import { useCallback } from 'react';

/**
 * Trick 8: Haptic-Feedback Micro-animations
 * Provides tactile feedback for mobile interactions (Warrior's Clink).
 */
export const useHaptics = () => {
  const vibrate = useCallback((pattern: number | number[] = [10]) => {
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate(pattern);
      } catch {
        // Silently fail if blocked by user preference
      }
    }
  }, []);

  const slash = useCallback(() => vibrate([10, 40, 10]), [vibrate]);
  const clink = useCallback(() => vibrate(15), [vibrate]);
  const heavy = useCallback(() => vibrate([30, 50, 30]), [vibrate]);

  return { slash, clink, heavy };
};
