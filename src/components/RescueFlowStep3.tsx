import Button from "./Button";
import LogoRescueFlow from "./LogoRescueFlow";
import FormStep3 from "./FormStep3";
import HeaderRescueFlow from "./RescueFlowComponets";
import React, { useState } from "react";
import RescueFlowPopupStep3 from "./RescueFlowPopupStep3";
import { SearchParams } from "../views/RescueFlow";

interface RescueFlowProps {
  step: number;
  setStep: (step: number) => void;
  handleNextStep: (newParams: SearchParams) => void;
  searchParams: SearchParams;
  setSearchParams: (searchParams: SearchParams) => void;
}

const RescueFlowStep3 = (props: RescueFlowProps) => {
  const { step, setStep, handleNextStep, searchParams, setSearchParams } =
    props;

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [name, setName] = useState("");

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
          baseNumber={"3"}
          lightNumber={" / 5"}
          whereText={"Throw and a"}
          secondMissingText={" Miss."}
          smallerText={"Not to worry, Let's keep searching"}
        />
      </div>
      <FormStep3
        initialName={"First Initial"}
        lastName={"Enter Last Name"}
        setName={(value) => setName(`${value.initial} ${value.last}`)}
      />
      <div className="buttons-rescue">
        <Button
          text={"Let's Try This Again"}
          red={true}
          className="button-red-rescue-5"
          onClick={() => {
            handleNextStep({ name });
            openPopup();
          }}
        />
        <Button
          text={"Didn't Write One"}
          red={false}
          border={true}
          className="second-button-rescue-3 white-border"
          onClick={() => {
            setStep(step + 1);
          }}
        />
      </div>
      {isPopupOpen && <RescueFlowPopupStep3 onClosePopup={closePopup} />}
    </>
  );
};

export default RescueFlowStep3;
