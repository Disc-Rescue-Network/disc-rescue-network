import React from "react";
import "../styles/globals.css";
import Footer from "../components/Footer";
import Button from "../components/Button";
import ButtonComponents from "../components/ButtonComponents";
import RecentlyTurnedInDiscs from "../components/RecentlyDiscs";
import FullLogoHeader from "../components/HeaderComponents";
import SearchInventory from "../components/SearchInventory";
import SuccessHeader from "../components/SuccessHeader";
import Courses from "../components/Courses";
import ClaimDisc from "../components/ClaimDisc";
import LogoRescueFlow from "../components/LogoRescueFlow";

//This is where we will load a single page of all the different components used in the app
export default function Components() {
  const showToast = () => {
    alert("Button clicked");
  };

  return (
    <div className="container">
      <ClaimDisc baseText={"Let's get your"} lightText={"Disc"} baseTextInfo={"Just Enter Some"} lightTextInfo={"Info"} finalPoint={"."} />
      <Courses />
      <SuccessHeader baseText={"Nailed"} lightText={"It!"} />
      <SearchInventory />
      <LogoRescueFlow />
      <FullLogoHeader />
      <ButtonComponents />
      <RecentlyTurnedInDiscs />
      <div className="btn-container">
        <Button
          text={"This is a red button with a border"}
          onClick={showToast}
          red={true}
          border={true}
        />
        <Button
          text={"This is a blue button with a border"}
          onClick={showToast}
          red={false}
          border={true}
        />
        <Footer needCutOut={true} />
      </div>
    </div>
  );
}
