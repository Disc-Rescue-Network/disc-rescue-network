import "../styles/rescueFlowPopup.css";
import { useNavigate} from "react-router-dom";
import Button from "./Button";
import DiscsClaimDiscs from "./DiscsClaimDisc";
import { Disc } from "../App";


interface Props {
    onClosePopup: () => void;
    arrayOfDiscs: Disc[];
    selectedDiscId: string;
  }

const RescueFlowPopup: React.FC<Props> = ({ onClosePopup, arrayOfDiscs, selectedDiscId }) => {
    const navigate = useNavigate();

    const handleClaimDisc = () => {
        navigate(`/claimDisc/${selectedDiscId}`);
      };
    
    return (
        <div className="popup" style={{ display: 'flex', flexDirection: 'column' }}>
            <div className="popup-content" style={{ width: '90%' }}>
                <div className="verify-info">
                    <div className="verify-row" id="discInfoVerify">
                        <DiscsClaimDiscs arrayOfDiscs={arrayOfDiscs} selectedDiscId={selectedDiscId?.toString()} />
                    </div>
                </div>
            </div>
            <div className="buttons-rescue-popup">
                <Button 
                    text={"Perfect! Give me my disc back!"} 
                    red={true}
                    className={"red-button-popup"}
                    onClick={handleClaimDisc}                
                />
                <Button 
                    text={"This Is Not Mine"} 
                    red={false}
                    className={"blue-button-popup"}
                    onClick={onClosePopup}                
                />
            </div>
        </div>
    )
}

export default RescueFlowPopup;