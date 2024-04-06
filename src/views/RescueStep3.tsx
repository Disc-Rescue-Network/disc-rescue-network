import BetaBanner from "../components/BetaBanner";
import RescueFlowStep3 from "../components/RescueFlowStep3";

export default function RescueFlow() {
  return (
    <div className="container-rescue">
      <BetaBanner Course={"This is a Beta version of the DRN Platform."} />
      <RescueFlowStep3 />
    </div>
  );
}