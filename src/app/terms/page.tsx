"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useHaptics } from "@/hooks/useHaptics";

export default function TermsPage() {
  const { clink } = useHaptics();
  return (
    <main className="min-h-screen text-off-white pt-fb9 pb-fb8 px-fb4 md:px-fb5 relative overflow-hidden">
      
      {/* Structural Watermark */}
      <div className="absolute top-fb4 right-0 opacity-[0.02] pointer-events-none select-none overflow-hidden">
          <span className="text-[40vw] font-heading font-black tracking-tighter leading-none">TERMS</span>
      </div>

      <div className="container max-w-[1200px] mx-auto relative z-10">
        
        {/* Navigation */}
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
              Terms of <br /> Service.
            </h1>
            
            <div className="space-y-fb6 text-off-white/40 text-lg md:text-xl font-body leading-relaxed">
              <section>
                <h2 className="text-off-white font-ui text-xs uppercase tracking-[0.4em] mb-fb3 border-b border-metallic-brass/20 pb-2">01 // Engagement Logic</h2>
                <p>
                  By initiating a project, you agree to our phased deployment workflow. We operate on a &apos;Build to Finish&apos; 
                  principle, requiring documented project specifications before the forge begins.
                </p>
              </section>

              <section>
                <h2 className="text-off-white font-ui text-xs uppercase tracking-[0.4em] mb-fb3 border-b border-metallic-brass/20 pb-2">02 // Intellectual Sovereignty</h2>
                <p>
                  Upon final payment, Samaria Tech grants you complete ownership of all bespoke code, visual assets, 
                  and architectural diagrams. We retain the right to showcase the resulting artifact within our portfolio.
                </p>
              </section>

              <section>
                <h2 className="text-off-white font-ui text-xs uppercase tracking-[0.4em] mb-fb3 border-b border-metallic-brass/20 pb-2">03 // Termination Clause</h2>
                <p>
                  Either party may terminate the engagement with written notice. In such cases, clients will be 
                  billed for all architectural development hours completed up to the date of notice.
                </p>
              </section>

              <section>
                <h2 className="text-off-white font-ui text-xs uppercase tracking-[0.4em] mb-fb3 border-b border-metallic-brass/20 pb-2">04 // Liability Hardening</h2>
                <p>
                  Samaria Tech provides architectures built for high performance and low error. We are not liable for 
                  direct, indirect, or incidental damages resulting from misuse or unmaintained external dependencies 
                  once the system is under client control.
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
                    Operational Matrix: 2.1.0 <br />
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
