import "../styles/reportLostComponents.css";
import Button from "./Button";
import NameAndInitialForm from "./NameAndInitialForm";
import FormClaimDiscContact from "./FormClaimDiscContact";
import "../styles/claimDiscComponents.css";
import { useState } from "react";
import "../styles/popupClaimDisc.css";
import { PopupVerify } from "./PopupClaimDisc";
import { Disc } from "../App";
import PopUpSurrender, { Pickup } from "./PopupSurrender";
import { useNavigate } from "react-router-dom";
import { VerifyOTP } from "./VerifyOTP";

interface HeaderReportLostProps {
  className?: string;
  contactMethod: "phone" | "email";
  arrayOfDiscs: Disc[];
  selectedDiscId: string;
}

const ClaimDiscComponents = (props: HeaderReportLostProps) => {
  const { className, contactMethod, arrayOfDiscs, selectedDiscId } = props;
  const [showPopup, setShowPopup] = useState(false);
  const [pickupName, setPickupName] = useState("");
  const [pickupDays, setPickupDays] = useState<string[]>([]);
  const [pickupTimes, setPickupTimes] = useState<string[]>([]);

  const [contactValue, setContactValue] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [showPopupSurrender, setShowPopupSurrender] = useState(false);
  const navigate = useNavigate();
  const [showOTP, setShowOTP] = useState(false);

  const handleScheduleButtonClick = () => {
    if (pickupDays && pickupTimes && pickupName) {
      setShowPopup(true);
    } else {
      alert("Please choose your preferred pickup days/times.");
    }
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const openPopup = () => {
    setShowPopupSurrender(true);
  };

  const closePopupSurrender = () => {
    // Reset the form
    setShowPopupSurrender(false);
  };

  const handleFirstNameChange = (value: string) => {
    setFirstName(value);
  };

  const handleLastNameChange = (value: string) => {
    setLastName(value);
  };

  const SurrenderSuccess = () => {
    navigate("/surrenderDiscSuccess");
  };

  const verifyPCM = (pickupInfo: Pickup) => {
    setShowOTP(true);
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
        onFirstNameChange={handleFirstNameChange}
        onLastNameChange={handleLastNameChange}
      />
      <FormClaimDiscContact
        contactMethod={contactMethod}
        pickupDays={pickupDays}
        pickupTimes={pickupTimes}
        onContactChange={(contact: string) => setContactValue(contact)}
        onPickupDaysChange={(days: string[]) => setPickupDays(days)}
        onPickupTimesChange={(times: string[]) => setPickupTimes(times)}
      />
      <Button
        text={"Schedule Your Disc Pickup"}
        red={true}
        border={true}
        className="button-claim-disc-form"
        onClick={handleScheduleButtonClick}
        disabled={!pickupDays || !pickupTimes || !pickupName}
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
          pickupDays={pickupDays}
          pickupTimes={pickupTimes}
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
          onSuccess={verifyPCM}
        />
      )}

      {showOTP && (
        <VerifyOTP open={showOTP} onClose={() => setShowOTP(false)} />
      )}
    </div>
  );
};

export default ClaimDiscComponents;
