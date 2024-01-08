import React from "react";
import { useNavigate } from "react-router-dom";
import logoImage from "../assets/logo.png";
import chatIcon from "../assets/chat.svg";
import homeIcon from "../assets/home.png";
import searchIcon from "../assets/search.png";
import diskStoreIcon from "../assets/disk-store.png";
import coursesIcon from "../assets/courses.png";
import appCenterBtnLogoIcon from "../assets/app_center_btn_logo.png";

import "../styles/rescueFlowFailure.css";
import "../styles/globals.css";

const ResuceFailure = () => {
  const navigate = useNavigate();
  // Define any necessary functions
  const goBack = () => {
    // Logic for goBack
  };

  const refresh = () => {
    // Logic for refresh
  };

  const reportLostDisc = () => {
    navigate("/ReportLostDisc");
  };

  const goToInventory = () => {
    navigate("/SearchInventory");
  };

  const requestCourse = () => {
    // Logic for requestCourse
  };

  const openSettings = () => {
    // Logic for openSettings
  };

  const toggleFabMenu = () => {
    // Logic for toggleFabMenu
  };

  const closeParameterModal = () => {
    // Logic for closeParameterModal
  };

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
              0/10 RESCUE FLOW <span className="fw-light">wizard</span>
            </h3>
            <h2 className="m-0 mt-2 text-white">
              So maybe it's not <span className="overtext">Perfect</span>.
            </h2>
          </div>
          <p
            className="text-white px-2 mt-4 mb-4"
            style={{ fontWeight: "unset" }}
          >
            But it never gives up. Submit the information you used in the wizard
            to report your disc lost and be notified if the wizard finds it, so
            it can reunite you.
          </p>
          <button
            className="failurebutton text-white mb-4 mt-2"
            onClick={reportLostDisc}
          >
            Report my Disc Lost and Help the Wizard
          </button>
          <div className="pb-5">
            <button className="rememberbtn fw-light" onClick={goToInventory}>
              Fine, I'll do it myself
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
            <i className="fa-regular fa-flag" onClick={reportLostDisc}></i>
          </div>
          <div className="fab-menu-item">
            <a
              className="fab-menu-item-text"
              href="/requestCourse.html"
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
              href="/settings.html"
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
                  <img src={diskStoreIcon} alt="disk store" />
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
      {/* Modal Dialog */}
      <div id="parameterModal" className="modal">
        <div className="modal-content">
          <span className="close" onClick={closeParameterModal}>
            &times;
          </span>
          <h2>Parameters</h2>
          <div id="parameterList">
            {/* Parameters list will be populated here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResuceFailure;
