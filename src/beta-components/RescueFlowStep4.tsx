import React from "react";
import logoImage from "../assets/logo.png";
import chatIcon from "../assets/chat.svg";
import homeIcon from "../assets/home.png";
import searchIcon from "../assets/search.png";
import diskStoreIcon from "../assets/disk-store.png";
import coursesIcon from "../assets/courses.png";
import fabLogoIcon from "../assets/app_center_btn_logo.png";
import { useNavigate } from "react-router-dom";
import { SvgIcon } from "@mui/material";

const RescueFlowStep4 = () => {
  const navigate = useNavigate();

  // Event handler placeholders
  const goBack = () => {
    /* Logic for goBack */
  };
  const refresh = () => {
    /* Logic for refresh */
  };
  const searchDiscs = () => {
    navigate("/rescueFlow5");
  };
  const skipStep = () => {
    /* Logic for skipStep */
  };
  const toggleFabMenu = () => {
    /* Logic for skipStep */
  };
  const handleRequestCourse = () => {};
  const handleReportLostDisc = () => {};
  const handleOpenSettings = () => {};
  const onSkipStep = () => {};
  const onOpenInventory = () => {};

  return (
    <div>
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
          <div>
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
                4 <span className="overtext">/ 5</span>
              </h3>
            </div>

            <h3 className="mt-3 mb-2 text-white text-center mb-3 where">
              Let's Widen Our <span className="missingtext-blue">Stance</span>.
              <span className="line-break"></span>
              <span className="smaller-text">
                We probably just couldn't read the handwriting...
              </span>
            </h3>
            <span
              className="m-0 text-white fw-light"
              style={{ fontSize: "16px" }}
            >
              *Enter or Select Dynamic Discs to simulate
            </span>
          </div>

          <div className="input-dropdown-wrapper mt-1">
            <input
              type="text"
              id="inputBrand"
              placeholder="TYPE THE BRAND OF DISC"
            />
            <div className="circle-or">OR</div>
            <select
              id="selectBrand"
              aria-label="Choose a Brand"
              className="select-brand-dropdown"
            >
              <option value="" disabled selected>
                Select Brand
              </option>
              <option value="Discraft">Discraft</option>
              {/* More options here */}
            </select>
          </div>

          <button
            className="stepbutton text-white mb-3 mt-4"
            onClick={searchDiscs}
          >
            Show Me The Discs
          </button>
          <div className="pb-5">
            <button className="rememberbtn fw-light" onClick={skipStep}>
              Don't Know It
            </button>
          </div>
        </div>
      </section>
      <div className="fab-menu-container" id="fabMenuContainer">
        <div className="fab-menu" id="fabMenu">
          <div className="fab-menu-item">
            <a className="fab-menu-item-text-left" href="/reportLostDisc.html">
              Report <br /> Lost Disc
            </a>
            <i
              className="fa-regular fa-flag"
              onClick={handleReportLostDisc}
            ></i>
          </div>
          <div className="fab-menu-item">
            <a className="fab-menu-item-text" href="/requestCourse.html">
              Request a Course
            </a>
            <i
              className="fa-solid fa-location-dot"
              onClick={handleRequestCourse}
            ></i>
          </div>
          <div className="fab-menu-item">
            <i className="fa-solid fa-gear" onClick={handleOpenSettings}></i>
            <a className="fab-menu-item-text-right" href="/settings.html">
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
          {/* Hidden by default */}
        </button>
      </div>

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
          {/* You can add a close button if needed */}
          {/* <span className="close" id="close" onClick={onClosePopupVerify}>&times;</span> */}
          <div
            className="course-section-popup"
            style={{ margin: 0, width: "100%" }}
          >
            <div
              className="row"
              id="discInfoVerify"
              style={{
                color: "var(--primary-black)",
                margin: 0,
                padding: 0,
                width: "100%",
              }}
            >
              {/* disc info will be populated here */}
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
            onClick={onSkipStep}
          >
            None of these are mine
          </button>
          <button
            className="rememberbtn fw-light"
            style={{ width: "65%", maxWidth: "unset" }}
            onClick={onOpenInventory}
          >
            Let me see more of these type of discs
          </button>
        </div>
      </div>
    </div>
  );
};

export default RescueFlowStep4;
