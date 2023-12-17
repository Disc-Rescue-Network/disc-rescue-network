import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const RequestCourse = () => {
  const navigate = useNavigate();
  const [selectedState, setSelectedState] = useState("STATE"); // Default state option
  const [courseName, setCourseName] = useState("");

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

  const submitCourse = () => {
    // Logic to submit a new course request
  };

  return (
    <section className="main-section text-center">
      <div className="container">
        {/* ... rest of the JSX structure ... */}
        <select
          className="form-select"
          value={selectedState}
          onChange={(e) => setSelectedState(e.target.value)}
        >
          <option>STATE</option>
          {/* Populate states here */}
        </select>
        <input
          type="text"
          className="form-control placeholder-text"
          placeholder="Enter A Course"
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
        />
        <button
          className="newsletterButton text-white mt-3 mb-3"
          onClick={submitCourse}
        >
          Request Your Course be Added to the Network
        </button>
        {/* ... rest of the JSX structure ... */}
      </div>
    </section>
  );
};

export default RequestCourse;
