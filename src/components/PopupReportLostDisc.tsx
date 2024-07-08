import { useNavigate } from "react-router-dom";
import Button from "./Button";
import { useEffect, useState } from "react";
import "../styles/reportLostPopup.css";

interface PopupReportLostDiscProps {
    title: string;
    name: string;
    contactMethod: string;
    contactValue: string;
    disc: string;
    course: string;
    onClose: () => void;
}

const PopupReportLostDisc: React.FC<PopupReportLostDiscProps> = ({ title, name, contactMethod, disc, course, onClose, contactValue }) => {
    const navigate = useNavigate()
    const [selectedContactMethod, setSelectedContactMethod] = useState(contactMethod);
    const [localContactValue, setLocalContactValue] = useState(contactValue);
    const [isMobileView, setIsMobileView] = useState(window.innerWidth < 500);

    useEffect(() => {
        setLocalContactValue(contactValue);
    }, [contactValue]);

    const SuccessReportLostDisc = () => {
        navigate(`/reportLostDiscSuccess`);
    };

    const handleContactMethodChange = (method: string) => {
        setSelectedContactMethod(method);
    };

    useEffect(() => {
        const handleResize = () => {
          setIsMobileView(window.innerWidth < 500);
        };
    
        window.addEventListener('resize', handleResize);
    
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);

    return (
        <div className="popup">
            <div className="popup-content">
                <span className="close" onClick={onClose}>
                    <div className="line"></div>
                    <div className="line"></div>
                </span>
                <h2 className="title-report-popup">
                    {title}
                </h2>
                <div className="verify-info">
                    <div className="verify-row-report">NAME:
                        <span className="fw-light"> {name}</span>
                    </div>
                    <div className="verify-row-report">
                        {contactMethod === "phone" ? "Phone Number: " : "Email Adress: "}
                        <span className="fw-light">
                            {contactValue}
                        </span> 
                    </div>
                    <div className="verify-row-report">Disc:
                        <span className="fw-light"> {disc}</span>
                    </div>
                    <div className="verify-row-report">Course:
                        <span className="fw-light"> {course}</span>
                    </div>
                </div>
                {window.innerWidth < 500 ? (
                    <div className='buttons-report-lost-popup'>
                        <Button  
                            text={"Looks Good!"}
                            red={true}
                            className="button-popup-report-lost-red"
                            onClick={SuccessReportLostDisc}
                        />
                        <Button  
                            text={"Oops! Go Back"}
                            red={false}
                            className="button-popup-report-lost-blue"
                            onClick={onClose}
                        />
                    </div>
                ) : (
                    <div className='buttons-report-lost-popup'>
                        <Button  
                            text={"All good! Let's get my disc rescued please"}
                            red={true}
                            className="button-popup-report-lost-red"
                            onClick={SuccessReportLostDisc}
                        />
                        <Button  
                            text={"Sorry! Need to edit something!"}
                            red={false}
                            className="button-popup-report-lost-blue"
                            onClick={onClose}
                        />
                    </div>
                )}
            </div>
        </div>
    )
}

export default PopupReportLostDisc;