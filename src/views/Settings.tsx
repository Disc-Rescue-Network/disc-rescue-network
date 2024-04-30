import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import LogoRescueFlow2 from "../components/LogoRescueFlow2";
import StoreComponents from "../components/StoreComponents";

export default function Settings() {  
    return (
        <div className="container-store"> 
            <i className="arrow-left-icon" style={{top: '30px'}}>
                 <FontAwesomeIcon icon={faArrowLeft} />
            </i>
            <LogoRescueFlow2 />
            <StoreComponents 
                baseText={"Coming soon"}
                contentText={"In the meantime, let's talk about what else is coming! Not all discs will be claimed, but they can still be rescued! The DRN Shop will bring quality, affordable discs for purchase."}
                smallText={"Get notified when we launch for 20% off your first order!"} />   
        </div>
    )
}