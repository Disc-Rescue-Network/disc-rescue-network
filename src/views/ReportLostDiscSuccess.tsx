import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LogoRescueFlow2 from "../components/LogoRescueFlow2";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import RequestCourseComponents from "../components/RequestCourseComponents";
import "../styles/requestCourseComponents.css";
import { useTitle } from "../hooks/useTitle";

export default function ReportLostDiscSuccess() {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  useTitle("Report Lost Disc Success");

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="container-store">
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
      <h4 className="success-message-report-lost">
        Your disc has been entered into the{" "}
        <span className="missingtext">Rescue Network </span> and you've been
        opted in to receiving messages.
        <br />
        <br />
        Our Volunteers will keep their eyes open and if your disc is recovered,
        we will let you know ASAP and you can set up your claim.
      </h4>
    </div>
  );
}
