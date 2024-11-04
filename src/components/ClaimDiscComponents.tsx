import "../styles/reportLostComponents.css";
import Button from "./Button";
import NameAndInitialForm from "./NameAndInitialForm";
import FormClaimDiscContact from "./FormClaimDiscContact";
import "../styles/claimDiscComponents.css";
import { useState } from "react";
import "../styles/popupClaimDisc.css";
import { PopupVerify } from "./PopupClaimDisc";
import { Disc } from "../App";
import PopUpSurrender from "./PopupSurrender";

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
  const [contactValue, setContactValue] = useState("");
  const [initial, setInitial] = useState("");
  const [lastName, setLastName] = useState("");
  const [showPopupSurrender, setShowPopupSurrender] = useState(false);

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

  const openPopup = () => {
    setShowPopupSurrender(true);
  };

  const closePopupSurrender = () => {
    setShowPopupSurrender(false);
  };

  const handleInitialChange = (value: string) => {
    setInitial(value);
  };

  const handleLastNameChange = (value: string) => {
    setLastName(value);
  };

  return (
    <div className={`report-lost-components ${className}`}>
      <h2 className="header-claim-disc">
        Let's Get Your
        <span className="fw-light"> Disc</span>
      </h2>
      <h2 className="info-claim">
        Just Enter Some
        <span className="missingtext"> Info</span>.
      </h2>
      <NameAndInitialForm
        onInitialChange={handleInitialChange}
        onLastNameChange={handleLastNameChange}
      />
      <FormClaimDiscContact
        contactMethod={contactMethod}
        ChosePickup={"Choose a Pickup Location"}
        onPickupLocationChange={(location: string, name: string) => {
          setPickupLocation(location);
          setPickupName(name);
        }}
        onPickupDateChange={(date: string) => setPickupDate(date)}
        onContactChange={(contact: string) => setContactValue(contact)}
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
        onClick={openPopup}
      />
      {showPopup && (
        <PopupVerify
          closePopupVerify={closePopup}
          pickupLocation={pickupLocation}
          pickupDate={pickupDate}
          pickupName={pickupName}
          arrayOfDiscs={arrayOfDiscs}
          selectedDiscId={selectedDiscId}
          contactMethod={contactMethod}
          contactValue={contactValue}
        />
      )}

      {showPopupSurrender && (
        <PopUpSurrender
          className="popup-surrender-disc"
          title={"You are about to Surrender Your Disc"}
          content={
            "Hi There! Surrendering your disc is just like a donation. This disc can be sold by the course to raise funds for things like new tee pads, new baskets or general maintenance."
          }
          onClose={closePopupSurrender}
        />
      )}
    </div>
  );
};

export default ClaimDiscComponents;
