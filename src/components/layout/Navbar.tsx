"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { useHaptics } from "@/hooks/useHaptics";
import WarriorLogo from "@/components/ui/WarriorLogo";
import Image from "next/image";

const navItems = [
  { name: "Services", href: "#services" },
  { name: "Manifesto", href: "#manifesto" },
  { name: "Work", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  const rotate = useTransform(scrollY, [0, 1000], [0, 360]);
  const { clink } = useHaptics();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled ? "py-4" : "py-6"
      }`}
    >
      {/* The Horizon Line — Draws in on load */}
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{ duration: 0.8, ease: "circOut" }}
        className={`absolute bottom-0 left-0 h-px bg-linear-to-r from-transparent via-metallic-brass/30 to-transparent transition-opacity duration-500 ${scrolled ? "opacity-100" : "opacity-0"}`}
      />
      <div className="container max-w-[1200px] mx-auto px-6 flex items-center justify-between">

        {/* Logo Icon */}
        <div className="flex items-center gap-3">
          <div
            className="relative h-10 w-10 md:h-12 md:w-12 flex items-center justify-center overflow-visible"
          >
            <WarriorLogo />
          </div>
          <Link 
            href="/" 
            className="flex items-center gap-3 group"
            onClick={(e) => {
              if (window.location.pathname === '/') {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
          >
            <span className="font-heading text-xl md:text-2xl tracking-widest text-off-white group-hover:text-metallic-brass transition-colors duration-300">
              SAMARIA <span className="text-metallic-brass">/&gt;</span>
            </span>
          </Link>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onMouseEnter={clink}
              className="nav-link font-ui text-xs uppercase tracking-[0.2em] text-off-white/60 hover:text-metallic-brass transition-colors relative focus:outline-none focus:text-metallic-brass"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center">
          <Link
            href="#contact"
            className="btn-warrior text-xs inline-flex items-center gap-2"
          >
            Start a Project
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        {/* Mobile Menu Toggle — Torii Gate Ideogram */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <X className="w-5 h-5 text-metallic-brass" />
          ) : (
            <>
              <div className="w-6 h-0.5 bg-metallic-brass rounded-full" />
              <div className="w-4 h-0.5 bg-metallic-brass rounded-full ml-auto" />
            </>
          )}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-royal-obsidian/98 backdrop-blur-lg border-b border-brand-red/20"
        >
          <div className="flex flex-col p-6 gap-5">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="font-ui text-sm uppercase tracking-widest text-off-white/80 hover:text-metallic-brass transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="btn-warrior text-xs inline-flex items-center gap-2 w-fit mt-2"
            >
              Start a Project <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </motion.div>
      )}
    </nav>
  );
}
