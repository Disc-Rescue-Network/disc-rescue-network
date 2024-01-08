import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/globals.css";
import logoImage from "../assets/logo.png";
import chatIcon from "../assets/chat.svg";
import homeIcon from "../assets/home.png";
import searchIcon from "../assets/search.png";
import diskStoreIcon from "../assets/disk-store.png";
import coursesIcon from "../assets/courses.png";
import appCenterBtnLogoIcon from "../assets/app_center_btn_logo.png";
import fabLogoIcon from "../assets/app_center_btn_logo.png";
import "../styles/rescueFlowFailure.css";
import "../styles/globals.css";

const ReportLostDiscSuccess = () => {
  const navigate = useNavigate();

  const refresh = () => {
    navigate("/");
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

  const toggleFabMenu = () => {
    // Logic to toggle FAB menu
  };

  return (
    <section className="main-section text-center">
      <div className="container" id="container">
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
          // onClick={handleGoBack} // Define the handleGoBack function for this
        ></i>
        <div className="d-flex align-items-center flex-column text-center mb-2">
          <img
            className="weblogo"
            src={logoImage}
            alt="logo"
            onClick={refresh}
          />
          <div className="chat-box d-flex align-items-center mt-3">
            <img className="me-2" src={chatIcon} alt="chat" />
            <h4 className="m-0 me-2 text-white">OPT IN STATUS</h4>
            <h4 className="m-0 confirmed">CONFIRMED</h4>
          </div>{" "}
        </div>
        <div className="rescue d-flex align-items-center flex-column text-center mt-0 mb-0">
          <h2
            className="m-0 text-white"
            style={{
              fontSize: "3rem",
              color: "var(--primary-green) !important",
            }}
          >
            NAILED
            <span
              className="fw-light"
              style={{
                fontWeight: "300 !important",
                fontSize: "3rem",
                color: "var(--primary-white) !important",
              }}
            >
              IT!
            </span>
          </h2>
        </div>
        <div className="d-flex align-items-center flex-column text-center mt-4 mb-0 p-3">
          <h3
            className="m-0 text-white"
            style={{
              fontSize: "1.5rem",
              color: "var(--primary-white) !important",
            }}
          >
            Your disc has been entered into the
            <span className="missingtext">Rescue Network</span> and you've been
            opted in to receiving messages. <br />
            <br />
            Our Volunteers will keep their eyes open and if your disc is
            recovered, we will let you know ASAP and you can set up your claim.
          </h3>{" "}
        </div>
      </div>

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
            <i className="fa-regular fa-flag" onClick={onReportLostDisc}></i>
          </div>
          <div className="fab-menu-item">
            <a
              className="fab-menu-item-text"
              href="/requestCourse"
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
              href="/settings"
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
    </section>
  );
};

export default ReportLostDiscSuccess;
