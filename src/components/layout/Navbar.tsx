"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { X, ArrowRight } from "lucide-react";
import { useHaptics } from "@/hooks/useHaptics";
import WarriorLogo from "@/components/ui/WarriorLogo";
import { useCelestial } from "@/components/providers/CelestialProvider";

const navItems = [
  { name: "Services", href: "/#services" },
  { name: "Work", href: "/#projects" },
  { name: "FAQ", href: "/#faq" },
  { name: "Contact", href: "/#contact" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { clink } = useHaptics();
  const { setIsCinematicMode, interactionMode } = useCelestial();
  const isZen = interactionMode === "zen";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-700 ${
        scrolled ? "py-4 bg-royal-obsidian/90 backdrop-blur-md" : "py-6 bg-transparent"
      }`}
    >
      {/* The Horizon Line — Draws in on load */}
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{ duration: 0.8, ease: "circOut" }}
        className={`absolute bottom-0 left-0 h-px bg-linear-to-r from-transparent via-metallic-brass/30 to-transparent transition-opacity duration-500 ${scrolled ? "opacity-100" : "opacity-0"}`}
      />
      <div className="container max-w-[1200px] mx-auto px-6 grid grid-cols-2 xl:grid-cols-3 items-center">

        {/* Official Logo Integration */}
        <Link 
          href="/" 
          className="flex items-center gap-3 group justify-self-start"
          onClick={(e) => {
            setIsCinematicMode(false);
            if (window.location.pathname === '/') {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
        >
          <div className="relative h-10 w-28 md:h-16 md:w-32 overflow-visible flex items-center">
            <WarriorLogo />
          </div>
        </Link>

        {/* Desktop Links */}
        <div className={`hidden xl:flex items-center justify-center gap-fb4 transition-all duration-1000 ${isZen ? "opacity-0 pointer-events-none scale-95" : "opacity-100"}`}>
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onMouseEnter={clink}
              className="nav-link font-ui text-xs uppercase tracking-[0.12em] text-off-white/80 font-medium hover:text-metallic-brass transition-colors relative focus:outline-none focus:text-metallic-brass"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className={`hidden xl:flex items-center justify-self-end transition-all duration-1000 ${isZen ? "opacity-0 pointer-events-none scale-95 translate-x-10" : "opacity-100 translate-x-0"}`}>
          <Link
            href="/start-project"
            onClick={() => setIsCinematicMode(true)}
            className="btn-warrior text-xs inline-flex items-center gap-2"
          >
            BEGIN YOUR BUILD
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        {/* Mobile Menu Toggle — Minimalist Horizon Icon */}
        <button
          className="xl:hidden flex flex-col gap-1.5 p-2 z-60"
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

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 xl:hidden bg-royal-obsidian/95 backdrop-blur-2xl z-50 flex flex-col items-center justify-center"
          >
            <div className="flex flex-col items-center gap-8 text-center">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    href={item.href}
                    className="font-heading text-3xl uppercase tracking-[0.2em] text-off-white hover:text-metallic-brass transition-colors"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setIsCinematicMode(item.name === "Contact");
                    }}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navItems.length * 0.1 }}
                className="mt-8"
              >
                <Link
                  href="/start-project"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsCinematicMode(true);
                  }}
                  className="btn-warrior"
                >
                  BEGIN YOUR BUILD
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
