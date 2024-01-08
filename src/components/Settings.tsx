import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/globals.css";

const Settings = () => {
  const navigate = useNavigate();
  const [contactInput, setContactInput] = useState("");

  const goBack = () => {
    // Logic to go back, e.g., navigate back or to a specific route
    navigate(-1);
  };

  const refresh = () => {
    // Refresh logic, e.g., navigate to home or reload the page
    navigate("/");
  };

  const reportLostDisc = () => {
    // Logic to report lost disc
    navigate("/reportLostDisc");
  };

  const requestCourse = () => {
    // Logic to request a course
    navigate("/requestCourse");
  };

  const openSettings = () => {
    // Logic to open settings
    navigate("/settings");
  };

  const toggleFabMenu = () => {
    // Logic to toggle FAB menu
  };

  const searchPhoneNumber = () => {
    // Logic for searching phone number or handling contact input
    console.log(contactInput);
  };

  return (
    <section className="main-section text-center">
      {/* ...rest of your HTML structure... */}

      <i
        className="fa fa-arrow-left"
        style={{
          position: "absolute",
          top: "30px",
          left: "20px",
          fontSize: "30px",
          color: "white",
          padding: "5px",
        }}
        aria-hidden="true"
        onClick={goBack}
      ></i>

      {/* ...rest of your HTML structure... */}

      <input
        type="text"
        className="form-control"
        id="inputContact"
        placeholder="Phone Number or Email for Notification"
        value={contactInput}
        onChange={(e) => setContactInput(e.target.value)}
      />

      <button
        className="newsletterButton text-white mb-3"
        onClick={searchPhoneNumber}
      >
        Get notified when the deals are live
      </button>

      {/* ...rest of your HTML structure including fab-menu-container, footer, fab-container... */}
    </section>
  );
};

export default Settings;
