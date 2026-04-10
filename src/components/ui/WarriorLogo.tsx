import Image from "next/image";

/**
 * Brand Identity: Warrior & Laptop Seal
 * Replaces the original 3D Diamond Prism.
 */
export default function WarriorLogo() {
  return (
    <div className="w-full h-full relative group hover:scale-110 transition-transform duration-500 cursor-pointer flex items-center justify-center">
      {/* Subtle brand glow behind icon */}
      <div className="absolute inset-0 rounded-full bg-metallic-brass/5 blur-xl group-hover:bg-metallic-brass/10 transition-all duration-500" />
      
      <Image 
        src="/logo.png" 
        alt="Samaria Logo" 
        width={100}
        height={100}
        className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(201,168,76,0.2)]"
        priority
      />
    </div>
  );
}
