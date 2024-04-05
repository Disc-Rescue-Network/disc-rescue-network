import React, { useEffect } from "react";
import "../styles/loadingScreen.css";
import { useNavigate } from "react-router";

export default function LoadingPage() {
  return (
    <div className="app-container">
      <div className="loading-logo"></div>
      <div className="loading-bar-container">
        <div className="loading-bar"></div>
      </div>
    </div>
  );
}
