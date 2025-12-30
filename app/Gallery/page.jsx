"use client";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";

const GalleryPage = () => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(2);
  const [loading, setLoading] = useState(false);

  // Fetch images (Picsum API)
  const fetchImages = async (pageNum) => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://picsum.photos/v2/list?page=${pageNum}&limit=24`
      );
      if (!response.ok) throw new Error("Failed to fetch images");

      const data = await response.json();

      // Filter duplicates
      setImages((prevImages) => {
        const existingIds = new Set(prevImages.map((img) => img.id));
        const uniqueNewImages = data.filter((img) => !existingIds.has(img.id));
        return [...prevImages, ...uniqueNewImages];
      });
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages(page);
  }, [page]);

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  // Single Image Download
  const handleDownload = async (e, url, fileName) => {
    e.stopPropagation();
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading the image:", error);
    }
  };

  // Bulk Download (JSZip)
  const downloadAllImages = async () => {
    const zip = new JSZip();
    const imagesFolder = zip.folder("images");
    alert("Starting download... this might take a moment!");

    try {
      for (const image of images) {
        const response = await fetch(image.download_url);
        const blob = await response.blob();
        imagesFolder.file(`${image.id}.jpg`, blob);
      }

      const zipBlob = await zip.generateAsync({ type: "blob" });
      saveAs(zipBlob, "gallery.zip");
    } catch (error) {
      console.error("Error creating ZIP file:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
          <Link
            href="/"
            className="px-4 py-2 bg-white rounded-lg shadow text-gray-700 hover:bg-gray-50 transition"
          >
            ← Back Home
          </Link>

          <h1 className="text-3xl font-bold text-gray-800">
            Gallery of Inspiration
          </h1>

          {/* Download All Button (Styled) */}
          <button
            onClick={downloadAllImages}
            className="flex items-center space-x-2 bg-gray-800 text-white px-5 py-2.5 rounded-lg hover:bg-gray-700 transition shadow-md"
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
            <span>Download All</span>
          </button>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {images.map((image) => (
            <div
              key={image.id}
              className="group relative h-72 overflow-hidden rounded-xl shadow-lg bg-gray-200"
            >
              <Image
                src={image.download_url}
                alt={image.author || "Image description"}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <div className="flex justify-between items-end w-full">
                  {/* Photographer Info */}
                  <div className="text-white text-sm font-medium">
                    <p className="opacity-80 text-xs">Photo by</p>
                    <p>{image.author}</p>
                  </div>

                  {/* Individual Download Button */}
                  <button
                    onClick={(e) =>
                      handleDownload(e, image.download_url, `${image.id}.jpg`)
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

        {/* Load More Button (Styled) */}
        <div className="flex justify-center mt-12 mb-8">
          <button
            onClick={loadMore}
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
      </div>
    </div>
  );
};

export default GalleryPage;
