"use client";
 
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import CinematicText from "@/components/ui/CinematicText";
import CelestialHeading from "@/components/ui/CelestialHeading";
 
export default function About() {
  return (
    <section id="manifesto" className="py-fb8 relative overflow-hidden">
      
 
      <div className="container max-w-[1500px] mx-auto px-fb3 md:px-fb4 relative z-10">
        
        {/* The Horizon Header — The Inscribed Manifesto */}
        <div className="mb-fb7 border-l border-metallic-brass/40 pl-fb3">
          <h2 className="text-5xl md:text-[8rem] font-heading uppercase tracking-tighter leading-[0.85] flex flex-col">
            <CinematicText 
              baseColor="rgba(255, 255, 255, 0.95)"
              intensity={1.2}
              fontSize={128}
              maxWidth={1200}
              lineHeight={0.85}
              className="no-prose"
            >
              THE ANCIENT
            </CinematicText>
            <CinematicText 
              baseColor="rgba(255, 255, 255, 0.95)"
              intensity={1.2}
              fontSize={128}
              maxWidth={1200}
              lineHeight={0.85}
              className="no-prose"
            >
              FUTURE.
            </CinematicText>
          </h2>
        </div>
 
        {/* 62/38 Golden Ratio Layout — The Scroll Format */}
        <div className="grid grid-cols-1 md:grid-cols-10 gap-fb6 items-start">
          
          {/* 34% Sidebar — The Vertical Inscriptions (Silenced/Modified per User) */}
          <div className="md:col-span-3 flex md:flex-col gap-fb5 md:gap-fb7 opacity-[0.05] pointer-events-none select-none">
             <div className="flex flex-col gap-2">
                <div className="w-px h-fb4 bg-metallic-brass/20 hidden md:block" />
             </div>
             <div className="flex flex-col gap-2">
                <div className="w-px h-fb4 bg-metallic-brass/20 hidden md:block" />
             </div>
             <div className="flex flex-col gap-2">
                <div className="w-px h-fb4 bg-metallic-brass/20 hidden md:block" />
             </div>
          </div>
 
          {/* 66% Main Content — The Inscribed Text */}
          <div className="md:col-span-7 flex flex-col items-start gap-fb7">
             
             <motion.div
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               className="space-y-fb6"
             >
                <div className="max-w-2xl">
                  <CelestialHeading 
                    as="h3"
                    text="THE LONG GAME."
                    fontSize={48}
                    className="mb-fb4 no-prose"
                    intensity={0.6}
                  />
                  <p className="text-white/85 text-2xl md:text-[2.5rem] font-body leading-relaxed italic border-l border-white/10 pl-fb4 no-prose">
                    The tools we use are new. The principles we use are ancient. We build with the same philosophy as the architects of cathedrals: we build for a time we will not see. Every system we deploy is designed to outlast its creators.
                  </p>
                </div>
 
                <div className="max-w-2xl ml-auto">
                  <CelestialHeading 
                    as="h3"
                    text="YOURS. PERMANENTLY."
                    fontSize={48}
                    className="mb-fb4 text-right no-prose"
                    intensity={0.6}
                  />
                  <p className="text-white/85 text-2xl md:text-[2.5rem] font-body leading-relaxed italic border-r border-white/10 pr-fb4 text-right no-prose">
                    We don&apos;t believe in &quot;vendor lock-in&quot; or proprietary secrets. When we finish a build, we hand you everything. 
                    The code, the documentation, and the keys. It is your infrastructure. It should belong to you entirely.
                  </p>
                </div>
             </motion.div>

              {/* Founders Section (The Master's Seals) */}
              <div className="pt-fb6 border-t border-white/10 w-full flex flex-col gap-fb6">
                <div className="mb-fb4">
                  <span className="section-label mb-2 block">THE ARCHITECTS</span>
                  <h3 className="text-4xl md:text-6xl font-heading text-white/95 uppercase tracking-tighter mt-2 no-prose">BUILT BY PEOPLE WHO CARE WHAT LASTS.</h3>
                </div>
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-fb7">
                  
                  {/* Edward Magejo */}
                  <div className="flex items-center gap-fb4 group/founder">
                    <div className="w-20 h-20 md:w-28 md:h-28 shrink-0 rounded-full border border-metallic-brass/40 flex items-center justify-center text-metallic-brass relative overflow-hidden bg-obsidian-layered/40 group-hover/founder:border-metallic-brass transition-colors duration-700">
                        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-metallic-brass/10 group-hover/founder:h-full transition-all duration-700 ease-circOut" />
                        <span className="relative z-10 font-heading text-3xl md:text-5xl font-black tracking-tighter mix-blend-difference">EM</span>
                        <motion.div 
                          className="absolute inset-1 border border-dashed border-metallic-brass/20 rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        />
                    </div>
                    <div>
                        <h4 className="text-off-white font-ui text-xl md:text-3xl uppercase tracking-[0.4em] font-black group-hover/founder:text-metallic-brass transition-colors duration-500">EDWARD MAGEJO</h4>
                        <p className="text-metallic-brass/40 text-[10px] md:text-xs uppercase tracking-[0.6em] font-ui mt-2">FOUNDER & LEAD ARCHITECT // Gaborone</p>
                        <div className="mt-4 max-w-sm overflow-hidden h-0 group-hover/founder:h-auto transition-all duration-700 opacity-0 group-hover/founder:opacity-100">
                          <p className="text-off-white/60 text-sm italic font-body leading-relaxed">
                            &quot;I&apos;ve spent a decade watching businesses get burned by &apos;fast&apos; agencies. I founded Samaria to prove there&apos;s a better way: building for permanence, not just for the next invoice.&quot;
                          </p>
                        </div>
                    </div>
                  </div>

                  {/* Divine Mwale */}
                  <div className="flex items-center gap-fb4 group/founder-dm">
                    <div className="w-20 h-20 md:w-28 md:h-28 shrink-0 rounded-full border border-metallic-brass/40 flex items-center justify-center text-metallic-brass relative overflow-hidden bg-obsidian-layered/40 group-hover/founder-dm:border-metallic-brass transition-colors duration-700">
                        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-metallic-brass/10 group-hover/founder-dm:h-full transition-all duration-700 ease-circOut" />
                        <span className="relative z-10 font-heading text-3xl md:text-5xl font-black tracking-tighter mix-blend-difference">DM</span>
                        <motion.div 
                          className="absolute inset-1 border border-dashed border-metallic-brass/20 rounded-full"
                          animate={{ rotate: -360 }}
                          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                        />
                    </div>
                    <div>
                        <h4 className="text-off-white font-ui text-xl md:text-3xl uppercase tracking-[0.4em] font-black group-hover/founder-dm:text-metallic-brass transition-colors duration-500">DIVINE MWALE</h4>
                        <p className="text-metallic-brass/40 text-[10px] md:text-xs uppercase tracking-[0.6em] font-ui mt-2">CO-FOUNDER & LEAD ARCHITECT // Gaborone</p>
                        <div className="mt-4 max-w-sm overflow-hidden h-0 group-hover/founder-dm:h-auto transition-all duration-700 opacity-0 group-hover/founder-dm:opacity-100">
                          <p className="text-off-white/60 text-sm italic font-body leading-relaxed">
                            &quot;Architecture isn&apos;t just about code; it&apos;s about clarity. We build the systems that remove friction from your growth so you can focus on building what matters.&quot;
                          </p>
                        </div>
                    </div>
                  </div>

                </div>

                <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-fb4">
                  <p className="text-[10px] md:text-xs font-ui text-white/20 uppercase tracking-[0.4em]">Currently accepting 2 new engagements.</p>
                  <Link 
                    href="/start-project"
                    className="inline-flex items-center gap-4 text-metallic-brass hover:text-off-white transition-colors uppercase tracking-[0.3em] font-ui text-xs md:text-sm group"
                  >
                    Join the War Council <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
 
          </div>
 
        </div>
    </section>
  );
}
