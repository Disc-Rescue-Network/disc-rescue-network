import React, { useEffect } from "react";
import "../styles/loadingScreen.css";
import { useNavigate } from "react-router";

export default function LoadingPage() {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      const loadingBar = document.querySelector(".loading-bar") as HTMLElement;
      if (loadingBar) {
        loadingBar.style.width = "100%";
      }
    }, 100);

    setTimeout(() => {
      navigate("/home");
    }, 3000);
  }, [navigate]);

  return (
    <div className="app-container">
      <div className="loading-logo"></div>
      <div className="loading-bar-container">
        <div className="loading-bar"></div>
      </div>
    </div>
  );
}
