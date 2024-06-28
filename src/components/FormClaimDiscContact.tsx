import React, { useEffect, useState } from "react";
import "../styles/claimDiscComponents.css";

interface State {
  id: number;
  Name: string;
  Date: string;
  Location: string;
}

const stateTuples: State[] = [
  {
    id: 0,
    Name: "Johns Simple Store Pickup",
    Date: "Wednesday",
    Location: "1234 Main Street, City, ST 12333",
  },
  {
    id: 1,
    Name: "Johns Simple Store Pickup",
    Date: "Thursday",
    Location: "1234 Main Street, City, ST 12333",
  },
  {
    id: 2,
    Name: "Johns Simple Store Pickup",
    Date: "Friday",
    Location: "1234 Main Street, City, ST 12333",
  },
  {
    id: 3,
    Name: "Johns Simple Store Pickup",
    Date: "Saturday",
    Location: "1234 Main Street, City, ST 12333",
  },
  {
    id: 4,
    Name: "Johns Simple Store Pickup",
    Date: "Sunday",
    Location: "1234 Main Street, City, ST 12333",
  },
  {
    id: 5,
    Name: "Johns Simple Store Pickup",
    Date: "Monday",
    Location: "1234 Main Street, City, ST 12333",
  },
  {
    id: 6,
    Name: "Johns Simple Store Pickup",
    Date: "Tuesday",
    Location: "1234 Main Street, City, ST 12333",
  },
];

interface FormReportLostColorProps {
  contactMethod: "phone" | "email";
  ChosePickup: string;
  onPickupLocationChange: (location: string, name: string) => void;
  onPickupDateChange: (date: string) => void;
  onContactChange: (contact: string) => void;
}

const FormClaimDiscContact = (props: FormReportLostColorProps) => {
  const { contactMethod, ChosePickup, onPickupLocationChange, onPickupDateChange, onContactChange } = props;
  const placeholder = contactMethod === "email" ? "Email Address" : "Phone Number Written on The Disc";
  const [contactValue, setContactValue] = useState("");

  useEffect(() => {
    setContactValue("");
  }, [contactMethod]);

  const handleLocationChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedDate = event.target.value;
    const selectedState = stateTuples.find(state => state.Date === selectedDate);
    if (selectedState) {
      onPickupLocationChange(selectedState.Location, selectedState.Name);
    }
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedDate = event.target.value;
    onPickupDateChange(selectedDate);
  };

  const formatPhoneNumber = (value: string) => {
    if (!value) return value;
    const phoneNumber = value.replace(/[^\d]/g, "");
    const phoneNumberLength = phoneNumber.length;
    if (phoneNumberLength < 4) return phoneNumber;
    if (phoneNumberLength < 7) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    }
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
  };

  const handleContactChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let formattedContact = event.target.value;
    if (contactMethod === "phone") {
      formattedContact = formatPhoneNumber(formattedContact);
    }
    setContactValue(formattedContact);
    onContactChange(formattedContact);
  }

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
        <div className="col-10 pe-0 arrow one">
          <select className="form-select-claim" onChange={(event) => { handleLocationChange(event); handleDateChange(event); }}>
            <option value="All">{ChosePickup}</option>
            {stateTuples.map((state) => (
              <option key={state.id} value={state.Date}>
                {state.Name} ({state.Date})
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
};

export default FormClaimDiscContact;
