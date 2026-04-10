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
    { name: "Manifesto", href: "#manifesto" },
    { name: "Case Studies", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ],
};

const socials = [
  { icon: <Twitter className="w-4 h-4" />, href: "https://twitter.com/samariatech", label: "Twitter" },
  { icon: <Linkedin className="w-4 h-4" />, href: "https://linkedin.com/company/samariatech", label: "LinkedIn" },
  { icon: <Github className="w-4 h-4" />, href: "https://github.com/samariatech", label: "GitHub" },
];

export default function Footer() {
  const [year, setYear] = useState<number>(2026);
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Backlight intensity: triggers at the very end of the scroll (92% to 100%)
  const glowOpacity = useTransform(smoothProgress, [0.92, 0.98, 1], [0, 0.8, 0.4]);
  const glowScaleY = useTransform(smoothProgress, [0.92, 1], [0, 1]);
  
  // Simulated subsurface scattering colors: Blood Crimson to Dawn Amber
  const glowColor = useTransform(
    smoothProgress,
    [0.92, 0.96, 1],
    ["rgba(139, 0, 0, 0)", "rgba(139, 0, 0, 0.6)", "rgba(201, 168, 76, 0.3)"]
  );

  useEffect(() => {
    // Async update to satisfy React 19 cascading render checks
    queueMicrotask(() => setYear(new Date().getFullYear()));
  }, []);

  return (
    <footer className="border-t border-metallic-brass/20 relative overflow-hidden py-fb8 md:py-fb9">
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
            <p className="text-off-white/40 text-xl md:text-2xl leading-[1.4] max-w-2xl mb-fb6 font-body">
              Engineering Africa’s digital future. <br className="hidden md:block" />
              Built for permanence. Licensed for expansion.
            </p>
          </div>

          {/* Links Grid (38%) */}
          <div className="md:col-span-4 grid grid-cols-2 gap-fb4 text-right md:text-left h-fit self-center">
            <div className="flex flex-col gap-fb3">
              <ul className="space-y-fb2">
                {footerLinks.Company.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-[10px] md:text-xs text-off-white/20 hover:text-metallic-brass transition-colors uppercase tracking-[0.3em] font-ui">
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
                    <a href={social.href} className="text-[10px] md:text-xs text-off-white/20 hover:text-metallic-brass transition-colors uppercase tracking-[0.3em] font-ui">
                      {social.label}
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
            <span className="text-[9px] md:text-xs font-ui text-off-white/10 uppercase tracking-[0.4em]">
              © {year} Samaria Tech Ltd. // Gaborone, Botswana
            </span>
          </div>
          <div className="flex items-center gap-fb5 text-[9px] md:text-xs font-ui text-off-white/10 uppercase tracking-[0.4em]">
            <Link href="/privacy" className="hover:text-off-white transition-colors">Privacy Protocol</Link>
            <Link href="/terms" className="hover:text-off-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
