import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LogoRescueFlow2 from "../components/LogoRescueFlow2";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import RequestCourseComponents from "../components/RequestCourseComponents";
import "../styles/requestCourseComponents.css"
import DiscsClaimDiscs from "../components/DiscsClaimDisc";


export default function ClaimDiscSuccess () {
    const location = useLocation();
    const { pickupLocation, pickupDate, pickupName, arrayOfDiscs, selectedDiscId } = location.state || {};
    const [step, setStep] = useState(1);
    const navigate = useNavigate();

    const handleBack = () => {
      if (step > 1) {
        setStep(step - 1);
      }
  
      if (step === 1) {
        navigate("/");
      }
    };
    return (
        <div className="container-store"> 
            <i className="arrow-left-icon" 
                style={{top: '30px'}}
                onClick={handleBack}>
                <FontAwesomeIcon icon={faArrowLeft}/>
            </i>
            <LogoRescueFlow2 />
            <RequestCourseComponents baseText={"Nailed"} lightText={"IT!"} className="claim-disc-success"/> 
            <h2 className="success-message">You have successfully claimed your disc and you've been opted in to receiving messages.</h2>
            <div className="verify-info claim-disc claim-border-bottom no-flex-direction no-color grey-background white-border drop-shadow extra-padding">
                <div className="box-content-disc-success d-flex flex-column">
                    <div className="verify-row-claim-success">
                        <label>Pickup Date:</label>
                        <span id="verifyPickupDate" className="lato"> {pickupDate}</span>
                    </div>
                    <div className="verify-row-claim-success">
                        <label id="pickupLocationLabel">Pickup Location:</label>
                        <span id="verifyPickupLocation" className="lato"> {pickupName} {pickupLocation}</span>
                    </div>
                        {/* <div className="verify-row-claim-success">
                        <label id="communicationMethodLabel">Phone Number For Release:</label>
                        <span id="verifyContactInfoForRelease" className="lato"></span>
                    </div> */}
                </div>
                <div className="verify-row" id="discInfoVerify" style={{ color: 'var(--primary-black) !important', width: '65%', maxWidth: '400px' }}>
            <DiscsClaimDiscs arrayOfDiscs={arrayOfDiscs} selectedDiscId={selectedDiscId} />
          </div>
            </div>
        </div>
    );
}
