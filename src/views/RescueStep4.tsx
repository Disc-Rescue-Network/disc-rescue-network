import BetaBanner from "../components/BetaBanner";
import RescueFlowStep4 from "../components/RescueFlowStep4";

export default function RescueFlow() {
  return (
    <div className="container-rescue">
      <BetaBanner Course={"This is a Beta version of the DRN Platform."} />
      <RescueFlowStep4 />
    </div>
  );
}