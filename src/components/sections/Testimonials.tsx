"use client";

import { motion } from "framer-motion";
import CelestialHeading from "@/components/ui/CelestialHeading";
import { ShieldCheck, FileCode, Landmark, Eye, RefreshCw } from "lucide-react";

const TESTIMONIALS = [
  {
    quote: "We'd worked with three agencies before Samaria. Each time, we were handed a black box we couldn't maintain. Samaria didn't just build our system; they handed us the keys, the blueprint, and the confidence to run it ourselves.",
    author: "Kojo Mensah",
    role: "Head of Product",
    company: "LumiStream"
  },
  {
    quote: "Samaria operates at a level of rigor we didn't think existed in external teams. Their focus on durability protected our regional logistics migration from any downtime, executing flawlessly on schedule.",
    author: "Elena Sibanda",
    role: "VP of Engineering",
    company: "Zim Logistics"
  },
  {
    quote: "Their focus on permanence means we aren't constantly paying for codebase rewrites. The system they deployed in 2023 handles $2M+ in daily transaction volume without a single server memory leak.",
    author: "Dr. Akin Alabi",
    role: "Chief Architect",
    company: "Aether Institutional"
  }
];

const DELIVERABLES = [
  { icon: <FileCode className="w-5 h-5 text-metallic-brass" />, title: "Full Codebase Ownership", desc: "100% intellectual property ownership from day one. No vendor lock-in." },
  { icon: <Landmark className="w-5 h-5 text-metallic-brass" />, title: "Interactive Blueprint", desc: "Comprehensive system architecture documentation and interactive guides." },
  { icon: <ShieldCheck className="w-5 h-5 text-metallic-brass" />, title: "Deployment Control", desc: "Production-ready automated deployment pipelines directly into your cloud accounts." },
  { icon: <Eye className="w-5 h-5 text-metallic-brass" />, title: "Walkthrough Artifacts", desc: "Video walkthroughs and instructional references for your internal teams." },
  { icon: <RefreshCw className="w-5 h-5 text-metallic-brass" />, title: "Continuity Support", desc: "Ongoing operational support and regular updates, keeping systems secure and fast." }
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-16 md:py-24 z-10 relative overflow-hidden border-t border-white/5">
      <div className="container max-w-[1500px] mx-auto px-fb3 md:px-fb4 relative z-10 space-y-20">
        {/* Ambient backing */}
        <div className="absolute inset-0 bg-gradient-to-r from-royal-obsidian via-royal-obsidian/80 to-transparent blur-md opacity-90 pointer-events-none -z-10" />
        
        {/* Why Samaria & Bio section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7 space-y-6">
            <span className="section-label mb-2 block">WHY SAMARIA</span>
            <CelestialHeading 
              text="Built for permanence, not improvisation."
              as="h2"
              fontSize={48}
              className="text-balance uppercase tracking-tight"
            />
            <p className="text-white/80 text-base md:text-lg font-body leading-relaxed max-w-2xl no-prose">
              Our studio was founded on a simple realization: businesses are tired of paying for temporary code. We design digital systems with clear blueprints, clean code, and zero dependencies on us after deployment. Headquartered in Gaborone, we serve companies across Southern Africa and beyond, building software that stays useful long after launch.
            </p>
          </div>
          <div className="lg:col-span-5 p-6 border border-white/5 bg-white/2 backdrop-blur-md rounded-lg flex flex-col justify-between">
            <span className="text-[9px] font-ui tracking-wider text-metallic-brass uppercase block mb-3">FOUNDRY BLUEPRINT</span>
            <h4 className="font-heading text-base text-off-white uppercase mb-2">Edward Magejo // Founder</h4>
            <p className="text-xs font-body text-white/50 leading-relaxed no-prose">
              &ldquo;Software should be treated like infrastructure. It requires a clear architecture, a permanent foundation, and absolute clarity. We build systems that clients own completely, ensuring they can operate and evolve them without friction.&rdquo;
            </p>
          </div>
        </div>

        {/* What Clients Receive */}
        <div className="space-y-8">
          <div className="border-l border-metallic-brass/40 pl-6 md:pl-8">
            <span className="section-label mb-2 block font-bold">SYSTEM HANDOFF</span>
            <h3 className="text-xl md:text-2xl font-heading text-off-white uppercase">What clients receive</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {DELIVERABLES.map((d, i) => (
              <div 
                key={i} 
                className="p-6 border border-white/5 bg-white/2 hover:border-metallic-brass/25 transition-all duration-300 rounded-lg flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="w-10 h-10 border border-metallic-brass/20 bg-metallic-brass/5 rounded-sm flex items-center justify-center">
                    {d.icon}
                  </div>
                  <h4 className="font-heading text-xs text-off-white uppercase tracking-wider">{d.title}</h4>
                  <p className="text-[11px] font-body text-white/50 leading-relaxed no-prose">{d.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="space-y-8">
          <div className="border-l border-metallic-brass/40 pl-6 md:pl-8">
            <span className="section-label mb-2 block">CLIENT PERSPECTIVE</span>
            <h3 className="text-xl md:text-2xl font-heading text-off-white uppercase">What clients value</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, i) => (
              <motion.div 
                key={i}
                className="flex flex-col justify-between bg-obsidian-layered/30 border border-white/5 p-8 hover:border-metallic-brass/25 hover:bg-obsidian-layered/50 transition-all duration-500 group relative rounded-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.15 }}
              >
                <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-metallic-brass/10 group-hover:border-metallic-brass/40 transition-colors" />
                <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b border-l border-metallic-brass/10 group-hover:border-metallic-brass/40 transition-colors" />
                
                <p className="text-white/80 italic text-sm md:text-base leading-relaxed no-prose mb-8">
                  &quot;{t.quote}&quot;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-px bg-metallic-brass/20" />
                  <div className="flex flex-col">
                    <span className="font-heading text-xs text-metallic-brass font-bold tracking-wider">{t.author}</span>
                    <span className="font-ui text-[9px] text-off-white/50 uppercase tracking-widest">{t.role}, {t.company}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
