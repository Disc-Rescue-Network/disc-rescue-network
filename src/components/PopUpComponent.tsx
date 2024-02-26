// PopUpComponent.tsx
import React from 'react';
import "../styles/popupComponent.css";
import Button from "./Button";

interface PopupComponentProps {
    title: string;
    content: string;
    redText: string;
    onClose: () => void;
}

const PopUpComponent: React.FC<PopupComponentProps> = ({ title, content, redText, onClose }) => {
    return (
        <div className="popup" style={{ display: 'flex' }}>
            <div className="popup-content">
                <span className="close" id="close" onClick={onClose}>x</span>
                <h2>{title}
                <span className="redText">{redText}</span>
                </h2>
                <p>{content}</p>
                <Button  
                text={"Find My Disc"}
                red={true}
                className="find-my-disc-button"
                onClick={() => {
                  alert("button clicked");
                }}/>
            </div>
        </div>
    )
}

export default PopUpComponent;
