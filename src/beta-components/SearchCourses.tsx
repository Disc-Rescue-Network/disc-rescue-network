import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import chatIcon from "../assets/chat.svg";
import homeIcon from "../assets/home.png";
import searchIcon from "../assets/search.png";
import diskStoreIcon from "../assets/disk-store.png";
import coursesIcon from "../assets/courses.png";
import appCenterBtnLogoIcon from "../assets/app_center_btn_logo.png";
import { Hidden } from "@mui/material";
import zIndex from "@mui/material/styles/zIndex";

const SearchCourses = () => {
  const navigate = useNavigate();
  const [isFabMenuActive, setIsFabMenuActive] = useState(false);
  const [sortAsc, setSortAsc] = useState(false);
  // Add more states and logic as needed

  const goBack = () => navigate(-1);
  const refresh = () => navigate("/"); // Or other refresh logic
  const reportLostDisc = () => navigate("/reportLostDisc");
  const requestCourse = () => navigate("/requestCourse");
  const openSettings = () => navigate("/settings");
  const toggleFabMenu = () => setIsFabMenuActive(!isFabMenuActive);
  const loadMoreDiscs = () => {};

  const initiallyOpen = "";

  const [isSortedDesc, setIsSortedDesc] = useState(false);
  const [isAccordionOneOpen, setIsAccordionOneOpen] = useState(true);
  const [isAccordionTwoOpen, setIsAccordionTwoOpen] = useState(true);
  const [isAccordionThreeOpen, setIsAccordionThreeOpen] = useState(true);
  const [isOpen, setIsOpen] = useState(initiallyOpen);

  //   const toggleAccordion = () => {
  //     setIsOpen(!isOpen);
  //   };

  const handleSortChange = () => {
    setIsSortedDesc(!isSortedDesc);
  };

  const toggleAccordion = (accordionNumber: number) => {
    if (accordionNumber === 1) {
      setIsAccordionOneOpen(!isAccordionOneOpen);
    } else if (accordionNumber === 2) {
      setIsAccordionTwoOpen(!isAccordionTwoOpen);
    } else if (accordionNumber === 3) {
      setIsAccordionThreeOpen(!isAccordionThreeOpen);
    }
  };

  const filterSubmitted = () => {
    // Implement filter submit logic
  };

  const resetFilters = () => {
    // Implement filter reset logic
  };

  const MyAccordion = () => {
    return (
      <div className="accordion">
        {/* <AccordionItem title="Disc Color" initiallyOpen={true}> */}
        <ul id="colorList">{/* Dynamic content for disc colors */}</ul>
        {/* </AccordionItem> */}

        {/* <AccordionItem title="Disc Name"> */}
        <ul id="discList">{/* Dynamic content for disc names */}</ul>
        {/* </AccordionItem> */}
      </div>
    );
  };

  return (
    <div style={{ overflow: "hidden" }}>
      <div
        className="main-wrapper"
        style={{ height: "100%", width: "100%", overflow: "hidden" }}
      >
        <section
          className="main-section text-center"
          style={{ paddingBottom: "20px", overflow: "hidden" }}
        >
          <div className="container" style={{ overflow: "hidden" }}>
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
              onClick={goBack}
            ></i>

            <div className="d-flex align-items-center flex-column text-center mb-2">
              <img
                className="weblogo"
                src={logo}
                alt="logo"
                onClick={refresh}
              />
              <div className="chat-box d-flex align-items-center mt-1">
                <img className="me-2" src={chatIcon} alt="chat" />
                <h4 className="m-0 me-2 text-white">OPT IN STATUS</h4>
                <h4 className="m-0 confirmd">CONFIRMED</h4>
              </div>
            </div>

            <div className="rescue d-flex align-items-center flex-column text-center mb-2">
              <h3 className="m-0 text-white">
                ALL LOST <span className="fw-light">DISCS</span>
              </h3>
              <p className="course-name">Course Name Here</p>{" "}
              {/* Dynamically update the course name */}
            </div>

            <div className="filter-button">
              <button className="filter-btn" onClick={goBack}>
                Filters
              </button>
            </div>

            <div className="course-section">
              <div className="row"></div>
              <div className="load-more">
                <a
                  href="javascript:void(0);"
                  onClick={loadMoreDiscs}
                  className="more-btn"
                >
                  Load More
                </a>
                <div className="no-more-discs" style={{ display: "none" }}>
                  That's all we have for now!
                </div>
              </div>
            </div>
          </div>
        </section>
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

      <div className="asidebar">
        <div className="sidebar-header">
          <h2>FILTER AND SORT</h2>
        </div>
        <div className="filter-body">
          <div className="sort-toggle">
            <label className="switch-label">Desc</label>
            <label className="switch">
              <input
                type="checkbox"
                id="sortToggle"
                // checked={isSortedDesc}
                // onChange={handleSortChange}
              />
              <span className="slider round"></span>
            </label>
            <label className="switch-label">Asc</label>
          </div>
          <div className="accordion" id="accordionExample">
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingOne">
                <button
                  className="accordion-button"
                  //   className={`accordion-button ${
                  //     isAccordionOneOpen ? "" : "collapsed"
                  //   }`}
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseOne"
                  aria-expanded="true"
                  aria-controls="collapseOne"
                  type="button"
                  //   onClick={() => toggleAccordion(1)}
                >
                  Disc Brand
                </button>
              </h2>
              <div
                className="accordion-collapse collapse show"
                // className={`accordion-collapse collapse ${
                //   isAccordionOneOpen ? "show" : ""
                // }`}
                id="collapseOne"
                aria-labelledby="headingOne"
              >
                <div className="accordion-body">
                  <ul id="brandList">{/* Dynamic content goes here */}</ul>
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingTwo">
                <button
                  className={`accordion-button 
                //   ${!isOpen ? "collapsed" : ""}`}
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseTwo"
                  aria-expanded="true"
                  aria-controls="collapseTwo"
                  type="button"
                  //   onClick={toggleAccordion}
                >
                  Disc Color
                </button>
              </h2>
              <div
                // className={`accordion-collapse collapse ${
                //   isOpen ? "show" : ""
                // }`}
                id="collapseTwo"
                className="accordion-collapse collapse show"
                aria-labelledby="headingTwo"
              >
                <div className="accordion-body">
                  <ul id="colorList">
                    {/* <!-- This is where the list items will be appended --> */}
                  </ul>
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingThree">
                <button
                  className="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseThree"
                  aria-expanded="true"
                  aria-controls="collapseThree"
                >
                  Disc Name
                </button>
              </h2>
              <div
                id="collapseThree"
                className="accordion-collapse collapse show"
                aria-labelledby="headingThree"
              >
                <div className="accordion-body">
                  <ul id="discList">
                    {/* <!-- This is where the list items will be appended --> */}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="filter-footer">
            <button className="filter-search" onClick={filterSubmitted}>
              Filter and Search
            </button>
            <button className="filter-reset" onClick={resetFilters}>
              Reset Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchCourses;
