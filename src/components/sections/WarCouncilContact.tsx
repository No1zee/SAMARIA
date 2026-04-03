"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { useHaptics } from "@/hooks/useHaptics";

export default function WarCouncilContact() {
  const { clink, slash } = useHaptics();
    const [activeField, setActiveField] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    identity: "",
    architecture: "",
    nexus: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const isFormValid = formData.identity && formData.architecture && formData.nexus;

  const FormInput = ({ id, placeholder, type = "text", value, onChange }: any) => {
    const isFocused = activeField === id;
    const hasValue = value.length > 0;

    return (
      <span className="relative inline-block mx-2 group">
        <input 
          type={type}
          value={value}
          aria-label={placeholder}
          onFocus={() => setActiveField(id)}
          onBlur={() => setActiveField(null)}
          onChange={(e) => onChange(e.target.value)}
          className="bg-transparent border-b border-metallic-brass/10 text-metallic-brass focus:border-metallic-brass focus:outline-none px-2 py-1 transition-all duration-700 min-w-[280px] relative z-10"
        />
        
        {/* Animated Bracket Placeholder */}
        <AnimatePresence>
          {!hasValue && (
            <motion.span 
              initial={{ opacity: 1 }}
              animate={{ 
                opacity: isFocused ? 0 : 0.3,
                x: isFocused ? 20 : 0
              }}
              exit={{ opacity: 0 }}
              className="absolute left-2 top-1 pointer-events-none text-metallic-brass italic font-ui text-xl md:text-3xl tracking-widest uppercase"
            >
              {placeholder}
            </motion.span>
          )}
        </AnimatePresence>

        {/* Blinking Cursor (visible only on focus and empty) */}
        {isFocused && !hasValue && (
          <motion.div 
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity }}
            className="absolute left-2 top-1 h-8 w-[2px] bg-metallic-brass/60 z-0"
          />
        )}

        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: (isFocused || hasValue) ? "100%" : "0%" }}
          className="absolute bottom-0 left-0 h-px bg-metallic-brass shadow-[0_0_10px_rgba(201,168,76,0.5)] z-20"
        />
      </span>
    );
  };

  return (
    <section id="alliance" className="py-fb9 relative overflow-hidden border-t border-white/5">
      
      {/* Background Texture Overlay */}
      <div className="absolute inset-0 bg-parchment-grain opacity-5 pointer-events-none mix-blend-overlay" />

      <div className="container max-w-[1500px] mx-auto px-fb3 md:px-fb4 relative z-10">
        
        {/* Section Header (Fibonacci Alignment) */}
        <div className="mb-fb8 border-l border-metallic-brass/40 pl-fb3">
          <div className="flex items-center gap-fb2 mb-fb3">
            <span className="text-[10px] tracking-[0.3em] font-ui text-metallic-brass uppercase">Movement 05 // The War Council</span>
          </div>
          <h2 className="text-5xl md:text-[8rem] text-off-white font-heading uppercase tracking-tighter leading-[0.85]">
            Forge <br/>
            The Alliance.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-10 gap-fb7 items-start">
          
          {/* The Signature Form (61.8%) */}
          <div className="md:col-span-12 lg:col-span-7 flex flex-col justify-center min-h-[400px]">
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1 }}
                  className="space-y-12"
                >
                  <div className="text-2xl md:text-5xl font-heading text-off-white/80 leading-[1.4] md:leading-[1.6] tracking-tight">
                    I am <br className="md:hidden" />
                    <FormInput 
                      id="identity"
                      placeholder="[ THE INITIATOR ]"
                      value={formData.identity}
                      onChange={(val: string) => setFormData({ ...formData, identity: val })}
                    />
                    seeking to architect a 
                    <br className="hidden md:block" />
                    system to <br className="md:hidden" />
                    <FormInput 
                      id="architecture"
                      placeholder="[ THE OBJECTIVE ]"
                      value={formData.architecture}
                      onChange={(val: string) => setFormData({ ...formData, architecture: val })}
                    />
                    .
                    <br />
                    Reach my nexus at <br className="md:hidden" />
                    <FormInput 
                      id="nexus"
                      placeholder="[ EMAIL PROTOCOL ]"
                      type="email"
                      value={formData.nexus}
                      onChange={(val: string) => setFormData({ ...formData, nexus: val })}
                    />
                    .
                  </div>

                  <div className="flex flex-col md:flex-row items-start md:items-center gap-fb4 pt-fb4">
                    <button 
                      disabled={!isFormValid}
                      onMouseEnter={clink}
                      onClick={() => { slash(); setSubmitted(true); }}
                      className="btn-warrior flex items-center gap-4 group disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      SEAL THE COVENANT
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                    <p className="text-[10px] tracking-[0.3em] font-ui text-off-white/20 uppercase">
                      One operational cycle response time.
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-fb6 border border-metallic-brass/10 bg-metallic-brass/5 backdrop-blur-sm blade-motif max-w-2xl"
                >
                  <div className="flex items-center gap-4 mb-fb4">
                    <div className="w-12 h-12 rounded-full border border-metallic-brass/40 flex items-center justify-center">
                      <Check className="text-metallic-brass w-6 h-6" />
                    </div>
                    <span className="text-[10px] tracking-[0.4em] font-ui text-metallic-brass uppercase">Nexus Connection Established</span>
                  </div>
                  <h3 className="text-4xl md:text-6xl font-heading text-off-white uppercase leading-none tracking-tighter mb-4">
                    Signal <br /> Received.
                  </h3>
                  <p className="text-off-white/40 text-lg md:text-xl font-body leading-relaxed max-w-sm italic">
                    The forge remains silent as we analyze your architecture. 
                    Expect a response within one sunrise.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Direct Line / Metadata (38.2%) */}
          <div className="md:col-span-12 lg:col-span-3 space-y-12 h-full lg:border-l lg:border-white/5 lg:pl-12 pt-12 lg:pt-0">
             <div>
                <p className="text-metallic-brass font-ui text-[10px] tracking-[0.5em] mb-fb3 uppercase">Status Report</p>
                <div className="space-y-4">
                   <div className="flex justify-between items-center border-b border-white/5 pb-2">
                      <span className="text-off-white/20 text-xs">Architectural Bandwidth</span>
                      <span className="text-brand-red text-xs">LOW [2 Slots]</span>
                   </div>
                   <div className="flex justify-between items-center border-b border-white/5 pb-2">
                      <span className="text-off-white/20 text-xs">Response Protocol</span>
                      <span className="text-off-white/60 text-xs">Standard // <span className="text-metallic-brass">Vocal</span></span>
                   </div>
                </div>
             </div>

             <div className="p-fb4 border border-white/5 bg-royal-obsidian/40 blade-motif">
                <p className="text-metallic-brass font-ui text-[10px] tracking-[0.5em] mb-fb3 uppercase">Direct Secure Line</p>
                <a href="mailto:architect@samaria.tech" className="text-lg md:text-xl text-off-white font-heading hover:text-metallic-brass transition-colors tracking-tighter">
                  architect@samaria.tech
                </a>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
}
