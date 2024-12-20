import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import LogoRescueFlow2 from "../components/LogoRescueFlow2";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import RequestCourseComponets from "../components/RequestCourseComponents";
import { useTitle } from "../hooks/useTitle";

export default function Settings() {
  const [step, setStep] = useState(1);
  useTitle("Request Course");

  const navigate = useNavigate();

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }

    if (step === 1) {
      navigate("/");
    }
  };

  return (
    <div className="container-request-course">
      <div className="main-section-request">
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
        <RequestCourseComponets
          baseText={"Choose Your"}
          lightText={"Course"}
          whereText={"Don't see your course?"}
          linkText={"Let us know"}
          secondMissingText={
            " and we will try to get them added as a Rescue Beacon."
          }
        />
      </div>
      {/* <FormRequestCourse initialName={"State"} lastName={"Course Name"} />
      <Button
        text={"Request Your Course"}
        red={true}
        className="button-request"
        onClick={() => {
          alert("button clicked");
        }}
      /> */}
    </div>
  );
}
