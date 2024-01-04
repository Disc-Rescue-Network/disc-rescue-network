import React, { useState } from "react";
import logoImage from "../assets/logo.png";
import chatIcon from "../assets/chat.svg";
import homeIcon from "../assets/home.png";
import searchIcon from "../assets/search.png";
import diskStoreIcon from "../assets/disk-store.png";
import coursesIcon from "../assets/courses.png";
import fabLogoIcon from "../assets/app_center_btn_logo.png";
import { useNavigate } from "react-router-dom";

const RescueFlowStep3 = () => {
  const navigate = useNavigate();

  const [initial, setInitial] = useState("");
  const [lastName, setLastName] = useState("");

  const handleInitialChange = () => {
    setInitial("");
  };

  const handleLastNameChange = () => {
    setLastName("");
  };

  // Define your event handlers here
  const goBack = () => {
    // Logic for goBack
  };

  const refresh = () => {
    // Logic for refresh
  };

  const openInventory = () => {
    // Logic for refresh
  };

  const toggleFabMenu = () => {
    // Logic for refresh
  };

  const searchName = () => {
    navigate("/rescueFlow4");
  };

  const skipStep = () => {
    // Logic for skipStep
  };

  const onReportLostDisc = () => {
    // Logic for skipStep
  };

  const onRequestCourse = () => {
    // Logic for skipStep
  };

  const onOpenSettings = () => {
    // Logic for skipStep
  };

  // Define more event handlers as needed

  return (
    <div>
      <section className="main-section text-center">
        <div className="container">
          <i
            className="fa fa-arrow-left"
            aria-hidden="true"
            onClick={goBack}
            style={{
              position: "absolute",
              top: "30px",
              left: "20px",
              fontSize: "30px",
              color: "white",
              padding: "5px",
            }}
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

          <div>
            <div className="rescue d-flex align-items-center flex-column text-center mb-2">
              <h3 className="m-0 text-white">
                RESCUE FLOW <span className="fw-light">wizard</span>
              </h3>
              <h3 className="m-0 text-white">
                3 <span className="overtext">/ 5</span>
              </h3>
            </div>

            <h3 className="mt-3 text-white text-center mb-3 where">
              Throw and a <span className="missingtext-blue">Miss</span>.
              <span className="line-break"></span>
              <span className="smaller-text">
                Not to worry, Let's keep searching
              </span>
            </h3>

            <div
              className="row mb-4 select-box d-flex justify-content-center align-items-center"
              style={{ height: "100%", width: "100%" }}
            >
              <span
                className="m-0 text-white fw-light"
                style={{ fontSize: "16px" }}
              >
                *Enter J. Doe to simulate
              </span>
              <div className="col-4 pe-0 arrow one">
                <select
                  id="inputInitial"
                  className="form-select"
                  value={initial}
                  onChange={handleInitialChange}
                >
                  <option value="" disabled selected>
                    First Initial
                  </option>
                  {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((letter) => (
                    <option key={letter} value={letter}>
                      {letter}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-8 pe-0" style={{ maxWidth: "60%" }}>
                <input
                  type="text"
                  className="form-control"
                  id="inputName"
                  placeholder="Enter Last Name"
                  pattern="[a-zA-Z\-]+"
                  value={lastName}
                  onChange={handleLastNameChange}
                />
              </div>
            </div>
          </div>

          <button className="stepbutton text-white mb-3" onClick={searchName}>
            Let's try this again
          </button>
          <div className="pb-5">
            <button className="rememberbtn fw-light" onClick={skipStep}>
              Didn't write one
            </button>
          </div>
        </div>
      </section>

      <div className="fab-menu-container" id="fabMenuContainer">
        <div className="fab-menu" id="fabMenu">
          <div className="fab-menu-item">
            <a
              className="fab-menu-item-text-left"
              href="/reportLostDisc.html"
              style={{ textDecoration: "none" }}
            >
              Report <br /> Lost Disc
            </a>
            <i className="fa-regular fa-flag" onClick={onReportLostDisc}></i>
          </div>
          <div className="fab-menu-item">
            <a
              className="fab-menu-item-text"
              href="/requestCourse.html"
              style={{ textDecoration: "none" }}
            >
              Request a Course
            </a>
            <i
              className="fa-solid fa-location-dot"
              onClick={onRequestCourse}
            ></i>
          </div>
          <div className="fab-menu-item">
            <i className="fa-solid fa-gear" onClick={onOpenSettings}></i>
            <a
              className="fab-menu-item-text-right"
              href="/settings.html"
              style={{ textDecoration: "none" }}
            >
              Settings
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="overlay" id="overlay" onClick={toggleFabMenu}></div>
        <div className="container">
          <div className="footer-content row">
            <div className="col-2">
              <a
                className="d-flex align-items-center flex-column"
                href="/home.html"
              >
                <span className="img">
                  <img src={homeIcon} alt="home" />
                </span>
                <span>HOME</span>
              </a>
            </div>
            <div className="col-2">
              <a
                className="d-flex align-items-center flex-column"
                href="/searchInventory.html"
              >
                <span className="img">
                  <img
                    className="search"
                    src={searchIcon}
                    alt="search"
                    width="18"
                  />
                </span>
                <span>SEARCH ALL</span>
              </a>
            </div>
            <div className="col-2">
              <a
                className="d-flex align-items-center flex-column"
                href="/store.html"
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
                href="/courses.html"
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

      {/* FAB Button */}
      <div className="fab-container" onClick={toggleFabMenu} id="fabContainer">
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
        </button>
      </div>

      {/* Popup Verify */}
      <div
        id="popup-verify"
        className="popup"
        style={{ flexDirection: "column" }}
      >
        <div
          className="popup-content"
          id="popup-verify-content"
          style={{ margin: "unset", padding: "10px 5px" }}
        >
          {/* ... Popup content */}
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
            onClick={skipStep}
          >
            None of these are mine
          </button>
          <button
            className="rememberbtn fw-light"
            style={{ width: "65%", maxWidth: "unset" }}
            onClick={openInventory}
          >
            Let me see more of these type of discs
          </button>
        </div>
      </div>
    </div>
  );
};

export default RescueFlowStep3;
