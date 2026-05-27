"use client";
  
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dynamic from "next/dynamic";
import FloatingCircuits from "@/components/animations/FloatingCircuits";
import WarriorLogo from "@/components/ui/WarriorLogo";
import { useHaptics } from "@/hooks/useHaptics";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useCelestial } from "@/components/providers/CelestialProvider";
import CinematicText from "@/components/ui/CinematicText";
import { CelestialText } from "@/components/ui/CelestialText";
import { useTextFit } from "@/hooks/useTextFit";

const Hero3DCanvas = dynamic(() => import("@/components/animations/Hero3DCanvas"), {
  ssr: false,
});
  
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}
  
export default function Hero() {
  const [showSplash, setShowSplash] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const { clink } = useHaptics();
  const { setIsCinematicMode } = useCelestial();
  
  // TRACKING & SCALING CONSTANTS
  const TRACKING = -0.05;
  const CONTENT_WIDTH_SCALE = 0.95;
  const BRONZE_COLOR = "rgba(201, 168, 76, 0.85)";

  // Track viewport width for pretext calculations
  const [availableWidth, setAvailableWidth] = useState(1200);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        // Reduced padding for mobile fit
        const padding = window.innerWidth < 768 ? 40 : 80;
        setAvailableWidth(containerRef.current.offsetWidth - padding);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Line 1: BUILT TO OUTLAST
  const buildSize = useTextFit("BUILT TO OUTLAST", {
    maxWidth: availableWidth * CONTENT_WIDTH_SCALE,
    maxHeight: 180,
    font: "'Cinzel Decorative', serif",
    lineHeight: 1,
    initialFontSize: 110,
    minFontSize: 16,
    maxLines: 1,
    letterSpacing: TRACKING * 110
  });

  // Line 2: EVERYONE ELSE.
  const africaSize = useTextFit("EVERYONE ELSE.", {
    maxWidth: availableWidth * CONTENT_WIDTH_SCALE,
    maxHeight: 180,
    font: "'Cinzel Decorative', serif",
    lineHeight: 1,
    initialFontSize: 110,
    minFontSize: 16,
    maxLines: 1,
    letterSpacing: TRACKING * 110
  });

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (showSplash) return;

    const ctx = gsap.context(() => {
      // THE STRIKE: Prepare elements for a premium reveal
      gsap.set(".hero-guide-line", { scaleY: 0 });
      gsap.set(".hero-title-line", { 
        autoAlpha: 0, 
        y: 40,
        clipPath: "inset(0% 100% 0% 0%)" // Hidden in the 'sheath' from the right
      });
      gsap.set(".hero-content", { autoAlpha: 0, y: 15 });

      const tl = gsap.timeline({ 
        defaults: { ease: "power4.out" },
        delay: 0.4, 
      });

      // 1. Draw the vertical guide line down
      tl.to(".hero-guide-line", {
        scaleY: 1,
        duration: 1.2,
        ease: "power3.inOut"
      });

      // 2. Initial 'Sheath' Expansion (Horizontal draw)
      tl.to(".hero-title-line", {
        clipPath: "inset(0% 0% 0% 0%)",
        autoAlpha: 1,
        y: 0,
        duration: 1.0,
        stagger: 0.15,
        ease: "expo.out"
      }, "-=0.6");

      // 3. Vertical 'Strike' (Refining the baseline)
      tl.from(".hero-title-line", {
        scaleY: 0.85,
        transformOrigin: "bottom left",
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(1.5)"
      }, "-=0.8");

      // 4. Narrative Reveal
      tl.to(".hero-content", {
        y: 0,
        autoAlpha: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out"
      }, "-=0.5");

    }, containerRef);
    
    return () => ctx.revert();
  }, [showSplash]);
  
  return (
    <section ref={containerRef} className="relative min-h-screen flex flex-col overflow-hidden py-24 md:py-0">
      
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
 
      <div className="absolute top-0 right-0 w-full md:layout-38 h-full z-0 pointer-events-none flex items-center justify-center overflow-hidden">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.03 }}
          transition={{ duration: 3, delay: 3 }}
          className="absolute inset-0 bg-parchment-grain"
        />
      </div>
 
       <div className="container max-w-[1500px] mx-auto px-fb3 md:px-fb4 flex-1 relative z-50 grid grid-cols-1 md:grid-cols-10 items-center">
        <div className="md:col-span-10 flex flex-col justify-center text-left py-fb5 pt-[10vh] md:pt-[8vh]">
          
          {/* Main vertical border Guide Container */}
          <div className="pl-6 md:pl-8 py-2 relative hero-guided-container">
            {/* Ambient backing gradient for legibility against parallax background */}
            <div className="absolute -inset-y-4 -left-8 -right-8 bg-gradient-to-r from-royal-obsidian via-royal-obsidian/80 to-transparent blur-md -z-10 opacity-90 pointer-events-none" />
            
            {/* Guide line drawing animation element */}
            <div className="hero-guide-line absolute left-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-metallic-brass/80 via-metallic-brass/30 to-transparent origin-top" />
            
            {/* UI Prefix Header */}
            <div className="hero-content opacity-0 mb-fb1 flex items-center gap-3">
              <span className="w-1.5 h-1.5 rotate-45 bg-metallic-brass animate-pulse" />
              <span className="text-[10px] md:text-xs font-ui tracking-[0.4em] text-metallic-brass uppercase font-bold">
                CUSTOM WEBSITES • CLOUD OPERATIONS • ENTERPRISE SYSTEMS
              </span>
            </div>

            <h1 className="mb-fb2 font-heading w-full uppercase">
              <div className="p-0 m-0 block mb-2 md:mb-3">
                <div className="hero-title-line block">
                  <CinematicText 
                    fontSize={buildSize}
                    maxWidth={availableWidth * CONTENT_WIDTH_SCALE}
                    className="font-black leading-none block"
                    baseColor="rgba(242, 237, 216, 0.95)"
                    horizontalAlign="left"
                    letterSpacing={TRACKING * buildSize}
                    maxLines={1}
                  >
                    BUILT TO OUTLAST
                  </CinematicText>
                </div>
              </div>
              
              <div className="p-0 m-0 block mb-4 md:mb-5">
                <div className="hero-title-line block">
                  <CinematicText 
                    fontSize={africaSize}
                    maxWidth={availableWidth * CONTENT_WIDTH_SCALE}
                    className="font-black block"
                    baseColor={BRONZE_COLOR}
                    horizontalAlign="left"
                    letterSpacing={TRACKING * africaSize}
                    maxLines={1}
                  >
                    EVERYONE ELSE.
                  </CinematicText>
                </div>
              </div>
            </h1>

            <div className="hero-content text-off-white/80 max-w-lg mb-fb2 text-base md:text-lg font-body leading-relaxed opacity-0">
              <p className="no-prose">
                Some businesses want a simple site. We build the secure web applications, digital workflows, and cloud-native databases your next decade runs on.
              </p>
            </div>

            <div className="hero-content opacity-0 flex flex-col sm:flex-row items-stretch sm:items-center gap-fb2">
              <CelestialText intensity={0.3}>
                <Link 
                  href="/start-project" 
                  onClick={() => setIsCinematicMode(true)}
                  className="btn-warrior group flex items-center justify-center gap-4 py-3 px-8 text-sm"
                >
                  BEGIN THE BUILD
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </CelestialText>
              <CelestialText intensity={0.3}>
                <button 
                  onMouseEnter={clink}
                  onClick={clink}
                  className="btn-ghost border border-white/10 hover:border-metallic-brass/40 px-6 py-3 transition-all duration-500 uppercase tracking-widest text-[10px] w-full sm:w-auto text-center"
                >
                  VIEW THE SYSTEMS
                </button>
              </CelestialText>
            </div>
          </div>
        </div>
      </div>
 
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
        <Hero3DCanvas />
      </div>
      <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none">
        <FloatingCircuits />
      </div>
    </section>
  );
}
