// PopUpSurrender.tsx
import React from "react";
import "../styles/popupComponent.css";
import Button from "./Button";
import "../styles/reportLostPopup.css";
import { useNavigate } from "react-router-dom";

interface PopupReportProps {
  title: string;
  content: string;
  onClose: () => void;
  className?: string;
}

const PopUpSurrender: React.FC<PopupReportProps> = ({
  title,
  content,
  onClose,
  className,
}) => {
  const navigate = useNavigate();

  const SurrenderSuccess = () => {
    navigate("/surrenderDiscSuccess");
  };
  return (
    <div
      className={`popup ${className}`}
      style={{ display: "flex", flexDirection: "column" }}
    >
      <div className="popup-content">
        <span className="close" id="close" onClick={onClose}>
          <div className="line"></div>
          <div className="line"></div>
        </span>
        <h2 className="header-surrender-disc">{title}</h2>
        <p className="content-report-popup">{content}</p>
      </div>
      <div className="buttons-rescue-popup">
        <Button
          text={"Yes, please donate my disc to the course!"}
          red={true}
          className="red-button-popup"
          onClick={SurrenderSuccess}
        />
        <Button
          text={"Sorry, I want my disc back"}
          red={false}
          className="blue-button-popup"
          onClick={onClose}
        />
      </div>
    </div>
  );
};

export default PopUpSurrender;
