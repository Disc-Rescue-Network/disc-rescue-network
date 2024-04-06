import BetaBanner from "../components/BetaBanner";
import RescueFlowStep2 from "../components/RescueFlowStep2";

export default function RescueFlow() {
  return (
    <div className="container-rescue">
      <BetaBanner Course={"This is a Beta version of the DRN Platform."} />
      <RescueFlowStep2 />
    </div>
  );
}