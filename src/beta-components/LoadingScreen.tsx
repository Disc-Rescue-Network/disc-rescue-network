// LoadingScreen.tsx
import React, { useEffect, useState } from "react";
import "../beta-styles/loadingScreen.css";

const LoadingScreen: React.FC = () => {
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setLoadingProgress(100), 100); // Start loading bar
    return () => clearTimeout(timer);
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
