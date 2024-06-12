import "../styles/claimDiscComponents.css"
import React, { Dispatch, SetStateAction } from "react";
import "../styles/claimDiscComponents.css";


interface State {
    id: number;
    name: string;
    Date: string;
    Location: string;
  }

const stateTuples: State[] = [
    {
        id: 0,
        name: "Johns Simple Store Pickup",
        Date: "Wednesday",
        Location: "1234 Main Street, City, ST 12333",
      },
      {
        id: 1,
        name: "Johns Simple Store Pickup",
        Date: "Thursday",
        Location: "1234 Main Street, City, ST 12333",
      },
      {
        id: 2,
        name: "Johns Simple Store Pickup",
        Date: "Friday",
        Location: "1234 Main Street, City, ST 12333",
      },
      {
        id: 3,
        name: "Johns Simple Store Pickup",
        Date: "Saturday",
        Location: "1234 Main Street, City, ST 12333",
      },
      {
        id: 4,
        name: "Johns Simple Store Pickup",
        Date: "Sunday",
        Location: "1234 Main Street, City, ST 12333",
      },
      {
        id: 5,
        name: "Johns Simple Store Pickup",
        Date: "Monday",
        Location: "1234 Main Street, City, ST 12333",
      },
      {
        id: 6,
        name: "Johns Simple Store Pickup",
        Date: "Tuesday",
        Location: "1234 Main Street, City, ST 12333",
      },
]

interface FormReportLostColorProps {
    contactMethod: 'phone' | 'email';
    ChosePickup: string;
    onPickupLocationChange: (location: string) => void;
    onPickupDateChange: (date: string) => void; 
}

const FormClaimDiscContact = (props: FormReportLostColorProps) => {
    const { contactMethod , ChosePickup, onPickupLocationChange, onPickupDateChange } = props
    const placeholder = contactMethod === 'email' ? 'Email Address' : 'Phone Number Written on The Disc' ;

    const handleLocationChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        onPickupLocationChange(event.target.value);
      };

      const handleDateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        onPickupDateChange(event.target.value);
      };  

    return (
        <>
      <div className="select-box-claim">
        <div className="col-10 claim-disc-form" style={{ padding: "0" }}>
          <input placeholder={placeholder} type={contactMethod === "email" ? "email" : "text"} />
        </div>
        <div className="col-10 pe-0 arrow one">
          <select className="form-select-claim" onChange={(event) => { handleLocationChange(event); handleDateChange(event); }}>
            <option value="All">{ChosePickup}</option>
            {stateTuples.map((state) => (
              <option key={state.id} value={state.Date}>
                {state.name} ({state.Date})
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
    )
}

export default FormClaimDiscContact;