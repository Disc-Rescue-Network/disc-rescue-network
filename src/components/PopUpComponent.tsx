// PopUpComponent.tsx
import React from 'react';
import "../styles/popupComponent.css";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

interface PopupComponentProps {
    title: string;
    redText: string;
    content: string;
    onClose: () => void;
}

const PopUpComponent: React.FC<PopupComponentProps> = ({ title, redText, content, onClose }) => {
    const navigate = useNavigate();
    
    const openRescueFlow = () => {
        navigate("/rescueflow");
      };
    
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
                <p>{content}</p>
                <Button  
                text={"Find My Disc"}
                red={true}
                className="find-my-disc-button"
                onClick={openRescueFlow}/>
            </div>
        </div>
    )
}

export default PopUpComponent;
