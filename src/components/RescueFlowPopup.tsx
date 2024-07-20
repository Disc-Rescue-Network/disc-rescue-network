import "../styles/rescueFlowPopup.css";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import { Disc } from "../App";
import { useState } from "react";
import RescueFlowDiscsArray from "./RescueFlowDiscsArray";
import Card from "./Card";

interface Props {
  onClosePopup: () => void;
  arrayOfDiscs: Disc[];
}

const RescueFlowPopup: React.FC<Props> = ({ onClosePopup, arrayOfDiscs }) => {
  const navigate = useNavigate();
  const [selectedDiscId, setSelectedDiscId] = useState<string>("");

  const handleClaimDisc = () => {
    navigate(`/claimDisc/${selectedDiscId}`);
  };

  return (
    <div className="popup">
      <div className="popup-content" style={{ width: "90%" }}>
        <div className="verify-info">
          <div className="verify-row" id="discInfoVerify">
            {arrayOfDiscs.length === 1 && (
              <div className="discs-claim">
                <div className="card-container-claim-discs">
                  <Card disc={arrayOfDiscs[0]} showButton={false} />
                </div>
              </div>
            )}
            {arrayOfDiscs.length !== 1 && (
              <RescueFlowDiscsArray arrayOfDiscs={arrayOfDiscs} />
            )}
          </div>
        </div>
      </div>
      <div className="buttons-rescue-popup">
        {arrayOfDiscs.length === 1 && (<Button
          text={"Perfect! Give me my disc back!"}
          red={true}
          className={"red-button-popup"}
          onClick={handleClaimDisc}
        />)}
        <Button
          text={"I do not see my disc"}
          red={false}
          className={"blue-button-popup"}
          onClick={onClosePopup}
        />
      </div>
    </div>
  );
};

export default RescueFlowPopup;
