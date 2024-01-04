import React from "react";
import "../beta-styles/rescueFlowStep2.css";
import logoImage from "../assets/logo.png";
import chatIcon from "../assets/chat.svg";
import homeIcon from "../assets/home.png";
import searchIcon from "../assets/search.png";
import diskStoreIcon from "../assets/disk-store.png";
import coursesIcon from "../assets/courses.png";
import fabLogoIcon from "../assets/app_center_btn_logo.png";
import { useNavigate } from "react-router-dom";

const RescueFlowStep2 = () => {
  const navigate = useNavigate();

  // Example of an event handler
  const goBack = () => {
    // Logic to go back
  };

  const refresh = () => {
    // Logic to refresh
  };

  const searchPhoneNumber = () => {
    navigate("/rescueFlow3");
  };

  const skipStep = () => {
    // Logic to skip step
  };

  const toggleFabMenu = () => {
    // Logic to skip step
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
              2 <span className="overtext">/ 5</span>
            </h3>
          </div>

          <h3 className="mt-3 text-white text-center mb-3 where">
            New Phone, <span className="missingtext">Who Dis?</span>
          </h3>

          <div
            className="row mb-4 select-box d-flex justify-content-center align-items-center"
            style={{ height: "100%" }}
          >
            <div className="col-12 col-md-10 col-lg-8" style={{ padding: 0 }}>
              <span
                className="m-0 text-white fw-light"
                style={{ fontSize: "16px" }}
              >
                *Enter 999-123-4567 to simulate
              </span>
              <input
                type="tel"
                className="form-control"
                id="inputPhone"
                placeholder="PHONE NUMBER WRITTEN ON THE DISC"
                inputMode="numeric"
                // onInput={formatPhoneNumber} // You'll need to define this function
              />
            </div>
          </div>

          <button
            className="stepbutton text-white mb-3"
            onClick={searchPhoneNumber}
          >
            Locate My Disc
          </button>
          <div className="pb-5">
            <button className="rememberbtn fw-light" onClick={skipStep}>
              Didn't Write One
            </button>
          </div>
        </div>
      </section>

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
        </button>
      </div>
    </div>
  );
};

export default RescueFlowStep2;
