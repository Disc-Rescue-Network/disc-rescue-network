import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ReportLostDisc = () => {
  const navigate = useNavigate();
  const [initial, setInitial] = useState("First Initial");
  const [lastName, setLastName] = useState("");
  const [selectedColor, setSelectedColor] = useState("COLOR");
  const [selectedBrand, setSelectedBrand] = useState("BRAND");
  const [selectedState, setSelectedState] = useState("STATE");
  const [selectedCourse, setSelectedCourse] = useState("SELECT A COURSE");
  const [discName, setDiscName] = useState("");

  // Placeholder arrays for dropdown options
  const colors = ["Red", "Blue", "Green"]; // Replace with actual colors
  const brands = ["Brand A", "Brand B", "Brand C"]; // Replace with actual brands
  const states = ["NJ", "NY", "PA"]; // Replace with actual states
  const courses = ["Course 1", "Course 2", "Course 3"]; // Replace with actual courses

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

  const verifyInfo = () => {
    // Logic to verify information
  };

  const closePopupVerify = () => {
    // Logic to close popup
  };

  const submitDisc = () => {
    // Logic to submit disc
  };

  // Additional event handlers as needed

  return (
    <section className="main-section text-center">
      <div className="container">
        {/* ...rest of the JSX structure... */}
        <select
          id="inputInitial"
          className="form-select"
          value={initial}
          onChange={(e) => setInitial(e.target.value)}
        >
          <option>First Initial</option>
          {/* Alphabet options */}
        </select>
        <input
          type="text"
          className="form-control"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        {/* ...rest of the JSX structure... */}
        <select
          id="colorList"
          className="form-select"
          value={selectedColor}
          onChange={(e) => setSelectedColor(e.target.value)}
        >
          <option>COLOR</option>
          {colors.map((color, index) => (
            <option key={index} value={color}>
              {color}
            </option>
          ))}
        </select>
        {/* ...rest of the JSX structure... */}
        <select
          id="brandList"
          className="form-select"
          value={selectedBrand}
          onChange={(e) => setSelectedBrand(e.target.value)}
        >
          <option>BRAND</option>
          {brands.map((brand, index) => (
            <option key={index} value={brand}>
              {brand}
            </option>
          ))}
        </select>
        <input
          type="text"
          className="form-control"
          placeholder="Enter Disc Name"
          value={discName}
          onChange={(e) => setDiscName(e.target.value)}
        />
        <select
          id="inputState"
          className="form-select"
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
        <select
          id="inputCourse"
          className="form-select"
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
        >
          <option>SELECT A COURSE</option>
          {courses.map((course, index) => (
            <option key={index} value={course}>
              {course}
            </option>
          ))}
        </select>
        <button
          className="newsletterButton text-white mt-3 mb-3"
          onClick={verifyInfo}
        >
          Enter your disc into the rescue network
        </button>
        {/* ...rest of the JSX structure... */}
      </div>
    </section>
  );
};

export default ReportLostDisc;
