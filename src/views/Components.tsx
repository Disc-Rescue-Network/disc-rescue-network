import React from "react";
import "../styles/globals.css";
import Footer from "../components/Footer";
import Button from "../components/Button";
import Courses from "../components/Courses";
import Discs from "../components/Discs";
import Subheader from "../components/Subheader";
import SuccessSubheader from "../components/SuccessSubheader";
import SuccessHeader from "../components/SuccessHeader";

const arrayOfDiscs = [
  {
    course: "Tranquility Trails",
    color: "Green",
    name: "D. Bryant",
    discAndBrand: "Discraft Buzz",
  },
  {
    course: "Stafford Woods",
    color: "Blue",
    name: "A. Nichols",
    discAndBrand: "MVP Volt",
  },
  {
    course: "Tranquility Trails",
    color: "Yellow",
    name: "C. Deck",
    discAndBrand: "Axiom Crave",
  },
  {
    course: "Doc Cramer",
    color: "Red",
    name: "J. Doe",
    discAndBrand: "Innova Roc3",
  },
];

//This is where we will load a single page of all the different components used in the app
export default function Components() {
  const showToast = () => {
    alert("Button clicked");
  };

  return (
    <div className="container">
      <Courses
        baseText={"Choose your"}
        lightText={"Course"}
        subBaseText={"Where to"}
        subLightText={"Search?"}
      />
      <Discs arrayOfDiscs={arrayOfDiscs} />
      <Subheader text="Recently Added Discs" />
      {/* the success header one does not need any props, it is good as is */}
      <SuccessHeader />
      <SuccessSubheader
        baseText={
          "You have successfully claimed your disc and you've been opted in to receiving messages."
        }
      />
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
        {/* these need work */}
        {/* <ClaimDisc
          baseText={"Let's get your"}
          lightText={"Disc"}
          baseTextInfo={"Just Enter Some"}
          lightTextInfo={"Info"}
        />
        
        <SearchInventory />
        <SubHeaderSearch courseName={"Tranquility Trails"} />
        <LogoRescueFlow />
        <FullLogoHeader />
        <ButtonComponents />
        
         */}
      </div>
    </div>
  );
}
