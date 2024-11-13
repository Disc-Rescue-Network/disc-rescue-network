// PopUpSurrender.tsx
import React, { useEffect } from "react";
import "../styles/popupComponent.css";
import Button from "./Button";
import "../styles/reportLostPopup.css";

export interface Pickup {
  vid: number;
  claim: Claim;
}

export interface Claim {
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

export interface PickupInfo {
  id: number;
  courseId: number;
  day: string[];
  time: string[];
  claimId: number;
  updatedAt: string;
  createdAt: string;
}

interface TermsOfFlowProps {
  onClose: () => void;
  handleAcceptTOF: () => void;
}

const TermsOfFlow: React.FC<TermsOfFlowProps> = (props: TermsOfFlowProps) => {
  const { onClose, handleAcceptTOF } = props;
  return (
    <div
      className={`popup`}
      style={{ display: "flex", flexDirection: "column" }}
    >
      <div className="popup-content">
        <span className="close" id="close" onClick={onClose}>
          <div className="line"></div>
          <div className="line"></div>
        </span>
        <h2 className="header-surrender-disc">Terms of Flow (TOF)</h2>
        <p className="content-report-popup">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur.
        </p>
      </div>
      <div className="buttons-rescue-popup">
        <Button
          text={"Accept"}
          red={true}
          className="red-button-popup"
          onClick={handleAcceptTOF}
        />
        <Button
          text={"Cancel"}
          red={false}
          className="blue-button-popup"
          onClick={onClose}
        />
      </div>
    </div>
  );
};

export default TermsOfFlow;
