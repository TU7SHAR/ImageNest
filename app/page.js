import Script from "next/script";
import HomePage from "./components/HomePage";

export default function Home() {
  return (
    <>
      <HomePage />
      {/* Bubbl Widget */}
      <Script id="bubbl-init" strategy="beforeInteractive">
        {`window.BOTFACTORY_ID = "8";`}
      </Script>
      <Script
        src="https://app.bubbl.ooo/static/js/embed.js"
        strategy="afterInteractive"
      />
    </>
  );
}
