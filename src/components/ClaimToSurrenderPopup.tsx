// PopUpSurrender.tsx
import React, { useEffect } from "react";
import "../styles/popupComponent.css";
import Button from "./Button";
import "../styles/reportLostPopup.css";
import { API_BASE_URL, Disc } from "../App";
import { useCourses } from "../hooks/useCourses";
import { Claim, Pickup } from "./PopupSurrender";

interface ClaimToSurrenderPopUpProps {
  title: string;
  content: string;
  onClose: () => void;
  onSuccess: (pickup: Pickup) => void;
  className?: string;
  disc: Disc;
  pickupName: string;
  pickupPreferences: string[];
  tofAccepted?: boolean;
  originalClaim: Claim | null;
  setShowSuccessMessage: (value: boolean) => void;
  setShowErrorMessage: (value: boolean) => void;
  setErrorMessage: (value: string) => void;
  setSuccessMessage: (value: string) => void;
  setShowInfoMessage: (value: boolean) => void;
  setInfoMessage: (value: string) => void;
}

const ClaimToSurrenderPopUp: React.FC<ClaimToSurrenderPopUpProps> = ({
  title,
  content,
  onClose,
  onSuccess,
  className,
  disc,
  pickupName,
  pickupPreferences,
  tofAccepted,
  originalClaim,
  setShowSuccessMessage,
  setShowErrorMessage,
  setErrorMessage,
  setSuccessMessage,
  setShowInfoMessage,
  setInfoMessage,
}) => {
  const [loading, setLoading] = React.useState(false);
  const { courses, fetchCourses, loading: loadingCourses } = useCourses();

  useEffect(() => {
    if (courses.length === 0) {
      fetchCourses();
    }
  }, []);

  const handleClaimToSurrenderDisc = async () => {
    setLoading(true);
    try {
      const courseId = courses.find(
        (course) => course.orgCode === disc.course.orgCode
      )?.id;

      if (!courseId) {
        throw new Error("Course not found");
      }

      const response = await fetch(
        `${API_BASE_URL}/inventory/claim/${originalClaim?.id}/surrender`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const responseJson = await response.json();
      const { success, data } = responseJson;

      if (!success) {
        //console.log(response);
        //console.log(response.statusText);
        //console.log(responseJson);
        throw new Error("Failed to surrender disc: " + responseJson.message);
      }

      // get OTP
      const pickupInfo = data.data as Pickup;
      //console.log(pickupInfo);
      setShowInfoMessage(true);
      setInfoMessage(
        "Surrender request submitted successfully - please verify your PCM"
      );
      onSuccess(pickupInfo);
      onClose();
    } catch (error: any) {
      console.error("Failed to surrender disc:", error);
      setShowErrorMessage(true);
      setErrorMessage("Failed to surrender disc: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!originalClaim) {
    return <div>Error: Original claim not found</div>;
  }

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
          onClick={handleClaimToSurrenderDisc}
          disabled={loadingCourses}
        />
        <Button
          text={loading ? "Loading..." : "Sorry, I Changed My Mind"}
          red={false}
          className="blue-button-popup"
          onClick={onClose}
        />
      </div>
    </div>
  );
};

export default ClaimToSurrenderPopUp;
