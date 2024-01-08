import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/globals.css";

const RequestCourse = () => {
  const navigate = useNavigate();
  const [selectedState, setSelectedState] = useState("STATE");
  const [courseName, setCourseName] = useState("");

  // Placeholder array for states (replace with real data)
  const states = ["NJ", "NY", "PA"];

  const goBack = () => {
    navigate(-1);
  };

  const refresh = () => {
    navigate("/");
  };

  const submitCourse = () => {
    console.log(`Requesting course: ${courseName} in ${selectedState}`);
    // Implement the logic to submit the course request
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
        {/* Other structure */}
        <select
          id="inputState"
          className="form-select"
          style={{ height: "55px" }}
          value={selectedState}
          onChange={(e) => setSelectedState(e.target.value)}
        >
          <option>STATE</option>
          {states.map((state, index) => (
            <option key={index} value={state}>
              {state}
            </option>
          ))}
        </select>
        <input
          type="text"
          className="form-control placeholder-text"
          placeholder="Enter A Course"
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
          style={{ height: "55px", textAlign: "left" }}
        />
        <button
          className="newsletterButton text-white mt-3 mb-3"
          style={{ width: "85%" }}
          onClick={submitCourse}
        >
          Request Your Course be Added to the Network
        </button>
        {/* Other structure */}
      </div>
    </section>
  );
};

export default RequestCourse;
