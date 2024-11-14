// PopUpSurrender.tsx
import React, { useEffect } from "react";
import "../styles/popupComponent.css";
import Button from "./Button";
import "../styles/reportLostPopup.css";
import { API_BASE_URL, Disc } from "../App";
import { useCourses } from "../hooks/useCourses";

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
  phoneNumber: string;
  email: string;
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

interface PopupReportProps {
  title: string;
  content: string;
  onClose: () => void;
  onSuccess: (pickup: Pickup) => void;
  className?: string;
  disc: Disc;
  pickupName: string;
  pickupPreferences: string[];
  tofAccepted?: boolean;
  setShowSuccessMessage: (value: boolean) => void;
  setShowErrorMessage: (value: boolean) => void;
  setErrorMessage: (value: string) => void;
  setSuccessMessage: (value: string) => void;
  setShowInfoMessage: (value: boolean) => void;
  setInfoMessage: (value: string) => void;
}

const PopUpSurrender: React.FC<PopupReportProps> = ({
  title,
  content,
  onClose,
  onSuccess,
  className,
  disc,
  pickupName,
  pickupPreferences,
  tofAccepted,
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

  const handleSurrenderDisc = async () => {
    setLoading(true);
    try {
      const courseId = courses.find(
        (course) => course.orgCode === disc.course.orgCode
      )?.id;

      if (!courseId) {
        throw new Error("Course not found");
      }

      const jsonBody = JSON.stringify({
        comments: `${pickupName} has surrendered this disc`,
        itemId: disc.id,
        phoneNumber: disc.phoneNumber,
        pickup: {
          courseId: courseId,
          preference: pickupPreferences,
        },
        surrendered: true,
      });
      //console.log(jsonBody);

      const response = await fetch(`${API_BASE_URL}/inventory/claim`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: jsonBody,
      });

      if (!response.ok) {
        //console.log(response);
        //console.log(response.statusText);
        const responseJson = await response.json();
        //console.log(responseJson);
        throw new Error("Failed to surrender disc: " + responseJson.message);
      }

      // get OTP
      const data = await response.json();
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
          disabled={loadingCourses}
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
