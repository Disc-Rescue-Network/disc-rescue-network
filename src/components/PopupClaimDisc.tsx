import { useEffect, useState } from "react";
import "../styles/popupClaimDisc.css";
import Button from "./Button";
import { API_BASE_URL, Course, Disc } from "../App";
import Card from "./Card";
import React from "react";
import { useCoursesContext } from "../hooks/useCourses";
import { Pickup } from "./PopupSurrender";

interface PopupVerifyProps {
  onClose: () => void;
  pickupName: string;
  firstName: string;
  lastName: string;
  pickupPreferences: string[];
  disc: Disc;
  contactMethod: "phone" | "email";
  contactValue: string;
  onSuccess: (pickup: Pickup) => void;
  setShowInfoMessage: (value: boolean) => void;
  setInfoMessage: (value: string) => void;
  setShowErrorMessage: (value: boolean) => void;
  setErrorMessage: (value: string) => void;
}

interface PopupSurrenderProps {
  closePopupSurrender: () => void;
  surrenderDiscConfirm: () => void;
}

export function PopupVerify({
  onClose,
  pickupPreferences,
  pickupName,
  firstName,
  lastName,
  disc,
  contactMethod,
  contactValue,
  onSuccess,
  setErrorMessage,
  setShowErrorMessage,
  setShowInfoMessage,
  setInfoMessage,
}: PopupVerifyProps) {
  const [contactInfo, setContactInfo] = useState("");

  useEffect(() => {
    const modal = document.getElementById("popup");
    const communicationMethodLabel = document.getElementById(
      "communicationMethodLabel"
    );

    if (modal && communicationMethodLabel) {
      modal.style.display = "none";
      communicationMethodLabel.textContent =
        contactMethod === "phone"
          ? "Phone Number For Release: "
          : "Email For Release: ";
    }
    setContactInfo("");
  }, [contactMethod]);

  const [loading, setLoading] = React.useState(false);
  const { courses, loading: loadingCourses } = useCoursesContext();

  const handleClaimDisc = async () => {
    setLoading(true);
    try {
      const courseId = courses.find(
        (course: Course) => course.orgCode === disc.course.orgCode
      )?.id;

      if (!courseId) {
        throw new Error("Course not found");
      }

      const formattedPhoneNumber = `+1${contactValue.replace(/\D/g, "")}`;

      let jsonBody;
      if (contactMethod === "phone") {
        jsonBody = JSON.stringify({
          comments: `${pickupName} wants to claim this disc`,
          itemId: disc.id,
          phoneNumber: formattedPhoneNumber,
          firstName: firstName,
          lastName: lastName,
          pickup: {
            courseId: courseId,
            preference: pickupPreferences,
          },
          surrendered: false,
        });
      } else {
        jsonBody = JSON.stringify({
          comments: `${pickupName} wants to claim this disc`,
          itemId: disc.id,
          email: contactValue,
          firstName: firstName,
          lastName: lastName,
          pickup: {
            courseId: courseId,
            preference: pickupPreferences,
          },
          surrendered: false,
        });
      }
      console.log(jsonBody);

      const response = await fetch(`${API_BASE_URL}/inventory/claim`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: jsonBody,
      });

      const responseJson = await response.json();
      console.log(responseJson);
      const { data, success } = responseJson;

      if (!success) {
        //console.log(response);
        //console.log(response.statusText);
        //console.log(responseJson);
        throw new Error(responseJson.message);
      }

      // get OTP
      const pickupInfo = data as Pickup;
      console.log(pickupInfo);
      setShowInfoMessage(true);
      setInfoMessage("Claim request submitted successfully!");
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
    <div className="popup" style={{ flexDirection: "column" }}>
      <div className="popup-content popup-claim-disc" id="popup-verify-content">
        <span className="close" id="close" onClick={onClose}>
          <div className="line"></div>
          <div className="line"></div>
        </span>
        <h2
          className="header-popup-claim-disc"
          style={{
            fontSize: "3rem",
            marginTop: "10px",
            marginBottom: "2px",
            textTransform: "uppercase",
          }}
        >
          Verify Your <span className="fw-light">INFO</span>
        </h2>
        <div
          className="verify-row"
          id="discInfoVerify"
          style={{
            color: "var(--primary-black) !important",
          }}
        >
          <div
            className="discs-claim"
            style={{
              width: "100%",
              margin: "auto",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {disc && (
              <Card
                disc={disc}
                showButton={false}
                className="unset-min-height"
              />
            )}
          </div>
        </div>
        <div className="verify-info claim-disc">
          <div className="box-content-disc d-flex flex-column">
            <div className="verify-row-claim">
              <label>Preferred Pickup Windows:</label>
              <span id="verifyPickupDate" className="fw-light">
                {" "}
                {pickupPreferences.join(", ")}
              </span>
            </div>
            <div className="verify-row-claim">
              <label id="pickupLocationLabel">Pickup Location:</label>
              <span id="verifyPickupLocation" className="fw-light">
                {disc?.course.name} - {disc?.course.city}, {disc?.course.state}
              </span>
            </div>
            <div className="verify-row-claim">
              <label id="communicationMethodLabel">
                {contactMethod === "phone"
                  ? "Phone Number For Release: "
                  : "Email For Release: "}
              </label>
              <span id="verifyContactInfoForRelease" className="fw-light">
                {contactMethod === "phone"
                  ? contactValue
                  : contactMethod === "email"
                  ? contactValue
                  : ""}
              </span>
            </div>
          </div>
        </div>
        <div id="loading-bar" className="loading-bar"></div>
      </div>

      <div
        className="d-flex justify-content-center align-items-center mt-2 mb-2"
        style={{
          flexDirection: "column",
          width: "90%",
          maxWidth: "450px",
          background: "transparent",
          justifyContent: "flex-start",
          paddingBottom: "50px",
        }}
      >
        <Button
          text={"Perfect! Give me my disc back!"}
          red={true}
          className="button-red-popup-claim"
          onClick={handleClaimDisc}
        />
        <Button
          text={"Need to adjust some pickup information"}
          red={false}
          className="button-blue-popup-claim"
          onClick={onClose}
        />
      </div>
    </div>
  );
}

export function PopupSurrender({
  closePopupSurrender,
  surrenderDiscConfirm,
}: PopupSurrenderProps) {
  return (
    <div className="popup" style={{ flexDirection: "column" }}>
      <div
        className="popup-content"
        id="popup-surrender-content"
        style={{ margin: "unset !important" }}
      >
        <span className="close" id="close" onClick={closePopupSurrender}>
          &times;
        </span>
        <h2>
          You are about to <span className="redText">Surrender</span> Your Disc
        </h2>
        <p>
          Hi There! Surrendering your disc is just like a donation. This disc
          can be sold by the course to raise funds for things like new tee pads,
          new baskets or general maintenance.
        </p>
      </div>
      <div
        className="d-flex justify-content-center align-items-center mt-2 mb-2"
        style={{
          flexDirection: "column",
          width: "90%",
          maxWidth: "450px",
          background: "transparent",
          justifyContent: "flex-start",
          margin: "auto",
          paddingBottom: "50px",
        }}
      >
        <button
          className="stepbutton red text-white mt-2 mb-3 no-border"
          onClick={surrenderDiscConfirm}
          style={{ fontSize: "1rem" }}
        >
          Yes, please donate my disc to the course!
        </button>
        <button
          className="rememberbtn fw-light blue no-border-1"
          style={{
            width: "80%",
            maxWidth: "450px",
            fontWeight: "400 !important",
          }}
          onClick={closePopupSurrender}
        >
          Sorry, I want my disc back
        </button>
      </div>
    </div>
  );
}
