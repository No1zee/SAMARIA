"use client";
  
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FloatingCircuits from "@/components/animations/FloatingCircuits";
import WarriorLogo from "@/components/ui/WarriorLogo";
import { useHaptics } from "@/hooks/useHaptics";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useCelestial } from "@/components/providers/CelestialProvider";
import CinematicText from "@/components/ui/CinematicText";
import { CelestialText } from "@/components/ui/CelestialText";
import { useTextFit } from "@/hooks/useTextFit";
  
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
      // THE STRIKE: Prepare lines for a 'blade-draw' reveal
      gsap.set(".hero-title-line", { 
        autoAlpha: 0, 
        y: 60,
        clipPath: "inset(0% 100% 0% 0%)" // Hidden in the 'sheath' from the right
      });
      gsap.set(".hero-content", { autoAlpha: 0, y: 20 });

      const tl = gsap.timeline({ 
        defaults: { ease: "power4.out" },
        delay: 0.6, 
      });

      // 1. Initial 'Sheath' Expansion (Horizontal draw)
      tl.to(".hero-title-line", {
        clipPath: "inset(0% 0% 0% 0%)",
        autoAlpha: 1,
        y: 0,
        duration: 1.2,
        stagger: {
          each: 0.15,
          from: "start"
        },
        ease: "expo.out"
      });

      // 2. Vertical 'Strike' (Refining the baseline)
      tl.from(".hero-title-line", {
        scaleY: 0.8,
        transformOrigin: "bottom left",
        duration: 0.8,
        stagger: 0.1,
        ease: "elastic.out(1, 0.8)"
      }, "-=1");

      // 3. Narrative Reveal
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
        <div className="md:col-span-10 flex flex-col justify-center text-left py-fb7 pt-[15vh] md:pt-[12vh]">
          
          <h1 className="mb-fb6 font-heading w-full uppercase">
              <div className="p-0 m-0 block mb-6 md:mb-8">
                <div className="hero-title-line block ml-2 md:ml-[2vw]">
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
              
              <div className="p-0 m-0 block mb-12 md:mb-16">
                <div className="hero-title-line block ml-2 md:ml-[12vw]">
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

          <div className="hero-content text-off-white/40 max-w-sm ml-4 md:ml-[6vw] mt-fb2 md:mt-0 mb-fb6 text-base md:text-xl font-body leading-relaxed opacity-0">
              <CelestialText intensity={0.5} as="p">
                Some businesses want a website. Others want the infrastructure their next decade runs on. We build for the second kind.
              </CelestialText>
          </div>

          <div className="hero-content opacity-0 flex flex-col md:flex-row items-start gap-fb4 ml-4 md:ml-[6vw]">
              <CelestialText intensity={0.3}>
                <Link 
                  href="/start-project" 
                  onClick={() => setIsCinematicMode(true)}
                  className="btn-warrior group flex items-center gap-4 py-fb4 px-fb6 md:py-fb5 md:px-fb8 text-base md:text-xl"
                >
                  BEGIN THE BUILD
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </CelestialText>
              <CelestialText intensity={0.3}>
                <button 
                  onMouseEnter={clink}
                  onClick={clink}
                  className="btn-ghost border border-white/10 hover:border-metallic-brass/40 px-6 py-2 transition-all duration-500 uppercase tracking-widest text-xs"
                >
                  VIEW THE SYSTEMS
                </button>
              </CelestialText>
          </div>
        </div>
      </div>
 
      <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none">
        <FloatingCircuits />
      </div>
    </section>
  );
}
