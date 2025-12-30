import Image from "next/image";
import Link from "next/link";

// 1. SEO METADATA (Replaces the broken <head> tag)
export const metadata = {
  title: "About Us", // Becomes "About Us | NestImage"
  description:
    "Learn about NestImage, your go-to platform for high-quality images and a vibrant community of photographers.",
  keywords: [
    "NestImage",
    "photography",
    "high-quality images",
    "image sharing",
    "creative community",
  ],
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gray-100 py-12 px-6">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Hero Section */}
        <section className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="relative h-64 md:h-96 w-full">
            <Image
              src="https://cdn.pixabay.com/photo/2021/08/25/20/42/field-6574455_1280.jpg" // High quality cover image
              alt="Photographer taking photos in nature"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <h1 className="text-4xl md:text-6xl font-bold text-white tracking-wide text-center drop-shadow-lg">
                About NestImage
              </h1>
            </div>
          </div>

          <div className="p-8 md:p-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
              Where Creativity Meets Technology
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed text-center max-w-3xl mx-auto">
              At NestImage, we believe that every image tells a story. Founded
              with a passion for photography and a commitment to creativity, our
              platform serves as a sanctuary for image enthusiasts, artists, and
              professionals alike. Our mission is to provide a space where
              individuals can explore, share, and download high-quality images
              that inspire and elevate their projects.
            </p>
          </div>
        </section>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Community Card */}
          <section className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Our Community
            </h2>
            <p className="text-gray-600 leading-relaxed">
              We encourage photographers from all walks of life to share their
              work, allowing them to gain exposure and connect with a global
              audience. Whether you are a designer looking for the perfect
              backdrop or a marketer in need of compelling visuals, NestImage is
              designed to cater to your needs.
            </p>
          </section>

          {/* User Experience Card */}
          <section className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Seamless Experience
            </h2>
            <p className="text-gray-600 leading-relaxed">
              We prioritize speed and simplicity. Our platform is designed to be
              intuitive, making it easy for you to navigate through endless
              galleries, search for specific categories like Nature or Tech, and
              download your favorites in full resolution with just one click.
            </p>
          </section>
        </div>

        {/* Call to Action */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-xl p-8 md:p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Join Our Journey</h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto text-lg">
            Whether you’re here to find inspiration or share your work,
            NestImage welcomes you. Together, let’s celebrate the power of
            imagery.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/Gallery"
              className="px-8 py-3 bg-white text-blue-600 font-bold rounded-full shadow-lg hover:bg-gray-100 transition transform hover:-translate-y-1"
            >
              Explore Gallery
            </Link>
            <Link
              href="/Register"
              className="px-8 py-3 bg-transparent border-2 border-white text-white font-bold rounded-full hover:bg-white/10 transition"
            >
              Join Now
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
