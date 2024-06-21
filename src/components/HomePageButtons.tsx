// HomePageButtons.tsx
import React, { useState } from "react";
import "../styles/buttonComponents.css";
import Button from "./Button";
import imgFind from "../assets/search.png";
import imgSearch from "../assets/courses.png";
import PopUpComponent from "./PopUpComponent";
import { useNavigate } from "react-router-dom";

const HomePageButtons = () => {
  const navigate = useNavigate();

  const openRescueFlow = () => {
    navigate("/rescueflow");
  };

  const openSearchCourses = () => {
    navigate("/courses");
  };

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div className="btn-container-components min-height-35">
      <div className="box">
        <Button
          text={"FIND MY DISC"}
          onClick={openRescueFlow}
          red={true}
          className="button-home"
          icon={imgFind}
          tilt={true}
        />
        <div className="btn-description">
          GO THROUGH THE{" "}
          <span className="rescue-flow" onClick={openPopup}>
            RESCUE FLOW
          </span>{" "}
          TO FIND YOUR DISC
        </div>
      </div>
      <div className="box">
        <Button
          text={"SEARCH COURSES"}
          onClick={openSearchCourses}
          red={false}
          className="button-home"
          icon={imgSearch}
          tilt={false}
        />
        <div className="btn-description">
          SEARCH BY COURSE FOR TURNED IN DISCS
        </div>
      </div>

      {isPopupOpen && (
        <PopUpComponent
          title="WHAT IS THE"
          redText=" RESCUE FLOW?"
          content="THE RESCUE FLOW IS A SIMPLE 5 STEP PROCESS USED TO LOCATE YOUR LOST DISC. AT EACH STAGE WE GATHER SOME INFORMATION FROM YOU THAT COULD HAVE BEEN REPORTED BY VOLUNTEERS TO FIND YOUR DISC IN OUR SYSTEM. THE FLOW WILL TAKE YOU THROUGH THE SYSTEM WE DESIGNED TO EASILY, AND QUICKLY, FIND YOUR DISC IF IT’S IN THE NETWORK OR REPORT IT IF IT ISN’T."
          onClose={closePopup}
        />
      )}
    </div>
  );
};

export default HomePageButtons;
