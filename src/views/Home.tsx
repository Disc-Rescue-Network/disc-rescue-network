import * as React from "react";
import "../globals.css";
import FullLogoHeader from "../components/HeaderComponents";
import HomePageButtons from "../components/HomePageButtons";
import Subheader from "../components/Subheader";
import Discs from "../components/Discs";
import Footer from "../components/Footer";

const arrayOfDiscsHome = [
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
  {
    course: "Tranquility Trails",
    color: "Yellow",
    name: "C. Deck",
    discAndBrand: "Axiom Crave",
  },
];

//This is the actual home page of the app
export default function Home() {
  return (
    <div className="container-home">
      <FullLogoHeader />
      <HomePageButtons />
      <div className="disc-container">
        <Subheader text="Recently Added Discs" />
        <Discs arrayOfDiscs={arrayOfDiscsHome} />
      </div>
    </div>
  );
}
