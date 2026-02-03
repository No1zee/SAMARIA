"use client";

import { motion } from "framer-motion";
import { Send, Mail, MapPin, Phone } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="py-24 bg-royal-obsidian relative border-t border-brand-gold/10">
      <div className="container max-w-[1200px] mx-auto px-6 grid md:grid-cols-2 gap-16">
        
        {/* Contact Info */}
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
        >
            <span className="font-ui text-xs text-brand-gold tracking-[0.3em] uppercase block mb-4">
                Initialize Protocol
            </span>
            <h2 className="text-off-white mb-8">
                Ready to Ascend?
            </h2>
            <p className="text-off-white/70 text-lg mb-12">
                The future favors the bold. Whether you need a digital fortress or an empire-scale ecosystem, we are ready to engineer it.
            </p>

            <div className="space-y-6">
                <div className="flex items-start gap-4 group">
                    <div className="p-3 rounded-full bg-brand-gold/5 border border-brand-gold/20 text-brand-gold group-hover:bg-brand-gold group-hover:text-royal-obsidian transition-colors">
                        <Mail className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="font-ui text-xs uppercase tracking-wider text-brand-gold/60">Email</span>
                        <a 
                            href="mailto:mission@samaria.tech" 
                            className="font-ui text-sm text-off-white hover:text-brand-gold transition-colors"
                        >
                            mission@samaria.tech
                        </a>
                    </div>
                </div>
                
                <div className="flex items-start gap-4 group">
                    <div className="p-3 rounded-full bg-brand-gold/5 border border-brand-gold/20 text-brand-gold group-hover:bg-brand-gold group-hover:text-royal-obsidian transition-colors">
                        <Phone className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="font-ui text-xs uppercase tracking-wider text-brand-gold/60">Phone</span>
                        <a 
                            href="tel:+263700000000" 
                            className="font-ui text-sm text-off-white hover:text-brand-gold transition-colors"
                        >
                            +263 700 000 000
                        </a>
                    </div>
                </div>

                <div className="flex items-start gap-4 group">
                    <div className="p-3 rounded-full bg-brand-gold/5 border border-brand-gold/20 text-brand-gold group-hover:bg-brand-gold group-hover:text-royal-obsidian transition-colors">
                        <MapPin className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="font-ui text-xs uppercase tracking-wider text-brand-gold/60">Location</span>
                        <span className="font-ui text-sm text-off-white">
                            Harare, Zimbabwe
                        </span>
                        <span className="font-ui text-xs text-off-white/50">
                            Serving clients globally
                        </span>
                    </div>
                </div>
            </div>
        </motion.div>

        {/* Form */}
        <motion.form
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-deep-green/50 backdrop-blur-sm p-8 rounded-lg border border-brand-gold/10"
        >
            <div className="space-y-6">
                <div className="space-y-2">
                    <label className="font-ui text-xs uppercase text-brand-gold tracking-widest">Identity *</label>
                    <p className="font-ui text-xs text-off-white/40 -mt-1">Your name or company</p>
                    <input 
                        type="text" 
                        placeholder="Name / Organization"
                        required
                        className="w-full bg-royal-obsidian border-b border-brand-gold/30 focus:border-brand-gold text-off-white p-3 outline-none transition-colors placeholder:text-off-white/20"
                    />
                </div>

                <div className="space-y-2">
                    <label className="font-ui text-xs uppercase text-brand-gold tracking-widest">Coordinates *</label>
                    <p className="font-ui text-xs text-off-white/40 -mt-1">Best email to reach you</p>
                    <input 
                        type="email" 
                        placeholder="Email Address"
                        required
                        className="w-full bg-royal-obsidian border-b border-brand-gold/30 focus:border-brand-gold text-off-white p-3 outline-none transition-colors placeholder:text-off-white/20"
                    />
                </div>

                <div className="space-y-2">
                    <label className="font-ui text-xs uppercase text-brand-gold tracking-widest">Transmission *</label>
                    <p className="font-ui text-xs text-off-white/40 -mt-1">Tell us about your project</p>
                    <textarea 
                        rows={4}
                        placeholder="Project Details..."
                        required
                        className="w-full bg-royal-obsidian border-b border-brand-gold/30 focus:border-brand-gold text-off-white p-3 outline-none transition-colors placeholder:text-off-white/20 resize-none"
                    ></textarea>
                </div>

                <button 
                    type="submit"
                    className="w-full bg-gold-metallic font-ui font-bold uppercase tracking-widest py-4 hover:brightness-110 transition-all clip-path-slant flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-brand-gold focus:ring-offset-2 focus:ring-offset-royal-obsidian"
                >
                    <Send className="w-4 h-4 text-royal-obsidian" />
                    <span className="text-royal-obsidian">Send Inquiry</span>
                </button>
            </div>
        </motion.form>

      </div>
    </section>
  );
}
