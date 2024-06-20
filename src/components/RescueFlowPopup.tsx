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
            <div className="popup-content" style={{ width: '90%' }}>
                <div className="verify-info">
                    <div className="verify-row" id="discInfoVerify">
                        <CardsRescueFLow 
                            Course={"Tranquility Trails"}
                            img={imageLogo}
                            Color={"Green"}
                            Name={"D. Bryant"}
                            DiscAndBrand={"Discraft Buzz"} 
                            showButton={false}     
                        />
                    </div>
                </div>
            </div>
            <div className="buttons-rescue-popup">
                <Button 
                    text={"Perfect! Give me my disc back!"} 
                    red={true}
                    className={"red-button-popup"}
                    onClick={() => {
                    alert("button clicked");
                    }}                
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