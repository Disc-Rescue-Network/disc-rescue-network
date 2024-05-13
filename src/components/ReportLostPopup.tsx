// PopUpComponent.tsx
import React from 'react';
import "../styles/popupComponent.css";
import Button from "./Button";
import "../styles/reportLostPopup.css"

interface PopupReportProps {
    title: string;
    redText: string;
    content: string;
    onClose: () => void;
}

const PopUpReport: React.FC<PopupReportProps> = ({ title, redText, content, onClose }) => {
    return (
        <div className="popup" style={{ display: 'flex' }}>
            <div className="popup-content">
                <span className="close" id="close" onClick={onClose}>
                    <div className='line'></div>
                    <div className="line"></div>
                </span>
                <h2>{title}
                <span className="redText">{redText}</span>
                </h2>
                <p className='content-report-popup'>{content}</p>
                <div className='buttons-report-popup'>
                <Button  
                text={"Phone"}
                red={true}
                className="button-popup-phone"
                onClick={() => {
                  alert("button clicked");
                }}/>
                <Button  
                text={"Email"}
                red={true}
                className="button-popup-email"
                onClick={() => {
                  alert("button clicked");
                }}/>
                </div>
            </div>
        </div>
    )
}

export default PopUpReport;
