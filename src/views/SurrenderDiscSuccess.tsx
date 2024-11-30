import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LogoRescueFlow2 from "../components/LogoRescueFlow2";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import RequestCourseComponents from "../components/RequestCourseComponents";
import "../styles/requestCourseComponents.css";
import Button from "../components/Button";
import { useLocation, useNavigate } from "react-router-dom";

export default function SurrenderDiscSuccess() {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const location = useLocation();
  const { disc } = location.state || {};

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

  return (
    <div className="container-light-blue">
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
      <RequestCourseComponents
        baseText={"Nailed"}
        lightText={"IT!"}
        className="claim-disc-success"
      />
      <h4 className="success-message-surrender">
        You have successfully surrendered your disc to the course. The
        volunteers thank you for your help!
      </h4>
      {/* <Button
        text={"Share to facebook"}
        red={true}
        className="red-button-surrender"
        onClick={handleFacebookShare}
      /> */}
    </div>
  );
}
