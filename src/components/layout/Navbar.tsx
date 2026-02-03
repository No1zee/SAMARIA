"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";

const navItems = [
  { name: "Services", href: "#services" },
  { name: "Manifesto", href: "#manifesto" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  const rotate = useTransform(scrollY, [0, 1000], [0, 360]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-royal-obsidian/90 backdrop-blur-md border-b border-brand-gold/20 py-4 shadow-lg"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container max-w-[1200px] mx-auto px-6 flex items-center justify-between">

        {/* Logo */}
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-3">
           {/* Icon Container (Masked) */}
           <motion.div 
             style={{ rotate }} 
             className="relative h-12 w-12 rounded-full border border-brand-gold/20 flex items-center justify-center overflow-hidden"
           >
             <Image
               src="/logo_icon.webp"
               alt="Samaria Icon"
               width={64}
               height={64}
               className="h-full w-full object-contain p-1 mix-blend-screen" 
               priority
             />
           </motion.div>

           {/* Static Text */}
           <span className="font-heading text-xl md:text-2xl tracking-widest text-off-white group-hover:text-gold-metallic transition-colors duration-300">
             SAMARIA
           </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="font-ui text-xs uppercase tracking-[0.2em] text-off-white/70 hover:text-brand-gold transition-colors relative group"
            >
              {item.name}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-brand-gold group-hover:w-full transition-all duration-300"></span>
            </Link>
          ))}
        </div>

        {/* CTA Button */}
        <div className="hidden md:block">
            <Link 
                href="#contact"
                className="font-ui text-xs font-bold uppercase tracking-widest bg-gold-metallic text-royal-obsidian px-6 py-3 hover:brightness-110 transition-all duration-300 clip-path-slant"
            >
                Initiate
            </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-brand-gold"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="md:hidden bg-royal-obsidian border-b border-brand-gold/20"
        >
            <div className="flex flex-col p-6 gap-6">
                {navItems.map((item) => (
                    <Link
                    key={item.name}
                    href={item.href}
                    className="font-ui text-sm uppercase tracking-widest text-off-white hover:text-brand-gold"
                    onClick={() => setMobileMenuOpen(false)}
                    >
                    {item.name}
                    </Link>
                ))}
            </div>
        </motion.div>
      )}
    </nav>
  );
}
