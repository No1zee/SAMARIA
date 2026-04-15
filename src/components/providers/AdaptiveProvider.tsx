"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type PerformanceTier = "low" | "medium" | "high";
type VisualMode = "CORE" | "BALANCED" | "CINEMATIC";

interface AdaptiveContextType {
  tier: PerformanceTier;
  mode: VisualMode;
  isHydrated: boolean;
}

const AdaptiveContext = createContext<AdaptiveContextType>({
  tier: "medium",
  mode: "BALANCED",
  isHydrated: false,
});

export const useAdaptive = () => useContext(AdaptiveContext);

export function AdaptiveProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AdaptiveContextType>({
    tier: "medium",
    mode: "BALANCED",
    isHydrated: false,
  });

  useEffect(() => {
    // Simple hardware heuristic
    const detectTier = (): PerformanceTier => {
      if (typeof navigator === "undefined") return "medium";

      const cores = navigator.hardwareConcurrency || 4;
      // @ts-expect-error - deviceMemory is Chromium only and not in standard Navigator type
      const memory = navigator.deviceMemory || 4;
      
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );

      if (cores <= 2 || memory <= 2 || isMobile) return "low";
      if (cores >= 8 && memory >= 8) return "high";
      return "medium";
    };

    const tier = detectTier();
    
    // Default mode mapping
    const mode: VisualMode = tier === "high" ? "CINEMATIC" : tier === "medium" ? "BALANCED" : "CORE";

    // Update state in next tick to avoid cascading render warning
    setTimeout(() => {
      setState({ tier, mode, isHydrated: true });
    }, 0);
    
    // Log detection for debugging
    console.log(`[SAMARIA-ADAPTIVE] Tier: ${tier}, Mode: ${mode}`);
  }, []);

  return (
    <AdaptiveContext.Provider value={state}>
      {children}
    </AdaptiveContext.Provider>
  );
}
