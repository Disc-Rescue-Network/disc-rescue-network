import "../styles/discs.css";
import { Disc } from "../App";
import Card from "./Card";

interface RescueFlowDiscsArrayProps {
  arrayOfDiscs: Disc[];
  whiteBorder?: boolean;
}

const RescueFlowDiscsArray = ({
  arrayOfDiscs,
  whiteBorder,
}: RescueFlowDiscsArrayProps) => {
  return (
    <div className="discs-claim">
      <div className="card-container-claim-discs">
        {arrayOfDiscs.map((disc: Disc) => (
          <Card
            key={disc.id}
            disc={disc}
            showButton={true}
            showButtonBorder={true}
          />
        ))}
      </div>
    </div>
  );
};

export default RescueFlowDiscsArray;
