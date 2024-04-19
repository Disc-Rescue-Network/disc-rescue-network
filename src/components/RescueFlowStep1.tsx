import HeaderRescueFlow from "./RescueFlowComponets";
import LogoRescueFlow from "./LogoRescueFlow";
import "../styles/rescueFlowStep.css";
import RescueFlowForms from "./RescueFlowForms";
import Button from "./Button";

interface RescueFlowProps {
  step: number;
  setStep: (step: number) => void;
}

const RescueFlowStep1 = (props: RescueFlowProps) => {
  const { step, setStep } = props;

  return (
    <>
      <LogoRescueFlow />
      <div className="rescue-flow-step">
        <HeaderRescueFlow
          baseText={"Rescue Flow"}
          lightText={"Wizard"}
          baseNumber={"1"}
          lightNumber={" / 5"}
          whereText={"where'd it go"}
          secondMissingText={" Missing?"}
          smallerText={""}
        />
      </div>
      <RescueFlowForms
        initialOption={"State"}
        courseOption={"Select a Course"}
      />
      <div className="buttons-rescue">
        <Button
          text={"Next Step"}
          red={true}
          className="button-red-rescue"
          onClick={() => {
            setStep(step + 1);
          }}
        />
        <Button
          text={"Don't Remember"}
          red={false}
          border={true}
          className="second-button-rescue white-border"
          onClick={() => {
            setStep(step + 1);
          }}
        />
      </div>
    </>
  );
};

export default RescueFlowStep1;
