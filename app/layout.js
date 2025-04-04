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
  title: "NestImage - Explore and Download Images",
  description:
    "NestImage is your go-to platform for exploring and downloading multiple images effortlessly. Discover high-quality images and organize your downloads with ease.",
  keywords:
    "images, download images, high-quality images, image gallery, NestImage, explore images, free images",
  author: "NestImage Team",
  viewport: "width=device-width, initial-scale=1.0",
  themeColor: "#ffffff",
  openGraph: {
    title: "NestImage - Explore and Download Images",
    description:
      "Discover and download high-quality images effortlessly with NestImage.",
    url: "https://nestimage.vercel.app", // Your project URL
    type: "website",
    images: [
      {
        url: "https://nestimage.vercel.app/og-image.jpg", // Replace with your actual Open Graph image URL
        width: 1200,
        height: 630,
        alt: "NestImage - Explore and Download Images",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NestImage - Explore and Download Images",
    description:
      "Discover and download high-quality images effortlessly with NestImage.",
    images: ["https://nestimage.vercel.app/twitter-image.jpg"], // Replace with your actual Twitter image URL
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-100`}
      >
        {children}
      </body>
    </html>
  );
}
