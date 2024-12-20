import "../styles/reportLostComponents.css";
import Button from "./Button";
import NameAndInitialForm from "./NameAndInitialForm";
import FormClaimDiscContact from "./FormClaimDiscContact";
import "../styles/claimDiscComponents.css";
import { useEffect, useState } from "react";
import "../styles/popupClaimDisc.css";
import { PopupVerify } from "./PopupClaimDisc";
import { Disc } from "../App";
import PopUpSurrender, { Claim, Pickup } from "./PopupSurrender";
import { useNavigate } from "react-router-dom";
import { VerifyOTP } from "./VerifyOTP";
import TermsOfFlow from "./TermsOfFlow";
import { Alert, Snackbar } from "@mui/material";
import ClaimToSurrenderPopUp from "./ClaimToSurrenderPopup";

interface HeaderReportLostProps {
  className?: string;
  contactMethod: "phone" | "email";
  disc: Disc;
}

const ClaimDiscComponents = (props: HeaderReportLostProps) => {
  const { className, contactMethod, disc } = props;
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [pickupName, setPickupName] = useState("");
  const [pickupPreferences, setPickupPreferences] = useState<string[]>([]);
  const [isSurrender, setIsSurrender] = useState(false);
  const [phoneNumberMatches, setPhoneNumberMatches] = useState(false);

  const [contactValue, setContactValue] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [showPopupSurrender, setShowPopupSurrender] = useState(false);
  // const [showClaimToSurrenderPopup, setShowClaimToSurrenderPopup] =
  //   useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [showTOF, setShowTOF] = useState(false);
  const [TOFAccepted, setTOFAccepted] = useState(false);
  const [pickupInfo, setPickupInfo] = useState<Pickup | null>(null);
  // const [originalClaim, setOriginalClaim] = useState<Claim | null>(null);

  const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState("");

  const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [showInfoMessage, setShowInfoMessage] = useState<boolean>(false);
  const [infoMessage, setInfoMessage] = useState("");

  useEffect(() => {
    //console.log("rendering with disc", disc);
  }, [disc]);

  useEffect(() => {
    if (contactMethod !== "phone") {
      setPhoneNumberMatches(false);
      return;
    }

    if (!contactValue || !disc.phoneNumber) {
      setPhoneNumberMatches(false);
      return;
    }

    const formattedContactValue = `+1${contactValue.replace(/\D/g, "")}`;

    if (formattedContactValue === disc.phoneNumber) {
      setPhoneNumberMatches(true);
      setTOFAccepted(true);
    } else {
      setPhoneNumberMatches(false);
    }
  }, [contactMethod, contactValue, disc.phoneNumber]);

  const handleScheduleButtonClick = () => {
    setIsSurrender(false);
    if (!phoneNumberMatches) {
      setShowTOF(true);
      return;
    }

    if (pickupPreferences.length > 0 && pickupName) {
      setShowPopup(true);
    } else {
      setShowErrorMessage(true);
      setErrorMessage("Please fill out all fields");
    }
  };

  const comparePhoneNumbers = (unformattedPhoneNumber: string, disc: Disc) => {
    const formattedContactValue = `+1${unformattedPhoneNumber.replace(
      /\D/g,
      ""
    )}`;

    if (formattedContactValue === disc.phoneNumber) {
      return true;
    }

    return false;
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const openPopup = () => {
    setIsSurrender(true);

    console.log("disc", disc);

    if (disc.claims.length > 0) {
      console.log("checking claims for match");
      // check claims list for entered phone number / email. if there is a match, log to console
      const claim = disc.claims.find(
        (claim) =>
          claim.email === contactValue ||
          comparePhoneNumbers(contactValue, disc)
      );
      console.log("contactValue", contactValue);
      console.log("claim", claim);
      if (claim) {
        console.log("User already claimed this disc");
        // setOriginalClaim(claim);
        // setShowClaimToSurrenderPopup(true);
        setShowErrorMessage(true);
        setErrorMessage(
          "You have already claimed this disc. Please contact the course for help."
        );
        return;
      }
    }

    if (!phoneNumberMatches) {
      setShowTOF(true);
      return;
    }

    setShowPopupSurrender(true);
  };

  const closePopupSurrender = () => {
    // Reset the form
    setShowPopupSurrender(false);
  };

  // const closeClaimToSurrenderPopup = () => {
  //   setShowClaimToSurrenderPopup(false);
  // };

  const handleFirstNameChange = (value: string) => {
    setFirstName(value);
    setPickupName(`${value} ${lastName}`);
  };

  const handleLastNameChange = (value: string) => {
    setLastName(value);
    setPickupName(`${firstName} ${value}`);
  };

  const handleSurrenderSuccess = () => {
    navigate("/surrenderDiscSuccess", {
      state: {
        disc,
      },
    });
  };

  const verifyPCM = (pickupInfo: Pickup) => {
    console.log("pickupInfo", pickupInfo);
    setPickupInfo(pickupInfo);
    setShowOTP(true);
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

  const handleAcceptTOF = () => {
    setShowTOF(false);
    setTOFAccepted(true);
    //console.log("TOF accepted");
    //console.log("isSurrender", isSurrender);
    if (isSurrender) {
      setShowPopupSurrender(true);
    } else {
      setShowPopup(true);
    }
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
        disabled={!pickupPreferences || !pickupName || !contactValue}
      />
      <Button
        text={"Surrender Disc"}
        red={false}
        border={true}
        className="button-claim-disc-form"
        disabled={!pickupName || !contactValue}
        onClick={openPopup}
      />
      {showPopup && (
        <PopupVerify
          onClose={closePopup}
          pickupPreferences={pickupPreferences}
          pickupName={pickupName}
          firstName={firstName}
          lastName={lastName}
          disc={disc}
          contactMethod={contactMethod}
          contactValue={contactValue}
          onSuccess={verifyPCM}
          setShowErrorMessage={setShowErrorMessage}
          setErrorMessage={setErrorMessage}
          setInfoMessage={setInfoMessage}
          setShowInfoMessage={setShowInfoMessage}
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
          firstName={firstName}
          lastName={lastName}
          pickupPreferences={pickupPreferences}
          disc={disc}
          tofAccepted={TOFAccepted}
          contactMethod={contactMethod}
          contactValue={contactValue}
          setShowErrorMessage={setShowErrorMessage}
          setErrorMessage={setErrorMessage}
          setSuccessMessage={setSuccessMessage}
          setShowSuccessMessage={setShowSuccessMessage}
          setShowInfoMessage={setShowInfoMessage}
          setInfoMessage={setInfoMessage}
        />
      )}

      {/* {showClaimToSurrenderPopup && (
        <ClaimToSurrenderPopUp
          className="popup-surrender-disc"
          title={"You are about to Surrender Your Disc"}
          content={
            "Hi There! Looks like you already claimed this disc. Please be sure you wish to change this to a surrender! Surrendering your disc is just like a donation. This disc can be sold by the course to raise funds for things like new tee pads, new baskets or general maintenance."
          }
          onClose={closeClaimToSurrenderPopup}
          onSuccess={verifyPCM}
          pickupName={pickupName}
          pickupPreferences={pickupPreferences}
          disc={disc}
          tofAccepted={TOFAccepted}
          originalClaim={originalClaim}
          setShowErrorMessage={setShowErrorMessage}
          setErrorMessage={setErrorMessage}
          setSuccessMessage={setSuccessMessage}
          setShowSuccessMessage={setShowSuccessMessage}
          setShowInfoMessage={setShowInfoMessage}
          setInfoMessage={setInfoMessage}
        />
      )} */}

      {showOTP && (
        <VerifyOTP
          open={showOTP}
          onClose={() => setShowOTP(false)}
          onClaimClose={() => otpVerifiedClaim()}
          onSurrenderClose={() => otpVerifiedSurrender()}
          isSurrender={isSurrender}
          pickupInfo={pickupInfo}
          tofAccepted={TOFAccepted}
          //originalClaim={originalClaim}
          setShowErrorMessage={setShowErrorMessage}
          setErrorMessage={setErrorMessage}
          setSuccessMessage={setSuccessMessage}
          setShowSuccessMessage={setShowSuccessMessage}
        />
      )}

      {showTOF && (
        <TermsOfFlow
          onClose={() => setShowTOF(false)}
          handleAcceptTOF={handleAcceptTOF}
        />
      )}

      <Snackbar
        open={showSuccessMessage}
        autoHideDuration={6000}
        onClose={() => setShowSuccessMessage(false)}
      >
        <Alert
          onClose={() => setShowSuccessMessage(false)}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {successMessage}
        </Alert>
      </Snackbar>

      <Snackbar
        open={showErrorMessage}
        autoHideDuration={6000}
        onClose={() => setShowErrorMessage(false)}
      >
        <Alert
          onClose={() => setShowErrorMessage(false)}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {errorMessage}
        </Alert>
      </Snackbar>

      <Snackbar
        open={showInfoMessage}
        autoHideDuration={6000}
        onClose={() => setShowInfoMessage(false)}
      >
        <Alert
          onClose={() => setShowInfoMessage(false)}
          severity="info"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {infoMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ClaimDiscComponents;
