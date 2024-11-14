// index.tsx
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "./globals.css";
import LoadingScreen from "./views/LoadingSceen";
import { useInventory } from "./hooks/useInventory";
import { useCourses } from "./hooks/useCourses";

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

  const { inventory, fetchInventory } = useInventory();

  React.useEffect(() => {
    if (inventory.length === 0) {
      //console.log("Fetching inventory");
      fetchInventory();
    }
  }, [inventory]);

  const { courses, fetchCourses, loading: loadingCourses } = useCourses();

  useEffect(() => {
    if (courses.length === 0) {
      fetchCourses();
    }
  }, []);

  return (
    <React.StrictMode>
      <BrowserRouter>{loading ? <LoadingScreen /> : <App />}</BrowserRouter>
    </React.StrictMode>
  );
};

root.render(<Index />);

// Add the CSS from your loading screen to your main CSS file or create a new CSS file for it and import it in LoadingScreen.tsx
