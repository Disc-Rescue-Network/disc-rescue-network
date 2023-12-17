// index.tsx
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import LoadingScreen from "./beta-components/LoadingScreen";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const Index: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000); // Hide loading after 3 seconds
    return () => clearTimeout(timer);
  }, []);

  return (
    <React.StrictMode>
      <BrowserRouter>{loading ? <LoadingScreen /> : <App />}</BrowserRouter>
    </React.StrictMode>
  );
};

root.render(<Index />);

// Add the CSS from your loading screen to your main CSS file or create a new CSS file for it and import it in LoadingScreen.tsx
