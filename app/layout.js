import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "NestImage - Explore and Download Stunning Images",
  description:
    "NestImage is your ultimate platform for exploring and downloading high-quality images. Discover nature, portraits, events, and abstract art effortlessly.",
  keywords:
    "images, download images, high-quality images, image gallery, NestImage, explore images, free images, photography, art, memories",
  author: "NestImage Team",
  viewport: "width=device-width, initial-scale=1.0",
  themeColor: "#ffffff",
  openGraph: {
    title: "NestImage - Explore and Download Stunning Images",
    description:
      "Discover and download high-quality images effortlessly with NestImage. Explore nature, portraits, events, and abstract art.",
    url: "https://nestimage.vercel.app",
    type: "website",
    images: [
      {
        url: "https://nestimage.vercel.app/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "NestImage - Explore and Download Stunning Images",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NestImage - Explore and Download Stunning Images",
    description:
      "Discover and download high-quality images effortlessly with NestImage. Explore nature, portraits, events, and abstract art.",
    images: ["https://nestimage.vercel.app/twitter-image.jpg"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://nestimage.vercel.app" />
        <link rel="apple-touch-icon" sizes="180x180" href="/iN.png"></link>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "NestImage",
              url: "https://nestimage.vercel.app",
              description:
                "NestImage is your ultimate platform for exploring and downloading high-quality images. Discover nature, portraits, events, and abstract art effortlessly.",
              publisher: {
                "@type": "Organization",
                name: "NestImage Team",
                logo: {
                  "@type": "ImageObject",
                  url: "https://nestimage.vercel.app/og-image.jpg",
                },
              },
              potentialAction: {
                "@type": "SearchAction",
                target:
                  "https://nestimage.vercel.app/search?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        ></script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-100`}
      >
        {children}
      </body>
    </html>
  );
}
