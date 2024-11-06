import React, { useEffect, useState } from "react";
import "../styles/claimDiscComponents.css";

interface FormReportLostColorProps {
  contactMethod: "phone" | "email";
  pickupDays: string[];
  pickupTimes: string[];
  onContactChange: (contact: string) => void;
  onPickupDaysChange: (days: string[]) => void;
  onPickupTimesChange: (times: string[]) => void;
}

const FormClaimDiscContact = (props: FormReportLostColorProps) => {
  const {
    contactMethod,
    pickupDays,
    pickupTimes,
    onContactChange,
    onPickupDaysChange,
    onPickupTimesChange,
  } = props;
  const placeholder =
    contactMethod === "email"
      ? "Email Address"
      : "Phone Number Written on The Disc";
  const [contactValue, setContactValue] = useState("");

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

  const togglePickupDay = (day: string) => {
    const updatedDays = pickupDays.includes(day)
      ? pickupDays.filter((d) => d !== day)
      : [...pickupDays, day];
    onPickupDaysChange(updatedDays);
  };

  const togglePickupTime = (time: string) => {
    const updatedTimes = pickupTimes.includes(time)
      ? pickupTimes.filter((t) => t !== time)
      : [...pickupTimes, time];
    onPickupTimesChange(updatedTimes);
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

      <div className="pickup-preferences">
        <h4>Pickup Preferences</h4>

        <div className="preference-select">
          <h5>Days: {pickupDays.join(", ")}</h5>
          <label>
            <input
              type="checkbox"
              checked={pickupDays.includes("weekday")}
              onChange={() => togglePickupDay("weekday")}
            />
            Weekday
          </label>
          <label>
            <input
              type="checkbox"
              checked={pickupDays.includes("weekend")}
              onChange={() => togglePickupDay("weekend")}
            />
            Weekend
          </label>
        </div>

        <div className="preference-select">
          <h5>Times: {pickupTimes.join(", ")}</h5>
          <label>
            <input
              type="checkbox"
              checked={pickupTimes.includes("morning")}
              onChange={() => togglePickupTime("morning")}
            />
            Morning
          </label>
          <label>
            <input
              type="checkbox"
              checked={pickupTimes.includes("afternoon")}
              onChange={() => togglePickupTime("afternoon")}
            />
            Afternoon
          </label>
          <label>
            <input
              type="checkbox"
              checked={pickupTimes.includes("night")}
              onChange={() => togglePickupTime("night")}
            />
            Night
          </label>
        </div>
      </div>
    </>
  );
};

export default FormClaimDiscContact;
