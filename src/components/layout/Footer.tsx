"use client";

import Link from "next/link";
import Image from "next/image";
import { Twitter, Linkedin, Github } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-royal-obsidian border-t border-brand-gold/10 py-12 relative z-10">
      <div className="container max-w-[1200px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Logo/Copyright */}
        <div className="flex flex-col items-center md:items-start gap-4">
            <Image 
                src="/logo.png" 
                alt="Samaria Tech" 
                width={120} 
                height={32} 
                className="h-8 w-auto object-contain opacity-80"
            />
            <span className="font-ui text-xs text-off-white/40">
                © {new Date().getFullYear()} Samaria Technology. All rights reserved.
            </span>
        </div>

        {/* Links */}
        <div className="flex items-center gap-8">
            <Link href="#" className="font-ui text-xs text-off-white/60 hover:text-brand-gold transition-colors">
                Privacy
            </Link>
            <Link href="#" className="font-ui text-xs text-off-white/60 hover:text-brand-gold transition-colors">
                Terms
            </Link>
        </div>

        {/* Socials */}
        <div className="flex items-center gap-6">
            <Link href="#" className="text-off-white/60 hover:text-brand-gold transition-colors">
                <Twitter size={18} />
            </Link>
            <Link href="#" className="text-off-white/60 hover:text-brand-gold transition-colors">
                <Linkedin size={18} />
            </Link>
            <Link href="#" className="text-off-white/60 hover:text-brand-gold transition-colors">
                <Github size={18} />
            </Link>
        </div>
      </div>
    </footer>
  );
}
