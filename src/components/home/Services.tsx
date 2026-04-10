"use client";
 
import { useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
 
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}
 
// CUSTOM IDEOGRAMS — SAMURAI JACK INSPIRED
const FortressIcon = () => (
  <svg viewBox="0 0 100 100" className="w-16 h-16 stroke-current fill-none" strokeWidth="1.5">
    <motion.path 
      initial={{ pathLength: 0 }}
      whileHover={{ pathLength: 1 }}
      transition={{ duration: 0.8, ease: "linear" }}
      d="M20 80V30L50 15L80 30V80H20ZM20 40H80M40 80V60C40 55 45 50 50 50C55 50 60 55 60 60V80" 
    />
  </svg>
);
 
const BladeIcon = () => (
  <svg viewBox="0 0 100 100" className="w-12 h-12 stroke-current fill-none" strokeWidth="2">
    <motion.path 
      initial={{ pathLength: 0 }}
      whileHover={{ pathLength: 1 }}
      transition={{ duration: 0.6, ease: "linear" }}
      d="M30 85L70 15M30 85C25 80 20 60 40 40C60 20 75 15 70 15" 
    />
  </svg>
);
 
const SpiralIcon = () => (
  <svg viewBox="0 0 100 100" className="w-12 h-12 stroke-current fill-none" strokeWidth="1.5">
    <motion.path 
      initial={{ pathLength: 0 }}
      whileHover={{ pathLength: 1 }}
      transition={{ duration: 1, ease: "linear" }}
      d="M50 50C30 50 20 30 20 20M50 50C70 50 80 70 80 80M50 50C50 30 70 20 80 20M50 50C50 70 30 80 20 80" 
    />
    <circle cx="50" cy="50" r="2" fill="currentColor" />
  </svg>
);
 
export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
 
  return (
    <section ref={sectionRef} id="services" className="py-fb8 relative overflow-hidden">
      
      <div className="container max-w-[1500px] mx-auto px-fb3 md:px-fb4 relative z-10">
        <div className="mb-fb7 text-left">
          <h2 className="text-5xl md:text-[8rem] text-off-white font-heading uppercase tracking-tighter leading-[0.85] mb-fb2">
            Systemic <br className="md:hidden"/> Capabilities.
          </h2>
        </div>
  
        {/* 62/38 Asymmetric Grid (φ-Enforced) */}
        <div className="grid grid-cols-1 md:grid-cols-10 gap-fb5 items-stretch">
          
          {/* 1. Flagship Capability (61.8% | Tall Golden Rectangle) */}
          <div className="md:col-span-6 h-full">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="group relative h-full aspect-[1/1.618] md:aspect-auto md:min-h-[850px] p-fb6 bg-obsidian-layered/40 border border-white/5 blade-motif overflow-hidden flex flex-col justify-end hover:border-metallic-brass/40 transition-all duration-1000"
            >
              {/* Architectural Blueprint Overlay */}
              <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none overflow-hidden">
                <svg viewBox="0 0 1000 1000" className="w-[150%] h-[150%] absolute top-[-25%] right-[-25%] stroke-white/20 fill-none" strokeWidth="0.5">
                  <path d="M0 500L500 250L1000 500L500 750Z" />
                  <path d="M500 250V750" />
                  <path d="M0 500H1000" />
                  <circle cx="500" cy="500" r="200" strokeDasharray="10 5" />
                  <path d="M250 375L750 625" />
                  <path d="M250 625L750 375" />
                </svg>
              </div>
              
              <div className="relative z-10">
                <div className="text-metallic-brass mb-fb5 transition-transform duration-1000 origin-left">
                  <FortressIcon />
                </div>
                <h3 className="text-5xl md:text-[5.5rem] text-off-white mb-fb4 font-heading tracking-tighter leading-none uppercase">
                  High-Fidelity <br/> Web Architectures.
                </h3>
                <p className="text-off-white/40 max-w-lg mb-fb6 text-xl md:text-2xl font-body leading-relaxed border-l border-metallic-brass/40 pl-fb3 ml-fb1">
                  We engineer resilient, high-performance systems <br className="hidden md:block" /> 
                  designed to absorb operational complexity while <br className="hidden md:block" />
                  accelerating global expansion.
                </p>
                
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-fb4 pt-fb5 border-t border-white/5">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-ui text-metallic-brass tracking-[0.4em] mb-1 uppercase opacity-60">Investment Floor</span>
                    <span className="text-off-white text-3xl font-heading tracking-tighter">$3,500</span>
                  </div>
                  <button className="btn-warrior">
                    Discuss Architecture
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
  
          {/* 2 & 3. Subordinate Columns (38.2% | Wide Golden Rectangles) */}
          <div className="md:col-span-4 flex flex-col gap-fb5">
            
            {/* Brand Engineering */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="group relative p-fb5 bg-obsidian-layered/20 border border-white/5 blade-motif aspect-[1.618/1] flex flex-col justify-between hover:border-metallic-brass/30 transition-all duration-700"
            >
              <div className="relative z-10">
                <div className="text-metallic-brass/40 group-hover:text-metallic-brass transition-colors duration-500 mb-fb3">
                  <BladeIcon />
                </div>
                <h4 className="text-3xl md:text-4xl text-off-white mb-fb2 font-heading uppercase tracking-tighter leading-none">
                  Institutional <br/> Identity.
                </h4>
                <p className="text-off-white/30 text-base md:text-lg italic leading-relaxed">
                  Visual systems forged to establish <br /> immediate market authority and recognition.
                </p>
              </div>
              <div className="relative z-10 flex items-center justify-between mt-fb3 pt-fb2 border-t border-white/5 opacity-40 group-hover:opacity-100 transition-opacity">
                <div className="flex flex-col">
                   <span className="text-[8px] font-ui text-metallic-brass tracking-[0.3em] uppercase">Investment</span>
                   <span className="text-off-white text-xs font-heading">By Architecture Scope</span>
                </div>
                <div className="text-[10px] tracking-[0.5em] text-metallic-brass/60 uppercase font-ui">
                  Ancient Discipline // Future UI
                </div>
              </div>
            </motion.div>
  
            {/* Digital Ecosystems */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="group relative p-fb5 bg-black-bean/20 border border-white/5 blade-motif aspect-[1.618/1] flex flex-col justify-between hover:border-metallic-brass/30 transition-all duration-700"
            >
              <div className="relative z-10">
                <div className="text-metallic-brass/40 group-hover:text-metallic-brass transition-colors duration-500 mb-fb3">
                  <SpiralIcon />
                </div>
                <h4 className="text-3xl md:text-4xl text-off-white mb-fb2 font-heading uppercase tracking-tighter leading-none">
                  Operational <br/> Ecosystems.
                </h4>
                <p className="text-off-white/30 text-base md:text-lg italic leading-relaxed">
                  Unified technical lattices that synchronize <br /> business nodes into a single reactive layer.
                </p>
              </div>
              <div className="relative z-10 flex items-center justify-between mt-fb3 pt-fb2 border-t border-white/5 opacity-40 group-hover:opacity-100 transition-opacity">
                <div className="flex flex-col">
                   <span className="text-[8px] font-ui text-metallic-brass tracking-[0.3em] uppercase">Investment</span>
                   <span className="text-off-white text-xs font-heading">By Architecture Scope</span>
                </div>
                <div className="text-[10px] tracking-[0.5em] text-metallic-brass/60 uppercase font-ui">
                  Holistic Infrastructure
                </div>
              </div>
            </motion.div>
  
          </div>
  
        </div>
  
        {/* Built With — The Arsenal (Silenced) */}
        <div className="mt-fb8 pt-fb6 border-t border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-fb4 opacity-40">
          <span className="text-[10px] font-ui text-metallic-brass tracking-[0.6em] uppercase">The Arsenal</span>
          <div className="flex flex-wrap gap-x-fb5 gap-y-fb3">
            {['Next.js', 'React', 'TypeScript', 'Node.js', 'Supabase', 'Vercel', 'GSAP'].map((tech, i) => (
              <span key={i} className="text-[10px] font-ui text-off-white/40 hover:text-white transition-colors tracking-[0.4em] uppercase">
                {tech}
              </span>
            ))}
          </div>
        </div>
  
      </div>
    </section>
  );
}
