"use client";

import { motion } from "framer-motion";
import { Scroll, Terminal, Shield } from "lucide-react";

export default function About() {
  return (
    <section id="manifesto" className="py-24 bg-royal-obsidian relative overflow-hidden border-t border-brand-gold/10">
      
      {/* Background Decor - Circuit Traces */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-linear-to-l from-brand-gold/5 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-1/3 h-full bg-linear-to-r from-brand-gold/5 to-transparent"></div>
      </div>

      <div className="container max-w-[1200px] mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        
        {/* Left: The Manifesto Text */}
        <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
        >
            <div className="flex items-center gap-3 mb-6 text-gold-metallic">
                <Scroll className="w-6 h-6" />
                <span className="font-ui text-xs tracking-[0.3em] uppercase">The Covenant</span>
            </div>
            
            <h2 className="text-off-white mb-8 leading-tight">
                We Build Digital Fortresses.
            </h2>

            <div className="space-y-6 text-off-white/80 text-lg leading-relaxed">
                <p>
                    In an era of fleeting trends, Samaria Tech stands for permanence. We don't just write code; we architect systems designed to outlast the chaos of the modern web.
                </p>
                <p>
                    Our philosophy merges the durability of ancient engineering with the speed of modern silicon. We call it <span className="text-gold-metallic">The Ancient Future</span>.
                </p>
            </div>

            <div className="mt-10 space-y-6">
                <div className="flex flex-col gap-2 border-l-2 border-brand-gold/30 pl-4">
                    <span className="font-heading text-2xl text-brand-gold">100% Precision</span>
                    <span className="font-ui text-xs text-off-white/60 leading-relaxed">Rigorous QA • Zero-defect deployments</span>
                </div>
                <div className="flex flex-col gap-2 border-l-2 border-brand-gold/30 pl-4">
                    <span className="font-heading text-2xl text-brand-gold">∞ Scalability</span>
                    <span className="font-ui text-xs text-off-white/60 leading-relaxed">Cloud-native architecture • Auto-scaling infrastructure</span>
                </div>
            </div>
        </motion.div>

        {/* Right: Visual Element (Code Tablet) */}
        <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
        >
            <div className="relative z-10 bg-black-bean/80 backdrop-blur-md border border-brand-gold/20 p-8 rounded-lg shadow-2xl">
                {/* Header */}
                <div className="flex items-center justify-between mb-6 border-b border-brand-gold/10 pb-4">
                    <div className="flex items-center gap-2">
                        <Terminal className="w-4 h-4 text-brand-gold" />
                        <span className="font-ui text-xs text-brand-gold/60">samaria_kernel.ts</span>
                    </div>
                    <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500/20"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500/20"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500/20"></div>
                    </div>
                </div>

                {/* Code Block */}
                <code className="font-mono text-xs text-off-white/70 block" style={{ fontFamily: "'JetBrains Mono', 'Fira Code', 'Consolas', monospace" }}>
                    <span className="text-purple-400">const</span> <span className="text-yellow-400">Manifesto</span> = &#123;<br/>
                    &nbsp;&nbsp;mission: <span className="text-green-400">"Empower Expansion"</span>,<br/>
                    &nbsp;&nbsp;values: [<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-green-400">"Sovereignty"</span>,<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-green-400">"Excellence"</span>,<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-green-400">"Legacy"</span><br/>
                    &nbsp;&nbsp;],<br/>
                    &nbsp;&nbsp;stack: [<span className="text-cyan-400">"Next.js"</span>, <span className="text-cyan-400">"Node"</span>, <span className="text-cyan-400">"PostgreSQL"</span>],<br/>
                    &nbsp;&nbsp;status: <span className="text-blue-400">"ONLINE"</span><br/>
                    &#125;;<br/><br/>
                    <span className="text-gray-500">// Executing core protocols...</span><br/>
                    <span className="animate-pulse text-brand-gold">█</span>
                </code>
            </div>

            {/* Behind Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-brand-gold/10 blur-3xl -z-10 rounded-full"></div>
        </motion.div>

      </div>
    </section>
  );
}
