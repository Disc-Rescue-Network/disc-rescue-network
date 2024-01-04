import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import chatIcon from "../assets/chat.svg";
import homeIcon from "../assets/home.png";
import searchIcon from "../assets/search.png";
import diskStoreIcon from "../assets/disk-store.png";
import coursesIcon from "../assets/courses.png";
import appCenterBtnLogoIcon from "../assets/app_center_btn_logo.png";

const Store = () => {
  const [contactInput, setContactInput] = useState("");
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const reportLostDisc = () => navigate("/reportLostDisc");
  const requestCourse = () => navigate("/requestCourse");
  const openSettings = () => navigate("/settings");
  const loadMoreDiscs = () => {};

  const [isFabMenuActive, setIsFabMenuActive] = useState(false);
  const toggleFabMenu = () => setIsFabMenuActive(!isFabMenuActive);

  const signUp = () => {
    // Logic for sign-up, handling the contact input
    // setShowError and setShowSuccess can be used based on the outcome
  };

  const navigate = useNavigate();
  const discs = [
    { id: 1, name: "Disc A", price: "15.99" },
    { id: 2, name: "Disc B", price: "18.50" },
    { id: 3, name: "Disc C", price: "12.85" },
    { id: 4, name: "Disc D", price: "20.50" },
    { id: 5, name: "Disc E", price: "15.65" },
    { id: 6, name: "Disc F", price: "17.50" },
    { id: 7, name: "Disc G", price: "16.75" },
  ];

  const goBack = () => {
    navigate(-1);
  };

  const refresh = () => {
    navigate("/");
  };

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

          <div className="d-flex align-items-center flex-column text-center mb-3">
            <img className="weblogo" src={logo} alt="logo" onClick={refresh} />
            <div className="chat-box d-flex align-items-center mt-3">
              <img className="me-2" src={chatIcon} alt="chat" />
              <h4 className="m-0 me-2 text-white">OPT IN STATUS</h4>
              <h4 className="m-0 confirmd">CONFIRMED</h4>
            </div>
          </div>

          <div className="rescue d-flex align-items-center flex-column text-center mb-2">
            <h1 className="m-0 text-white" style={{ fontSize: "3rem" }}>
              Coming Soon
            </h1>
          </div>

          <h4
            className="mt-3 text-white text-center mb-4 where"
            style={{ fontSize: "1.5rem" }}
          >
            Not all discs will be claimed, but they can still be rescued! The
            DRN Shop will bring quality, affordable discs for purchase.
            <br />
            <br />
            <span className="text-white">
              Get notified when we launch for
              <span
                style={{
                  textDecoration: "underline",
                  fontWeight: "bold",
                  color: "var(--secondary-blue)",
                }}
              >
                20% off
              </span>
              your first order!
            </span>
          </h4>

          <div
            className="d-flex align-items-center flex-column text-center mt-4 mb-2"
            style={{ width: "100%" }}
          >
            <div
              className="d-flex align-items-center flex-column text-center mb-0"
              style={{ width: "100%" }}
            >
              <input
                type="text"
                className="form-control"
                style={{ maxWidth: "610px" }}
                id="inputContact"
                placeholder="Phone Number or Email for Notification"
                // value={contactInput}
                // onChange={(e) => setContactInput(e.target.value)}
              />
              {/* {showError && ( */}
              <div id="error" style={{ color: "var(--primary-red)" }}>
                Error Message
              </div>
              {/* )} */}
              {/* {showSuccess && ( */}
              <div id="success" style={{ color: "var(--primary-green)" }}>
                Success! You are opted in for notifications.
              </div>
              {/* )} */}
              <button
                className="newsletterButton text-white mt-2 mb-3"
                onClick={signUp}
              >
                Get notified when the deals are live
              </button>
            </div>
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
    </div>
  );
};

export default Store;
