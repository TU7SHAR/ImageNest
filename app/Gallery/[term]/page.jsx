"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import Link from "next/link";

// Access the key from environment variables
const API_KEY = process.env.NEXT_PUBLIC_PIXABAY_KEY;

const CategoryPage = () => {
  const params = useParams();
  const term = params.term; // e.g. "nature"

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1); // Track current page number
  const [hasMore, setHasMore] = useState(true); // Check if API has more results

  // 1. Fetch Function (Handles both Initial Load & Load More)
  const fetchPixabayImages = async (pageNum, isNewSearch = false) => {
    if (!term || !API_KEY) return;

    try {
      setLoading(true);
      const url = `https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(
        term
      )}&image_type=photo&per_page=24&page=${pageNum}`;

      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch");

      const data = await response.json();

      if (data.hits.length === 0) {
        setHasMore(false); // Stop "Load More" if no results
      }

      if (isNewSearch) {
        setImages(data.hits); // Replace images if it's a new category
      } else {
        // Filter duplicates before adding new images
        setImages((prev) => {
          const existingIds = new Set(prev.map((img) => img.id));
          const uniqueNew = data.hits.filter((img) => !existingIds.has(img.id));
          return [...prev, ...uniqueNew];
        });
      }
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setLoading(false);
    }
  };

  // 2. Effect: Reset and Fetch when Category (term) changes
  useEffect(() => {
    if (term) {
      setImages([]); // Clear old images
      setPage(1); // Reset page count
      setHasMore(true);
      fetchPixabayImages(1, true); // Fetch Page 1
    }
  }, [term]);

  // 3. Handle Load More Click
  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchPixabayImages(nextPage, false);
  };

  // 4. Handle Image Download
  const handleDownload = async (e, imgUrl, imgId) => {
    e.stopPropagation(); // Prevent clicking the parent container if needed
    e.preventDefault();

    try {
      // Fetch the image as a blob to force download
      const response = await fetch(imgUrl);
      const blob = await response.blob();

      // Create a temporary link to trigger download
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `imagenest-${term}-${imgId}.jpg`; // Custom filename
      document.body.appendChild(link);
      link.click();

      // Cleanup
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
      alert("Could not download image. Opening in new tab instead.");
      window.open(imgUrl, "_blank");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/Gallery"
            className="px-4 py-2 bg-white rounded-lg shadow text-gray-700 hover:bg-gray-50 transition"
          >
            ← Back
          </Link>
          <h1 className="text-3xl font-bold capitalize text-gray-800">
            {decodeURIComponent(term)} Gallery
          </h1>
          <div className="w-20"></div> {/* Spacer */}
        </div>

        {/* Empty State */}
        {!loading && images.length === 0 && (
          <div className="text-center py-20">
            <p className="text-xl text-gray-500">
              No images found for this category.
            </p>
          </div>
        )}

        {/* Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {images.map((img) => (
            <div
              key={img.id}
              className="group relative h-72 overflow-hidden rounded-xl shadow-lg bg-gray-200"
            >
              <Image
                src={img.webformatURL}
                alt={img.tags}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />

              {/* Overlay: Gradient + User Info + Download Button */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <div className="flex justify-between items-end w-full">
                  {/* Photographer Name */}
                  <div className="text-white text-sm font-medium">
                    <p className="opacity-80 text-xs">Photo by</p>
                    <p>{img.user}</p>
                  </div>

                  {/* DOWNLOAD BUTTON */}
                  <button
                    onClick={(e) =>
                      handleDownload(e, img.largeImageURL, img.id)
                    }
                    className="bg-white text-gray-800 p-2 rounded-full shadow-lg hover:bg-blue-600 hover:text-white transition-colors transform hover:scale-110 active:scale-95"
                    title="Download Image"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button Section */}
        {images.length > 0 && hasMore && (
          <div className="flex justify-center mt-12 mb-8">
            <button
              onClick={handleLoadMore}
              disabled={loading}
              className={`px-8 py-3 rounded-full font-semibold shadow-md transition-all duration-300 ${
                loading
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg transform hover:-translate-y-1"
              }`}
            >
              {loading ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Loading...
                </span>
              ) : (
                "Load More Images"
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
