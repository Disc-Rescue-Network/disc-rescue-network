import "../styles/reportLostComponents.css";
import Button from "./Button";
import NameAndInitialForm from "./NameAndInitialForm";
import FormClaimDiscContact from "./FormClaimDiscContact";
import "../styles/claimDiscComponents.css";
import { useEffect, useState } from "react";
import "../styles/popupClaimDisc.css";
import { PopupVerify } from "./PopupClaimDisc";
import { Disc } from "../App";
import PopUpSurrender, { Pickup } from "./PopupSurrender";
import { useNavigate } from "react-router-dom";
import { VerifyOTP } from "./VerifyOTP";
import TermsOfFlow from "./TermsOfFlow";
import { Alert, Snackbar } from "@mui/material";

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
  const [showOTP, setShowOTP] = useState(false);
  const [showTOF, setShowTOF] = useState(false);
  const [TOFAccepted, setTOFAccepted] = useState(false);
  const [pickupInfo, setPickupInfo] = useState<Pickup | null>(null);

  const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState("");

  const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [showInfoMessage, setShowInfoMessage] = useState<boolean>(false);
  const [infoMessage, setInfoMessage] = useState("");

  const [showShippingInstructions, setShowShippingInstructions] =
    useState(false);

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

  const handleShipDiscRequest = () => {
    window.open(
      "https://www.maplehilldiscgolf.com/product-page/return-lost-and-found-disc",
      "_blank"
    );
    setShowShippingInstructions(false);
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
    if (isSurrender) {
      setShowPopupSurrender(true);
    } else {
      setShowPopup(true);
    }
  };
  return (
    <div className={`report-lost-components ${className}`}>
      {disc.course.orgCode === "org_a6ac1b298945b" ? (
        <div className="maple-hill-instructions">
          <h2 className="header-claim-disc">
            Maple Hill Disc Pickup Instructions
          </h2>{" "}
          <div className="pickup-instructions">
            <p className="welcome-message">
              Your disc is waiting for you at Maple Hill's Pro Shop!
            </p>
            <ul>
              <li>Visit during normal Pro Shop business hours</li>
              <li>
                No scheduling needed - you can pick up anytime during open hours
              </li>
              <li>You don't need to submit a claim form</li>
              <li>
                Just give them your <strong>disc ID #{disc.id}</strong> and your
                phone number (if written on the disc)
              </li>
            </ul>{" "}
            <p>
              If you can't visit in person, use the "Ship My Disc" button below.
            </p>
            <p className="important-note">
              Alternatively, you can choose to surrender your disc as a donation
              to the course.
            </p>
          </div>
        </div>
      ) : (
        <>
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
        </>
      )}
      {disc.course.orgCode !== "org_a6ac1b298945b" && (
        <Button
          text={"Schedule Your Disc Pickup"}
          red={true}
          border={true}
          className="button-claim-disc-form"
          onClick={handleScheduleButtonClick}
          disabled={!pickupPreferences || !pickupName || !contactValue}
        />
      )}
      {disc.course.orgCode === "org_a6ac1b298945b" && (
        <Button
          text={"Ship My Disc"}
          red={false}
          border={true}
          className="button-claim-disc-form shipping-button"
          onClick={() => setShowShippingInstructions(true)}
        />
      )}
      <Button
        text={"Surrender Disc"}
        red={false}
        border={true}
        className="button-claim-disc-form surrender-button"
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
      {showOTP && (
        <VerifyOTP
          open={showOTP}
          onClose={() => setShowOTP(false)}
          onClaimClose={() => otpVerifiedClaim()}
          onSurrenderClose={() => otpVerifiedSurrender()}
          isSurrender={isSurrender}
          pickupInfo={pickupInfo}
          tofAccepted={TOFAccepted}
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
      {showShippingInstructions && (
        <div className="popup">
          <div className="popup-content popup-shipping">
            <span
              className="close"
              id="close"
              onClick={() => setShowShippingInstructions(false)}
            >
              <div className="line"></div>
              <div className="line"></div>
            </span>
            <h2 className="header-popup-shipping">Shipping Instructions</h2>
            <div className="shipping-instructions">
              <p>Maple Hill handles shipping of discs independently.</p>
              <p>
                When you click "Proceed", you'll be redirected to Maple Hill's
                website where you can:
              </p>
              <ol>
                <li>Pay for shipping costs</li>
                <li>
                  Enter <strong>disc ID #{disc.id}</strong> in the notes section
                </li>
                <li>Include your phone number (if written on the disc)</li>
              </ol>
              <p>
                This is all you need to do to request shipping - you don't need
                to complete the claim process.
              </p>
            </div>
            <div className="popup-buttons">
              <Button
                text="Cancel"
                red={false}
                onClick={() => setShowShippingInstructions(false)}
                className="popup-cancel-button"
              />
              <Button
                text="Proceed to Maple Hill Site"
                red={true}
                onClick={handleShipDiscRequest}
                className="popup-confirm-button"
              />
            </div>
          </div>
        </div>
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
