// PopUpSurrender.tsx
import React from "react";
import "../styles/popupComponent.css";
import Button from "./Button";
import "../styles/reportLostPopup.css";
import { API_BASE_URL } from "../App";

interface PopupReportProps {
  title: string;
  content: string;
  onClose: () => void;
  onSuccess: (pickup: Pickup) => void;
  className?: string;
}

export interface Pickup {
  tofAccepted: boolean;
  verified: boolean;
  id: number;
  comments: string;
  itemId: number;
  userId: number;
  phoneNumber: string;
  pickup: PickupInfo;
  surrendered: boolean;
  updatedAt: string;
  createdAt: string;
}

interface PickupInfo {
  id: number;
  courseId: number;
  day: string;
  time: string;
  claimId: number;
  updatedAt: string;
  createdAt: string;
}

const PopUpSurrender: React.FC<PopupReportProps> = ({
  title,
  content,
  onClose,
  onSuccess,
  className,
}) => {
  const [loading, setLoading] = React.useState(false);

  const handleSurrenderDisc = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/inventory/claim`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          comments: "Testing",
          itemId: 322,
          userId: 1,
          phoneNumber: "+16099554266",
          pickup: {
            courseId: 4,
            day: "weekday",
            time: "afternoon",
          },
          surrendered: true,
        }),
      });

      if (!response.ok) {
        console.log(response);
        throw new Error("Network response was not ok");
      }

      // get OTP
      const data = await response.json();
      const pickupInfo = data.data as Pickup;
      console.log(pickupInfo);
      onSuccess(pickupInfo);
      onClose();
    } catch (error) {
      console.error("Failed to surrender disc:", error);
    } finally {
      setLoading(false);
    }
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
        {loading && <div></div>}
        <Button
          text={
            loading ? "Loading..." : "Yes, please donate my disc to the course!"
          }
          red={true}
          className="red-button-popup"
          onClick={handleSurrenderDisc}
        />
        <Button
          text={loading ? "Loading..." : "Sorry, I want my disc back"}
          red={false}
          className="blue-button-popup"
          onClick={onClose}
        />
      </div>
    </div>
  );
};

export default PopUpSurrender;
