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
  disc: Disc;
}

const ClaimDiscComponents = (props: HeaderReportLostProps) => {
  const { className, contactMethod, disc } = props;
  const [showPopup, setShowPopup] = useState(false);
  const [pickupName, setPickupName] = useState("");
  const [pickupPreferences, setPickupPreferences] = useState<string[]>([]);
  const [isSurrender, setIsSurrender] = useState(false);

  const [contactValue, setContactValue] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [showPopupSurrender, setShowPopupSurrender] = useState(false);
  const navigate = useNavigate();
  const [showOTP, setShowOTP] = useState(false);
  const [pickupInfo, setPickupInfo] = useState<Pickup | null>(null);

  const handleScheduleButtonClick = () => {
    if (pickupPreferences && pickupName) {
      setShowPopup(true);
      setIsSurrender(false);
    } else {
      alert("Please choose your preferred pickup days/times.");
    }
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const openPopup = () => {
    setShowPopupSurrender(true);
    setIsSurrender(true);
  };

  const closePopupSurrender = () => {
    // Reset the form
    setShowPopupSurrender(false);
  };

  const handleFirstNameChange = (value: string) => {
    setFirstName(value);
    setPickupName(`${value} ${lastName}`);
  };

  const handleLastNameChange = (value: string) => {
    setLastName(value);
    setPickupName(`${firstName} ${value}`);
  };

  const handleSurrenderSuccess = () => {
    navigate("/surrenderDiscSuccess");
  };

  const verifyPCM = (pickupInfo: Pickup) => {
    setShowOTP(true);
    setPickupInfo(pickupInfo);
  };

  if (!disc) {
    return <div>Error: Disc not found</div>;
  }

  const otpVerifiedSurrender = () => {
    setShowOTP(false);
    handleSurrenderSuccess();
  };

  const otpVerifiedClaim = () => {
    setShowOTP(false);
    handleClaimDiscSuccess();
  };

  const handleClaimDiscSuccess = () => {
    navigate(`/claimDiscSuccess/${disc.id}`, {
      state: {
        pickupPreferences,
        pickupName,
        disc,
        contactMethod,
        contactValue,
      },
    });
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
        pickupPreferences={pickupPreferences}
        onContactChange={(contact: string) => setContactValue(contact)}
        onPickupPreferencesChange={(preferences: string[]) =>
          setPickupPreferences(preferences)
        }
      />
      <Button
        text={"Schedule Your Disc Pickup"}
        red={true}
        border={true}
        className="button-claim-disc-form"
        onClick={handleScheduleButtonClick}
        disabled={!pickupPreferences || !pickupName}
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
          onClose={closePopup}
          pickupPreferences={pickupPreferences}
          pickupName={pickupName}
          disc={disc}
          contactMethod={contactMethod}
          contactValue={contactValue}
          onSuccess={verifyPCM}
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
          pickupName={pickupName}
          pickupPreferences={pickupPreferences}
          disc={disc}
        />
      )}

      {showOTP && (
        <VerifyOTP
          open={showOTP}
          onClose={() => setShowOTP(false)}
          onClaimClose={() => otpVerifiedClaim()}
          onSurrenderClose={() => otpVerifiedSurrender()}
          isSurrender={isSurrender}
          pickupInfo={pickupInfo}
        />
      )}
    </div>
  );
};

export default ClaimDiscComponents;
