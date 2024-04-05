import BetaBanner from "../components/BetaBanner";
import RescueFlowStep5 from "../components/RescueFlowStep5";

export default function RescueFlow() {
  return (
    <div className="container-rescue">
      <BetaBanner Course={"This is a Beta version of the DRN Platform."} />
      <RescueFlowStep5 />
    </div>
  );
}