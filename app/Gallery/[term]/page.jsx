"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import Link from "next/link";

const API_KEY = process.env.NEXT_PUBLIC_PIXABAY_KEY;
const CategoryPage = () => {
  // 1. Get the category term from the URL (e.g., "nature")
  const params = useParams();
  const term = params.term; // This comes from the folder name [term]

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  // 2. Function to fetch from Pixabay
  const fetchPixabayImages = async () => {
    if (!term) return;

    try {
      setLoading(true);
      // Pixabay API URL format
      const url = `https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(
        term
      )}&image_type=photo&per_page=24`;

      const response = await fetch(url);

      if (!response.ok) throw new Error("Failed to fetch from Pixabay");

      const data = await response.json();
      setImages(data.hits || []); // Pixabay puts images inside a "hits" array
    } catch (error) {
      console.error("Error fetching Pixabay images:", error);
    } finally {
      setLoading(false);
    }
  };

  // 3. Run fetch when the page loads or "term" changes
  useEffect(() => {
    fetchPixabayImages();
  }, [term]);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Navigation / Header */}
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/"
            className="px-4 py-2 bg-white rounded-lg shadow text-gray-700 hover:bg-gray-50 transition"
          >
            ← Back to Gallery
          </Link>
          <h1 className="text-3xl font-bold capitalize text-gray-800">
            {decodeURIComponent(term)} Collection
          </h1>
          <div className="w-24"></div> {/* Spacer for centering */}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-20">
            <p className="text-xl text-gray-500 animate-pulse">
              Loading amazing images...
            </p>
          </div>
        )}

        {/* Error / Empty State */}
        {!loading && images.length === 0 && (
          <div className="text-center py-20 bg-white rounded-xl shadow">
            <h2 className="text-2xl font-semibold text-gray-700">
              No images found 😔
            </h2>
            <p className="text-gray-500 mt-2">
              Try checking your API key or choosing a different category.
            </p>
          </div>
        )}

        {/* Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {images.map((img) => (
            <div
              key={img.id}
              className="group relative h-64 overflow-hidden rounded-xl shadow-lg bg-gray-200"
            >
              <Image
                src={img.webformatURL} // Pixabay's standard image size
                alt={img.tags}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />

              {/* Hover Overlay with User Info */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <p className="text-white text-sm font-medium">📸 {img.user}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
