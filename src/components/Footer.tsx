import React, { useEffect, useState } from "react";
import "../styles/footer.css";
import "../styles/footer-additions.css";
import "../globals.css";
import { useLocation, useNavigate } from "react-router-dom";
import homeIcon from "../assets/home.png";
import courseIcon from "../assets/courses.png";
import storeIcon from "../assets/store.png";
import searchIcon from "../assets/search.png";
import fabIcon from "../assets/app_center_btn_logo.png";
import RescueBotDialog from "./RescueBotDialog";

interface FooterProps {
  needCutOut?: boolean;
  cutoutColor?: string;
}

const Footer: React.FC<FooterProps> = (props: FooterProps) => {
  const { needCutOut } = props;
  const [isMobile, setIsMobile] = useState(window.innerWidth < 500);
  const [isRescueBotDialogOpen, setIsRescueBotDialogOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 500);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const navigate = useNavigate();
  const toggleFabMenu = () => {
    const overlay = document.getElementById("overlay");
    const fabMenuContainer = document.getElementById("fabMenuContainer");
    const fabLogo = document.getElementById("fabLogo");
    const fabClose = document.getElementById("fabClose");
    const fabContainer = document.getElementById("fabContainer");
    const fab = document.getElementById("fab");

    if (
      overlay &&
      fabMenuContainer &&
      fabLogo &&
      fabClose &&
      fabContainer &&
      fab
    ) {
      overlay.classList.toggle("active");
      fabMenuContainer.classList.toggle("active");

      if (fabMenuContainer.classList.contains("active")) {
        fabLogo.style.display = "none";
        fabClose.style.display = "block";
      } else {
        fabLogo.style.display = "block";
        fabClose.style.display = "none";
      }
    }
  };

  // Keeping this function commented as it might be needed in the future
  // const reportLostDisc = () => {
  //   window.location.href = "https://discrescuenetwork.com/report-lost-disc";
  //   // navigate("/reportLostDisc");
  //   toggleFabMenu();
  // };

  const requestCourse = () => {
    window.location.href = "https://discrescuenetwork.com/request-course";
    // navigate("/requestCourse");
    toggleFabMenu();
  };

  const openSettings = () => {
    navigate("/settings");
    toggleFabMenu();
  };

  const openHome = () => {
    navigate("/");
  };

  const openInventory = () => {
    navigate("/searchInventory");
  };

  const openStore = () => {
    navigate("/store");
  };

  const openCourses = () => {
    navigate("/courses");
  };

  const openRescueBotDialog = () => {
    toggleFabMenu();
    setIsRescueBotDialogOpen(true);
  };

  const location = useLocation();
  //console.log(location.pathname);

  let footerClass = needCutOut ? "footer footer-before" : "footer";

  if (location.pathname.toLowerCase().includes("/rescueflow")) {
    footerClass += " secondary-footer";
  }

  //console.log(footerClass);

  return (
    <>
      <div
        className={
          isMobile ? "fab-menu-container-mobile" : "fab-menu-container"
        }
        id="fabMenuContainer"
      >
        <div className="fab-menu" id="fabMenu">
          <div className="fab-menu-item">
            <p
              className="fab-menu-item-text-left"
              style={{ textDecoration: "none" }}
            >
              Ask <br /> Rescue Bot
            </p>
            <i
              className="bx bx-search-alt bx-sm"
              onClick={openRescueBotDialog}
            ></i>
          </div>
          {/* <div className="fab-menu-item">
            <p
              className="fab-menu-item-text-left"
              style={{ textDecoration: "none" }}
            >
              Ask <br /> Rescue Bot
            </p>
            <i
              className="bx bx-search-alt bx-sm"
              onClick={openRescueBotDialog}
            ></i>
          </div> */}
          <div className="fab-menu-item">
            <p
              className="fab-menu-item-text"
              style={{ textDecoration: "none" }}
            >
              Request a Course
            </p>
            <i className="bx bx-map-pin bx-sm" onClick={requestCourse}></i>
          </div>
          <div className="fab-menu-item">
            <i className="bx bx-cog bx-sm" onClick={openSettings}></i>
            <p
              className="fab-menu-item-text-right"
              style={{ textDecoration: "none" }}
            >
              Settings
            </p>
          </div>
        </div>
      </div>
      <footer className={footerClass}>
        <div className="overlay" id="overlay" onClick={toggleFabMenu}></div>
        <div className="container">
          <div className="footer-content">
            <div className="col-2" onClick={openHome}>
              <span className="img">
                <img src={homeIcon} alt="home" />
              </span>
              <span>HOME</span>
            </div>
            <div className="col-2" onClick={openInventory}>
              <span className="img">
                <img
                  src={searchIcon}
                  alt="search"
                  style={{ maxWidth: "18px" }}
                />
              </span>
              <span>Search All</span>
            </div>
            <div className="fab-spacer" />
            <div className="col-2" onClick={openStore}>
              <span className="img">
                <img src={storeIcon} alt="store" />
              </span>
              <span>Store</span>
            </div>
            <div className="col-2" onClick={openCourses}>
              <span className="img">
                <img src={courseIcon} alt="courses" />
              </span>
              <span>Courses</span>
            </div>
          </div>
        </div>
      </footer>
      <div className="fab-container" onClick={toggleFabMenu} id="fabContainer">
        <button className="fab" id="fab">
          <img
            src={fabIcon}
            alt="Disc Rescue Network Logo"
            className="logo-fab"
            id="fabLogo"
          />
          <span id="fabClose" style={{ display: "none", zIndex: 15 }}>
            X
          </span>
        </button>
      </div>
      <RescueBotDialog
        isOpen={isRescueBotDialogOpen}
        onClose={() => setIsRescueBotDialogOpen(false)}
      />
    </>
  );
};

export default Footer;
