import "../styles/reportLostComponents.css";
import Button from "./Button";
import NameAndInitialForm from "./NameAndInitialForm";
import FormClaimDiscContact from "./FormClaimDiscContact";
import "../styles/claimDiscComponents.css"
import { useState } from "react";
import "../styles/popupClaimDisc.css"
import { PopupVerify } from "./PopupClaimDisc";
import { Disc } from "../App";

interface HeaderReportLostProps {
  className?: string;
  contactMethod: "phone" | "email";
  arrayOfDiscs: Disc[]; 
  selectedDiscId: string; 
}

const ClaimDiscComponents = (props: HeaderReportLostProps) => {
  const { className, contactMethod, arrayOfDiscs, selectedDiscId } = props;
  const [showPopup, setShowPopup] = useState(false);
  const [pickupLocation, setPickupLocation] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [pickupName, setPickupName] = useState("");

  const handleScheduleButtonClick = () => {
    if (pickupLocation && pickupDate && pickupName) {
      setShowPopup(true);
    } else {
      alert("Please choose a pickup location and date.");
    }
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className={`report-lost-components ${className}`}>
        <h2>
          Let's Get Your
          <span className="fw-light"> Disc</span>
        </h2>
      <h2 className="info-claim">
        Just Enter Some
        <span className="missingtext"> Info</span>
        .
      </h2>
      <NameAndInitialForm />
      <FormClaimDiscContact 
        contactMethod={contactMethod} 
        ChosePickup={"Choose a Pickup Location"} 
        onPickupLocationChange={(location: string, name: string) => {
          setPickupLocation(location);
          setPickupName(name); 
        }}
        onPickupDateChange={(date: string) => setPickupDate(date)}
      />
      <Button
        text={"Schedule Your Disc Pickup"}
        red={true}
        border={true}
        className="button-claim-disc-form"
        onClick={handleScheduleButtonClick} 
        disabled={!pickupLocation || !pickupDate}
      />
      <Button
        text={"Surrender Disc"}
        red={false}
        border={true}
        className="button-claim-disc-form"
        onClick={() => {
          alert("button clicked");
        }}
      />
      {showPopup && <PopupVerify 
        closePopupVerify={closePopup}
        pickupLocation={pickupLocation}
        pickupDate={pickupDate}
        pickupName={pickupName} 
        arrayOfDiscs={arrayOfDiscs}
        selectedDiscId={selectedDiscId}  />}
    </div>
  );
};

export default ClaimDiscComponents;


