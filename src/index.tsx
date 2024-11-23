// index.tsx
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "./globals.css";
import LoadingScreen from "./views/LoadingSceen";
import { useCourses } from "./hooks/useCourses";
import { InventoryProvider, useInventoryContext } from "./hooks/useInventory";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const Index: React.FC = () => {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <InventoryProvider>
          <App />
        </InventoryProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
};

root.render(<Index />);
