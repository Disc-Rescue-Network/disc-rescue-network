import React, { useState, useEffect } from "react";
import {
  TextField,
  Select,
  MenuItem,
  Button,
  Box,
  Typography,
} from "@mui/material";
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
      <div className="select-box-claim">
        <div className="col-10 claim-disc-form" style={{ padding: "0" }}>
          <input
            placeholder={placeholder}
            type={contactMethod === "email" ? "email" : "text"}
            value={contactValue}
            onChange={handleContactChange}
          />
        </div>
      </div>

      {/* <div className="mt-5 mb-3 select-box-forms report-lost-class">
        <div className="col-4-forms pe-0 arrow one report-class-col-4">
          <select
            className="form-select-rescue-flow report-lost-form-select"
            onChange={handleStateChange}
            value={selectedState}
          >
            <option value="">STATE</option>
            {uniqueStates.map((state, index) => (
              <option key={index} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>
        <div className="col-8-forms pe-0 arrow report-class-col-8">
          <select
            className="form-select-rescue-flow report-lost-form-select"
            value={selectedCourse}
            onChange={handleCourseChange}
          >
            <option value="">SELECT A COURSE</option>
            {filteredCourses.map((course, index) => (
              <option key={index} value={course.courseName}>
                {course.courseName}
              </option>
            ))}
          </select>
        </div>
      </div> */}

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
        sx={{ alignSelf: "flex-start" }}
      >
        Add Pickup Option
      </Button>

      <Typography variant="body1">
        Selected Preferences: {pickupPreferences.join(", ")}
      </Typography>
    </>
  );
};

export default FormClaimDiscContact;
