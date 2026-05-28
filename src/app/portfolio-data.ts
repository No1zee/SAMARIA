export interface Project {
  id: string;
  name: string;
  url: string;
  tag: string;
  description: string;
  techStack: string[];
  themeColor: string;
  accentColor: string;
  isLive?: boolean;
}

export const staticProjects: Project[] = [
  {
    id: "nguva-sand",
    name: "Nguva Sand",
    url: "https://nguva-sand.vercel.app",
    tag: "Logistics & Supply",
    description: "Premium sand procurement and delivery platform with automated logistics and supply chain optimization.",
    techStack: ["Next.js", "React", "Tailwind CSS", "Vercel"],
    themeColor: "from-amber-900/40 to-yellow-950/20",
    accentColor: "#D97706"
  },
  {
    id: "smiles-dental",
    name: "Smiles Dental",
    url: "https://smilesdentalzw.com",
    tag: "Healthcare Portal",
    description: "Modern dental healthcare booking system and client management portal facilitating seamless appointments.",
    techStack: ["Next.js", "React", "Tailwind CSS"],
    themeColor: "from-teal-950/40 to-emerald-950/20",
    accentColor: "#0D9488"
  },
  {
    id: "connectlink",
    name: "Connect Link Properties",
    url: "https://connectlinkproperties.co.zw",
    tag: "Real Estate Ledger",
    description: "High-end real estate listing, brokerage, and property management platform with interactive maps and search.",
    techStack: ["Next.js", "PostgreSQL", "Tailwind CSS"],
    themeColor: "from-sky-950/40 to-indigo-950/20",
    accentColor: "#0284C7"
  },
  {
    id: "carhub",
    name: "Carhub Zimbabwe",
    url: "https://carhubzimbabwe.com",
    tag: "Automotive Marketplace",
    description: "Dynamic car listing, dealership management, and vehicle discovery marketplace with advanced filtering.",
    techStack: ["Next.js", "Node.js", "Tailwind CSS"],
    themeColor: "from-zinc-900/60 to-red-950/20",
    accentColor: "#DC2626"
  },
  {
    id: "valkubu",
    name: "Valkubu Limited",
    url: "https://valkubulimited.com",
    tag: "Enterprise System",
    description: "Enterprise resource management and official website for Valkubu Limited's global logistics and operations.",
    techStack: ["Next.js", "Tailwind CSS"],
    themeColor: "from-slate-900/60 to-zinc-950/20",
    accentColor: "#71717A"
  },
  {
    id: "zimrugby",
    name: "Zim Rugby",
    url: "https://zimrugby.vercel.app",
    tag: "Sports Registry",
    description: "Official Zimbabwe Rugby tournament coordinator, player database, and national league information hub.",
    techStack: ["Next.js", "React", "Vercel"],
    themeColor: "from-green-950/40 to-yellow-950/20",
    accentColor: "#16A34A"
  }
];

export async function fetchLiveStatus(url: string): Promise<boolean> {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) SamariaBuildTime/1.0"
      },
      next: { revalidate: 3600 } // Cache the response for 1 hour at build time
    });

    return response.status >= 200 && response.status < 400;
  } catch (error) {
    console.warn(`Build-time ping failed for ${url}:`, error);
    return false;
  }
}

export async function getPortfolioProjects(): Promise<Project[]> {
  const projectsWithStatus = await Promise.all(
    staticProjects.map(async (project) => {
      const isLive = await fetchLiveStatus(project.url);
      return {
        ...project,
        isLive
      };
    })
  );
  return projectsWithStatus;
}
