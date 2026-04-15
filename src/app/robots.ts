import { MetadataRoute } from "next";

const BASE_URL = process.env.NODE_ENV === "development"
  ? "http://localhost:3000"
  : "https://www.samaria.tech";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
