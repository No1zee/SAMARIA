"use client";

import { useCelestial, InteractionMode } from "@/components/providers/CelestialProvider";
import { LayoutGrid, Globe, EyeOff, Wind, Sun } from "lucide-react";

export default function InteractionLab() {
  const { interactionMode, setInteractionMode, cloudStyle, setCloudStyle } = useCelestial();

  return (
    <section className="py-6 border-t border-white/5 bg-black/30 backdrop-blur-xs relative z-50">
      <div className="container max-w-[1200px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left Side: Title */}
        <div className="flex items-center gap-3">
          <span className="w-1.5 h-1.5 rotate-45 bg-metallic-brass animate-pulse" />
          <span className="text-[10px] font-ui tracking-[0.2em] text-metallic-brass uppercase font-bold">
            Interactive Workspace Controls
          </span>
        </div>

        {/* Right Side: Small Toggles */}
        <div className="flex flex-wrap items-center gap-6 md:gap-8">
          
          {/* Interaction Modes */}
          <div className="flex items-center gap-3">
            <span className="text-[9px] font-ui tracking-[0.15em] text-white/40 uppercase">Mode:</span>
            <div className="flex items-center bg-white/2 border border-white/5 p-1 rounded-md gap-1">
              {[
                { id: "standard", name: "Standard", icon: LayoutGrid },
                { id: "gravity", name: "Gravity", icon: Globe },
                { id: "zen", name: "Zen", icon: EyeOff }
              ].map((m) => {
                const isActive = interactionMode === m.id;
                const Icon = m.icon;
                return (
                  <button
                    key={m.id}
                    onClick={() => setInteractionMode(m.id as InteractionMode)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-sm transition-all duration-300 font-ui text-[9px] uppercase tracking-wider cursor-pointer ${
                      isActive 
                        ? "bg-metallic-brass text-black font-bold shadow-[0_0_10px_rgba(201,168,76,0.3)]" 
                        : "text-white/50 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <Icon className="w-3 h-3" />
                    <span>{m.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Cloud Rendering Styles */}
          <div className="flex items-center gap-3">
            <span className="text-[9px] font-ui tracking-[0.15em] text-white/40 uppercase">Clouds:</span>
            <div className="flex items-center bg-white/2 border border-white/5 p-1 rounded-md gap-1">
              {[
                { id: "misty", name: "Misty", icon: Wind },
                { id: "ukiyo", name: "Ukiyo-e", icon: Sun }
              ].map((c) => {
                const isActive = cloudStyle === c.id;
                const Icon = c.icon;
                return (
                  <button
                    key={c.id}
                    onClick={() => setCloudStyle(c.id as "misty" | "ukiyo")}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-sm transition-all duration-300 font-ui text-[9px] uppercase tracking-wider cursor-pointer ${
                      isActive 
                        ? "bg-metallic-brass text-black font-bold shadow-[0_0_10px_rgba(201,168,76,0.3)]" 
                        : "text-white/50 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <Icon className="w-3 h-3" />
                    <span>{c.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
