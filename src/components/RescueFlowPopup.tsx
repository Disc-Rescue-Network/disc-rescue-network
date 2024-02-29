import "../styles/rescueFlowPopup.css";
import Button from "./Button";
import CardsRescueFLow from "./CardsRescueFlow";
import imageLogo from "../assets/DRN_WebLogo_HDPI.png";


interface Props {
    onClosePopup: () => void;
}

const RescueFlowPopup: React.FC<Props> = ({ onClosePopup }) => {
    
    return (
        <div className="popup" style={{ display: 'flex', flexDirection: 'column' }}>
            <div className="popup-content">
                <div className="verify-info">
                    <div className="verify-row" id="discInfoVerify">
                        <CardsRescueFLow 
                            Course={"Tranquility Trails"} 
                            img={imageLogo} 
                            Color={"Green"} 
                            Name={"D. Bryant"} 
                            DiscAndBrand={"Discraft Buzz"} 
                        />
                    </div>
                </div>
            </div>
            <div className="buttons-rescue">
                <Button 
                    text={"Perfect! Give me my disc back!"} 
                    red={true}
                    onClick={() => {
                    alert("button clicked");
                    }}                
                />
                <Button 
                    text={"This Is Not Mine"} 
                    red={false}
                    onClick={onClosePopup}                
                />
            </div>
        </div>
    )
}

export default RescueFlowPopup;