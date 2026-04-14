"use client";
 
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
 
const STEPS = [
  { id: "identity", label: "01 // IDENTITY", question: "Who initiates this build?", placeholder: "Your Name / Organization", type: "text" },
  { id: "nexus", label: "02 // NEXUS", question: "Where do we reach you?", placeholder: "Email Protocol (@)", type: "email" },
  { id: "architecture", label: "03 // ARCHITECTURE", question: "What system are we forging?", placeholder: "Describe the operational complexity...", type: "textarea" },
];
 
export default function Contact() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({ identity: "", nexus: "", architecture: "" });
  const [submitted, setSubmitted] = useState(false);
 
  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setSubmitted(true);
    }
  };
 
  return (
    <section id="contact" className="py-fb9 bg-black-bean relative overflow-hidden">
      
      {/* 62/38 Split Watermark */}
      <div className="absolute top-fb4 right-0 opacity-[0.02] pointer-events-none select-none overflow-hidden">
          <span className="text-[40vw] font-heading font-black tracking-tighter leading-none">SIGNAL</span>
      </div>

      <div className="container max-w-[1500px] mx-auto px-fb3 md:px-fb4 relative z-10">
        
        {/* Movement X Header */}
        <div className="mb-fb8 border-l border-metallic-brass/40 pl-fb3">
          <div className="flex items-center gap-fb2 mb-fb3">
              <span className="text-silence text-metallic-brass">Movement 05 — The War Council</span>
          </div>
          <h2 className="text-5xl md:text-[8rem] text-off-white font-heading uppercase tracking-tighter leading-[0.85]">
            Initiate <br/>
            The Build.
          </h2>
        </div>
 
        {/* 62/38 Golden Ratio Layout */}
        <div className="grid grid-cols-1 md:grid-cols-10 gap-fb7 items-start">
          
          {/* One-Question Duel (61.8%) */}
          <div className="md:col-span-6 min-h-[500px] flex flex-col justify-center">
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.div 
                  key={STEPS[currentStep].id}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0.6, ease: "circOut" }}
                  className="w-full"
                >
                  <span className="text-silence text-metallic-brass mb-fb4 block opacity-100">{STEPS[currentStep].label}</span>
                  <h3 className="text-4xl md:text-7xl font-heading text-off-white mb-fb5 leading-none uppercase tracking-tighter">
                    {STEPS[currentStep].question}
                  </h3>
                  
                  <div className="relative group max-w-2xl">
                    {STEPS[currentStep].type === "textarea" ? (
                      <textarea 
                        autoFocus
                        placeholder={STEPS[currentStep].placeholder}
                        className="w-full bg-transparent border-b-[1.5px] border-metallic-brass/45 p-fb2 md:p-fb3 outline-none text-2xl md:text-4xl font-heading text-metallic-brass focus:border-metallic-brass focus:border-b-2 transition-all duration-500 placeholder:text-metallic-brass/40 italic min-w-[180px] text-center resize-none h-48"
                        onChange={(e) => setFormData({ ...formData, [STEPS[currentStep].id]: e.target.value })}
                      />
                    ) : (
                      <input 
                        autoFocus
                        type={STEPS[currentStep].type}
                        placeholder={STEPS[currentStep].placeholder}
                        className="w-full bg-transparent border-b-[1.5px] border-metallic-brass/45 p-fb2 md:p-fb3 outline-none text-2xl md:text-5xl font-heading text-metallic-brass focus:border-metallic-brass focus:border-b-2 transition-all duration-500 placeholder:text-metallic-brass/40 italic min-w-[180px] text-center"
                        onChange={(e) => setFormData({ ...formData, [STEPS[currentStep].id]: e.target.value })}
                        onKeyDown={(e) => e.key === "Enter" && handleNext()}
                      />
                    )}
                    
                    {/* The Signature Line Animation */}
                    <motion.div 
                      layoutId="signature-line"
                      className="absolute bottom-0 left-0 h-px bg-metallic-brass shadow-[0_0_20px_rgba(197,160,89,0.4)]"
                      style={{ width: "100%" }}
                    />
                  </div>
 
                  <div className="mt-fb5 flex items-center gap-fb4">
                    <button 
                      onClick={handleNext}
                      className="btn-warrior flex items-center gap-4"
                    >
                      {currentStep === STEPS.length - 1 ? "SEND THE SIGNAL" : "NEXT PROTOCOL"}
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <span className="text-[10px] tracking-widest text-off-white/20 uppercase font-ui">
                      {currentStep + 1} / {STEPS.length}
                    </span>
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-start gap-fb4 p-fb6 border border-metallic-brass/20 blade-motif bg-metallic-brass/5"
                >
                  <div className="w-16 h-16 rounded-full border border-metallic-brass flex items-center justify-center mb-fb2">
                    <Check className="text-metallic-brass w-8 h-8" />
                  </div>
                  <h3 className="text-4xl md:text-6xl font-heading text-off-white uppercase leading-none tracking-tighter">
                    Signal <br /> Received.
                  </h3>
                  <p className="text-off-white/40 text-xl font-body italic leading-relaxed max-w-sm">
                    The forge remains silent. <br /> 
                    Our lead architect will contact you <br /> 
                    within one operational cycle.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
  
          {/* Strategic Context (38.2%) */}
          <div className="md:col-span-4 flex flex-col gap-fb7 h-full pt-fb6 md:pt-0">
            
            {/* Minimal FAQ Strip */}
            <div className="space-y-fb6 border-l border-white/5 pl-fb4 md:pl-fb5">
              <div className="group">
                <span className="section-label mb-2 block tracking-[0.22em]">01 // Cycle Time</span>
                <p className="text-white/85 text-lg md:text-xl font-body leading-relaxed group-hover:text-white transition-colors no-prose">
                  Architectures ship in 4–12 weeks depending on systemic depth.
                </p>
              </div>
 
              <div className="group">
                <span className="section-label mb-2 block tracking-[0.22em]">02 // Governance</span>
                <p className="text-white/85 text-lg md:text-xl font-body leading-relaxed group-hover:text-white transition-colors no-prose">
                  Every build is operator-led. No middlemen. Direct access to the architects.
                </p>
              </div>
            </div>
  
            {/* Quick Resolution Pod — Truncation Fixed */}
            <div className="p-fb5 border border-white/5 bg-royal-obsidian/40 blade-motif mt-auto">
                <p className="text-metallic-brass font-ui text-[10px] tracking-[0.5em] mb-fb3 uppercase">Direct Line — Africa HQ</p>
                <div className="overflow-hidden">
                  <a href="mailto:architect@samaria.tech" className="text-xl md:text-[2rem] text-off-white font-heading hover:text-metallic-brass transition-colors tracking-tighter block break-all">
                    architect@samaria.tech
                  </a>
                </div>
            </div>
  
          </div>
  
        </div>
      </div>
    </section>
  );
}
