// Home.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/home.css";
import "../styles/globals.css";
import searchIcon from "../assets/search.png";
import placeHolderIcon from "../assets/santa_cruz_driver.png";
import drnAppMainIcon from "../assets/DRN_App_Main.png";
import roseIcon from "../assets/rose-icon.png";
import homeIcon from "../assets/home.png";
import diskStoreIcon from "../assets/disk-store.png";
import coursesIcon from "../assets/courses.png";
import appCenterBtnLogoIcon from "../assets/app_center_btn_logo.png";
import { found_discs } from "./discs";
import { Disc } from "../App";
import courseIcon from "../assets/course-icon.png";
import courseIcon1 from "../assets/course-icon1.png";
import courseIcon2 from "../assets/course-icon2.png";
import backetIcon from "../assets/basket_icon.png";

const Home: React.FC = () => {
  const [isFabMenuActive, setIsFabMenuActive] = useState(false);

  const toggleFabMenu = () => {
    setIsFabMenuActive(!isFabMenuActive);
  };

  const navigate = useNavigate();

  const refresh = () => {
    navigate("/");
  };

  const goToRescueFlow = () => {
    navigate("/rescueFlow");
  };

  const [showPopup, setShowPopup] = useState(false);

  const [discArray, setDiscArray] = useState<Disc[]>([]);
  useEffect(() => {
    setDiscArray(found_discs);
    console.log(found_discs);
  }, []);
  useEffect(() => {
    console.log(discArray);
  }, [discArray]);

  const togglePopup = () => {
    console.log("show pop up");
    setShowPopup(!showPopup);
  };

  const searchAllCourses = () => {
    navigate("/courses");
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

  const claimDisc = (index: number) => {
    navigate("/claimDisc");
  };

  return (
    <div>
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

        {/* <div className="btn-container mb-2"> */}
        <div className="btn-container">
          <div className="box">
            <button className="btn" onClick={goToRescueFlow}>
              <img
                src={searchIcon}
                alt="icon"
                width="18"
                style={{ marginRight: "5px", transform: "rotate(30deg)" }}
              />
              <span>FIND MY DISC</span>
            </button>
            <div className="btn-description">
              GO THROUGH THE{" "}
              <span className="rescue-flow" onClick={togglePopup}>
                RESCUE FLOW
              </span>{" "}
              TO FIND YOUR DISC
            </div>
          </div>
          <div className="box-2">
            <button className="btn" onClick={searchAllCourses}>
              <img src={roseIcon} alt="icon" style={{ marginRight: "5px" }} />
              <span>SEARCH COURSES</span>
            </button>
            <div className="btn-description">
              SEARCH BY COURSE FOR TURNED IN DISCS
            </div>
          </div>
        </div>

        {/* <div className="discs mt-2"> */}
        <div className="discs">
          <h2 className="sub-header">RECENTLY TURNED IN DISCS</h2>
          <div className="w-layout-grid grid-of-cards">
            {discArray.map((disc, index) => (
              <div className="card-container" key={index}>
                <div className="disc-info">
                  <img
                    src={placeHolderIcon}
                    loading="lazy"
                    alt={disc.disc}
                    className="image"
                  />
                  <div className="w-layout-grid grid">
                    <div className="course-list">
                      <ul>
                        <li
                          style={{ borderTop: "1px solid var(--primary-grey)" }}
                        >
                          <img src={courseIcon1} alt="icon" />
                          <span>
                            {disc.color} {disc.disc}
                          </span>
                        </li>
                        <li>
                          <img src={courseIcon} alt="icon" />
                          <span>{disc.brand}</span>
                        </li>
                        <li>
                          <img src={courseIcon2} alt="icon" />
                          <span>{disc.name}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="sub-info">
                  <div className="div-block-2">
                    <img
                      src={backetIcon}
                      style={{
                        color: "var(--primary-blue)",
                        marginRight: "5px",
                        width: "14px",
                      }}
                      alt="icon"
                    />
                    <div className="text-block-2">{disc.course}</div>
                  </div>
                  <button className="btn" onClick={() => claimDisc(index)}>
                    Claim Disc
                  </button>
                </div>
              </div>
            ))}
          </div>
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

      <footer
        className="footer"
        // style={{ backgroundColor: "var(--primary-grey) !important" }}
        id="homeFooter"
      >
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

      {showPopup && (
        <div id="popup" className="popup">
          <div className="popup-content">
            <span className="close" onClick={togglePopup}>
              &times;
            </span>
            <h2>
              WHAT IS THE <span className="redText">RESCUE FLOW</span>?
            </h2>
            <p>
              THE RESCUE FLOW IS A SIMPLE 5 STEP PROCESS USED TO LOCATE YOUR
              LOST DISC...
            </p>
            <button id="findMyDisc" onClick={goToRescueFlow}>
              FIND MY DISC
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default Home;
