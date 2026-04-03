"use client";
 
import { motion } from "framer-motion";
import { User } from "lucide-react";
import EclipseText from "@/components/ui/EclipseText";
 
export default function About() {
  return (
    <section id="manifesto" className="py-fb8 relative overflow-hidden">
      
      {/* Structural Watermark — Movement IV */}
      <div className="absolute top-1/2 left-0 w-full h-[150%] -translate-y-1/2 flex items-center opacity-[0.02] pointer-events-none select-none z-0 overflow-hidden">
          <motion.div 
            initial={{ x: "0%" }}
            animate={{ x: "-50%" }}
            transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
            className="flex whitespace-nowrap"
          >
            <span className="text-[40vw] font-heading font-bold text-off-white pr-fb7">COLLECTIVE</span>
            <span className="text-[40vw] font-heading font-bold text-off-white pr-fb7">COLLECTIVE</span>
          </motion.div>
      </div>
 
      <div className="container max-w-[1500px] mx-auto px-fb3 md:px-fb4 relative z-10">
        
        {/* The Horizon Header */}
        <div className="mb-fb7 border-l border-metallic-brass/40 pl-fb3">
          <div className="flex items-center gap-fb2 mb-fb3">
              <span className="text-silence text-metallic-brass">Movement 04 — The Covenant</span>
          </div>
          <h2 className="text-5xl md:text-[8rem] font-heading uppercase tracking-tighter leading-[0.85] flex flex-col">
            <EclipseText baseColor="rgba(242, 237, 216, 0.4)">
              THE ANCIENT
            </EclipseText>
            <EclipseText baseColor="rgba(242, 237, 216, 0.4)">
              FUTURE.
            </EclipseText>
          </h2>
        </div>
 
        {/* 62/38 Golden Ratio Layout — The Scroll Format */}
        <div className="grid grid-cols-1 md:grid-cols-10 gap-fb6 items-start">
          
          {/* 34% Sidebar — The Vertical Inscriptions */}
          <div className="md:col-span-3 flex md:flex-col gap-fb5 md:gap-fb7 opacity-0 pointer-events-none">
             <div className="flex flex-col gap-2">
                <span className="[writing-mode:vertical-rl] text-[10px] md:text-sm font-ui text-metallic-brass tracking-[0.5em] uppercase h-32">FORGE</span>
                <div className="w-px h-fb4 bg-metallic-brass/20 hidden md:block" />
             </div>
             <div className="flex flex-col gap-2">
                <span className="[writing-mode:vertical-rl] text-[10px] md:text-sm font-ui text-metallic-brass tracking-[0.5em] uppercase h-32">BLADE</span>
                <div className="w-px h-fb4 bg-metallic-brass/20 hidden md:block" />
             </div>
             <div className="flex flex-col gap-2">
                <span className="[writing-mode:vertical-rl] text-[10px] md:text-sm font-ui text-metallic-brass tracking-[0.5em] uppercase h-32">SYSTEM</span>
                <div className="w-px h-fb4 bg-metallic-brass/20 hidden md:block" />
             </div>
          </div>
 
          {/* 66% Main Content — The Inscribed Text */}
          <div className="md:col-span-7 flex flex-col items-start gap-fb7">
             
             <motion.div
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               className="space-y-fb6"
             >
                <div className="max-w-2xl">
                  <h3 className="text-3xl md:text-5xl font-heading uppercase tracking-tight mb-fb4 leading-none">
                    <EclipseText baseColor="rgba(242, 237, 216, 0.4)">
                      WE BUILD FOR PERMANENCE.
                    </EclipseText>
                  </h3>
                  <p className="text-off-white/40 text-xl md:text-[2rem] font-body leading-[1.618] italic border-l border-white/5 pl-fb4">
                    In an industry obsessed with novelty, we build for survival. 
                    Our systems are engineered to outlast trend cycles, technical debt, 
                    and operational chaos.
                  </p>
                </div>
 
                <div className="max-w-2xl ml-auto">
                  <h3 className="text-3xl md:text-5xl font-heading uppercase tracking-tight mb-fb4 leading-none text-right">
                    <EclipseText baseColor="rgba(242, 237, 216, 0.4)">
                      TECHNICAL SOVEREIGNTY.
                    </EclipseText>
                  </h3>
                  <p className="text-off-white/40 text-xl md:text-[2rem] font-body leading-[1.618] italic border-r border-white/5 pr-fb4 text-right">
                    We do not just deploy code; we engineer digital fortresses. 
                    Architecture is not a service here — it is a covenant with 
                    the future of your enterprise.
                  </p>
                </div>
             </motion.div>
 
             {/* Founder Moment (The Master's Seal) */}
             <div className="pt-fb6 border-t border-white/10 w-full flex flex-col md:flex-row md:items-end justify-between gap-fb5">
                <div className="flex items-center gap-fb4">
                   <div className="w-fb4 h-fb4 rounded-full border border-metallic-brass/20 flex items-center justify-center text-metallic-brass overflow-hidden bg-obsidian-layered/40">
                      <User size={32} strokeWidth={1} />
                   </div>
                   <div>
                      <h4 className="text-off-white font-ui text-xl md:text-3xl uppercase tracking-[0.4em] font-black">EDWARD MAGEJO</h4>
                      <p className="text-metallic-brass/40 text-[10px] md:text-xs uppercase tracking-[0.6em] font-ui mt-2">Lead Architect // Gaborone</p>
                   </div>
                </div>
                
                <div className="md:text-right">
                   <p className="text-silence text-white/20 mb-1">Status: Operational</p>
                   <p className="font-ui text-xs text-metallic-brass/60 tracking-widest uppercase text-nowrap">Est. MMXXV // The Ancient Future</p>
                </div>
             </div>
 
          </div>
 
        </div>
      </div>
    </section>
  );
}
