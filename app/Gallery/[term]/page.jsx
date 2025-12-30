import GalleryClient from "./GalleryClient";

// 1. DYNAMIC METADATA (The SEO Magic)
export async function generateMetadata({ params }) {
  // Await the params first (Next.js 15 requirement)
  const { term } = await params;
  const capitalizedTerm = term.charAt(0).toUpperCase() + term.slice(1);

  return {
    title: `Best Free ${capitalizedTerm} Images | ImageNest`,
    description: `Download high-quality ${term} images, wallpapers, and photos for free on ImageNest. Explore our curated ${term} gallery today.`,
    keywords: [
      term,
      `${term} images`,
      `free ${term} photos`,
      "ImageNest",
      "gallery",
    ],
    openGraph: {
      title: `${capitalizedTerm} Images - Download Free on ImageNest`,
      description: `Get the best ${term} photos for your projects.`,
    },
  };
}

// 2. The Server Component
export default async function Page({ params }) {
  const { term } = await params;

  // Pass the term to the client component so it knows what to fetch
  return <GalleryClient term={term} />;
}
