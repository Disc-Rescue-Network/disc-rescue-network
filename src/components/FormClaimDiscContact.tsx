import React, { useState, useEffect } from "react";
import { Button, Typography } from "@mui/material";
import "../styles/rescueFlowForms.css";
import "../styles/claimDiscComponents.css";
import AddIcon from "@mui/icons-material/Add";

interface FormReportLostColorProps {
  contactMethod: "phone" | "email";
  pickupPreferences: string[];
  onContactChange: (contact: string) => void;
  onPickupPreferencesChange: (preferences: string[]) => void;
}

const FormClaimDiscContact: React.FC<FormReportLostColorProps> = ({
  contactMethod,
  pickupPreferences,
  onContactChange,
  onPickupPreferencesChange,
}) => {
  const [contactValue, setContactValue] = useState("");
  const [preferences, setPreferences] = useState<
    { day: string; time: string }[]
  >([{ day: "", time: "" }]);
  const placeholder =
    contactMethod === "email"
      ? "Email Address"
      : "Phone Number Written on The Disc";

  useEffect(() => {
    setContactValue("");
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
    onContactChange(formattedContact);
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
    onPickupPreferencesChange(formattedPreferences);
  };

  return (
    <>
      <div className="select-box-claim" style={{ marginBottom: "20px" }}>
        <div className="col-10 claim-disc-form" style={{ padding: "0" }}>
          <input
            placeholder={placeholder}
            type={contactMethod === "email" ? "email" : "text"}
            value={contactValue}
            onChange={handleContactChange}
          />
        </div>
      </div>

      <h4 className="header-claim-disc white-text">Pickup Preferences</h4>

      {preferences.map((pref, index) => (
        <div className="select-box-report">
          <div className="col-6 pe-0 arrow one" key={index}>
            <select
              value={pref.day}
              onChange={(e) =>
                handlePreferenceChange(index, "day", e.target.value as string)
              }
              className="form-select-claim"
              style={{ marginTop: "5px" }}
            >
              <option value="" disabled>
                Select Day
              </option>
              <option value="Weekday">Weekday</option>
              <option value="Weekend">Weekend</option>
            </select>
          </div>

          <div className="col-6 pe-0 arrow one">
            <select
              value={pref.time}
              onChange={(e) =>
                handlePreferenceChange(index, "time", e.target.value as string)
              }
              className="form-select-claim"
              style={{ marginTop: "5px" }}
            >
              <option value="" disabled>
                Select Time
              </option>
              <option value="Morning">Morning (7am-12pm)</option>
              <option value="Afternoon">Afternoon (12pm-5pm)</option>
              <option value="Evening">Evening (5pm-9pm)</option>
            </select>
          </div>
        </div>
      ))}

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
      </Button>

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
          </span>{" "}
          {pickupPreferences.join(", ")}
        </Typography>
      )}
    </>
  );
};

export default FormClaimDiscContact;
