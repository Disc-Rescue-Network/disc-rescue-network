import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LogoRescueFlow2 from "../components/LogoRescueFlow2";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/requestCourseComponents.css";
import Card from "../components/Card";
import Button from "../components/Button";

export default function ClaimDiscSuccess() {
  const location = useLocation();
  const { pickupPreferences, pickupName, disc, contactMethod, contactValue } =
    location.state || {};
  const [isMobile, setIsMobile] = useState(window.innerWidth < 500);
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

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

  return (
    <div
      className="container-store"
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
          Nailed
          <span className="fw-light"> IT!</span>
        </h2>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          maxWidth: "1368px",
        }}
      >
        <h2 className="success-message" style={{ textAlign: "center" }}>
          Your claim has been submitted to {disc?.course.name}. You will receive
          a {PCM} with detailed pickup information and further instructions once
          pickup has been confirmed by {disc?.course.name}.
        </h2>
      </div>
      <div
        className="verify-info claim-disc claim-border-bottom no-flex-direction no-color grey-background white-border drop-shadow extra-padding"
        style={{ maxHeight: "400px", padding: "0px !important" }}
      >
        <div className="box-content-disc-success d-flex flex-column">
          <div
            className="verify-row-claim-success"
            style={{ marginBottom: "20px", fontSize: "1rem" }}
          >
            <label>Pickup Preferences: </label>
            <span id="verifyPickupPreferences" className="lato">
              {pickupPreferences.join(", ") || "No Preference"}
            </span>
          </div>
          <div
            className="verify-row-claim-success"
            style={{ marginBottom: "20px", fontSize: "1rem" }}
          >
            <label id="pickupLocationLabel">Pickup Location: </label>
            <span id="verifyPickupLocation" className="lato">
              {disc?.course.name} - {disc?.course.city}, {disc?.course.state}
            </span>
          </div>
          <div
            className="verify-row-claim-success"
            style={{ marginBottom: "20px", fontSize: "1rem" }}
          >
            <label id="communicationMethodLabel">
              {contactMethod === "phone"
                ? "Phone Number For Release: "
                : "Email For Release: "}
            </label>
            <span id="verifyContactInfoForRelease" className="lato">
              {contactValue}
            </span>
          </div>
        </div>
        <div
          className="verify-row"
          id="discInfoVerify"
          style={{
            color: "var(--primary-black) !important",
            width: "100%",
            maxWidth: "400px",
            margin: "0 auto",
          }}
        >
          {disc && (
            <Card disc={disc} showButton={false} className="center-important" />
          )}
        </div>
      </div>
      <Button
        text={"Share to facebook"}
        red={true}
        className="red-button-surrender"
        onClick={handleFacebookShare}
      />
    </div>
  );
}
