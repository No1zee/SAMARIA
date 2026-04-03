import type { Metadata } from "next";
import { Cinzel_Decorative, Orbitron, Montserrat } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LoadingScreen from "@/components/ui/LoadingScreen";
import MarginalGraphics from "@/components/ui/MarginalGraphics";
import ScrollIndicator from "@/components/ui/ScrollIndicator";
import SamuraiJackBackground from "@/components/ui/SamuraiJackBackground";
import ViewTransitionsProvider from "@/components/providers/ViewTransitionsProvider";
import { CelestialProvider } from "@/components/providers/CelestialProvider";
import "./globals.css";

const cinzel = Cinzel_Decorative({
  weight: ["400", "700", "900"],
  variable: "--font-cinzel",
  subsets: ["latin"],
  display: "swap",
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
});

const BASE_URL = "https://www.samaria.tech";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Samaria Tech | Custom IT Solutions for African Businesses",
    template: "%s | Samaria Tech",
  },
  description:
    "Samaria Technology builds bespoke web applications, brand identities, and digital ecosystems that help African businesses grow. Web architecture, AI-driven automation, and enterprise solutions — engineered for Africa.",
  keywords: [
    "IT solutions Africa",
    "web development Botswana",
    "custom software Africa",
    "digital transformation Africa",
    "web architecture",
    "brand identity design",
    "AI automation Africa",
    "SaaS development",
    "enterprise software",
    "Samaria Tech",
  ],
  authors: [{ name: "Samaria Technology", url: BASE_URL }],
  creator: "Samaria Technology",
  publisher: "Samaria Technology",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_ZA",
    url: BASE_URL,
    siteName: "Samaria Tech",
    title: "Samaria Tech | Custom IT Solutions for African Businesses",
    description:
      "Bespoke web applications, brand identities & digital ecosystems for African businesses. Engineering Africa's digital future.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Samaria Tech – Engineering Africa's Digital Future",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Samaria Tech | Custom IT for African Businesses",
    description:
      "Bespoke web apps, brand systems & digital ecosystems for Africa.",
    images: ["/og-image.png"],
    creator: "@samariatech",
  },
  alternates: {
    canonical: BASE_URL,
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

// JSON-LD: Organization + WebSite schema
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${BASE_URL}/#organization`,
      name: "Samaria Technology",
      url: BASE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/logo.png`,
        width: 240,
        height: 64,
      },
      description:
        "Custom IT solutions, web architecture, brand identity, and digital ecosystems for African businesses.",
      foundingDate: "2019",
      areaServed: ["Africa", "Botswana", "Zimbabwe", "Kenya", "South Africa"],
      contactPoint: {
        "@type": "ContactPoint",
        email: "mission@samaria.tech",
        contactType: "customer service",
        availableLanguage: "English",
      },
      sameAs: [
        "https://twitter.com/samariatech",
        "https://linkedin.com/company/samariatech",
        "https://github.com/samariatech",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${BASE_URL}/#website`,
      url: BASE_URL,
      name: "Samaria Tech",
      publisher: { "@id": `${BASE_URL}/#organization` },
      potentialAction: {
        "@type": "SearchAction",
        target: `${BASE_URL}/?s={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "LocalBusiness",
      "@id": `${BASE_URL}/#localbusiness`,
      name: "Samaria Technology",
      image: `${BASE_URL}/logo.png`,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Gaborone",
        addressCountry: "BW",
      },
      url: BASE_URL,
      telephone: "+267 71 234 567",
      priceRange: "$$",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const fontClasses = `${cinzel.variable} ${orbitron.variable} ${montserrat.variable}`;

  return (
    <html lang="en" className={fontClasses}>
      <head>
        {/* Preconnect for Google Fonts (performance) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${fontClasses} antialiased`}>
        <MarginalGraphics />
        <LoadingScreen />
        <Navbar />
        <ScrollIndicator />
        <CelestialProvider>
          <SamuraiJackBackground />
          <ViewTransitionsProvider>
            {children}
          </ViewTransitionsProvider>
        </CelestialProvider>
        <Footer />
      </body>
    </html>
  );
}
