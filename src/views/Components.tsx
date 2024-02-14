import React from "react";
import "../styles/globals.css";
import Footer from "../components/Footer";
import Button from "../components/Button";
import ButtonComponents from "../components/ButtonComponents";
import RecentlyTurnedInDiscs from "../components/RecentlyDiscs";
import FullLogoHeader from "../components/HeaderComponents";
import RescueFlow from "../components/RescueFlow";
import SearchInventory from "../components/SearchInventory";
import SuccessHeader from "../components/SuccessHeader";
import Courses from "../components/Courses";
import HeaderCourses from "../components/HeaderCourses";
import SubHeaderCourses from "../components/SubHeaderCourses";

//This is where we will load a single page of all the different components used in the app
export default function Components() {
  const showToast = () => {
    alert("Button clicked");
  };

  return (
    <div className="container">
      <HeaderCourses />
      <SubHeaderCourses />
      <Courses />
      <SuccessHeader />
      <SearchInventory />
      <RescueFlow />
      <FullLogoHeader />
      <ButtonComponents />
      <RecentlyTurnedInDiscs />
      <div className="btn-container">
        <Button text={"This is a red button"} onClick={showToast} red={true} />
        <Button
          text={"This is a blue button"}
          onClick={showToast}
          red={false}
        />
      </div>
      <Footer needCutOut={true} />
    </div>
  );
}
