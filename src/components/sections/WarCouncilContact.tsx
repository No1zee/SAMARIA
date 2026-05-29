"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { useHaptics } from "@/hooks/useHaptics";
import CelestialHeading from "@/components/ui/CelestialHeading";

export default function WarCouncilContact() {
  const { clink, slash } = useHaptics();
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    systemType: "",
    timeline: "",
    brief: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validations
    if (!formData.name.trim()) {
      setValidationError("Please enter your name.");
      return;
    }
    if (!formData.email.trim() || !formData.email.includes("@")) {
      setValidationError("Please enter a valid email address.");
      return;
    }
    if (!formData.systemType) {
      setValidationError("Please select a system type.");
      return;
    }
    if (!formData.brief.trim()) {
      setValidationError("Please provide a brief description of your project.");
      return;
    }

    setValidationError(null);
    setIsSending(true);
    clink();

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || 'Failed to submit brief.');
      }

      slash();
      setSubmitted(true);
    } catch (error: any) {
      console.error('Intake form submission error:', error);
      setValidationError(error.message || 'An unexpected network error occurred. Please try again.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section id="contact" className="pt-16 pb-32 md:pt-fb9 md:pb-[24rem] relative overflow-hidden border-t border-white/5 z-10">
      
      {/* Background Texture Overlay */}
      <div className="absolute inset-0 bg-parchment-grain opacity-5 pointer-events-none mix-blend-overlay" />

      <div className="container max-w-[1500px] mx-auto px-fb3 md:px-fb4 relative z-10">
        <div className="absolute inset-0 bg-gradient-to-r from-royal-obsidian via-royal-obsidian/80 to-transparent blur-md opacity-90 pointer-events-none -z-10" />
        
        {/* Section Header */}
        <div className="mb-fb8 border-l border-metallic-brass/40 pl-6 md:pl-8">
          <div className="flex items-center gap-fb2 mb-fb3">
            <span className="text-[10px] tracking-[0.2em] font-ui text-metallic-brass uppercase">START A PROJECT</span>
          </div>
          <CelestialHeading 
            text={"Tell us what\nneeds to be built."}
            as="h2"
            fontSize={128}
            className="text-5xl md:text-[8rem]"
            intensity={1.2}
          />
          <p className="text-white/80 text-lg md:text-xl font-body leading-relaxed max-w-2xl mt-6 no-prose">
            We build websites, systems, and operational software for businesses that need something reliable, clear, and built to last. Share the outline of your project and we will take it from there.
          </p>
        </div>

        <div className="max-w-4xl bg-white/2 border border-white/5 backdrop-blur-md p-8 md:p-12 relative group overflow-hidden clip-blade-sm">
          {/* Ambient Corner Effects */}
          <div className="absolute top-0 right-0 w-24 h-24 border-t border-r border-metallic-brass/10 z-0" />
          <div className="absolute bottom-0 left-0 w-24 h-24 border-b border-l border-metallic-brass/10 z-0" />
          
          <AnimatePresence mode="wait">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name field */}
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-metallic-brass/60 font-ui block">
                      01 // YOUR NAME
                    </label>
                    <input
                      type="text"
                      placeholder="Your Name"
                      value={formData.name}
                      disabled={isSending}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-transparent border-b border-white/10 text-lg text-metallic-brass focus:border-metallic-brass focus:outline-none py-2 transition-colors duration-500 placeholder-white/20 font-body disabled:opacity-50"
                    />
                  </div>

                  {/* Company field */}
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-metallic-brass/60 font-ui block">
                      02 // COMPANY NAME
                    </label>
                    <input
                      type="text"
                      placeholder="Company Name"
                      value={formData.company}
                      disabled={isSending}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full bg-transparent border-b border-white/10 text-lg text-metallic-brass focus:border-metallic-brass focus:outline-none py-2 transition-colors duration-500 placeholder-white/20 font-body disabled:opacity-50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Email field */}
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-metallic-brass/60 font-ui block">
                      03 // WORK EMAIL
                    </label>
                    <input
                      type="email"
                      placeholder="Work Email"
                      value={formData.email}
                      disabled={isSending}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-transparent border-b border-white/10 text-lg text-metallic-brass focus:border-metallic-brass focus:outline-none py-2 transition-colors duration-500 placeholder-white/20 font-body disabled:opacity-50"
                    />
                  </div>

                  {/* System Type Selection */}
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-metallic-brass/60 font-ui block">
                      04 // SYSTEM TYPE
                    </label>
                    <select
                      value={formData.systemType}
                      disabled={isSending}
                      onChange={(e) => setFormData({ ...formData, systemType: e.target.value })}
                      className="w-full bg-transparent border-b border-white/10 text-lg text-metallic-brass focus:border-metallic-brass focus:outline-none py-2 transition-colors duration-500 font-body cursor-pointer [&>option]:bg-royal-obsidian [&>option]:text-off-white disabled:opacity-50"
                    >
                      <option value="" disabled className="text-white/20">Select System Type...</option>
                      <option value="Websites & Applications">Websites & Applications</option>
                      <option value="Business Systems & Infrastructure">Business Systems & Infrastructure</option>
                      <option value="Custom Tools & Automation">Custom Tools & Automation</option>
                      <option value="Other Custom Build">Other Custom Build</option>
                    </select>
                  </div>
                </div>

                {/* Timeline field */}
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-metallic-brass/60 font-ui block">
                    05 // DESIRED TIMELINE
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., 2-3 Months, Immediate, Q3 Launch"
                    value={formData.timeline}
                    disabled={isSending}
                    onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                    className="w-full bg-transparent border-b border-white/10 text-lg text-metallic-brass focus:border-metallic-brass focus:outline-none py-2 transition-colors duration-500 placeholder-white/20 font-body disabled:opacity-50"
                  />
                </div>

                {/* Brief field */}
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-metallic-brass/60 font-ui block">
                    06 // PROJECT BRIEF
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about the challenges you're facing and what you need built..."
                    value={formData.brief}
                    disabled={isSending}
                    onChange={(e) => setFormData({ ...formData, brief: e.target.value })}
                    className="w-full bg-transparent border-b border-white/10 text-lg text-metallic-brass focus:border-metallic-brass focus:outline-none py-2 transition-colors duration-500 placeholder-white/20 resize-none font-body disabled:opacity-50"
                  />
                </div>

                {/* Validation Error Alert */}
                <AnimatePresence>
                  {validationError && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-red-400 text-xs md:text-sm font-ui uppercase tracking-wider"
                    >
                      {validationError}
                    </motion.p>
                  )}
                </AnimatePresence>

                {/* Submit Controls */}
                <div className="flex items-center justify-between pt-4">
                  <button
                    type="submit"
                    onMouseEnter={clink}
                    disabled={isSending}
                    className="btn-warrior flex items-center gap-4 group cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSending ? "SENDING..." : "SUBMIT BRIEF"}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <span className="text-[9px] tracking-[0.2em] font-ui text-white/25 uppercase hidden sm:inline">
                    [ Response in 24 Hours ]
                  </span>
                </div>
              </form>
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-fb4 border border-metallic-brass/10 bg-metallic-brass/5 backdrop-blur-sm clip-blade max-w-2xl relative z-10 w-full"
              >
                <div className="flex items-center gap-4 mb-fb4">
                  <div className="w-12 h-12 rounded-full border border-metallic-brass/40 flex items-center justify-center">
                    <Check className="text-metallic-brass w-6 h-6" />
                  </div>
                  <span className="text-[10px] tracking-[0.4em] font-ui text-metallic-brass uppercase">Brief Received</span>
                </div>
                <CelestialHeading 
                  text={"Thank You."}
                  as="h3"
                  fontSize={64}
                  className="text-4xl md:text-6xl mb-4"
                  intensity={0.8}
                />
                <p className="text-off-white/80 text-lg md:text-xl font-body leading-relaxed max-w-sm italic no-prose">
                  Your brief has been logged. We will review and reach out within 24 hours to schedule a diagnostic call.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
