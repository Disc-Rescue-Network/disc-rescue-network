import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LogoRescueFlow2 from "../components/LogoRescueFlow2";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/successPages.css";
// import Button from "../components/Button"; // Uncomment when needed for social sharing
import { Disc } from "../App";
import { useTitle } from "../hooks/useTitle";

export default function ClaimDiscSuccess() {
  const location = useLocation();
  const { pickupPreferences, disc, contactMethod, contactValue } =
    location.state || {};
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const claimedDisc = disc as Disc;

  useTitle("Claim Success");

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      navigate(-1);
    }
  };
  /* Uncomment when social sharing is needed
  const handleFacebookShare = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      "https://www.facebook.com/profile.php?id=61555743963826"
    )}`;
    window.open(facebookUrl, "_blank");
  };
  */

  const PCM = contactMethod === "phone" ? "Text" : "Email";

  if (!claimedDisc) {
    return <div>Error: Disc not found</div>;
  }
  return (
    <div className="container-light-blue success-page">
      <div className="logo-and-arrow">
        <i
          className="arrow-left-icon"
          style={{ fontSize: "1.5rem" }}
          onClick={handleBack}
          aria-label="Go back"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </i>
        <LogoRescueFlow2 />
      </div>

      <div className="success-header">
        <h1>
          Claim <span className="fw-light">Submitted!</span>
        </h1>
      </div>

      <div className="success-message-container">
        <p className="success-message-text">
          Your claim has been submitted to <strong>{disc?.course.name}</strong>.
          You will receive a {PCM} with detailed pickup information and further
          instructions once pickup has been confirmed by {disc?.course.name}.
        </p>
      </div>

      <div className="success-details-panel">
        <h2 className="details-header">Claim Details</h2>
        <div className="claim-details-content">
          <div className="details-row">
            <div className="details-label">Pickup Preferences:</div>
            <div className="details-value">
              {pickupPreferences?.join(", ") || "No Preference"}
            </div>
          </div>
          <div className="details-row">
            <div className="details-label">Pickup Location:</div>
            <div className="details-value">
              {claimedDisc?.course.name} - {claimedDisc?.course.city},{" "}
              {claimedDisc?.course.state}
            </div>
          </div>
          <div className="details-row">
            <div className="details-label">{PCM} Details:</div>
            <div className="details-value">{contactValue}</div>
          </div>
          <div className="details-row">
            <div className="details-label">Disc Details:</div>
            <div className="details-value">
              {claimedDisc?.disc.brand.name} {claimedDisc?.disc.name} (
              {claimedDisc?.color} - {claimedDisc?.disc.plasticType} plastic)
            </div>
          </div>
        </div>
      </div>

      {/* Uncomment when social sharing is needed
      <Button
        text={"Share to Facebook"}
        red={true}
        className="share-button"
        onClick={handleFacebookShare}
      /> */}
    </div>
  );
}
