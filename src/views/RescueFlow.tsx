import BetaBanner from "../components/BetaBanner";
import Footer from "../components/Footer";
import RescueFlowStep1 from "../components/RescueFlowStep1";

export default function RescueFlow() {
  return (
      <div className="container-rescue">
        <BetaBanner
          Course={
            "This is a Beta version of the DRN Platform. Please select ''NJ'' & ''Tranquility Trails'' to simulate the flow."
          }
        />
        <RescueFlowStep1 />
        <Footer />
      </div>
  );
}