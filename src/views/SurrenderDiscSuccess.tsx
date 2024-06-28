import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LogoRescueFlow2 from "../components/LogoRescueFlow2";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import RequestCourseComponents from "../components/RequestCourseComponents";
import "../styles/requestCourseComponents.css"
import Button from "../components/Button";


export default function SurrenderDiscSuccess () {
    const [step, setStep] = useState(1);
    const navigate = useNavigate();

    const handleBack = () => {
        if (step > 1) {
          setStep(step - 1);
        } else {
          navigate(-1); 
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
            <h4 className="success-message-surrender">You have successfully surrendered your disc to the course. The volunteers thank you for your help!</h4>
            <Button  
                text={"Share to facebook"}
                red={true}
                className="red-button-surrender"
                onClick={() => {
                    alert("button clicked");
                    }}                
            />
        </div>
    );
}
