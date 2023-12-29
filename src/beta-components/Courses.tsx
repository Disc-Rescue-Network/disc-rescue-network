import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import searchIcon from "../assets/search.png";
import drnAppMainIcon from "../assets/DRN_App_Main.png";
import roseIcon from "../assets/rose-icon.png";
import homeIcon from "../assets/home.png";
import diskStoreIcon from "../assets/disk-store.png";
import coursesIcon from "../assets/courses.png";
import appCenterBtnLogoIcon from "../assets/app_center_btn_logo.png";

const Courses = () => {
  const navigate = useNavigate();

  const [isFabMenuActive, setIsFabMenuActive] = useState(false);
  const toggleFabMenu = () => {
    setIsFabMenuActive(!isFabMenuActive);
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

  const goBack = () => {
    navigate(-1);
  };

  const refresh = () => {
    navigate("/");
  };

  return (
    <section className="main-section text-center">
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

      <div className="page-container">
        <div className="meta-containers">
          <div className="status">
            <i className="fa-solid fa-comment-dots status-icon"></i>
            <span className="status-text">OPT IN STATUS</span>
            <span className="status-code">CONFIRMED</span>
          </div>

          <div className="location">
            <div className="location-info">
              <i className="fa-solid fa-location-dot location-icon"></i>
              <span className="location-state">NO COURSE SELECTED</span>
            </div>
            <div className="location-change">CHANGE</div>
          </div>
        </div>

        <div className="logo-container">
          <img
            src={drnAppMainIcon}
            alt="Disc Rescue Network Logo"
            className="logo"
            onClick={refresh}
          />
        </div>

        {/* <div className="discs mt-2">
          <h2 className="sub-header">RECENTLY TURNED IN DISCS</h2>
          <div className="w-layout-grid grid-of-cards">
          </div>
        </div> */}
      </div>
      {/* <div className="courses-container">
        {courses.map((course) => (
          <div key={course.id} className="course">
            <h3>{course.name}</h3>
            <p>Location: {course.location}</p>
          </div>
        ))}
      </div> */}

      <div className="row mt-5 mb-3 select-box" style={{ maxWidth: "80%" }}>
        {/* State Dropdown */}
        <div className="col-4 pe-0 arrow one">
          <select id="inputState" className="form-select">
            {/* Populate state options dynamically */}
            {states.map((state) => (
              <option>{state.abbr}</option>
            ))}
          </select>
        </div>
        {/* Course Dropdown */}
        <div className="col-8 pe-0 arrow">
          <select id="inputCourse" className="form-select">
            {/* Populate course options dynamically */}
            {courses.map((course) => (
              <option>{course.name}</option>
            ))}
          </select>
        </div>
        <button
          className="stepbutton text-white mt-3 mb-3"
          id="fab"
          onClick={searchAllCourses}
        >
          Search all discs at the selected course
        </button>
      </div>

      <footer className="footer">
        <div className="overlay" id="overlay" onClick={toggleFabMenu}></div>
        <div className="container">
          <div className="footer-content row">
            {/* Footer links */}
            <div className="col-2">
              <a
                className="d-flex align-items-center flex-column"
                href="/home" // TODO Is this just a refresh?
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
    </section>
  );
};

export default Courses;
