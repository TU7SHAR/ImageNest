import { NextResponse } from "next/server";

export async function GET() {
  const baseUrl = "https://nestimage.vercel.app";

  // List of all important pages on your website
  const pages = ["", "/about", "/gallery", "/login", "/register"];

  // Generate the sitemap XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${pages
    .map(
      (page) => `
    <url>
      <loc>${baseUrl}${page}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>${page === "" ? "1.0" : "0.8"}</priority>
    </url>
  `
    )
    .join("")}
</urlset>`;

  // Return the sitemap as a response
  return new NextResponse(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
