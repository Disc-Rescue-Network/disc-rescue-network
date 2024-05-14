import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LogoRescueFlow2 from "../components/LogoRescueFlow2";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import ReportLostComponents from "../components/ReportLostComponents";
import FormReportLost from "../components/FormReportLost";
import { useState, useEffect } from "react";
import PopUpComponent from "../components/PopUpComponent";
import PopUpReport from "../components/ReportLostPopup";

export default function ReportLostDisc() {
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        setShowPopup(true);
    }, []); 
    return (
        <div className="container-report-lost-disc">
             {showPopup && ( // Renderiza o popup somente se showPopup for true
                <PopUpReport
                    title={"WHAT IS YOUR PREFERRED METHOD OF COMMUNICATION?"}
                    redText={""}
                    content={"If you wrote your phone number on your disc, we recommend using this as your preferred method."}
                    onClose={() => setShowPopup(false)} // Define showPopup como false ao fechar o popup
                />
            )}
            <i className="arrow-left-icon" style={{top: '30px'}}>
                 <FontAwesomeIcon icon={faArrowLeft} />
            </i>
            <LogoRescueFlow2 />
            <ReportLostComponents 
                baseText={"Enter The"} 
                lightText={"Network"} />
        </div>
    )
}