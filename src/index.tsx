// index.tsx
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "./globals.css";
import LoadingScreen from "./views/LoadingSceen";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const Index: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      const loadingBar = document.querySelector(".loading-bar") as HTMLElement;
      if (loadingBar) {
        loadingBar.style.width = "100%";
      }
    }, 100);

    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  return (
    <React.StrictMode>
      <BrowserRouter>{loading ? <LoadingScreen /> : <App />}</BrowserRouter>
    </React.StrictMode>
  );
};

root.render(<Index />);

// Add the CSS from your loading screen to your main CSS file or create a new CSS file for it and import it in LoadingScreen.tsx
