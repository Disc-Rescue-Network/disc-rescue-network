import { useState } from "react";
import Button from "./Button";
import FormStep from "./FormStep2";
import LogoRescueFlow from "./LogoRescueFlow";
import HeaderRescueFlow from "./RescueFlowComponets";
import RescueFlowPopup from "./RescueFlowPopup";
import { SearchParams } from "../views/RescueFlow";
import { Disc } from "../App";

interface RescueFlowProps {
  step: number;
  setStep: (step: number) => void;
  handleNextStep: (newParams: SearchParams) => void;
  searchParams: SearchParams;
  setSearchParams: (searchParams: SearchParams) => void;
}

const RescueFlowStep2 = (props: RescueFlowProps) => {
  const { step, setStep, handleNextStep, searchParams, setSearchParams } =
    props;

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [filteredDiscs, setFilteredDiscs] = useState<Disc[]>([]);
  const [selectedDiscId, setSelectedDiscId] = useState<string>("");

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <>
      <LogoRescueFlow />
      <div className="rescue-flow-step">
        <HeaderRescueFlow
          baseText={"Rescue Flow"}
          lightText={"Wizard"}
          baseNumber={"2"}
          lightNumber={" / 5"}
          whereText={"New Phone,"}
          secondMissingText={" Who Dis?"}
          smallerText={""}
        />
      </div>
      <FormStep
        phoneNumber={"PHONE NUMBER WRITTEN ON THE DISC"}
        setPhoneNumber={setPhoneNumber}
      />
      <div className="buttons-rescue-step2">
        <Button
          text={"Locate My Disc"}
          red={true}
          className="button-red-rescue-step2"
          onClick={() => {
            //console.log("Phone Number", phoneNumber);
            const phoneNumberWithPlus = `+${phoneNumber}`;
            const newParams = {
              ...searchParams,
              phoneNumber: phoneNumberWithPlus,
            };
            //console.log("New Params", newParams);
            setSearchParams(newParams);
            handleNextStep(newParams);
          }}
        />
        <Button
          text={"Didn't Write One"}
          red={false}
          border={true}
          className="second-button-rescue-3 white-border"
          onClick={() => {
            const newParams = { ...searchParams, phoneNumber: "" };
            //console.log("New Params", newParams);
            setSearchParams(newParams);
            setStep(step + 1);
          }}
        />
      </div>
      {isPopupOpen && (
        <RescueFlowPopup
          onClosePopup={closePopup}
          arrayOfDiscs={filteredDiscs}
        />
      )}
    </>
  );
};

export default RescueFlowStep2;
