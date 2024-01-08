import React, { useState } from "react";
import "../styles/rescueFlowStep5.css";
import logoImage from "../assets/logo.png";
import chatIcon from "../assets/chat.svg";
import homeIcon from "../assets/home.png";
import searchIcon from "../assets/search.png";
import diskStoreIcon from "../assets/disk-store.png";
import fabLogoIcon from "../assets/app_center_btn_logo.png";
import coursesIcon from "../assets/courses.png";
import { useNavigate } from "react-router-dom";
import { SvgIcon } from "@mui/material";
import SearchCourses from "./SearchCourses";
import "../styles/globals.css";

const RescueFlowStep5 = () => {
  const navigate = useNavigate();
  // State variables
  const [colorInput, setColorInput] = useState("");
  const [fabMenuOpen, setFabMenuOpen] = useState(false);

  // Event handler functions
  const goBack = () => {
    // Logic for going back
  };

  const refresh = () => {
    // Logic for refresh
  };

  const searchDiscs = () => {
    navigate("/rescueFlowFailure");
  };

  const skipStep = () => {
    navigate("/rescueFlowFailure");
  };

  const toggleFabMenu = () => {
    setFabMenuOpen(!fabMenuOpen);
  };

  const reportLostDisc = () => {};
  const requestCourse = () => {};
  const openSettings = () => {};
  const handleSkipStep = () => {};
  const handleOpenInventory = () => {};

  // Add more event handlers and logic as needed

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

          <div className="d-flex align-items-center flex-column text-center mb-3">
            <img
              className="weblogo"
              src={logoImage}
              alt="logo"
              onClick={refresh}
            />
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
              5 <span className="overtext">/ 5</span>
            </h3>
          </div>

          <h3 className="mt-3 mb-3 text-white text-center mb-3 where">
            Shoot for the <span className="missingtext-blue">Moon</span>.
            <span className="line-break"></span>
            <span className="smaller-text">
              Last minute hail mary to save the flow...
            </span>
          </h3>

          <div
            className="col-10 pe-0 mb-4 mt-4"
            style={{ padding: 2, margin: "auto", textAlign: "center" }}
          >
            <span
              className="m-0 text-white fw-light"
              style={{ fontSize: "16px" }}
            >
              *Enter Gold to simulate
            </span>
            <input
              type="text"
              className="form-control"
              id="colorInput"
              placeholder="What Color Is it?!"
              style={{ maxWidth: "400px" }}
              pattern="[a-zA-Z-]+"
              value={colorInput}
              onChange={(e) => setColorInput(e.target.value)}
            />
          </div>

          <button className="stepbutton text-white mb-3" onClick={searchDiscs}>
            Show me the discs
          </button>
          <div className="pb-5">
            <button className="rememberbtn fw-light" onClick={skipStep}>
              This is just sad now
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
              Report <br />
              Lost Disc
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
        <div
          className="overlay"
          id="overlay"
          onClick={() => {
            /* toggleFabMenu logic here */
          }}
        ></div>
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
          {/* Additional footer content here if needed */}
        </div>
      </footer>

      <div
        className="fab-container"
        onClick={() => {
          /* toggleFabMenu logic here */
        }}
        id="fabContainer"
      >
        <button className="fab" id="fab">
          <img
            src={fabLogoIcon}
            alt="Disc Rescue Network Logo"
            className="logo-fab"
            id="fabLogo"
          />
          <span id="fabClose" style={{ display: "none", zIndex: 15 }}>
            X
          </span>
          {/* Hidden by default */}
        </button>
      </div>

      <div className="popup" id="popup">
        <div className="popup-content">
          <span className="close" id="close">
            &times;
          </span>
          <h2>
            WHAT IS YOUR <span className="redText">PREFERRED</span> METHOD OF
            COMMUNICATION?
          </h2>
          <p>
            If you wrote your phone number on your disc, we recommend using this
            as your preferred method.
          </p>
          <div className="d-flex flex-row" style={{ width: "80%" }}>
            <button
              id="choosePhone"
              className="secondary-btn"
              style={{ marginRight: "10px" }}
              onClick={() => {
                /* handleChoosePhone logic here */
              }}
            >
              Phone
            </button>
            <button
              id="chooseEmail"
              className="warning-btn"
              onClick={() => {
                /* handleChooseEmail logic here */
              }}
            >
              Email
            </button>
          </div>
        </div>
      </div>

      <div
        className="popup"
        id="popup-verify"
        style={{ flexDirection: "column" }}
      >
        <div
          className="popup-content"
          id="popup-verify-content"
          style={{ margin: "unset", padding: "10px 5px" }}
        >
          {/* <span className="close" id="close" onClick={closePopupVerify}>&times;</span> */}
          <div
            className="course-section-popup"
            style={{ margin: "0px", width: "100%" }}
          >
            <div
              className="row"
              id="discInfoVerify"
              style={{
                color: "var(--primary-black)",
                margin: "0px",
                padding: "0px",
                width: "100%",
              }}
            >
              {/* Disc info will be dynamically populated here */}
            </div>
          </div>
          <div id="loading-bar" className="loading-bar"></div>
        </div>

        <div
          className="d-flex justify-content-center align-items-center mt-2 mb-2"
          style={{
            flexDirection: "column",
            width: "100%",
            background: "transparent",
            justifyContent: "flex-start",
            margin: "auto",
          }}
        >
          <button
            className="stepbutton text-white mt-2 mb-3"
            onClick={handleSkipStep}
          >
            None of these are mine
          </button>
          <button
            className="rememberbtn fw-light"
            style={{ width: "65%", maxWidth: "unset" }}
            onClick={handleOpenInventory}
          >
            Let me see more of these type of discs
          </button>
        </div>
      </div>
    </div>
  );
};

export default RescueFlowStep5;
