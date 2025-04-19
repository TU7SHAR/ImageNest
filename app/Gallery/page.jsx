"use client";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import Image from "next/image";
import { useEffect, useState } from "react";
import Nav from "../components/Nav";

const GalleryPage = () => {
  const [images, setImages] = useState([]); // Store images
  const [page, setPage] = useState(2); // Track the current page
  const [loading, setLoading] = useState(false); // Track loading state

  // Fetch images for the current page
  const fetchImages = async (pageNum) => {
    try {
      setLoading(true); // Show loading state
      const response = await fetch(
        `https://picsum.photos/v2/list?page=${pageNum}&limit=24`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch images");
      }
      const data = await response.json();
      setImages((prevImages) => [...prevImages, ...data]); // Append new images
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setLoading(false); // Hide loading state
    }
  };

  useEffect(() => {
    fetchImages(page); // Fetch the first page on component mount
  }, [page]); // Fetch new images whenever the page changes

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1); // Increment the page number
  };

  const handleDownload = async (url, fileName) => {
    try {
      const response = await fetch(url); // Fetch the image
      const blob = await response.blob(); // Convert into Blob
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob); // Create Blob URL
      link.download = fileName; // Set file name
      document.body.appendChild(link);
      link.click(); // Trigger download
      document.body.removeChild(link); // Clean up
    } catch (error) {
      console.error("Error downloading the image:", error);
    }
  };

  const downloadAllImages = async () => {
    const zip = new JSZip(); // Create a new zip object
    const imagesFolder = zip.folder("images"); // Create a folder within the zip file

    try {
      for (const image of images) {
        const response = await fetch(image.download_url); // Fetch the image
        const blob = await response.blob(); // Convert the response into a Blob
        imagesFolder.file(`${image.id}.jpg`, blob); // Add the image to the zip folder
      }

      const zipBlob = await zip.generateAsync({ type: "blob" }); // Generate the zip file as a Blob
      saveAs(zipBlob, "gallery.zip"); // Trigger the download of the zip file
    } catch (error) {
      console.error("Error creating ZIP file:", error);
    }
  };
  return (
    <div>
      <Nav />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-thin border-b border-brown-500 space-x-0.5 text-center mb-6">
          Gallery of Inspiration
        </h1>
        <button
          onClick={downloadAllImages}
          className="bg-gray-200 flex items-center space-x-2 hover:bg-gray-400 mb-4 text-black font-bold py-2 px-4 rounded-md"
        >
          <Image
            src="/download.svg" // Path to your SVG in the public folder
            alt="Download Icon"
            width={20}
            height={20}
          />
          <span>Download All</span> {/* Wrapping text for better alignment */}
          <span className="font-thin text-md underline">(Takes some time)</span>
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((image) => (
            <div
              key={image.id}
              className="relative overflow-hidden rounded-lg shadow-lg mb-4"
            >
              {/* Display the image */}
              <Image
                src={image.download_url}
                alt={image.author || "Image description"}
                width={300}
                height={200}
                className="object-cover w-full h-full"
              />
              {/* Download Button */}
              <button
                onClick={() =>
                  handleDownload(image.download_url, `${image.id}.jpg`)
                }
                className="absolute bottom-2 right-2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-200 transition"
              >
                <Image
                  src="/download.svg" // Path to your SVG in the public folder
                  alt="Download Icon"
                  width={15}
                  height={15}
                />
              </button>
            </div>
          ))}
        </div>
        {/* Load More Button */}
        <div className="text-center mt-6">
          <button
            onClick={loadMore} // Fetch the next page
            disabled={loading} // Disable button while loading
            className={`bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Loading..." : "Load More"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GalleryPage;
