// PopUpSurrender.tsx
import React, { useEffect } from "react";
import "../styles/popupComponent.css";
import Button from "./Button";
import "../styles/reportLostPopup.css";
import { API_BASE_URL, Disc } from "../App";
import { useCourses } from "../hooks/useCourses";

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
  // pickupDays: string[];
  // pickupTimes: string[];
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
  // pickupTimes,
  // pickupDays,
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
      const jsonBody = JSON.stringify({
        comments: `${pickupName} has surrendered this disc`,
        itemId: disc.id,
        userId: 1,
        phoneNumber: disc.phoneNumber,
        pickup: {
          courseId: courses.find(
            (course) => course.orgCode === disc.course.orgCode
          )?.id,
          preference: pickupPreferences,
          // day: pickupDays,
          // time: pickupTimes,
        },
        surrendered: true,
      });
      console.log(jsonBody);

      const response = await fetch(`${API_BASE_URL}/inventory/claim`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: jsonBody,
      });

      if (!response.ok) {
        console.log(response);
        console.log(response.statusText);
        console.log(await response.json());
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
