import { useEffect, useState } from "react";
import "../styles/popupClaimDisc.css"
import Button from "./Button";
import DiscsClaimDiscs from "./DiscsClaimDisc";
import { Disc } from "../App";
import { useNavigate } from "react-router-dom";

interface PopupVerifyProps {
  closePopupVerify: () => void;
  pickupLocation: string;
  pickupDate: string;
  pickupName: string;
  arrayOfDiscs: Disc[]; 
  selectedDiscId: string;
  contactMethod: "phone" | "email";
  contactValue: string; 
}

interface PopupSurrenderProps {
  closePopupSurrender: () => void;
  surrenderDiscConfirm: () => void;
}

export function PopupVerify({ closePopupVerify, pickupLocation, pickupDate, pickupName, arrayOfDiscs, selectedDiscId, contactMethod, contactValue }: PopupVerifyProps) {
  const [contactInfo, setContactInfo] = useState("");

  useEffect(() => {
    const modal = document.getElementById("popup");
    const communicationMethodLabel = document.getElementById("communicationMethodLabel");

    if (modal && communicationMethodLabel) {
      modal.style.display = "none";
      communicationMethodLabel.textContent = contactMethod === "phone" ? "Phone Number For Release: " : "Email For Release: ";
    }
    setContactInfo("");
  }, [contactMethod]);
 
  const navigate = useNavigate();

  const handleClaimDiscSuccess = () => {
    navigate(`/claimDiscSuccess/${selectedDiscId}`, {
      state: {
        pickupLocation,
        pickupDate,
        pickupName,
        arrayOfDiscs,
        selectedDiscId,
        contactMethod
      }
    });
  };

  return (
    <div className="popup" style={{ flexDirection: 'column' }}>
      <div className="popup-content popup-claim-disc" id="popup-verify-content">
        <span className="close" id="close" onClick={closePopupVerify}>
          <div className="line"></div>
          <div className="line"></div>
        </span>
        <h2 className="header-popup-claim-disc" style={{ fontSize: '3rem', marginTop: '10px', marginBottom: '2px', textTransform: 'uppercase'}}>
          Verify Your <span className="fw-light">INFO</span>
        </h2>  
        <div className="verify-row" id="discInfoVerify" style={{ color: 'var(--primary-black) !important', width: '60%', maxWidth: '400px' }}>
           <DiscsClaimDiscs arrayOfDiscs={arrayOfDiscs} selectedDiscId={selectedDiscId} />
        </div>
        <div className="verify-info claim-disc">
          <div className="box-content-disc d-flex flex-column">
            <div className="verify-row-claim">
              <label>Pickup Date:</label>
              <span id="verifyPickupDate" className="fw-light"> {pickupDate}</span>
            </div>
            <div className="verify-row-claim">
              <label id="pickupLocationLabel">Pickup Location:</label>
              <span id="verifyPickupLocation" className="fw-light"> {pickupName} {pickupLocation}</span>
            </div>
            <div className="verify-row-claim">
              <label id="communicationMethodLabel">{contactMethod === "phone" ? "Phone Number For Release: " : "Email For Release: "}</label>
              <span id="verifyContactInfoForRelease" className="fw-light">{contactMethod === "phone" ? contactValue : (contactMethod === "email" ? contactValue : "")}</span>
            </div>
          </div>
        </div>
        <div id="loading-bar" className="loading-bar"></div>
      </div>

      <div className="d-flex justify-content-center align-items-center mt-2 mb-2" style={{ flexDirection: 'column', width: '90%', maxWidth: '450px', background: 'transparent', justifyContent: 'flex-start', paddingBottom: '50px' }}>
      <Button
                text={"Perfect! Give me my disc back!"}
                red={true}
                className="button-red-popup-claim"
                onClick={handleClaimDiscSuccess}
        />
        <Button
                text={"Need to adjust some pickup information"}
                red={false}
                className="button-blue-popup-claim"
                onClick={closePopupVerify}
        />
      </div>
    </div>
  );
}

export function PopupSurrender({ closePopupSurrender, surrenderDiscConfirm }: PopupSurrenderProps) {
  return (
    <div className="popup" style={{ flexDirection: 'column' }}>
      <div className="popup-content" id="popup-surrender-content" style={{ margin: 'unset !important' }}>
        <span className="close" id="close" onClick={closePopupSurrender}>&times;</span>
        <h2>
          You are about to <span className="redText">Surrender</span> Your Disc
        </h2>
        <p>
          Hi There! Surrendering your disc is just like a donation. This disc
          can be sold by the course to raise funds for things like new tee pads,
          new baskets or general maintenance.
        </p>
      </div>
      <div className="d-flex justify-content-center align-items-center mt-2 mb-2" style={{ flexDirection: 'column', width: '90%', maxWidth: '450px', background: 'transparent', justifyContent: 'flex-start', margin: 'auto', paddingBottom: '50px' }}>
        <button className="stepbutton red text-white mt-2 mb-3 no-border" onClick={surrenderDiscConfirm} style={{ fontSize: '1rem' }}>
          Yes, please donate my disc to the course!
        </button>
        <button className="rememberbtn fw-light blue no-border-1" style={{ width: '80%', maxWidth: '450px', fontWeight: '400 !important' }} onClick={closePopupSurrender}>
          Sorry, I want my disc back
        </button>
      </div>
    </div>
  );
}
