import { useCallback, useState, useEffect } from "react";
import Button from "./Button";
import "../styles/lookupClaimPopup.css";
import FormStep from "./FormStep2";
import React from "react";
import { Disc } from "../App";
import { PickupInfo } from "./PopupSurrender";
import { Alert, Snackbar } from "@mui/material";
import { useInventoryContext } from "../hooks/useInventory";

export interface Claim {
  tofAccepted: boolean;
  pcmVerified: boolean;
  verified: boolean;
  id: number;
  comments: string;
  itemId: number;
  phoneNumber?: string;
  email?: string;
  pickup: PickupInfo;
  surrendered: boolean;
  updatedAt: string;
  createdAt: string;
  item?: Disc;
  firstName: string | null;
  lastName: string | null;
}

interface Props {
  onClose: () => void;
  onSubmit: (claimId: string) => void;
}

const LookupClaimPopup: React.FC<Props> = ({ onClose, onSubmit }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);
  const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);
  const [showInfoMessage, setShowInfoMessage] = useState<boolean>(false);

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [infoMessage, setInfoMessage] = useState("");

  const [contactMethod, setContactMethod] = useState<"phone" | "email">(
    "phone"
  );
  const [contactValue, setContactValue] = useState("");
  const [claimId, setClaimId] = useState("");
  const [searchResults, setSearchResults] = useState<Claim | null>(null);

  const { inventory, loading } = useInventoryContext();

  const handleSubmit = useCallback(() => {
    setShowSuccessMessage(false);
    setShowErrorMessage(false);
    setShowInfoMessage(false);

    console.log("Submit clicked with values:", {
      firstName,
      lastName,
      contactMethod,
      contactValue,
    });
    console.log("Current inventory state:", inventory);

    if (!firstName || !lastName || !contactValue) {
      setErrorMessage("Please fill in all fields.");
      setShowErrorMessage(true);
      return;
    }

    let foundClaim: Claim | null = null;

    for (const item of inventory) {
      // console.log("Checking item:", item);
      // console.log("Item claims:", item.claims);

      const matchingClaim = item.claims?.find((claim) => {
        const firstNameMatch =
          claim.firstName?.toLowerCase() === firstName.toLowerCase();
        const lastNameMatch =
          claim.lastName?.toLowerCase() === lastName.toLowerCase();
        console.log("contactMethod:", contactMethod);
        console.log("contactValue:", contactValue);
        const contactMatch =
          contactMethod === "email"
            ? claim.email?.toLowerCase() === contactValue.toLowerCase()
            : claim.phoneNumber === "+" + contactValue;

        return firstNameMatch && lastNameMatch && contactMatch;
      });

      if (matchingClaim) {
        console.log("Found matching claim:", matchingClaim);
        foundClaim = matchingClaim;
        break;
      }
    }

    if (foundClaim) {
      console.log("Setting found claim:", foundClaim);
      setSearchResults(foundClaim);
      setClaimId(foundClaim.id.toString());

      setSuccessMessage(`Claim found for ${firstName} ${lastName}`);
      setShowSuccessMessage(true);

      onSubmit(foundClaim.id.toString());
    } else {
      console.log("No matching claim found");
      setSearchResults(null);
      setClaimId("");

      setErrorMessage("No claim found, check your information and try again");
      setShowErrorMessage(true);
    }
  }, [firstName, lastName, contactMethod, contactValue, inventory]);

  const handleSwitchToggle = () => {
    setContactMethod((prev) => (prev === "phone" ? "email" : "phone"));
    setContactValue("");

    setInfoMessage(
      `Switched to ${
        contactMethod === "phone" ? "email" : "phone"
      } contact method`
    );
    setShowInfoMessage(true);
  };

  return (
    <div className="popup">
      <div className="popup-content">
        <div className="close" onClick={onClose}>
          <div className="line"></div>
          <div className="line"></div>
        </div>

        <div className="verify-info">
          <div>
            <h2>Lookup Claim ID</h2>
            <p>Please enter your information to find your claim ID</p>
          </div>

          <div className="verify-row-claim-lookup">
            <input
              type="text"
              placeholder="First name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="input-lookup"
            />

            <input
              type="text"
              placeholder="Last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="input-lookup"
            />

            {contactMethod === "phone" ? (
              <FormStep
                phoneNumber={contactValue}
                setPhoneNumber={setContactValue}
                className="format-number-lookup-claim"
              />
            ) : (
              <input
                type="email"
                placeholder="Email"
                value={contactValue}
                onChange={(e) => setContactValue(e.target.value)}
                className="input-lookup"
              />
            )}

            <div className="contact-method">
              <p>Contact Method Used:</p>
              <div className="switch-container">
                <span className="label">Phone</span>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={contactMethod === "email"}
                    onChange={handleSwitchToggle}
                  />
                  <span className="slider"></span>
                </label>
                <span className="label">Email</span>
              </div>
            </div>
          </div>

          <Button
            text="Find My Claim ID"
            red={true}
            className="button-red-popup-lookup-claim"
            onClick={handleSubmit}
          />

          <Button
            text="Cancel"
            red={false}
            border
            className="button-blue-popup-lookup-claim"
            onClick={onClose}
          />

          {/* Success Snackbar */}
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

          {/* Error Snackbar */}
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

          {/* Info Snackbar */}
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
      </div>
    </div>
  );
};

export default LookupClaimPopup;
