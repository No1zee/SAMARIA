"use client";

import { motion } from "framer-motion";
import CelestialHeading from "@/components/ui/CelestialHeading";
import { CelestialText } from "@/components/ui/CelestialText";

export default function Philosophy() {
  return (
    <section id="philosophy" className="py-24 md:py-32 relative overflow-hidden bg-transparent">
      <div className="container max-w-[1500px] mx-auto px-fb3 md:px-fb4 relative z-10">
        <div className="max-w-4xl border-l border-metallic-brass/40 pl-fb4 md:pl-fb5">
          
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="section-label block mb-fb4"
          >
            PHILOSOPHY
          </motion.span>

          <CelestialHeading 
            text="WE DON'T BUILD TRENDS. WE BUILD INFRASTRUCTURE."
            as="h2"
            fontSize={96}
            className="text-4xl md:text-7xl mb-fb4 leading-none no-prose"
            intensity={1.2}
          />

          <div className="space-y-fb4">
            <p className="text-white/85 text-xl md:text-[2.5rem] font-body leading-[1.3] tracking-tight max-w-4xl no-prose italic">
              <CelestialText intensity={0.8}>
                The agency that built your last website is probably gone. If they&apos;re still around, they likely don&apos;t remember how your system works.
                We build differently. We architect digital assets that are meant to be owned, maintained, and scaled for a decade, not a quarter.
              </CelestialText>
            </p>
            
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.3 }}
              className="text-metallic-brass font-ui text-xs md:text-sm tracking-[0.4em] uppercase pt-fb2"
            >
              Built once. Right. Permanently yours.
            </motion.p>
          </div>

        </div>

        {/* Subtle decorative "spine" element */}
        <div className="absolute left-fb3 md:left-fb4 top-0 bottom-0 w-px bg-linear-to-b from-transparent via-white/5 to-transparent pointer-events-none" />
      </div>
    </section>
  );
}
