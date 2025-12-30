import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// 1. VIEWPORT: Handles mobile scaling and theme colors
export const viewport = {
  width: "device-width",
  initialScale: 1.0,
  themeColor: "#ffffff",
};

// 2. METADATA: Global SEO Configuration
export const metadata = {
  // Fixes "Invalid URL" issues for OG images by setting a base domain
  metadataBase: new URL("https://nestimage.vercel.app"),

  // Title Template: "%s" is replaced by specific page titles
  title: {
    default: "NestImage - Explore and Download Stunning Images",
    template: "%s | NestImage",
  },

  description:
    "NestImage is your ultimate platform for exploring and downloading high-quality images. Discover nature, portraits, events, and abstract art effortlessly.",

  keywords: [
    "images",
    "download images",
    "high-quality images",
    "image gallery",
    "NestImage",
    "explore images",
    "free images",
    "photography",
    "art",
  ],

  authors: [{ name: "NestImage Team" }],

  openGraph: {
    title: "NestImage - Explore and Download Stunning Images",
    description:
      "Discover and download high-quality images effortlessly with NestImage. Explore nature, portraits, events, and abstract art.",
    url: "https://nestimage.vercel.app",
    siteName: "NestImage",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.jpg", // Must be in 'public' folder
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
      "Discover and download high-quality images effortlessly with NestImage.",
    images: ["/twitter-image.jpg"], // Simplified path if in public folder
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta
          name="google-site-verification"
          content="rBrrE7t3BR48ls4auCo6InKHWvpdbTLE5mKH3TuT7mY"
        />
        <link rel="canonical" href="https://nestimage.vercel.app" />
        <link rel="apple-touch-icon" sizes="180x180" href="/iN.png" />

        {/* Schema.org JSON-LD for Google Rich Results */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "NestImage",
              url: "https://nestimage.vercel.app",
              description:
                "NestImage is your ultimate platform for exploring and downloading high-quality images.",
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
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-100 flex flex-col min-h-screen`}
      >
        <Nav />
        {/* flex-grow ensures footer stays at bottom if content is short */}
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
