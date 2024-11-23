// index.tsx
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "./globals.css";
import LoadingScreen from "./views/LoadingSceen";
import { CoursesProvider } from "./hooks/useCourses";
import { InventoryProvider } from "./hooks/useInventory";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const Index: React.FC = () => {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <InventoryProvider>
          <CoursesProvider>
            <App />
          </CoursesProvider>
        </InventoryProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
};

root.render(<Index />);
