// LoadingScreen.tsx
import React, { useEffect, useState } from "react";
import "../beta-styles/loadingScreen.css";
import { useNavigate } from "react-router-dom";

const LoadingScreen: React.FC = () => {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setLoadingProgress(100), 2000); // Start loading bar
    return navigate("/home");
  }, []);

  const loadingBarStyle = {
    width: `${loadingProgress}%`,
    backgroundColor: "#4caf50",
    height: "100%",
  };

  return (
    <div className="app-container">
      <div className="loading-logo"></div>
      <div className="loading-bar-container">
        <div className="loading-bar" style={loadingBarStyle}></div>
      </div>
    </div>
  );
};

export default LoadingScreen;
