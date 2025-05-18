import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LogoRescueFlow2 from "../components/LogoRescueFlow2";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import "../styles/successPages.css";
// import Button from "../components/Button"; // Uncomment when needed for social sharing
import { useLocation, useNavigate } from "react-router-dom";
import { useTitle } from "../hooks/useTitle";

export default function SurrenderDiscSuccess() {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const location = useLocation();
  const { disc } = location.state || {};
  useTitle("Surrender Disc Success");

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
          Nailed <span className="fw-light">IT!</span>
        </h1>
      </div>

      <div className="success-details-panel">
        <div className="surrender-success-message">
          <p>
            You have successfully surrendered your disc to the course.
            <br />
            <strong>The volunteers thank you for your help!</strong>
          </p>
        </div>

        {disc && (
          <div className="claim-details-content">
            <div className="details-row">
              <div className="details-label">Course:</div>
              <div className="details-value">{disc.course.name}</div>
            </div>
            <div className="details-row">
              <div className="details-label">Disc Info:</div>
              <div className="details-value">
                {disc.disc.brand.name} {disc.disc.name}{" "}
                {disc.color && `(${disc.color})`}
              </div>
            </div>
          </div>
        )}
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
