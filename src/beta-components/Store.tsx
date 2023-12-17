import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Store = () => {
  const navigate = useNavigate();
  const [contactInput, setContactInput] = useState("");
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const goBack = () => {
    navigate(-1);
  };

  const refresh = () => {
    navigate("/");
  };

  const reportLostDisc = () => {
    navigate("/reportLostDisc.html");
  };

  const requestCourse = () => {
    navigate("/requestCourse.html");
  };

  const openSettings = () => {
    navigate("/settings.html");
  };

  const toggleFabMenu = () => {
    // Logic to toggle FAB menu
  };

  const signUp = () => {
    // Logic for sign up (e.g., validate input and show success/error message)
  };

  return (
    <section className="main-section text-center">
      <div className="container">
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
        {/* ... rest of the HTML structure converted to JSX ... */}
        <input
          type="text"
          className="form-control"
          style={{ maxWidth: "610px !important" }}
          placeholder="Phone Number or Email for Notification"
          value={contactInput}
          onChange={(e) => setContactInput(e.target.value)}
        />
        {showError && (
          <div id="error" style={{ color: "var(--primary-red)" }}>
            Error message here
          </div>
        )}
        {showSuccess && (
          <div id="success" style={{ color: "var(--primary-green)" }}>
            Success! You are opted in for notifications.
          </div>
        )}
        <button
          className="newsletterButton text-white mt-2 mb-3"
          onClick={signUp}
        >
          Get notified when the deals are live
        </button>
        {/* ... rest of the HTML structure converted to JSX ... */}
      </div>
    </section>
  );
};

export default Store;
