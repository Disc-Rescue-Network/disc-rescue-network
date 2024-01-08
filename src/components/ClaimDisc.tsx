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

const ClaimDisc = () => {
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
  // Define state and event handlers here, if necessary
  // For example, const [initial, setInitial] = useState('');

  const goBack = () => {
    // Implement goBack logic
  };

  const verifyInfo = () => {
    navigate("/claimDiscSuccess");
  };

  return (
    <div className="emptyDiv">
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
            onClick={goBack}
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
              <h4 className="m-0 confirmd">CONFIRMED</h4>
            </div>
          </div>
          <div className="rescue d-flex align-items-center flex-column text-center mt-0 mb-0">
            <h3 className="m-0 text-white" style={{ fontSize: "3rem" }}>
              Let's Get Your
              <span
                className="fw-light"
                style={{ fontWeight: "300 !important", fontSize: "3rem" }}
              >
                Disc
              </span>
            </h3>
            <h4
              className="text-white px-0 mt-0 mb-4"
              style={{ fontWeight: "unset" }}
            >
              Just Enter Some <span className="overtext">Info</span>.
            </h4>
          </div>

          <div
            className="row mt-2 mb-2 select-box"
            style={{ flexWrap: "nowrap" }}
          >
            <div className="col-4 pe-0 arrow one" style={{ padding: "0px" }}>
              <select
                id="inputInitial"
                className="form-select"
                style={{ height: "55px !important" }}
              >
                <option selected>First Initial</option>
                <option>A</option>
                <option>B</option>
                <option>C</option>
                <option>D</option>
                <option>E</option>
                <option>F</option>
                <option>G</option>
                <option>H</option>
                <option>I</option>
                <option>J</option>
                <option>K</option>
                <option>L</option>
                <option>M</option>
                <option>N</option>
                <option>O</option>
                <option>P</option>
                <option>Q</option>
                <option>R</option>
                <option>S</option>
                <option>T</option>
                <option>U</option>
                <option>V</option>
                <option>W</option>
                <option>X</option>
                <option>Y</option>
                <option>Z</option>
              </select>
            </div>

            <div
              className="col-8"
              style={{ padding: "0px", paddingLeft: "10px !important" }}
            >
              <input
                type="text"
                className="form-control"
                id="inputName"
                placeholder="Last Name"
                pattern="[a-zA-Z\-]+"
                style={{
                  height: "55px !important",
                  maxWidth: "1080px !important",
                  width: "100% !important",
                }}
              />
            </div>
          </div>

          <div
            className="row mt-2 mb-2 select-box"
            style={{ flexWrap: "nowrap" }}
          >
            <div className="col-12 pe-0" style={{ padding: "0px" }}>
              <input
                type="tel"
                className="form-control"
                id="inputPhone"
                style={{
                  height: "55px !important",
                  maxWidth: "1080px !important",
                  width: "100% !important",
                  display: "none !important",
                }}
                placeholder="Phone Number Written On the Disc"
                inputMode="numeric"
              />
              <input
                type="email"
                className="form-control"
                id="inputEmail"
                style={{
                  height: "55px !important",
                  maxWidth: "1080px !important",
                  width: "100% !important",
                  display: "none !important",
                }}
                placeholder="Email Address"
              />
            </div>
          </div>

          <div
            className="row mt-2 mb-2 select-box"
            style={{ padding: "0px !important", flexWrap: "nowrap" }}
          >
            <div className="col-12 pe-0 arrow one" style={{ padding: "0px" }}>
              <select
                id="inputPickupLocation"
                className="form-select"
                style={{ height: "55px !important" }}
              >
                <option selected>Choose a Pickup Location</option>
              </select>
            </div>
          </div>
          <div
            className="row mt-2 mb-2 select-box"
            style={{ padding: "0px !important", flexWrap: "nowrap" }}
          >
            <button
              className="newsletterButton text-white mt-3 mb-3"
              style={{ width: "100%", height: "55px !important" }}
              onClick={verifyInfo}
            >
              Schedule your Disc Pickup
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
    </div>
  );
};

export default ClaimDisc;
