import { useState } from "react";
import BetaBanner from "../components/BetaBanner";
import RescueFlowStep1 from "../components/RescueFlowStep1";
import RescueFlowStep2 from "../components/RescueFlowStep2";
import RescueFlowStep3 from "../components/RescueFlowStep3";
import RescueFlowStep4 from "../components/RescueFlowStep4";
import RescueFlowStep5 from "../components/RescueFlowStep5";

export default function RescueFlow() {
  const [step, setStep] = useState(1);

  return (
    <div className="container-rescue">
      <BetaBanner Course={"This is a Beta version of the DRN Platform."} />
      {step === 1 && <RescueFlowStep1 step={step} setStep={setStep} />}
      {step === 2 && <RescueFlowStep2 />}
      {step === 3 && <RescueFlowStep3 />}
      {step === 4 && <RescueFlowStep4 />}
      {step === 5 && <RescueFlowStep5 />}
    </div>
  );
}
