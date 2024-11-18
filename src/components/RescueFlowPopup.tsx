import "../styles/rescueFlowPopup.css";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import { Disc } from "../App";
import RescueFlowDiscsArray from "./RescueFlowDiscsArray";
import Card from "./Card";

interface Props {
  onClosePopup: () => void;
  arrayOfDiscs: Disc[];
}

const RescueFlowPopup: React.FC<Props> = ({ onClosePopup, arrayOfDiscs }) => {
  const navigate = useNavigate();

  const handleClaimDisc = (discID: string) => {
    navigate(`/claimDisc/${discID}`);
  };

  const notMineText =
    arrayOfDiscs.length === 1 ? "This is not mine" : "None of these are mine";

  return (
    <div className="popup">
      <div className="popup-content" style={{ width: "90%" }}>
        <div className="verify-info">
          <div className="verify-row" id="discInfoVerify">
            {arrayOfDiscs.length === 1 && (
              <div className="discs-claim">
                <div className="card-container-claim-single-disc">
                  <Card disc={arrayOfDiscs[0]} showButton={false} />
                </div>
              </div>
            )}
            {arrayOfDiscs.length !== 1 && (
              <RescueFlowDiscsArray
                arrayOfDiscs={arrayOfDiscs}
                whiteBorder={true}
              />
            )}
          </div>
        </div>
      </div>
      <div className="buttons-rescue-popup">
        {arrayOfDiscs.length === 1 && (
          <Button
            text={"Perfect! Give me my disc back!"}
            red={true}
            className={"red-button-popup"}
            onClick={() => {
              //console.log("Claiming disc", arrayOfDiscs[0]);
              //console.log("Selected disc id", arrayOfDiscs[0].id);
              handleClaimDisc(arrayOfDiscs[0].id!.toString());
            }}
          />
        )}
        <Button
          text={notMineText}
          red={false}
          className={"blue-button-popup"}
          onClick={onClosePopup}
        />
      </div>
    </div>
  );
};

export default RescueFlowPopup;
