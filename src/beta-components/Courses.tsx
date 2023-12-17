import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Courses = () => {
  const navigate = useNavigate();
  const [state, setState] = useState("STATE"); // Default state option
  const [course, setCourse] = useState("SELECT A COURSE"); // Default course option

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

  const searchCourse = () => {
    // Logic to search courses based on selected state and course
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
        {/* ...rest of the JSX structure... */}
        <select
          id="inputState"
          className="form-select"
          value={state}
          onChange={(e) => setState(e.target.value)}
        >
          <option>STATE</option>
          {/* Populate states here */}
        </select>
        <select
          id="inputCourse"
          className="form-select"
          value={course}
          onChange={(e) => setCourse(e.target.value)}
        >
          <option>SELECT A COURSE</option>
          {/* Populate courses here */}
        </select>
        <button
          className="stepbutton text-white mt-3 mb-3"
          onClick={searchCourse}
        >
          Search all discs at the selected course
        </button>
        {/* ...rest of the JSX structure... */}
      </div>
    </section>
  );
};

export default Courses;
