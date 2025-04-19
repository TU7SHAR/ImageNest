import Link from "next/link";
import Nav from "./components/Nav";
import HomePage from "./components/HomePage";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <HomePage />
      <Footer />
    </>
  );
}
