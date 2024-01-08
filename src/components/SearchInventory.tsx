import React, { useState, useEffect } from "react";
import logo from "../assets/logo.png";
import chatIcon from "../assets/chat.svg";
import homeIcon from "../assets/home.png";
import searchIcon from "../assets/search.png";
import diskStoreIcon from "../assets/disk-store.png";
import coursesIcon from "../assets/courses.png";
import appCenterBtnLogoIcon from "../assets/app_center_btn_logo.png";
import { useNavigate } from "react-router-dom";
import { found_discs } from "./discs";
import { Disc } from "../App";
import "../styles/globals.css";
import ClaimDisc from "./ClaimDisc";
import courseIcon from "../assets/course-icon.png";
import courseIcon1 from "../assets/course-icon1.png";
import courseIcon2 from "../assets/course-icon2.png";
import backetIcon from "../assets/basket_icon.png";
import roseIcon from "../assets/rose-icon.png";

const SearchInventory = () => {
  const navigate = useNavigate();
  const requestCourse = () => navigate("/requestCourse");
  const openSettings = () => navigate("/settings");

  const [discs, setDiscs] = useState<Disc[]>([]); // Use the Disc interface
  const [filterBrand, setFilterBrand] = useState<string[]>([]);
  const [filterColor, setFilterColor] = useState<string[]>([]);
  const [filterDisc, setFilterDisc] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    // setDiscs(found_discs);
  }, []);

  const [discArray, setDiscArray] = useState<Disc[]>([]);
  useEffect(() => {
    setDiscArray(found_discs);
    console.log(found_discs);
  }, []);
  useEffect(() => {
    console.log(discArray);
  }, [discArray]);

  const loadDiscs = () => {
    // Apply filters and sorting here
    let filteredDiscs = discs.filter(
      (disc) =>
        (!filterBrand.length || filterBrand.includes(disc.brand)) &&
        (!filterColor.length || filterColor.includes(disc.color)) &&
        (!filterDisc.length || filterDisc.includes(disc.disc))
    );

    // Apply sorting based on sortOrder
    // if (sortOrder === "asc") {
    //   filteredDiscs.sort(
    //     (a, b) => new Date(a.DateFound) - new Date(b.DateFound)
    //   );
    // } else {
    //   filteredDiscs.sort(
    //     (a, b) => new Date(b.DateFound) - new Date(a.DateFound)
    //   );
    // }

    return filteredDiscs;
  };

  const displayedDiscs = loadDiscs();

  const initiallyOpen = "";
  const [isOpen, setIsOpen] = useState(initiallyOpen);

  const goBack = () => {
    // Logic to go back, e.g., navigate back or to a specific route
  };

  const refresh = () => {
    // Refresh logic, e.g., navigate to home or reload the page
  };

  const reportLostDisc = () => {
    // Logic to report lost disc
  };

  const loadMoreDiscs = () => {
    // Logic to load more discs
  };

  const toggleFabMenu = () => {
    // Logic to toggle FAB menu
  };

  const filterSubmitted = () => {
    // Logic when filter is submitted
  };

  const resetFilters = () => {
    // Logic to reset filters
  };

  return (
    <div className="emptyDiv">
      <div
        className="main-wrapper"
        style={{ height: "100%", width: "100%", overflow: "hidden" }}
      >
        <section
          className="main-section text-center"
          style={{ paddingBottom: "20px !important", overflow: "hidden" }}
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
              aria-hidden="true"
              onClick={goBack}
            ></i>
            <div className="d-flex align-items-center flex-column text-center mb-2">
              <img
                className="weblogo"
                src={logo}
                alt="logo"
                onClick={refresh}
              />

              {/* <div className="chat-box d-flex align-items-center mt-1"> */}
              <div className="chat-box d-flex align-items-center">
                <img className="me-2" src={chatIcon} alt="chat" />
                <h4 className="m-0 me-2 text-white">OPT IN STATUS</h4>
                <h4 className="m-0 confirmd">CONFIRMED</h4>
              </div>
            </div>
            <div className="rescue d-flex align-items-center flex-column text-center mb-2">
              <h3 className="m-0 text-white">
                ALL LOST <span className="fw-light">DISCS</span>
              </h3>
              <p className="course-name" id="sortedLabel"></p>
            </div>
            <div className="filter-button">
              <button className="filter-btn" id="filter-btn">
                Filters
              </button>
            </div>
            {/* This is the items loading */}
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
                        <ul id="brandList">
                          {discArray.map((disc, index) => (
                            <div
                              className="col-6 disc-item
                      (index > 5 ? ' hidden' : '') 
                      '"
                              key={index}
                            >
                              <div className="course-box">
                                <div className="course-box-detail">
                                  <div className="course-image">
                                    <img src={courseIcon} alt="image" />
                                  </div>
                                  <div className="course-list">
                                    <ul>
                                      <li
                                        style={{
                                          borderTop:
                                            "1px solid var(--primary-grey)",
                                        }}
                                      >
                                        <img src={courseIcon1} alt="icon" />
                                        <span>
                                          discs_list[index]["Color"]
                                          discs_list[index]["Disc"]
                                        </span>
                                      </li>
                                      <li>
                                        <img src={courseIcon} alt="icon" />
                                        <span>discs_list[index]["Brand"]</span>
                                      </li>
                                      <li>
                                        <img src={courseIcon2} alt="icon" />
                                        <span>discs_list[index]["Name"]</span>
                                      </li>
                                    </ul>
                                  </div>
                                </div>{" "}
                                <div className="course-bottom">
                                  <div className="course-dis">
                                    <img src={roseIcon} alt="icon" />
                                    <span>discs_list[index]["Course"]</span>
                                  </div>
                                  <div className="course-button">
                                    <a
                                      href="#"
                                      className="course-btn"
                                      onClick={ClaimDisc}
                                    >
                                      Claim Disc
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </ul>
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
            {/* This is the end of the items being loaded */}
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
                <div className="no-more-discs hidden">
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
    </div>
  );
};

export default SearchInventory;
