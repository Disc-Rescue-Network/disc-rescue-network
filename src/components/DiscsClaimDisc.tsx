import "../styles/discs.css";
import { Disc } from "../App";
import CardClaim from "./CardClaimDisc";

interface DiscsClaimDiscsProps {
  arrayOfDiscs: Disc[];
  selectedDiscId: string; 
}

const DiscsClaimDiscs = ({ arrayOfDiscs, selectedDiscId }: DiscsClaimDiscsProps) => {
    const selectedDiscIdNumber = parseInt(selectedDiscId, 10);
    const selectedDisc = arrayOfDiscs.find(disc => disc.id === selectedDiscIdNumber);

  return (
    <div className="discs-claim">
      <div className="card-container-claim-discs">
        {selectedDisc ? (
          <CardClaim key={selectedDisc.id} disc={selectedDisc} />
        ) : (
          <p>Disc not found</p>
        )}
      </div>
    </div>
  );
};

export default DiscsClaimDiscs;
