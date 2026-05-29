"use client";
 
import Link from "next/link";
import { Twitter, Linkedin, Github } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
 
const footerLinks = {
  Services: [
    { name: "Web Architecture", href: "#services" },
    { name: "Brand Identity", href: "#services" },
    { name: "Digital Ecosystems", href: "#services" },
  ],
  Company: [
    { name: "About Us", href: "/about-us" },
    { name: "Case Studies", href: "#artifacts" },
    { name: "Contact", href: "#contact" },
  ],
};
 
const socials = [
  { icon: <Twitter className="w-4 h-4" />, href: "https://twitter.com/samariatech", label: "Twitter" },
  { icon: <Linkedin className="w-4 h-4" />, href: "https://linkedin.com/company/samariatech", label: "LinkedIn" },
  { icon: <Github className="w-4 h-4" />, href: "https://github.com/No1zee/SAMARIA", label: "GitHub" },
];
 
export default function Footer() {
  const [year, setYear] = useState<number>(2026);
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
 
  // Backlight intensity: telegraphs the Blood Moon early (70% to 100%)
  const glowOpacity = useTransform(smoothProgress, [0.70, 0.85, 0.95, 1], [0, 0.3, 0.8, 0.4]);
  const glowScaleY = useTransform(smoothProgress, [0.70, 1], [0.2, 1]);
  
  // Simulated subsurface scattering colors: Blood Crimson to Dawn Amber
  const glowColor = useTransform(
    smoothProgress,
    [0.70, 0.85, 0.96, 1],
    ["rgba(139, 0, 0, 0)", "rgba(139, 0, 0, 0.3)", "rgba(139, 0, 0, 0.6)", "rgba(201, 168, 76, 0.3)"]
  );
 
  useEffect(() => {
    // Async update to satisfy React 19 cascading render checks
    queueMicrotask(() => setYear(new Date().getFullYear()));
  }, []);
 
  return (
    <footer className="border-t border-metallic-brass/20 relative overflow-hidden pt-fb6 md:pt-fb8 pb-fb3 md:pb-fb4 bg-royal-obsidian/75 backdrop-blur-lg z-10">
      {/* SUBSURFACE BACKLIGHT GLOW (The "Torch Through Fingers" Effect) */}
      <motion.div 
        style={{ 
          opacity: glowOpacity,
          scaleY: glowScaleY,
          background: `radial-gradient(ellipse at 76.4% 0%, ${glowColor} 0%, rgba(0,0,0,0) 70%)`
        }}
        className="absolute inset-x-0 top-0 h-64 origin-top pointer-events-none z-0 transition-colors duration-500"
      />
 
      <div className="container max-w-[1500px] mx-auto px-fb3 md:px-fb4 relative z-10">
        
        {/* Top Grid - Asymmetric 62/38 */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-fb6 mb-fb8">
          
          {/* Brand & Mission (62%) */}
          <div className="md:col-span-8">
            <Link href="/" className="inline-flex items-center gap-fb1 mb-fb5 group">
              <span className="font-heading text-4xl md:text-5xl tracking-[0.4em] text-metallic-brass group-hover:text-off-white transition-colors duration-500 uppercase">
                SAMARIA
              </span>
            </Link>
            <p className="text-off-white/60 text-xl md:text-[2.5rem] leading-none max-w-2xl mb-fb4 font-heading uppercase tracking-tighter">
              BUILT FOR <br className="hidden md:block" />
              THE LONG RUN.
            </p>
            <div className="flex flex-col gap-2 mb-fb6">
              <a href="mailto:mission@samaria.tech" className="text-metallic-brass/60 hover:text-metallic-brass transition-colors uppercase tracking-[0.2em] text-[10px] md:text-xs font-ui">
                mission@samaria.tech
              </a>
              <span className="text-off-white/20 uppercase tracking-[0.2em] text-[10px] md:text-xs font-ui">
                HQ // Gaborone, Botswana
              </span>
            </div>
          </div>
 
          {/* Links Grid (38%) */}
          <div className="md:col-span-4 grid grid-cols-2 gap-fb4 text-right md:text-left h-fit self-center">
            <div className="flex flex-col gap-fb3">
              <ul className="space-y-fb2">
                {footerLinks.Company.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href} 
                      className="text-[10px] md:text-xs text-off-white/60 hover:text-metallic-brass transition-colors uppercase tracking-[0.3em] font-ui relative after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-px after:bg-metallic-brass hover:after:w-full after:transition-all after:duration-300 pb-0.5"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-fb3">
              <ul className="space-y-fb2">
                {socials.map((social) => (
                  <li key={social.label}>
                    <a 
                      href={social.href} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="inline-flex items-center gap-1.5 text-[10px] md:text-xs text-off-white/60 hover:text-metallic-brass transition-colors uppercase tracking-[0.3em] font-ui relative after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-px after:bg-metallic-brass hover:after:w-full after:transition-all after:duration-300 pb-0.5 group/link"
                    >
                      <span className="opacity-60 group-hover/link:opacity-100 transition-opacity">
                        {social.icon}
                      </span>
                      <span>{social.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
 
        </div>
 
        {/* Bottom Bar — Minimal Metadata */}
        <div className="pt-fb5 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-fb4">
          <div className="flex items-center gap-fb3">
            <div className="w-1.5 h-1.5 rounded-full bg-metallic-brass/40 animate-pulse" />
            <span className="text-[9px] md:text-xs font-ui text-off-white/40 uppercase tracking-[0.4em]">
              © {year} SAMARIA ARCHITECTURAL SYSTEMS.
            </span>
          </div>

          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="text-[9px] md:text-xs font-ui text-metallic-brass hover:text-white transition-colors uppercase tracking-[0.4em] flex items-center gap-1 cursor-pointer focus:outline-none"
          >
            ↑ Back to Top
          </button>

          <div className="flex items-center gap-fb5 text-[9px] md:text-xs font-ui text-off-white/40 uppercase tracking-[0.4em]">
            <Link href="/privacy" className="hover:text-off-white transition-colors">Privacy Protocol</Link>
            <Link href="/terms" className="hover:text-off-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
