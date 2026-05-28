import dynamic from "next/dynamic";

const About = dynamic(() => import("@/components/home/About"));

export const metadata = {
  title: "About Us",
  description: "Learn about Samaria, our philosophies, our builders, and the founders who engineer African digital infrastructure for the long run.",
};

export default function AboutUsPage() {
  return (
    <div className="pt-20 md:pt-32 min-h-screen bg-transparent relative z-10">
      <About />
    </div>
  );
}
