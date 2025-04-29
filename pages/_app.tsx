import React from "react";
import "@/styles/globals.css";
import { useEffect } from "react";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    window.addEventListener("error", (e) => {
      alert("Greška: " + e.message);
    });

    window.addEventListener("unhandledrejection", (e) => {
      alert("Greška u promisu: " + e.reason);
    });
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
