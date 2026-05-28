const ENGAGEMENTS = [
  { name: "LumiStream", detail: "Media Streaming Portal" },
  { name: "Obsidian Core", detail: "Cryptographic Ledger" },
  { name: "Aether Inst.", detail: "Operations Dashboard" },
  { name: "Delta Dynamics", detail: "Logistics ERP Integration" },
  { name: "Apex Horizon", detail: "Customer Intake Pipeline" }
];

export default function TrustBar() {
  return (
    <section className="relative py-10 bg-transparent border-y border-white/5 overflow-hidden">
      {/* Subtle gradient line */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,168,76,0.02)_0%,transparent_70%)] pointer-events-none" />

      <div className="container max-w-[1500px] mx-auto px-fb3 md:px-fb4 relative z-10">
        {/* Selected Engagements Grid */}
        <div className="overflow-hidden">
          <div className="text-left mb-8 border-l border-metallic-brass/40 pl-6 md:pl-8 max-w-4xl">
            <span className="section-label text-metallic-brass/60 block tracking-[0.2em] uppercase">
              WHO WE ARE — SELECTED ENGAGEMENTS
            </span>
          </div>
          <div className="border-l border-white/5 pl-6 md:pl-8 max-w-5xl">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
              {ENGAGEMENTS.map((item, i) => (
                <div 
                  key={i} 
                  className="transition-all duration-300 cursor-default hover:scale-105 group"
                >
                  <div className="font-heading text-sm text-off-white/80 group-hover:text-metallic-brass transition-colors duration-300 uppercase tracking-wide">
                    {item.name}
                  </div>
                  <div className="font-ui text-[9px] text-white/30 uppercase tracking-widest mt-1.5">
                    {item.detail}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
