import "../styles/reportLostComponents.css";
import Button from "./Button";
import NameAndInitialForm from "./NameAndInitialForm";
import FormClaimDiscContact from "./FormClaimDiscContact";
import "../styles/claimDiscComponents.css"
import { useState } from "react";
import "../styles/popupClaimDisc.css"
import { PopupVerify } from "./PopupClaimDisc";

interface HeaderReportLostProps {
  className?: string;
  contactMethod: "phone" | "email";
}

const ClaimDiscComponents = (props: HeaderReportLostProps) => {
  const { className, contactMethod } = props;
  const [showPopup, setShowPopup] = useState(false);
  const [pickupLocation, setPickupLocation] = useState("");
  const [pickupDate, setPickupDate] = useState("");

  const handleScheduleButtonClick = () => {
    if (pickupLocation && pickupDate) {
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
        onPickupLocationChange={(location: string) => setPickupLocation(location)}
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
      {showPopup && <PopupVerify closePopupVerify={closePopup} claimDisc={() => {}} pickupLocation={pickupLocation} pickupDate={pickupDate}/>}
    </div>
  );
};

export default ClaimDiscComponents;


