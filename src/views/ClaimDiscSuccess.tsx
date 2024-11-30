import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LogoRescueFlow2 from "../components/LogoRescueFlow2";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/requestCourseComponents.css";
import Button from "../components/Button";
import { Disc } from "../App";

export default function ClaimDiscSuccess() {
  const location = useLocation();
  const { pickupPreferences, pickupName, disc, contactMethod, contactValue } =
    location.state || {};
  const [isMobile, setIsMobile] = useState(window.innerWidth < 500);
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const claimedDisc = disc as Disc;

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      navigate(-1);
    }
  };

  const handleFacebookShare = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      "https://www.facebook.com/profile.php?id=61555743963826"
    )}`;
    window.open(facebookUrl, "_blank");
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 500);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const bottomPadding = isMobile ? "120px" : "150px";
  const PCM = contactMethod === "phone" ? "Text" : "Email";

  if (!claimedDisc) {
    return <div>Error: Disc not found</div>;
  }

  return (
    <div
      className="container-light-blue"
      style={{ padding: "10px", paddingBottom: bottomPadding }}
    >
      <div className="logo-and-arrow">
        <i
          className="arrow-left-icon"
          style={{ fontSize: "1.5rem" }}
          onClick={handleBack}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </i>
        <LogoRescueFlow2 />
      </div>

      <div className={`request-course-components claim-disc-success`}>
        <h2 style={{ textAlign: "center" }}>
          Claim
          <span className="fw-light"> Submitted!</span>
        </h2>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          margin: "auto",
          alignContent: "center",
          alignItems: "center",
          maxWidth: "1368px",
        }}
      >
        <h2 className="success-message" style={{ textAlign: "center" }}>
          Your claim has been submitted to {disc?.course.name}. You will receive
          a {PCM} with detailed pickup information and further instructions once
          pickup has been confirmed by {disc?.course.name}.
        </h2>
      </div>
      {/* Table-like grid layout */}
      <div className="claim-disc-table">
        {/* Table rows */}
        <div className="claim-disc-row">
          <div className="claim-disc-cell label">Pickup Preferences:</div>
          <div className="claim-disc-cell content">
            {pickupPreferences?.join(", ") || "No Preference"}
          </div>
        </div>
        <div className="claim-disc-row">
          <div className="claim-disc-cell label">Pickup Location:</div>
          <div className="claim-disc-cell content">
            {claimedDisc?.course.name} - {claimedDisc?.course.city},{" "}
            {claimedDisc?.course.state}
          </div>
        </div>
        <div className="claim-disc-row">
          <div className="claim-disc-cell label">{PCM} Details:</div>
          <div className="claim-disc-cell content">{contactValue}</div>
        </div>
        <div className="claim-disc-row">
          <div className="claim-disc-cell label">Disc Details:</div>
          <div className="claim-disc-cell content">
            {claimedDisc?.disc.brand.name} {claimedDisc?.disc.name} (
            {claimedDisc?.color} - {claimedDisc?.disc.plasticType} plastic)
          </div>
        </div>
      </div>

      {/* <Button
        text={"Share to Facebook"}
        red={true}
        className="red-button-surrender"
        onClick={handleFacebookShare}
      /> */}
    </div>
  );
}
