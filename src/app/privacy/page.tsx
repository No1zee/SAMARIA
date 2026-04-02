"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useHaptics } from "@/hooks/useHaptics";

export default function PrivacyPage() {
  const { clink } = useHaptics();
  return (
    <main className="min-h-screen text-off-white pt-fb9 pb-fb8 px-fb4 md:px-fb5 relative overflow-hidden">
      
      {/* Structural Watermark */}
      <div className="absolute top-fb4 right-0 opacity-[0.02] pointer-events-none select-none overflow-hidden">
          <span className="text-[40vw] font-heading font-black tracking-tighter leading-none">PRIVACY</span>
      </div>

      <div className="container max-w-[1200px] mx-auto relative z-10">
        
        <Link 
          href="/" 
          onMouseEnter={clink}
          className="inline-flex items-center gap-fb2 text-metallic-brass hover:text-off-white transition-colors mb-fb6 group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-[10px] uppercase tracking-[0.4em] font-ui">Exit Protocol // Return Home</span>
        </Link>

        {/* 62/38 Layout */}
        <div className="grid grid-cols-1 md:grid-cols-10 gap-fb7 items-start">
          
          {/* Main Content (62%) */}
          <div className="md:col-span-6">
            <h1 className="text-5xl md:text-[6rem] font-heading uppercase tracking-tighter leading-none mb-fb6">
              Privacy <br /> Protocol.
            </h1>
            
            <div className="space-y-fb6 text-off-white/40 text-lg md:text-xl font-body leading-relaxed">
              <section>
                <h2 className="text-off-white font-ui text-xs uppercase tracking-[0.4em] mb-fb3 border-b border-metallic-brass/20 pb-2">01 // Extraction Logic</h2>
                <p>
                  We believe in technical sovereignty. Samaria Tech collects only the minimum data required to facilitate 
                  architectural builds. We do not engage in surveillance capitalism or data harvesting.
                </p>
              </section>

              <section>
                <h2 className="text-off-white font-ui text-xs uppercase tracking-[0.4em] mb-fb3 border-b border-metallic-brass/20 pb-2">02 // Secure Storage</h2>
                <p>
                  Your project artifacts are stored within hardened, local/cloud-native environments using industry-standard 
                  encryption. Entry to these environments is restricted to lead architects.
                </p>
              </section>

              <section>
                <h2 className="text-off-white font-ui text-xs uppercase tracking-[0.4em] mb-fb3 border-b border-metallic-brass/20 pb-2">03 // Third-Party Alliance</h2>
                <p>
                  We share data exclusively with trusted technical partners (Vercel, AWS, MongoDB) necessary for the 
                  deployment of your systems. We do not sell your data to external marketplaces.
                </p>
              </section>

              <section>
                <h2 className="text-off-white font-ui text-xs uppercase tracking-[0.4em] mb-fb3 border-b border-metallic-brass/20 pb-2">04 // Termination Right</h2>
                <p>
                  At any point, you may request the complete extraction and deletion of all project-related metadata 
                  residing within Samaria systems.
                </p>
              </section>
            </div>
          </div>

          <div className="md:col-span-4 pt-fb6 md:pt-0">
             <div className="p-fb5 border border-white/5 bg-obsidian-layered/40 blade-motif">
                <p className="text-metallic-brass font-ui text-[10px] tracking-[0.4em] mb-fb3 uppercase">Last Revised</p>
                <p className="text-2xl text-off-white font-heading">March 31, 2026</p>
                <div className="mt-fb5 pt-fb4 border-t border-white/5">
                  <p className="text-xs text-off-white/20 uppercase tracking-widest leading-relaxed font-ui">
                    Protocol Hardening: 1.0.2 <br />
                    Authority: Gaborone HQ
                  </p>
                </div>
             </div>
          </div>

        </div>
      </div>
    </main>
  );
}
