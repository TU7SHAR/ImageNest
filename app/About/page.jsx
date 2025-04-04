import React from "react";
import Nav from "../components/Nav";

export default function Page() {
  return (
    <div>
      <Nav />
      <main className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 p-6">
        <head>
          <title>About Us - NestImage</title>
          <meta
            name="description"
            content="Learn more about NestImage, your go-to platform for high-quality images and a vibrant community of photographers."
          />
          <meta
            name="keywords"
            content="NestImage, photography, high-quality images, image sharing, creative community"
          />
          <meta name="author" content="NestImage Team" />
        </head>
        <section className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg mt-10">
          <h1 className="text-4xl font-bold text-center text-blue-600 mb-6">
            About NestImage
          </h1>
          <div className="flex flex-col md:flex-row items-center mb-6">
            <img
              src="https://via.placeholder.com/300"
              alt="Photography"
              className="rounded-lg shadow-md w-full md:w-1/2 mb-4 md:mb-0"
            />
            <div className="md:ml-6">
              <p className="text-gray-700 leading-relaxed mb-4">
                At NestImage, we believe that every image tells a story. Founded
                with a passion for photography and a commitment to creativity,
                our platform serves as a sanctuary for image enthusiasts,
                artists, and professionals alike.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                Our mission is to provide a space where individuals can explore,
                share, and download high-quality images that inspire and elevate
                their projects.
              </p>
            </div>
          </div>
          <h2 className="text-2xl font-semibold text-blue-500 mb-4">
            Our Community
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            We understand the importance of visuals in today’s digital
            landscape. Whether you are a designer looking for the perfect
            backdrop, a marketer in need of compelling visuals, or simply
            someone who appreciates the beauty of photography, NestImage is
            designed to cater to your needs.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Our community is at the heart of what we do. We encourage
            photographers from all walks of life to share their work, allowing
            them to gain exposure and connect with a global audience. By
            fostering a collaborative environment, we aim to empower creators
            and celebrate the art of photography.
          </p>
          <h2 className="text-2xl font-semibold text-blue-500 mb-4">
            User Experience
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            In addition to our vast collection of images, we prioritize user
            experience. Our platform is designed to be intuitive and
            user-friendly, making it easy for you to navigate through galleries,
            search for specific images, and download your favorites with just a
            few clicks.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Join us on this exciting journey as we continue to grow and evolve.
            Whether you’re here to find inspiration, share your work, or connect
            with fellow creatives, NestImage welcomes you to our community.
            Together, let’s celebrate the power of imagery and the stories they
            tell.
          </p>
        </section>
      </main>
    </div>
  );
}
