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
  clientType: string;
  problem: string;
  solution: string;
  outcome: string;
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
    accentColor: "#D97706",
    clientType: "Sand & Construction Logistics Co.",
    problem: "Manual phone procurement and dispatch led to delivery delays, scheduling errors, and slow client billing.",
    solution: "Built a unified booking and delivery dispatch platform with automated SMS routing, SMS confirmation receipts, and clear order ledgers.",
    outcome: "Reduced manual logistics planning time by 75% and halved average order processing lag, securing faster supply turnarounds."
  },
  {
    id: "smiles-dental",
    name: "Smiles Dental",
    url: "https://smilesdentalzw.com",
    tag: "Healthcare Portal",
    description: "Modern dental healthcare booking system and client management portal facilitating seamless appointments.",
    techStack: ["Next.js", "React", "Tailwind CSS"],
    themeColor: "from-teal-950/40 to-emerald-950/20",
    accentColor: "#0D9488",
    clientType: "Private Dental Clinic",
    problem: "Missed appointments and phone-tag consultations created massive administrative overhead and scheduling overlaps.",
    solution: "Engineered a direct online patient booking portal integrated with calendar alerts, SMS reminders, and client intake record tracking.",
    outcome: "Cut appointment scheduling call volume by 60% and achieved a 95% clinic booking confirmation rate within three months."
  },
  {
    id: "connectlink",
    name: "Connect Link Properties",
    url: "https://connectlinkproperties.co.zw",
    tag: "Real Estate Ledger",
    description: "High-end real estate listing, brokerage, and property management platform with interactive maps and search.",
    techStack: ["Next.js", "PostgreSQL", "Tailwind CSS"],
    themeColor: "from-sky-950/40 to-indigo-950/20",
    accentColor: "#0284C7",
    clientType: "Real Estate Brokerage",
    problem: "Slow loading listing interfaces and fragmented WhatsApp property updates caused buyers to drop off before submitting inquiries.",
    solution: "Deployed a fast-loading property ledger database, featuring advanced filter queries, property maps, and direct agent connection pipelines.",
    outcome: "Slashed page load speed to under 1.5 seconds, boosting direct listing lead submissions by 42%."
  },
  {
    id: "carhub",
    name: "Carhub Zimbabwe",
    url: "https://carhubzimbabwe.co.zw",
    tag: "Automotive Marketplace",
    description: "Dynamic car listing, dealership management, and vehicle discovery marketplace with advanced filtering.",
    techStack: ["Next.js", "Node.js", "Tailwind CSS"],
    themeColor: "from-zinc-900/60 to-red-950/20",
    accentColor: "#DC2626",
    clientType: "Automotive Dealership",
    problem: "Fragmented inventory tracking and slow catalog updates caused vehicles to remain unsold due to delayed web listings.",
    solution: "Built a centralized dealership inventory catalog dashboard with instant filter search and multi-image uploads.",
    outcome: "Reduced vehicle catalog listing upload times from 40 minutes to under 2 minutes, increasing monthly buyer views."
  },
  {
    id: "valkubu",
    name: "Valkubu Limited",
    url: "https://valkubulimited.com",
    tag: "Enterprise System",
    description: "Enterprise resource management and official website for Valkubu Limited's global logistics and operations.",
    techStack: ["Next.js", "Tailwind CSS"],
    themeColor: "from-slate-900/60 to-zinc-950/20",
    accentColor: "#71717A",
    clientType: "Global Logistics & Transport Provider",
    problem: "Fragmented corporate visibility and lack of central operations tracking made bidding for international contracts difficult.",
    solution: "Designed a fast-loading corporate information architecture detailing fleet capabilities, secure logistics ledgers, and compliance certificates.",
    outcome: "Gave international clients a reliable, highly professional corporate window, speeding up client verification cycles."
  },
  {
    id: "zimrugby",
    name: "Zim Rugby",
    url: "https://zimrugby.vercel.app",
    tag: "Sports Registry",
    description: "Official Zimbabwe Rugby tournament coordinator, player database, and national league information hub.",
    techStack: ["Next.js", "React", "Vercel"],
    themeColor: "from-green-950/40 to-yellow-950/20",
    accentColor: "#16A34A",
    clientType: "National Tournament Organizer",
    problem: "Scattered match scores, unregistered players, and manual schedule distribution made league tournament updates slow and error-prone.",
    solution: "Built a secure player registration database and automated fixture scoreboard, giving clubs instant league tracking.",
    outcome: "Consolidated registry operations for 12 clubs and automated league table calculation, eliminating manual score validation errors."
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
