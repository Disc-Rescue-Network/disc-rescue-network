import { useEffect, useRef } from "react";
import "../styles/loadingScreen.css";
import lottie from "lottie-web";

export default function LoadingPage() {
  const lottieContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const animationInstance = lottie.loadAnimation({
      container: lottieContainerRef.current!,
      renderer: "svg",
      loop: true,
      autoplay: true,
      path: "/LoadingLottie.json",
    });

    // Cleanup: Destroy the animation instance on unmount or re-render
    return () => {
      animationInstance.destroy();
    };
  }, []);

  return (
    <div className="app-container">
      {/* <div className="loading-logo"></div>
      <div className="loading-bar-container">
        <div className="loading-bar"></div>
      </div> */}
      <div className="upper-lottie">
        {/* Lottie Animation */}
        <div ref={lottieContainerRef} className="lottie-container" />
      </div>
    </div>
  );
}
