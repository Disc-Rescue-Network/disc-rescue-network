import BetaBanner from "../components/BetaBanner";
import RescueFlowStep1 from "../components/RescueFlowStep1";

export default function RescueFlow() {
  return (
    <div className="container-rescue">
      <BetaBanner Course={"This is a Beta version of the DRN Platform."} />
      <RescueFlowStep1 />
    </div>
  );
}
