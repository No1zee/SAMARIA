"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useCelestial } from "@/components/providers/CelestialProvider";
import { Zap, Globe, EyeOff, LayoutGrid } from "lucide-react";
import ScrambleText from "@/components/animations/ScrambleText";
import CinematicText from "@/components/ui/CinematicText";

const MODES = [
  {
    id: "standard",
    name: "Architectural Standard",
    icon: LayoutGrid,
    desc: "The baseline digital experience. Precise, stable, and rigid.",
    color: "metallic-brass"
  },
  {
    id: "gravity",
    name: "Gravitational Orbit",
    icon: Globe,
    desc: "Physics-driven navigation. Elements react to cursor mass.",
    color: "blue-400"
  },
  {
    id: "zen",
    name: "Absolute Zen",
    icon: EyeOff,
    desc: "Atmospheric strip-down. Zero noise. Only the core mission.",
    color: "white"
  }
];

export default function InteractionLab() {
  const { interactionMode, setInteractionMode } = useCelestial();

  return (
    <section id="crucible" className="py-fb8 relative overflow-hidden bg-black/20 border-y border-white/5">
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-linear-to-r from-transparent via-metallic-brass/20 to-transparent" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-px bg-linear-to-r from-transparent via-metallic-brass/20 to-transparent" />
      </div>

      <div className="container max-w-[1500px] mx-auto px-fb3 md:px-fb4 relative z-10">
        <div className="flex flex-col md:flex-row gap-fb7 items-start">
          
          {/* Header Panel */}
          <div className="md:w-1/3">
            <div className="flex items-center gap-fb1 mb-fb2">
               <Zap className="w-3 h-3 text-metallic-brass" />
               <ScrambleText 
                 text="EXPERIMENT 01" 
                 className="text-metallic-brass font-ui text-[10px] tracking-[0.5em] uppercase"
                 duration={2}
               />
            </div>
            
            <h2 className="text-4xl md:text-6xl font-heading text-off-white uppercase tracking-tighter mb-fb4 leading-[0.9]">
              The <span className="text-metallic-brass">Crucible.</span>
            </h2>
            
            <p className="text-off-white/40 text-sm font-body leading-relaxed mb-fb6 max-w-sm">
              We don't just build websites; we design digital environments. Use this panel to toggle the gravitational 
              and atmospheric constants of the Samaria architecture.
            </p>
          </div>

          {/* Controls Panel */}
          <div className="md:w-2/3 grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
            {MODES.map((mode) => {
              const isActive = interactionMode === mode.id;
              const Icon = mode.icon;

              return (
                <button
                  key={mode.id}
                  onClick={() => setInteractionMode(mode.id as any)}
                  className={`relative p-6 text-left border transition-all duration-700 group clip-blade-sm overflow-hidden ${
                    isActive 
                      ? "bg-metallic-brass/10 border-metallic-brass shadow-[0_0_30px_rgba(232,133,58,0.1)]" 
                      : "bg-white/5 border-white/10 hover:border-white/20"
                  }`}
                >
                  {/* Hover/Active Glow */}
                  <div className={`absolute inset-0 bg-linear-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
                  
                  {/* Status Indicator */}
                  <div className="flex justify-between items-start mb-6">
                    <div className={`p-2 rounded-lg ${isActive ? "bg-metallic-brass text-black" : "bg-white/5 text-white/50"}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    {isActive && (
                      <motion.div 
                        layoutId="active-dot" 
                        className="w-2 h-2 rounded-full bg-metallic-brass shadow-[0_0_10px_#e8853a]" 
                      />
                    )}
                  </div>

                  <h3 className={`text-lg font-heading uppercase tracking-tighter mb-2 ${isActive ? "text-off-white" : "text-white/60"}`}>
                    {mode.name}
                  </h3>
                  
                  <p className="text-[11px] font-body text-white/30 leading-normal mb-4">
                    {mode.desc}
                  </p>

                  <div className="flex items-center gap-2">
                    <span className={`text-[9px] font-ui tracking-[0.2em] uppercase ${isActive ? "text-metallic-brass" : "text-white/20"}`}>
                      {isActive ? "[ ONLINE ]" : "[ STANDBY ]"}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

        </div>
      </div>

      {/* Experimental Feedback Starburst (Subtle) */}
      <AnimatePresence>
        {interactionMode !== 'standard' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-metallic-brass/5 blur-[120px] rounded-full pointer-events-none"
          />
        )}
      </AnimatePresence>
    </section>
  );
}
