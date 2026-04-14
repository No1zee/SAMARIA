import Image from "next/image";

/**
 * Brand Identity: Warrior & Laptop Seal
 * Replaces the original 3D Diamond Prism.
 */
export default function WarriorLogo() {
  return (
    <div className="w-full h-full relative group hover:scale-110 transition-transform duration-500 cursor-pointer flex items-center justify-center">
      {/* Subtle brand glow behind icon */}
      <div className="absolute inset-0 rounded-full bg-metallic-brass/10 blur-2xl group-hover:bg-metallic-brass/20 transition-all duration-700 scale-75" />
      
      {/* High-Frequency Detail: The Technical Orbit */}
      <svg viewBox="0 0 100 100" className="absolute inset-[-20%] w-[140%] h-[140%] pointer-events-none opacity-20 group-hover:opacity-40 transition-opacity duration-1000">
        <circle cx="50" cy="50" r="48" stroke="var(--color-metallic-brass)" strokeWidth="0.25" strokeDasharray="1 4" className="animate-[spin_60s_linear_infinite]" />
        <circle cx="50" cy="50" r="42" stroke="var(--color-metallic-brass)" strokeWidth="0.1" className="animate-[spin_40s_linear_infinite_reverse]" />
        
        {/* Cardinal Markers */}
        <path d="M50 2V8M50 92V98M2 50H8M92 50H98" stroke="var(--color-metallic-brass)" strokeWidth="0.5" />
      </svg>

      <div className="relative z-10 w-full h-full flex items-center justify-center p-2">
        <Image 
          src="/logo.png" 
          alt="Samaria Logo" 
          width={120}
          height={120}
          className="w-full h-full object-contain filter drop-shadow-[0_0_20px_rgba(201,168,76,0.3)] group-hover:drop-shadow-[0_0_30px_rgba(201,168,76,0.5)] transition-all duration-700"
          priority
        />
      </div>
    </div>
  );
}
