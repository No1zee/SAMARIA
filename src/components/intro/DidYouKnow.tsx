"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function DidYouKnow() {
  return (
    <section className="py-16 bg-brand-gold/5 border-y border-brand-gold/20">
      <div className="container max-w-[900px] mx-auto px-6">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-brand-gold/10 flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-brand-gold" />
            </div>
          </div>

          {/* Label */}
          <span className="font-ui text-xs uppercase tracking-[0.3em] text-brand-gold block mb-4">
            Did You Know?
          </span>

          {/* Fact */}
          <p className="text-2xl md:text-3xl font-heading text-off-white leading-relaxed">
            African SMEs that digitize core processes see an average{" "}
            <span className="text-brand-gold font-bold">40% productivity increase</span>{" "}
            within the first year.
          </p>

          {/* Circuit decoration */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <div className="h-px w-16 bg-brand-gold/30" />
            <div className="w-2 h-2 rounded-full bg-brand-gold" />
            <div className="h-px w-16 bg-brand-gold/30" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
