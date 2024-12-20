import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LogoRescueFlow2 from "../components/LogoRescueFlow2";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import PopUpReport from "../components/ReportLostPopup";
import { useNavigate, useParams } from "react-router-dom";
import ClaimDiscComponents from "../components/ClaimDiscComponents";
import React from "react";
import { useInventoryContext } from "../hooks/useInventory";
import LoadingScreen from "./LoadingSceen";
import { useTitle } from "../hooks/useTitle";

export default function ClaimDisc() {
  const { id } = useParams<{ id?: string }>();
  const [showPopup, setShowPopup] = useState(true);
  const [contactMethod, setContactMethod] = useState<"phone" | "email">(
    "phone"
  );
  const [step, setStep] = useState(1);
  const { inventory, loading } = useInventoryContext();

  useTitle("Claim Disc");

  const navigate = useNavigate();

  useEffect(() => {
    setShowPopup(true);
  }, []);

  const handleSelect = (choice: "phone" | "email") => {
    setContactMethod(choice);
    setShowPopup(false);
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }

    if (step === 1) {
      navigate("/");
    }
  };

  if (id === undefined) {
    return <div>Error: Disc ID is missing</div>;
  }

  const discId = parseInt(id, 10);
  const disc = inventory.find((d) => d.id === discId);

  if (disc === undefined && !loading) {
    return <div>Error: Disc not found</div>;
  }

  if (disc === undefined) {
    return (
      <div>
        <LoadingScreen />
      </div>
    );
  }

  return (
    <div className="container-light-blue">
      {showPopup && (
        <PopUpReport
          title={"WHAT IS YOUR PREFERRED METHOD OF COMMUNICATION?"}
          redText={""}
          content={
            "If you wrote your phone number on your disc, we recommend using this as your preferred method."
          }
          onClose={() => setShowPopup(false)}
          onSelect={handleSelect}
          className="header-popup-claimDisc"
        />
      )}
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

      <div className="filters-option-claim">
        <span onClick={() => setShowPopup(true)}>Edit Contact Method</span>
      </div>
      {contactMethod && (
        <ClaimDiscComponents contactMethod={contactMethod} disc={disc} />
      )}
    </div>
  );
}
