import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import LogoRescueFlow2 from "../components/LogoRescueFlow2";
import StoreComponents from "../components/StoreComponents";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Store() {
  const [step, setStep] = useState(1);

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
      <StoreComponents
        baseText={"Coming soon"}
        contentText={
          "Not all discs will be claimed, but they can still be rescued! The DRN Shop will bring quality, affordable discs for purchase."
        }
        smallText={"Get notified when we launch for 20% off your first order!"}
      />
    </div>
  );
}
