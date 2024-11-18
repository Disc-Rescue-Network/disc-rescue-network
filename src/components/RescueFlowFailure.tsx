import Button from "./Button";
import LogoRescueFlow from "./LogoRescueFlow";
import HeaderRescueFlow from "./RescueFlowComponets";
import "../styles/rescueFlowFailure.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import lottie from "lottie-web";

const RescueFlowFailure = () => {
  const navigate = useNavigate();
  const lottieContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const animationInstance = lottie.loadAnimation({
      container: lottieContainerRef.current!,
      renderer: "svg",
      loop: true,
      autoplay: true,
      path: "/Miss_White.json",
    });

    // Cleanup: Destroy the animation instance on unmount or re-render
    return () => {
      animationInstance.destroy();
    };
  }, []);

  const reportLostDisc = () => {
    window.location.href = "https://discrescuenetwork.com/report-lost-disc";
  };

  const SearchAll = () => {
    navigate("/searchInventory");
  };

  return (
    <>
      <LogoRescueFlow />
      <div className="upper-lottie">
        {/* Lottie Animation */}
        <div ref={lottieContainerRef} className="lottie-container" />
      </div>

      <HeaderRescueFlow
        baseText={"Doink!"}
        lightText={""}
        baseNumber={""}
        lightNumber={""}
        whereText={"So Maybe It's Not"}
        secondMissingText={" Perfect."}
        smallerText={
          "But it never gives up. Submit the information you used in the wizard to report your disc lost and be notified if the wizard finds it, so it can reunite you."
        }
        className="custom-rescue-flow-failure"
      />
      <div className="buttons-rescue-failure">
        <Button
          text={"Report My Disc Lost and Help The Wizard"}
          red={true}
          className="button-red-rescue-failure"
          onClick={reportLostDisc}
        />
        <Button
          text={"Fine, I'll do it Myself"}
          red={false}
          border={true}
          className="second-button-rescue-failure white-border"
          onClick={SearchAll}
        />
      </div>
    </>
  );
};

export default RescueFlowFailure;
