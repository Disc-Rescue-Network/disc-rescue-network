import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import searchIcon from "../assets/search.png";
import drnAppMainIcon from "../assets/logo.png";
import chatSvg from "../assets/chat.svg";
import roseIcon from "../assets/rose-icon.png";
import homeIcon from "../assets/home.png";
import diskStoreIcon from "../assets/disk-store.png";
import coursesIcon from "../assets/courses.png";
import appCenterBtnLogoIcon from "../assets/app_center_btn_logo.png";
import "../styles/globals.css";

const Courses = () => {
  const [courseInputValue, setCourseInputValue] = useState("");
  const [stateInputValue, setStateInputValue] = useState("");
  const navigate = useNavigate();

  const [isFabMenuActive, setIsFabMenuActive] = useState(false);
  const toggleFabMenu = () => {
    setIsFabMenuActive(!isFabMenuActive);
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

  const courses = [
    { id: 1, name: ",SELECT A COURSE", location: ",SELECT A COURSE" },
    { id: 2, name: "Course A", location: "Location A" },
    { id: 3, name: "Course B", location: "Location B" },
    { id: 4, name: "Course C", location: "Location C" },
    { id: 5, name: "Course D", location: "Location D" },
  ];

  const states = [
    { id: 1, abbr: "STATE", name: "STATE" },
    { id: 2, abbr: "NJ", name: "New Jersey" },
    { id: 3, abbr: "NY", name: "New York" },
    { id: 4, abbr: "CA", name: "California" },
    { id: 5, abbr: "FL", name: "Florida" },
  ];

  const goToRescueFlow = () => {
    navigate("/rescueFlow");
  };

  const searchAllCourses = () => {
    navigate("/courses");
  };

  const searchCourse = () => {
    console.log("Search for " + stateInputValue + ", " + courseInputValue);
    navigate(`/searchCourse?course=${encodeURIComponent(courseInputValue)}`);
  };

  const goBack = () => {
    navigate(-1);
  };

  const refresh = () => {
    navigate("/");
  };

  const buttonStyle = {
    padding: "16px 8px",
    fontSize: "16px",
    maxWidth: "80%",
    width: "80%", // The `!important` is not directly supported in inline styles in React.
  };

  return (
    <>
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
              src={drnAppMainIcon}
              alt="Disc Rescue Network Logo"
              className="logo"
              onClick={refresh}
            />

            <div className="chat-box d-flex align-items-center mt-3">
              <img className="me-2" src={chatSvg} alt="chat" />
              <h4 className="m-0 me-2 text-white">OPT IN STATUS</h4>
              <h4 className="m-0 confirmd">CONFIRMED</h4>
            </div>
          </div>

          <div className="rescue d-flex align-items-center flex-column text-center mt-5 mb-0">
            <h3 className="m-0 text-white" style={{ fontSize: "3rem" }}>
              Choose Your
              <span
                className="fw-light"
                style={{ fontWeight: 300, fontSize: "3rem" }}
              >
                Course
              </span>
            </h3>
          </div>

          <h3
            className="mt-0 mb-6 text-white text-center where"
            style={{ fontSize: "2.2rem" }}
          >
            Where to
            <span className="missingtext" style={{ fontSize: "2.2rem" }}>
              Search?
            </span>
          </h3>

          <div className="row mt-5 mb-3 select-box" style={{ maxWidth: "80%" }}>
            {/* State Dropdown */}
            <div
              className="col-4 pe-0 arrow one"
              style={{ paddingLeft: "0px" }}
            >
              <select
                id="inputState"
                value={stateInputValue}
                onChange={(e) => setStateInputValue(e.target.value)}
                className="form-select"
              >
                {/* Populate state options dynamically */}
                {states.map((state) => (
                  <option>{state.abbr}</option>
                ))}
              </select>
            </div>

            {/* Course Dropdown */}
            <div className="col-8 pe-0 arrow">
              <select
                id="inputCourse"
                value={courseInputValue}
                onChange={(e) => setCourseInputValue(e.target.value)}
                className="form-select"
              >
                {/* Populate course options dynamically */}
                {courses.map((course) => (
                  <option>{course.name}</option>
                ))}
              </select>
            </div>
          </div>
          <button
            className="stepbutton text-white mt-3 mb-3"
            style={buttonStyle}
            onClick={searchCourse}
          >
            Search all discs at the selected course
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
              onClick={(e) => {
                e.preventDefault();
                reportLostDisc();
              }}
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
              onClick={(e) => {
                e.preventDefault();
                requestCourse();
              }}
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
              onClick={(e) => {
                e.preventDefault();
                openSettings();
              }}
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
            {/* Footer links */}
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
          {isFabMenuActive ? (
            <span id="fabClose" style={{ display: "block", zIndex: 15 }}>
              X
            </span>
          ) : (
            <img
              src={appCenterBtnLogoIcon}
              alt="Disc Rescue Network Logo"
              className="logo-fab"
              id="fabLogo"
            />
          )}
        </button>
      </div>
    </>
  );
};

export default Courses;
