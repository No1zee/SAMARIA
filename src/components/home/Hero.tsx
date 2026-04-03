"use client";
 
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FloatingCircuits from "@/components/animations/FloatingCircuits";
import WarriorLogo from "@/components/ui/WarriorLogo";
import { useHaptics } from "@/hooks/useHaptics";
import EclipseText from "@/components/ui/EclipseText";
 
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}
 
export default function Hero() {
  const [showSplash, setShowSplash] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const { clink, slash } = useHaptics();
 
  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2200);
    return () => clearTimeout(timer);
  }, []);
 
  useEffect(() => {
    if (showSplash) return;
 
    const ctx = gsap.context(() => {
      // Force initial hidden state
      gsap.set([".hero-title-line", ".hero-content"], { autoAlpha: 0, y: 30 });
      gsap.set(".hero-blade-spine", { height: 0 });
      gsap.set(".horizon-line", { scaleX: 0 });

      const tl = gsap.timeline({ 
        defaults: { ease: "power4.out" },
        delay: 0.8, 
      });

      // 1. Blade Drop (The Visual Anchor)
      tl.to(".hero-blade-spine", {
        height: "100vh",
        duration: 1.2,
        ease: "expo.out",
      });

      // 2. Horizon Line Reveal (Fibonacci 61.8%)
      tl.to(".horizon-line", {
        scaleX: 1,
        duration: 1.5,
        ease: "circ.out",
      }, "-=0.8");

      // 3. Title Staggers (Strict Fibonacci)
      tl.to(".hero-title-line", {
        y: 0,
        autoAlpha: 1,
        duration: 1.4,
        stagger: 0.15,
      }, "-=1.2"); 

      tl.to(".hero-content", {
        y: 0,
        autoAlpha: 1,
        duration: 0.8,
        stagger: 0.1
      }, "-=0.6");

    }, containerRef);
    
    return () => ctx.revert();
  }, [showSplash]);
 
  return (
    <section ref={containerRef} className="relative h-screen flex flex-col overflow-hidden">
      
      <AnimatePresence>
        {showSplash && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 bg-royal-obsidian flex items-center justify-center pointer-events-none"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="relative"
            >
              <div className="w-48 h-48">
                <WarriorLogo />
              </div>
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 0.5, duration: 1 }}
                className="absolute -bottom-4 left-0 h-px bg-metallic-brass/40"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
 
      {/* Movement VI: The Hero Blade (Spine) */}
      {!showSplash && <div className="absolute left-[38.2%] top-0 w-px bg-metallic-brass/5 z-40 hero-blade-spine" />}

      {/* Movement VII: The Horizon Line (61.8vh) */}
      <div className="absolute top-[61.8vh] left-0 w-full h-px bg-white/5 z-0 origin-left horizon-line" />
 
      {/* Subordinate Visual Mass (Silenced) */}
      <div className="absolute top-0 right-0 w-full md:layout-38 h-full z-0 pointer-events-none flex items-center justify-center overflow-hidden">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.03 }}
          transition={{ duration: 3, delay: 3 }}
          className="absolute inset-0 bg-parchment-grain"
        />
      </div>
 
      {/* Dominant Content Grid (61.8% Split) */}
      <div className="container max-w-[1500px] mx-auto px-fb3 md:px-fb4 flex-1 relative z-10 grid grid-cols-1 md:grid-cols-10 h-full items-center">
        
        {/* 62% Dominant Zone */}
        <div className="md:col-span-8 flex flex-col justify-center text-left py-fb7 pt-[15vh]">
          
          <h1 className="mb-fb5 font-heading w-full uppercase">
              {/* Line 1: DIGITAL (Staggered Left) */}
              <div className="overflow-hidden mb-2">
                <div className="hero-title-line ml-[8vw]">
                  <EclipseText 
                    className="text-[12vw] md:text-[8rem] tracking-tight font-black leading-none block"
                    baseColor="rgba(242, 237, 216, 0.4)"
                  >
                    DIGITAL
                  </EclipseText>
                </div>
              </div>
              
              {/* Line 2: TRANSFORMATION (Bleeding Right) */}
              <div className="overflow-hidden mb-4">
                <div className="hero-title-line">
                  <EclipseText 
                    className="text-[14vw] md:text-[10rem] tracking-tighter font-black leading-none block text-nowrap"
                    baseColor="rgba(242, 237, 216, 0.6)"
                  >
                    TRANSFORMATION
                  </EclipseText>
                </div>
              </div>

              {/* Line 3: FOR AFRICAN (Gold Accent) */}
              <div className="overflow-hidden mb-2">
                <div className="hero-title-line ml-[13vw]">
                  <EclipseText 
                    className="text-[6vw] md:text-[3.5rem] tracking-[0.3em] font-medium block"
                    baseColor="rgba(201, 168, 76, 0.5)"
                  >
                    FOR AFRICAN
                  </EclipseText>
                </div>
              </div>

              {/* Line 4: BUSINESS. (Red Accent) */}
              <div className="overflow-hidden">
                <div className="hero-title-line ml-[5vw]">
                  <EclipseText 
                    className="text-[10vw] md:text-[6rem] tracking-widest font-black block"
                    baseColor="rgba(196, 43, 43, 0.6)"
                  >
                    BUSINESS.
                  </EclipseText>
                </div>
              </div>
          </h1>
 
          <div className="hero-content text-off-white/40 max-w-sm ml-[13vw] mb-fb6 text-lg md:text-xl font-body leading-relaxed opacity-0">
              <p>
                We engineer bespoke systems that turn operational complexity 
                into durable competitive advantage.
              </p>
          </div>
 
          {/* Primary Action Sequence */}
          <div className="hero-content opacity-0 flex flex-col md:flex-row items-start gap-fb4 ml-[13vw]">
              <button 
                onMouseEnter={clink}
                onClick={slash}
                className="btn-warrior"
              >
                Start a Project
              </button>
              <button 
                onMouseEnter={clink}
                onClick={clink}
                className="btn-ghost"
              >
                [ View Work ]
              </button>
          </div>
        </div>
 
      </div>
 
      {/* Floating Elements (Silenced) */}
      <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none">
        <FloatingCircuits />
      </div>
    </section>
  );
}
