import "../styles/formReportLost.css";
import React, { useState } from "react";

interface NameAndInitialFormProps {
  onFirstNameChange: (value: string) => void;
  onLastNameChange: (value: string) => void;
}

const NameAndInitialForm: React.FC<NameAndInitialFormProps> = ({
  onFirstNameChange,
  onLastNameChange,
}) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");

  const handleFirstNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setFirstName(value);

    if (value.trim() === "") {
      setFirstNameError("First name is required");
    } else {
      setFirstNameError("");
    }

    onFirstNameChange(value);
  };
  const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setLastName(value);

    if (value.trim() === "") {
      setLastNameError("Last name is required");
    } else {
      setLastNameError("");
    }

    onLastNameChange(value);
  };

  const handleLastNameBlur = () => {
    if (lastName.trim() === "") {
      setLastNameError("Last name is required");
    }
  };

  const handleFirstNameBlur = () => {
    if (firstName.trim() === "") {
      setFirstNameError("First name is required");
    }
  };
  return (
    <>
      <div className="select-box-report">
        <div className="col-6 report-lost">
          <input
            placeholder="First Name *"
            value={firstName}
            onChange={handleFirstNameChange}
            onBlur={handleFirstNameBlur}
            className={firstNameError ? "input-error" : ""}
          />
          {firstNameError && (
            <div className="error-message">{firstNameError}</div>
          )}
        </div>
        <div className="col-6 report-lost">
          <input
            placeholder="Last Name *"
            value={lastName}
            onChange={handleLastNameChange}
            onBlur={handleLastNameBlur}
            className={lastNameError ? "input-error" : ""}
          />
          {lastNameError && (
            <div className="error-message">{lastNameError}</div>
          )}
        </div>
      </div>
    </>
  );
};

export default NameAndInitialForm;
