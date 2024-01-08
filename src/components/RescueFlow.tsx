import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import chatIcon from "../assets/chat.svg";
import homeIcon from "../assets/home.png";
import searchIcon from "../assets/search.png";
import diskStoreIcon from "../assets/disk-store.png";
import coursesIcon from "../assets/courses.png";
import appCenterBtnLogoIcon from "../assets/app_center_btn_logo.png";
import arrowDownIcon from "../assets/arrow-down.png";
import "../styles/globals.css";

const RescueFlow = () => {
  const navigate = useNavigate();
  const [selectedState, setSelectedState] = useState("STATE");
  const [selectedCourse, setSelectedCourse] = useState("SELECT A COURSE");
  // Placeholder data for states and courses
  const states = ["NJ", "NY", "PA"]; // Replace with real data
  const courses = [
    "SELECT A COURSE",
    "Tranquility Trails",
    "Sunny Meadows",
    "Forest Hills",
  ]; // Replace with real data

  const initiallyOpen = "";
  const [isOpen, setIsOpen] = useState(initiallyOpen);

  const goBack = () => {
    navigate(-1);
  };

  const refresh = () => {
    navigate("/");
  };

  const reportLostDisc = () => {
    navigate("/reportLostDisc");
  };

  const requestCourse = () => {
    navigate("/requestCourse");
  };

  const openSettings = () => {
    navigate("/settings.");
  };

  const toggleFabMenu = () => {
    // Logic to toggle FAB menu
  };

  const searchDiscs = () => {
    navigate("/rescueFlow2");
  };

  const skipStep = () => {
    navigate("/rescueFlow2");
  };

  const closePopup = () => {
    // Logic to close popup
  };

  const filterSubmitted = () => {
    // Implement filter submit logic
  };

  const resetFilters = () => {
    // Implement filter reset logic
  };

  const statesOptions = [
    "STATE",
    "Alabama",
    "Connecticut",
    "Georgia",
    "Hawaii",
    "Iowa",
    "Kansas",
    "Louisiana",
    "Maine",
    "Mississippi",
    "Montana",
    "Nebraska",
    "Nevada",
    "New Hampshire",
    "New Mexico",
    "North Dakota",
    "Ohio",
    "Oklahoma",
    "Oregon",
    "Rhode Island",
    "South Carolina",
    "South Dakota",
    "Utah",
    "Vermont",
    "Washington",
    "West Virginia",
    "Wyoming",
  ];

  return (
    <div className="emptyDiv">
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

          <div className="d-flex align-items-center flex-column text-center mb-2">
            <img className="weblogo" src={logo} alt="logo" onClick={refresh} />
            <div className="chat-box d-flex align-items-center mt-3">
              <img className="me-2" src={chatIcon} alt="chat" />
              <h4 className="m-0 me-2 text-white">OPT IN STATUS</h4>
              <h4 className="m-0 confirmd">CONFIRMED</h4>
            </div>
          </div>

          <div className="rescue d-flex align-items-center flex-column text-center mb-2">
            <h3 className="m-0 text-white">
              RESCUE FLOW <span className="fw-light">wizard</span>
            </h3>
            <h3 className="m-0 text-white">
              1 <span className="overtext">/ 5</span>
            </h3>
          </div>

          <h3 className="mt-0 mb-3 text-white text-center where">
            WHERE'D IT GO <span className="missingtext">MISSING?</span>
          </h3>

          <div className="row mb-3 select-box d-flex justify-content-center">
            <div
              className="col-4 pe-0 arrow one"
              style={{ padding: 0, maxWidth: "150px" }}
            >
              <select
                id="inputState"
                className="form-select"
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
              >
                {statesOptions.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-8 pe-0 arrow" style={{ maxWidth: "300px" }}>
              <select
                id="inputCourse"
                className="form-select"
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
              >
                {courses.map((course) => (
                  <option key={course} value={course}>
                    {course}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button className="stepbutton text-white mb-3" onClick={searchDiscs}>
            NEXT STEP
          </button>
          <div className="pb-4">
            <button className="rememberbtn fw-light" onClick={skipStep}>
              DON’T REMEMBER
            </button>
          </div>
        </div>
      </section>

      <div className="fab-menu-container" id="fabMenuContainer">
        <div className="fab-menu" id="fabMenu">
          <div className="fab-menu-item">
            <a
              className="fab-menu-item-text-left"
              href="/reportLostDisc"
              style={{ textDecoration: "none" }}
            >
              Report <br /> Lost Disc
            </a>
            <i className="fa-regular fa-flag" onClick={reportLostDisc}></i>
          </div>
          <div className="fab-menu-item">
            <a
              className="fab-menu-item-text"
              href="/requestCourse"
              style={{ textDecoration: "none" }}
            >
              Request a Course
            </a>
            <i className="fa-solid fa-location-dot" onClick={requestCourse}></i>
          </div>
          <div className="fab-menu-item">
            <i className="fa-solid fa-gear" onClick={openSettings}></i>
            <a
              className="fab-menu-item-text-right"
              href="/settings"
              style={{ textDecoration: "none" }}
            >
              Settings
            </a>
          </div>
        </div>
      </div>

      <footer className="footer">
        <div className="overlay" id="overlay" onClick={toggleFabMenu}></div>
        <div className="container">
          <div className="footer-content row">
            <div className="col-2">
              <a className="d-flex align-items-center flex-column" href="/home">
                <span className="img">
                  <img src={homeIcon} alt="home" />
                </span>
                <span>HOME</span>
              </a>
            </div>
            <div className="col-2">
              <a
                className="d-flex align-items-center flex-column"
                href="/searchInventory"
              >
                <span className="img">
                  <img
                    className="search"
                    src={searchIcon}
                    alt="search all"
                    width="18"
                  />
                </span>
                <span>SEARCH ALL</span>
              </a>
              <div className="wizardbox d-flex align-items-center">
                <img src={arrowDownIcon} alt="arrow" />
                <p>
                  if you don’t want to use the wizard you can always just enter
                  the information manually on our search page
                </p>
              </div>
            </div>
            <div className="col-2">
              <a
                className="d-flex align-items-center flex-column"
                href="/store"
              >
                <span className="img">
                  <img src={diskStoreIcon} alt="disc store" />
                </span>
                <span>DISC STORE</span>
              </a>
            </div>
            <div className="col-2">
              <a
                className="d-flex align-items-center flex-column"
                href="/courses"
              >
                <span className="img">
                  <img src={coursesIcon} alt="courses" />
                </span>
                <span>COURSES</span>
              </a>
            </div>
          </div>
        </div>
      </footer>

      <div className="fab-container" onClick={toggleFabMenu} id="fabContainer">
        <button className="fab" id="fab">
          <img
            src={appCenterBtnLogoIcon}
            alt="Disc Rescue Network Logo"
            className="logo-fab"
            id="fabLogo"
          />
          <span id="fabClose" style={{ display: "none", zIndex: 15 }}>
            X
          </span>
        </button>
      </div>
      <div id="popup" className="popup">
        <div className="popup-content">
          <span className="close" id="close">
            &times;
          </span>
          <h2>
            This is a <span className="redText">Demo</span>
          </h2>

          <p style={{ fontSize: "18px", textAlign: "left" }}>
            Hi There! As this is a demo application, there is not real data
            within. As you go through the flow, we will tell you what to input
            to trigger a "found your disc!" popup. <br />
            <br />
            For this first step, select <span className="redText">NJ</span> &
            <span className="redText">Tranqulity Trails</span> for best results.
          </p>
          <button id="findMyDisc" onClick={closePopup}>
            Let's Do it!
          </button>
        </div>
      </div>
    </div>
  );
};

export default RescueFlow;
