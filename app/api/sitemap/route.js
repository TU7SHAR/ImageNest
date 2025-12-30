// app/sitemap.js

export default function sitemap() {
  // 1. Your base domain
  const baseUrl = "https://nestimage.vercel.app";

  // 2. Your Static Pages (Home, About, etc.)
  const routes = ["", "/about", "/gallery", "/login", "/register"].map(
    (route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: route === "" ? 1 : 0.8,
    })
  );

  // 3. Your Dynamic Categories (Crucial for SEO!)
  // These are the categories you want Google to rank you for.
  const categories = [
    "nature",
    "cars",
    "technology",
    "abstract",
    "people",
    "animals",
    "architecture",
  ].map((category) => ({
    url: `${baseUrl}/Gallery/${category}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.9, // High priority so Google finds your images
  }));

  // 4. Combine them
  return [...routes, ...categories];
}
