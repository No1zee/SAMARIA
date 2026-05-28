"use client";

const CLIENTS = [
  {
    name: "LumiStream",
    icon: (
      <svg className="w-3.5 h-3.5 mr-2 text-metallic-brass/70 group-hover:text-metallic-brass transition-colors shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M2 12c4-4 8 4 12 0s8-4 8-4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M2 17c4-4 8 4 12 0s8-4 8-4" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
      </svg>
    )
  },
  {
    name: "Obsidian Core",
    icon: (
      <svg className="w-3.5 h-3.5 mr-2 text-metallic-brass/70 group-hover:text-metallic-brass transition-colors shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2L2 12l10 10 10-10L12 2z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 6l-6 6 6 6 6-6-6-6z" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
      </svg>
    )
  },
  {
    name: "Aether Inst.",
    icon: (
      <svg className="w-3.5 h-3.5 mr-2 text-metallic-brass/70 group-hover:text-metallic-brass transition-colors shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 22V18M20 22V18M4 6H20M4 2H20" strokeLinecap="round" />
        <path d="M7 18V6M12 18V6M17 18V6" strokeLinecap="round" opacity="0.6" />
      </svg>
    )
  },
  {
    name: "Delta Dynamics",
    icon: (
      <svg className="w-3.5 h-3.5 mr-2 text-metallic-brass/70 group-hover:text-metallic-brass transition-colors shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 3l10 16H2L12 3z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 8l6 10H6l6-10z" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
      </svg>
    )
  },
  {
    name: "Apex Horizon",
    icon: (
      <svg className="w-3.5 h-3.5 mr-2 text-metallic-brass/70 group-hover:text-metallic-brass transition-colors shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 4L4 16h16L12 4z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M2 20h20" strokeLinecap="round" />
      </svg>
    )
  }
];

export default function TrustBar() {
  return (
    <section className="relative py-12 md:py-16 bg-transparent border-y border-white/5 overflow-hidden">
      {/* Subtle gradient line */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,168,76,0.03)_0%,transparent_70%)]" />

      <div className="container max-w-[1500px] mx-auto px-fb3 md:px-fb4 relative z-10">
        {/* Client Logo Grid */}
        <div className="overflow-hidden">
          <div className="text-left mb-8 border-l border-metallic-brass/40 pl-6 md:pl-8 max-w-4xl">
            <span className="section-label text-metallic-brass/60 block tracking-[0.3em] uppercase">
              WHO WE ARE — CLIENT NETWORK
            </span>
          </div>
          <div className="border-l border-white/5 pl-6 md:pl-8 max-w-5xl">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:flex md:flex-wrap items-center justify-start gap-4 md:gap-6">
              {CLIENTS.map((client, i) => (
                <span 
                  key={i} 
                  className="inline-flex items-center px-4 py-2.5 font-ui text-[10px] md:text-xs text-metallic-brass tracking-[0.2em] uppercase bg-obsidian-layered border border-metallic-brass/10 hover:border-metallic-brass/40 rounded-none shadow-[0_0_10px_rgba(0,0,0,0.5)] transition-all duration-500 cursor-default hover:scale-105 group"
                >
                  {client.icon}
                  <span className="opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                    {client.name}
                  </span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
