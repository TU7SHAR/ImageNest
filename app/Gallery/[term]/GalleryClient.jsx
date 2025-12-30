"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

// Access the key safely
const API_KEY = process.env.NEXT_PUBLIC_PIXABAY_KEY;

export default function GalleryClient({ term }) {
  // Receive 'term' as prop
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Fetch Function
  const fetchPixabayImages = async (pageNum, isNewSearch = false) => {
    if (!term || !API_KEY) return;
    try {
      setLoading(true);
      const url = `https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(
        term
      )}&image_type=photo&per_page=24&page=${pageNum}`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.hits.length === 0) setHasMore(false);

      if (isNewSearch) {
        setImages(data.hits);
      } else {
        setImages((prev) => {
          const existingIds = new Set(prev.map((img) => img.id));
          const uniqueNew = data.hits.filter((img) => !existingIds.has(img.id));
          return [...prev, ...uniqueNew];
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (term) {
      setImages([]);
      setPage(1);
      setHasMore(true);
      fetchPixabayImages(1, true);
    }
  }, [term]);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchPixabayImages(nextPage, false);
  };

  const handleDownload = async (e, imgUrl, imgId) => {
    e.stopPropagation();
    try {
      const response = await fetch(imgUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `imagenest-${term}-${imgId}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      window.open(imgUrl, "_blank");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
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
          <div className="w-20"></div>
        </div>

        {!loading && images.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            No images found.
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {images.map((img) => (
            <div
              key={img.id}
              className="group relative h-72 overflow-hidden rounded-xl shadow-lg bg-gray-200"
            >
              <Image
                src={img.webformatURL}
                alt={`${term} photo by ${img.user}`} // SEO Friendly Alt Text
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <div className="flex justify-between items-end w-full">
                  <span className="text-white text-sm">{img.user}</span>
                  <button
                    onClick={(e) =>
                      handleDownload(e, img.largeImageURL, img.id)
                    }
                    className="bg-white text-gray-800 p-2 rounded-full hover:bg-blue-600 hover:text-white transition"
                  >
                    ⬇
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {images.length > 0 && hasMore && (
          <div className="flex justify-center mt-12 mb-8">
            <button
              onClick={handleLoadMore}
              disabled={loading}
              className="px-8 py-3 rounded-full bg-blue-600 text-white font-bold shadow-md hover:bg-blue-700 transition"
            >
              {loading ? "Loading..." : "Load More Images"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
