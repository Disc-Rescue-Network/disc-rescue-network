import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LogoRescueFlow2 from "../components/LogoRescueFlow2";
import {
  faArrowLeft,
  faInfoCircle,
  faChevronDown,
  faChevronUp,
  faPhone,
  faEnvelope,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
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
  const [showDiscInfo, setShowDiscInfo] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 768);

  useTitle("Claim Disc");

  const navigate = useNavigate();

  useEffect(() => {
    setShowPopup(true);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
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

  const toggleDiscInfo = () => {
    setShowDiscInfo(!showDiscInfo);
  };

  const handleEditContactMethod = () => {
    setShowPopup(true);
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
          title={"WHAT IS YOUR PREFERRED COMMUNICATION METHOD?"}
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
        <div className="contact-method-edit" onClick={handleEditContactMethod}>
          <FontAwesomeIcon
            icon={contactMethod === "phone" ? faPhone : faEnvelope}
          />
          <span>Using {contactMethod === "phone" ? "Phone" : "Email"}</span>
          <FontAwesomeIcon icon={faPenToSquare} />
        </div>
      </div>

      <div className="disc-info-toggle" onClick={toggleDiscInfo}>
        <FontAwesomeIcon icon={faInfoCircle} />
        <span>Disc Details</span>
        <FontAwesomeIcon icon={showDiscInfo ? faChevronUp : faChevronDown} />
      </div>

      {showDiscInfo && (
        <div className="disc-info-panel">
          <div className="disc-info-content">
            {disc.topImage && (
              <div className="disc-image-container">
                <img src={disc.topImage} alt="Disc" className="disc-image" />
              </div>
            )}
            <div className="disc-details">
              <div className="disc-detail-item">
                <span className="disc-detail-label">ID:</span>
                <span className="disc-detail-value">{disc.id}</span>
              </div>
              <div className="disc-detail-item">
                <span className="disc-detail-label">Color:</span>
                <span className="disc-detail-value">{disc.color}</span>
              </div>
              <div className="disc-detail-item">
                <span className="disc-detail-label">Brand:</span>
                <span className="disc-detail-value">
                  {disc.disc.brand.name}
                </span>
              </div>
              <div className="disc-detail-item">
                <span className="disc-detail-label">Model:</span>
                <span className="disc-detail-value">{disc.disc.name}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {contactMethod && (
        <ClaimDiscComponents contactMethod={contactMethod} disc={disc} />
      )}
    </div>
  );
}
