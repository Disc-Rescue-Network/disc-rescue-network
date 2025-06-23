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
  const [showPopup, setShowPopup] = useState(false); // Start with popup hidden until we check orgCode
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
    if (id) {
      const discId = parseInt(id, 10);
      const disc = inventory.find((d) => d.id === discId);

      // If the disc has the specific organization code, automatically set to phone method and skip popup
      if (disc && disc.course.orgCode === "org_a6ac1b298945b") {
        setContactMethod("phone");
        setShowPopup(false);
      } else {
        // For all other discs, show the popup as normal
        setShowPopup(true);
      }
    }
  }, [id, inventory]);

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
    // Don't allow changing the contact method for discs with the specific org code
    if (disc && disc.course.orgCode === "org_a6ac1b298945b") {
      return; // Don't show popup for specific organization
    }
    setShowPopup(true);
  };

  if (id === undefined) {
    return <div>Error: Disc ID is missing</div>;
  }

  const discId = parseInt(id, 10);
  const disc = inventory.find((d) => d.id === discId);

  console.log("Disc:", disc);

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
      {showPopup && disc.course.orgCode !== "org_a6ac1b298945b" && (
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
        </i>{" "}
        <LogoRescueFlow2 />
        {disc.course.orgCode !== "org_a6ac1b298945b" && (
          <div
            className="contact-method-edit"
            onClick={handleEditContactMethod}
          >
            <FontAwesomeIcon
              icon={contactMethod === "phone" ? faPhone : faEnvelope}
            />
            <span>
              <span className="using-text">Using </span>
              {contactMethod === "phone" ? "Phone" : "Email"}
            </span>
            <FontAwesomeIcon icon={faPenToSquare} />
          </div>
        )}
        {disc.course.orgCode === "org_a6ac1b298945b" && (
          <div
            className="contact-method-edit"
            style={{ cursor: "default", opacity: "0.8" }}
          >
            <FontAwesomeIcon icon={faPhone} />
            <span>
              <span className="using-text">Using </span>
              Phone
            </span>
          </div>
        )}
      </div>
      <div className="disc-info-toggle" onClick={toggleDiscInfo}>
        <FontAwesomeIcon icon={faInfoCircle} />
        <span>Disc Details</span>
        <FontAwesomeIcon icon={showDiscInfo ? faChevronUp : faChevronDown} />
      </div>{" "}
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
              {disc.color && (
                <div className="disc-detail-item">
                  <span className="disc-detail-label">Color:</span>
                  <span className="disc-detail-value">{disc.color}</span>
                </div>
              )}
              {disc.disc?.brand?.name && (
                <div className="disc-detail-item">
                  <span className="disc-detail-label">Brand:</span>
                  <span className="disc-detail-value">
                    {disc.disc.brand.name}
                  </span>
                </div>
              )}
              {disc.disc?.name && (
                <div className="disc-detail-item">
                  <span className="disc-detail-label">Model:</span>
                  <span className="disc-detail-value">{disc.disc.name}</span>
                </div>
              )}
              {disc.disc?.plasticType && (
                <div className="disc-detail-item">
                  <span className="disc-detail-label">Plastic Type:</span>
                  <span className="disc-detail-value">
                    {disc.disc.plasticType}
                  </span>
                </div>
              )}
              {disc.name && (
                <div className="disc-detail-item">
                  <span className="disc-detail-label">Owner:</span>
                  <span className="disc-detail-value">{disc.name}</span>
                </div>
              )}
              {!disc.topImage && (
                <div className="disc-detail-empty-message">
                  <span>No disc image available</span>
                </div>
              )}
              {!disc.color &&
                !disc.disc?.brand?.name &&
                !disc.disc?.name &&
                !disc.disc?.plasticType &&
                !disc.name && (
                  <div className="disc-detail-empty-message">
                    <span>Limited disc details available</span>
                  </div>
                )}
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
