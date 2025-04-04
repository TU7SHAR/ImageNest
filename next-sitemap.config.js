module.exports = {
  siteUrl: "https://nestimage.vercel.app",
  generateRobotsTxt: true,
  changefreq: "weekly",
  priority: 0.8,
  sitemapSize: 5000,
  additionalPaths: async (config) => [
    {
      loc: "/custom-page", // Add a custom page
      changefreq: "monthly",
      priority: 0.7,
    },
  ],
};
