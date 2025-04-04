import React from "react";
import Image from "next/image";
import Link from "next/link";

function HomePage() {
  return (
    <>
      <div className="min-h-screen bg-gray-100">
        <div className="relative h-[600px]">
          <Image
            src="/gallery.jpg" // Replace with your hero image path
            alt="Beautiful photography collage"
            layout="fill"
            objectFit="cover"
            className="opacity-90"
          />
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
            <div className="text-center text-white max-w-4xl px-4">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Where Memories Become Art
              </h1>
              <p className="text-xl mb-8 md:text-2xl">
                Discover, share, and preserve your most precious visual moments
              </p>
              <Link
                href="/gallery"
                className="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Explore Gallery
              </Link>
            </div>
          </div>
        </div>

        {/* Featured Categories */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
              Popular Categories
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {["Nature", "Portraits", "Events", "Abstract"].map((category) => (
                <div
                  key={category}
                  className="bg-white rounded-xl shadow-lg overflow-hidden transform transition hover:scale-105"
                >
                  <Image
                    src={`/${category.toLowerCase()}.jpg`} // Replace with actual image paths
                    alt={category}
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-800">
                      {category}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Latest Uploads */}
        <section className="py-16 bg-gray-200">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
              Latest Uploads
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
              {["latest1", "latest2", "latest3"].map((image) => (
                <div
                  key={image}
                  className="bg-white rounded-xl shadow-lg overflow-hidden"
                >
                  <Image
                    src={`/${image}.jpg`} // Replace with actual image paths
                    alt={`Latest Upload ${image}`}
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default HomePage;
