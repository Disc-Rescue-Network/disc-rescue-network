import Button from "./Button";
import LogoRescueFlow from "./LogoRescueFlow";
import HeaderRescueFlow from "./RescueFlowComponets";
import { SearchParams } from "../views/RescueFlow";
import FormStep5 from "./FormStep5";
import { useState } from "react";

interface RescueFlowProps {
  step: number;
  setStep: (step: number) => void;
  handleNextStep: (newParams: SearchParams) => void;
  searchParams: SearchParams;
  setSearchParams: (searchParams: SearchParams) => void;
}

const RescueFlowStep5 = (props: RescueFlowProps) => {
  const { step, setStep, handleNextStep, searchParams, setSearchParams } =
    props;

  const [color, setColor] = useState("");
  return (
    <>
      <LogoRescueFlow />
      <div className="rescue-flow-step">
        <HeaderRescueFlow
          baseText={"Rescue Flow"}
          lightText={"Wizard"}
          baseNumber={"5"}
          lightNumber={" / 5"}
          whereText={"Shoot For The"}
          secondMissingText={" Moon."}
          smallerText={"Last minute hail mary to save the flow..."}
        />
      </div>
      <FormStep5 inputName={"Whats Color Is It?!"} setColor={setColor} />
      <div className="buttons-rescue-step2">
        <Button
          text={"Show Me The Discs"}
          red={true}
          className="button-red-rescue-5"
          onClick={() => {
            handleNextStep({ color });
          }}
        />
        <Button
          text={"This Is Just Sad Now"}
          red={false}
          border={true}
          className="second-button-rescue-5 white-border"
          onClick={() => {
            setStep(step + 1);
          }}
        />
      </div>
    </>
  );
};

export default RescueFlowStep5;
