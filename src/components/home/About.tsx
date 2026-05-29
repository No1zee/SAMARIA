"use client";
 
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import CinematicText from "@/components/ui/CinematicText";
import CelestialHeading from "@/components/ui/CelestialHeading";
 
export default function About() {
  return (
    <section id="about" className="py-12 md:py-fb8 relative overflow-hidden">
      
 
      <div className="container max-w-[1500px] mx-auto px-fb3 md:px-fb4 relative z-10">
        
        {/* The Horizon Header — The Inscribed Manifesto */}
        <div className="mb-fb7 border-l border-metallic-brass/40 pl-6 md:pl-8">
          <span className="section-label mb-4 block">ABOUT US</span>
          <h2 className="text-5xl md:text-[8rem] font-heading uppercase tracking-tighter leading-[0.85] flex flex-col">
            <CinematicText 
              baseColor="rgba(255, 255, 255, 0.95)"
              intensity={1.2}
              fontSize={128}
              maxWidth={1200}
              lineHeight={0.85}
              className="no-prose"
            >
              WHO WE
            </CinematicText>
            <CinematicText 
              baseColor="rgba(255, 255, 255, 0.95)"
              intensity={1.2}
              fontSize={128}
              maxWidth={1200}
              lineHeight={0.85}
              className="no-prose"
            >
              ARE.
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
  className="space-y-fb6 border-l border-white/5 pl-6 md:pl-8"
>
  <div className="max-w-2xl">
    <CelestialHeading as="h3" text="WHO WE ARE." fontSize={48} className="mb-fb4 no-prose" intensity={0.6} />
    <p className="text-white/85 text-xl md:text-2xl font-body leading-relaxed italic no-prose">
      Samaria is a digital services company that helps businesses build a stronger presence, run more smoothly, and grow with confidence through custom websites, portfolios, business systems, social media support, and practical IT solutions. We combine design, development, strategy, and technical support to create digital tools that are not only visually strong, but genuinely useful to the people who rely on them every day.
      We believe good IT work should bring clarity, not confusion. That means building solutions that are tailored to each client, explained in plain language, and delivered with the professionalism, care, and long‑term thinking serious businesses need.
    </p>
  </div>

  <div className="max-w-2xl">
    <CelestialHeading as="h3" text="OUR MISSION." fontSize={48} className="mb-fb4 no-prose" intensity={0.6} />
    <p className="text-white/85 text-xl md:text-2xl font-body leading-relaxed italic no-prose">
      Our mission is to provide reliable, high‑quality digital and IT services that help businesses present themselves better, operate more efficiently, and build on systems they can truly depend on.
    </p>
  </div>

  <div className="max-w-2xl">
    <CelestialHeading as="h3" text="OUR VISION." fontSize={48} className="mb-fb4 no-prose" intensity={0.6} />
    <p className="text-white/85 text-xl md:text-2xl font-body leading-relaxed italic no-prose">
      Our vision is to become a trusted long‑term technology partner for ambitious businesses in Africa and beyond by delivering work that is modern, dependable, and built to create real value over time.
    </p>
  </div>

  <div className="max-w-2xl">
    <CelestialHeading as="h3" text="BUILT FOR THE LONG RUN." fontSize={48} className="mb-fb4 no-prose" intensity={0.6} />
    <p className="text-white/85 text-xl md:text-2xl font-body leading-relaxed italic no-prose">
      We take pride in building work that lasts. Whether we are designing a website, setting up a business system, supporting digital operations, or managing the technical side of a growing brand, we care about quality, structure, and the details that make a service dependable long after delivery.
      For us, long‑term thinking means more than launch day. It means giving clients solutions that are clean, maintainable, scalable, and supported by people who care about doing the job properly the first time.
    </p>
  </div>

  <div className="max-w-2xl">
    <CelestialHeading as="h3" text="COMPLETE OWNERSHIP." fontSize={48} className="mb-fb4 no-prose" intensity={0.6} />
    <p className="text-white/85 text-xl md:text-2xl font-body leading-relaxed italic no-prose">
      We want every client to feel confident about what they are paying for and what they are receiving. That is why we value transparency, clear communication, and full handover, so you are never left with a system you do not understand or a service you cannot control.
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
                        <div className="absolute inset-0 z-0">
                          <Image
                            src="/edward.png"
                            alt="Edward Magejo"
                            fill
                            className="object-cover grayscale group-hover/founder:grayscale-0 transition-all duration-700"
                          />
                        </div>
                        <motion.div 
                          className="absolute inset-1 border border-dashed border-metallic-brass/20 rounded-full z-10 pointer-events-none"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        />
                    </div>
                    <div>
                        <h4 className="text-off-white font-ui text-xl md:text-3xl uppercase tracking-[0.18em] md:tracking-[0.4em] font-black group-hover/founder:text-metallic-brass transition-colors duration-500">EDWARD MAGEJO</h4>
                        <p className="text-metallic-brass/40 text-[10px] md:text-xs uppercase tracking-[0.25em] md:tracking-[0.6em] font-ui mt-2">FOUNDER & LEAD ARCHITECT</p>
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
                        <div className="absolute inset-0 z-0">
                          <Image
                            src="/divine.png"
                            alt="Divine Mwale"
                            fill
                            className="object-cover grayscale group-hover/founder-dm:grayscale-0 transition-all duration-700"
                          />
                        </div>
                        <motion.div 
                          className="absolute inset-1 border border-dashed border-metallic-brass/20 rounded-full z-10 pointer-events-none"
                          animate={{ rotate: -360 }}
                          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                        />
                    </div>
                    <div>
                        <h4 className="text-off-white font-ui text-xl md:text-3xl uppercase tracking-[0.18em] md:tracking-[0.4em] font-black group-hover/founder-dm:text-metallic-brass transition-colors duration-500">DIVINE MWALE</h4>
                        <p className="text-metallic-brass/40 text-[10px] md:text-xs uppercase tracking-[0.25em] md:tracking-[0.6em] font-ui mt-2">CO-FOUNDER & SYSTEMS ENGINEER</p>
                        <div className="mt-4 max-w-sm overflow-hidden h-0 group-hover/founder-dm:h-auto transition-all duration-700 opacity-0 group-hover/founder-dm:opacity-100">
                          <p className="text-off-white/60 text-sm italic font-body leading-relaxed">
                            &quot;Architecture isn&apos;t just about code; it&apos;s about clarity. We build the systems that remove friction from your growth so you can focus on building what matters.&quot;
                          </p>
                        </div>
                    </div>
                  </div>

                </div>

                <div className="flex flex-col sm:flex-row items-center justify-end gap-6 pt-fb4 border-t border-white/5 w-full">
                  <Link 
                    href="/start-project"
                    className="inline-flex items-center gap-4 text-metallic-brass hover:text-white transition-colors uppercase tracking-[0.3em] font-ui text-xs md:text-sm group border-b border-metallic-brass/30 hover:border-white pb-1"
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
