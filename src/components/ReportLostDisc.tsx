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

  const [color, setColor] = useState("COLOR"); // Default value
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [otherColor, setOtherColor] = useState("");
  const [brand, setBrand] = useState("BRAND"); // Default value
  const [otherBrand, setOtherBrand] = useState("");
  const [state, setState] = useState("STATE"); // Default value
  const [course, setCourse] = useState("SELECT A COURSE"); // Default value

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
    navigate("/settings");
  };

  const toggleFabMenu = () => {
    // Logic to toggle FAB menu
  };

  const verifyInfo = () => {
    navigate("/reportLostDiscSuccess");
  };

  const closeParameterModal = () => {
    // Logic to close popup
  };

  const submitDisc = () => {
    // Logic to submit disc
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
              Enter The
              <span
                className="fw-light"
                style={{ fontWeight: 300, fontSize: "3rem" }}
              >
                Network
              </span>
            </h3>
          </div>

          <div
            className="row mt-2 mb-2 select-box"
            style={{ flexWrap: "nowrap" }}
          >
            <div className="col-4 pe-0 arrow one" style={{ padding: 0 }}>
              <select
                id="inputInitial"
                className="form-select"
                style={{ height: "55px" }}
                // onChange={(e) => setInitial(e.target.value)}
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
            <div className="col-8" style={{ padding: 0, marginLeft: "10px" }}>
              <input
                type="text"
                className="form-control"
                id="inputName"
                placeholder="Last Name"
                pattern="[a-zA-Z\-]+"
                style={{
                  height: "55px",
                  maxWidth: "1080px",
                  width: "100%",
                }}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>

          <div
            className="row mt-2 mb-2 select-box"
            id="brandOtherInput"
            style={{ display: "none", flexWrap: "nowrap" }}
          >
            <div className="col-4 pe-0 arrow one" style={{ padding: 0 }}>
              <select
                id="colorList"
                className="form-select"
                style={{ height: "55px" }}
                value={color}
                onChange={(e) => setColor(e.target.value)}
              >
                <option value="COLOR">COLOR</option>
                {/* Additional color options here */}
              </select>
            </div>
            <div
              className="col-8 pe-0"
              style={{ padding: 0, marginLeft: "10px" }}
            >
              <input
                type="tel"
                className="form-control"
                id="inputPhone"
                style={{
                  height: "55px",
                  maxWidth: "1080px",
                  width: "100%",
                  display: phoneNumber ? "block" : "none",
                }}
                placeholder="Phone Number Written On the Disc"
                inputMode="numeric"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              <input
                type="email"
                className="form-control"
                id="inputEmail"
                style={{
                  height: "55px",
                  maxWidth: "1080px",
                  width: "100%",
                  display: email ? "block" : "none",
                }}
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div
            className="row mt-2 mb-2 select-box"
            style={{ padding: 0, flexWrap: "nowrap" }}
          >
            <div className="col-12 pe-0" style={{ padding: 0 }}>
              <input
                type="text"
                className="form-control"
                id="inputOtherColor"
                placeholder="Enter other color"
                value={otherColor}
                onChange={(e) => setOtherColor(e.target.value)}
              />
            </div>
          </div>

          <div
            className="row mt-2 mb-2 select-box"
            style={{ padding: 0, flexWrap: "nowrap" }}
          >
            <div className="col-4 pe-0 arrow one" style={{ padding: 0 }}>
              <select
                id="brandList"
                className="form-select"
                style={{ height: "55px" }}
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              >
                <option value="BRAND">BRAND</option>
                {/* Additional brand options here */}
              </select>
            </div>

            <div
              className="col-8 pe-0"
              style={{ padding: 0, marginLeft: "10px" }}
            >
              <input
                type="text"
                className="form-control placeholder-text"
                id="inputDiscName"
                placeholder="Enter Disc Name"
                style={{
                  height: "55px",
                  maxWidth: "1080px",
                  width: "100%",
                  textAlign: "left",
                }}
                value={discName}
                onChange={(e) => setDiscName(e.target.value)}
              />
            </div>
          </div>

          <div
            className="row mt-2 mb-2 select-box"
            id="brandOtherInput"
            style={{ display: "none", flexWrap: "nowrap" }}
          >
            <div className="col-12 pe-0" style={{ padding: 0 }}>
              <input
                type="text"
                className="form-control"
                placeholder="Enter other brand"
                id="inputOtherBrand"
                value={otherBrand}
                onChange={(e) => setOtherBrand(e.target.value)}
              />
            </div>
          </div>

          <div
            className="row mt-2 mb-2 select-box"
            style={{ padding: 0, flexWrap: "nowrap" }}
          >
            <div className="col-4 pe-0 arrow one" style={{ padding: 0 }}>
              <select
                id="inputState"
                className="form-select"
                style={{ height: "55px" }}
                value={state}
                onChange={(e) => setState(e.target.value)}
              >
                <option value="STATE">STATE</option>
                {/* Additional state options here */}
              </select>
            </div>

            <div
              className="col-8 arrow"
              style={{ padding: 0, marginLeft: "10px" }}
            >
              <select
                id="inputCourse"
                className="form-select"
                style={{ height: "55px", maxWidth: "1080px", width: "100%" }}
                value={course}
                onChange={(e) => setCourse(e.target.value)}
              >
                <option value="SELECT A COURSE">SELECT A COURSE</option>
                {/* Additional course options here */}
              </select>
            </div>
          </div>
          <button
            className="newsletterButton text-white mt-3 mb-3"
            style={{ width: "85%", height: "55px", marginLeft: "5px" }}
            onClick={verifyInfo}
          >
            Enter your disc into the rescue network
          </button>
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

      {/* Popups */}
      <div id="popup" className="popup">
        {/* Popup content here... */}
      </div>

      <div id="popup-verify" className="popup">
        {/* Popup verify content here... */}
      </div>
    </div>
  );
};

export default ReportLostDisc;
