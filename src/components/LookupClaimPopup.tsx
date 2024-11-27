import { useCallback, useState, useEffect } from "react";
import Button from "./Button";
import "../styles/lookupClaimPopup.css";
import FormStep from "./FormStep2";
import React from "react";
import { Disc } from "../App";
import { PickupInfo } from "./PopupSurrender";
import {
  Alert,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Snackbar,
} from "@mui/material";
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
  const [selectedClaimId, setSelectedClaimId] = useState<string | null>(null);
  const [searchResults, setSearchResults] = useState<Claim[]>([]);

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

    let foundClaims: Claim[] = [];

    for (const item of inventory) {
      if (item.id === 112) {
        console.log("item:", item);
      }
      const matchingClaims = item.claims?.filter((claim) => {
        const firstNameMatch =
          claim.firstName?.toLowerCase() === firstName.toLowerCase();
        const lastNameMatch =
          claim.lastName?.toLowerCase() === lastName.toLowerCase();
        const contactMatch =
          contactMethod === "email"
            ? claim.email?.toLowerCase() === contactValue.toLowerCase()
            : claim.phoneNumber === "+" + contactValue;

        return firstNameMatch && lastNameMatch && contactMatch;
      });

      if (matchingClaims && matchingClaims.length > 0) {
        foundClaims = [...foundClaims, ...matchingClaims];
      }
    }

    if (foundClaims.length > 0) {
      console.log("Setting found claims:", foundClaims);
      setSearchResults(foundClaims);

      if (foundClaims.length === 1) {
        setSelectedClaimId(foundClaims[0].id.toString());
        onSubmit(foundClaims[0].id.toString());
      }

      setSuccessMessage(
        `Found ${foundClaims.length} claim(s) for ${firstName} ${lastName}`
      );
      setShowSuccessMessage(true);
    } else {
      console.log("No matching claims found");
      setSearchResults([]);
      setSelectedClaimId(null);

      setErrorMessage("No claims found, check your information and try again");
      setShowErrorMessage(true);
    }
  }, [firstName, lastName, contactMethod, contactValue, inventory, onSubmit]);

  const handleClaimSelection = (claimId: string) => {
    setSelectedClaimId(claimId);
    onSubmit(claimId);
  };

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
            <h2 style={{textTransform: "uppercase"}}>Lookup Claim ID</h2>
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

          {searchResults.length > 1 && (
            <div
              className="multiple-claims"
              style={{marginTop: "20px", width: "100%"}}
            >
              <h3
                style={{
                  fontFamily: "inherit",
                  textTransform: "uppercase",
                  textAlign: "center",
                  marginBottom: "15px",
                }}
              >
                Multiple claims found. Please select one:
              </h3>
              <List
                sx={{
                  width: "100%",
                  bgcolor: "transparent",
                  "& .MuiListItemButton-root": {
                    borderRadius: "4px",
                    mb: 1,
                    bgcolor: "rgba(255, 255, 255, 0.1)",
                    "&:hover": {
                      bgcolor: "rgba(255, 255, 255, 0.15)",
                    },
                    "&.Mui-selected": {
                      bgcolor: "rgba(255, 255, 255, 0.2)",
                      "&:hover": {
                        bgcolor: "rgba(255, 255, 255, 0.25)",
                      },
                    },
                  },
                  "& .MuiListItemText-primary": {
                    color: "white",
                    fontFamily: "inherit",
                    fontSize: "1rem",
                  },
                  "& .MuiListItemText-secondary": {
                    color: "rgba(255, 255, 255, 0.7)",
                    fontFamily: "inherit",
                  },
                }}
              >
                {searchResults.map((claim) => {
                  const disc = inventory.find(
                    (item) => item.id === claim.itemId
                  );
                  if (!disc) {
                    return null;
                  }
                  return (
                    <ListItem key={claim.id} disablePadding>
                      <ListItemButton
                        onClick={() =>
                          handleClaimSelection(claim.id.toString())
                        }
                        selected={selectedClaimId === claim.id.toString()}
                        sx={{
                          border: "1px solid rgba(255, 255, 255, 0.1)",
                          transition: "all 0.2s ease",
                        }}
                      >
                        <ListItemText
                          primary={`Claim ID: ${claim.id}`}
                          secondary={`Disc: ${disc.color} ${disc.disc.brand.name} ${disc.disc.name} (${disc.disc.plasticType} Plastic)`}
                        />
                      </ListItemButton>
                    </ListItem>
                  );
                })}
              </List>
            </div>
          )}

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
              sx={{width: "100%"}}
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
              sx={{width: "100%"}}
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
              sx={{width: "100%"}}
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
