// PopUpSurrender.tsx
import React from "react";
import "../styles/popupComponent.css";
import Button from "./Button";
import "../styles/reportLostPopup.css";

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
        <h2 className="header-surrender-disc">Terms of Service (TOS)</h2>
        <p className="content-report-popup">
          <ol
            style={{
              textAlign: "left",
              marginLeft: "10px",
              paddingLeft: "5px",
            }}
          >
            <li style={{ marginBottom: "10px" }}>
              <strong>Ownership Verification:</strong> By claiming a disc, you
              attest that you are the rightful owner. Claiming a disc that does
              not belong to you is strictly prohibited and constitutes theft.
            </li>
            <li style={{ marginBottom: "10px" }}>
              <strong>Waiver of Responsibility:</strong> Disc Rescue Network
              does not assume responsibility for verifying ownership beyond
              information provided by the claimant. Users are responsible for
              ensuring that claims are accurate and made in good faith.
            </li>
            <li style={{ marginBottom: "10px" }}>
              <strong>Liability for Wrongful Claims:</strong> Any individual
              claiming a disc they do not own may be held accountable by the
              disc golf course or rightful owner. Wrongful claims may result in
              prosecution, as this action is treated as theft.
            </li>
            <li style={{ marginBottom: "10px" }}>
              <strong>Course Enforcement:</strong> Disc golf courses reserve the
              right to prosecute individuals who make wrongful claims on discs.
            </li>
            <li style={{ marginBottom: "10px" }}>
              <strong>Acknowledgment of Terms:</strong> By using the Disc Rescue
              Network service, you agree to these terms and acknowledge the
              consequences of falsely claiming a disc.
            </li>
          </ol>
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
