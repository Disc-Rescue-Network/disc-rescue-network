import React, { useState, useEffect } from "react";
import { Button, Typography } from "@mui/material";
import "../styles/rescueFlowForms.css";
import "../styles/claimDiscComponents.css";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";

interface FormReportLostColorProps {
  contactMethod: "phone" | "email";
  pickupPreferences: string[];
  onContactChange: (contact: string) => void;
  onPickupPreferencesChange: (preferences: string[]) => void;
  hidePrefOptions?: boolean;
}

const FormClaimDiscContact: React.FC<FormReportLostColorProps> = ({
  contactMethod,
  pickupPreferences,
  onContactChange,
  onPickupPreferencesChange,
  hidePrefOptions = false,
}) => {
  const [contactValue, setContactValue] = useState("");
  const [contactError, setContactError] = useState("");
  const [preferenceError, setPreferenceError] = useState("");
  const [preferences, setPreferences] = useState<
    { day: string; time: string }[]
  >([{ day: "", time: "" }]);
  const placeholder =
    contactMethod === "email"
      ? "Email Address *"
      : "Phone Number Written on The Disc *";

  useEffect(() => {
    setContactValue("");
    setContactError("");
  }, [contactMethod]);

  const formatPhoneNumber = (value: string) => {
    if (!value) return value;
    const phoneNumber = value.replace(/[^\d]/g, "");
    const phoneNumberLength = phoneNumber.length;
    if (phoneNumberLength < 4) return phoneNumber;
    if (phoneNumberLength < 7) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    }
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(
      3,
      6
    )}-${phoneNumber.slice(6, 10)}`;
  };
  const handleContactChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let formattedContact = event.target.value;
    if (contactMethod === "phone") {
      formattedContact = formatPhoneNumber(formattedContact);
    }
    setContactValue(formattedContact);

    // Validate email or phone
    if (formattedContact.trim() === "") {
      setContactError(
        `${contactMethod === "email" ? "Email" : "Phone number"} is required`
      );
    } else if (contactMethod === "email" && !validateEmail(formattedContact)) {
      setContactError("Please enter a valid email address");
    } else if (contactMethod === "phone" && !validatePhone(formattedContact)) {
      setContactError("Please enter a valid phone number");
    } else {
      setContactError("");
    }

    onContactChange(formattedContact);
  };

  const validateEmail = (email: string): boolean => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePhone = (phone: string): boolean => {
    // Allow partially entered numbers too
    return phone.replace(/[^0-9]/g, "").length >= 3;
  };

  const handleContactBlur = () => {
    if (contactValue.trim() === "") {
      setContactError(
        `${contactMethod === "email" ? "Email" : "Phone number"} is required`
      );
    } else if (contactMethod === "email" && !validateEmail(contactValue)) {
      setContactError("Please enter a valid email address");
    } else if (contactMethod === "phone" && !validatePhone(contactValue)) {
      setContactError("Please enter a valid phone number");
    }
  };

  const handlePreferenceChange = (
    index: number,
    field: "day" | "time",
    value: string
  ) => {
    const updatedPreferences = preferences.map((pref, i) =>
      i === index ? { ...pref, [field]: value } : pref
    );
    setPreferences(updatedPreferences);
    updatePickupPreferences(updatedPreferences);
  };

  const addPreference = () => {
    setPreferences([...preferences, { day: "", time: "" }]);
  };
  const updatePickupPreferences = (prefs: { day: string; time: string }[]) => {
    const formattedPreferences = prefs
      .filter((pref) => pref.day && pref.time)
      .map((pref) => `${pref.day} ${pref.time}`);

    // Only set error if preferences are required (not hidden) and there are none
    if (!hidePrefOptions && formattedPreferences.length === 0) {
      setPreferenceError("Please select at least one pickup preference");
    } else {
      setPreferenceError("");
    }

    onPickupPreferencesChange(formattedPreferences);
  };

  const handleRemovePreference = (preference: string) => {
    const updatedPreferences = preferences.filter(
      (pref) => `${pref.day} ${pref.time}` !== preference
    );
    setPreferences(updatedPreferences);
    updatePickupPreferences(updatedPreferences);
  };
  return (
    <>
      <div
        className="select-box-claim"
        style={{ marginBottom: contactError ? "5px" : "20px" }}
      >
        <div className="col-10 claim-disc-form" style={{ padding: "0" }}>
          <input
            placeholder={placeholder}
            type={contactMethod === "email" ? "email" : "text"}
            value={contactValue}
            onChange={handleContactChange}
            onBlur={handleContactBlur}
            className={contactError ? "input-error" : ""}
          />
        </div>
      </div>
      {contactError && (
        <div
          className="error-message"
          style={{
            maxWidth: "600px",
            width: "80%",
            margin: "0 auto 15px auto",
            textAlign: "left",
          }}
        >
          {contactError}
        </div>
      )}

      {!hidePrefOptions && (
        <>
          <h4 className="header-claim-disc white-text">Pickup Preferences</h4>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignContent: "center",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            {preferences.map((pref, index) => (
              <div className="select-box-report" key={index}>
                <div className="col-6 arrow one" style={{ marginTop: "5px" }}>
                  <select
                    value={pref.day}
                    onChange={(e) =>
                      handlePreferenceChange(index, "day", e.target.value)
                    }
                    className="form-select-claim"
                    style={{ borderRadius: "0px" }}
                  >
                    <option value="" disabled>
                      Select Day
                    </option>
                    <option value="Weekday">Weekday</option>
                    <option value="Weekend">Weekend</option>
                  </select>
                </div>

                <div
                  className="col-6 pe-0 arrow one"
                  style={{ marginTop: "5px" }}
                >
                  <select
                    value={pref.time}
                    onChange={(e) =>
                      handlePreferenceChange(index, "time", e.target.value)
                    }
                    className="form-select-claim"
                    style={{ borderRadius: "0px" }}
                  >
                    <option value="" disabled>
                      Select Time
                    </option>
                    <option value="Morning">Morning (7am-12pm)</option>
                    <option value="Afternoon">Afternoon (12pm-5pm)</option>
                    <option value="Evening">Evening (5pm-9pm)</option>
                  </select>
                </div>

                {/* Remove Button (X) */}
                <CloseIcon
                  onClick={() =>
                    handleRemovePreference(`${pref.day} ${pref.time}`)
                  }
                  style={{
                    margin: "auto",
                    color: "var(--error-red)",
                    fontWeight: "bold",
                    cursor: "pointer",
                    background: "none",
                    border: "none",
                  }}
                />
              </div>
            ))}
          </div>{" "}
          <Button
            startIcon={<AddIcon />}
            onClick={addPreference}
            variant="outlined"
            sx={{
              my: 2,
              alignSelf: "flex-center",
              maxWidth: "fit-content",
              color: "var(--primary-sea-blue)",
              backgroundColor: "var(--primary-white)",
              borderRadius: "0px",
              fontFamily: "Bebas Neue",
              fontWeight: "bold",
              letterSpacing: "1px",
              alignItems: "center",
              textAlign: "center",
              justifyContent: "center",
            }}
          >
            Add Pickup Option
          </Button>{" "}
          {preferenceError && (
            <div
              className="error-message"
              style={{
                maxWidth: "600px",
                width: "80%",
                margin: "5px auto 10px auto",
                textAlign: "left",
              }}
            >
              {preferenceError}
            </div>
          )}
          <div>
            {pickupPreferences.length > 0 && (
              <Typography
                variant="body1"
                sx={{
                  my: 2,
                  color: "var(--primary-white)",
                  fontFamily: "Bebas Neue",
                  fontWeight: "bold",
                  letterSpacing: "1px",
                  fontSize: "1.2rem",
                  wordWrap: "normal",
                  wordBreak: "normal",
                  maxWidth: "600px",
                }}
              >
                <span style={{ color: "var(--primary-green)" }}>
                  Selected Preferences:
                </span>
                {pickupPreferences.map((preference, index) => (
                  <span key={index} style={{ marginLeft: "10px" }}>
                    {preference}
                    {index < pickupPreferences.length - 1 ? "," : ""}
                  </span>
                ))}
              </Typography>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default FormClaimDiscContact;
