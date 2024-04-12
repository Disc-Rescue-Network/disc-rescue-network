import * as React from "react";
import "../globals.css";
import FullLogoHeader from "../components/HeaderComponents";
import HomePageButtons from "../components/HomePageButtons";
import Subheader from "../components/Subheader";
import Discs from "../components/Discs";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import { Disc, DiscStateString } from "../App";

// const arrayOfDiscsHome = [
//   {
//     course: "Tranquility Trails",
//     color: "Green",
//     name: "D. Bryant",
//     discAndBrand: "Discraft Buzz",
//   },
//   {
//     course: "Stafford Woods",
//     color: "Blue",
//     name: "A. Nichols",
//     discAndBrand: "MVP Volt",
//   },
//   {
//     course: "Tranquility Trails",
//     color: "Yellow",
//     name: "C. Deck",
//     discAndBrand: "Axiom Crave",
//   },
//   {
//     course: "Doc Cramer",
//     color: "Red",
//     name: "J. Doe",
//     discAndBrand: "Innova Roc3",
//   },
//   {
//     course: "Tranquility Trails",
//     color: "Yellow",
//     name: "C. Deck",
//     discAndBrand: "Axiom Crave",
//   },
//   {
//     course: "Doc Cramer",
//     color: "Red",
//     name: "J. Doe",
//     discAndBrand: "Innova Roc3",
//   },
//   {
//     course: "Tranquility Trails",
//     color: "Yellow",
//     name: "C. Deck",
//     discAndBrand: "Axiom Crave",
//   },
// ];

//This is the actual home page of the app

const [allDiscs, setAllDiscs] = useState<Disc[]>([]);
const tempDiscs= [{      id: 7,
  course: "DeLaveaga",
  name: "R. Cornelius",
  disc: "Buzzz",
  phoneNumber: "9991234567",
  bin: "1",
  dateFound: "2023-01-03",
  dateTexted: "",
  dateClaimed: "2023-10-03",
  status: DiscStateString.Unclaimed,
  comments: "Light blue big z",
  color: "",
  claimBy: "2024-06-03",
  brand: "Innova",
},
{
  id: 8,
  course: "Girdwood Forest Fair Park",
  name: "B. Lin",
  disc: "Meta essence",
  phoneNumber: "9991234567",
  bin: "1",
  dateFound: "2023-01-03",
  dateTexted: "2023-10-07",
  dateClaimed: "",
  status: DiscStateString.Unclaimed,
  comments: "",
  color: "Blue",
  claimBy: "2024-06-04",
  brand: "Innova",
},
{
  id: 9,
  course: "Tranquility Trails",
  name: "Archie B.",
  disc: "Explorer",
  phoneNumber: "9991234567",
  bin: "1",
  dateFound: "2023-01-03",
  dateTexted: "2023-10-07",
  dateClaimed: "",
  status: DiscStateString.New,
  comments: "",
  color: "Yellow",
  claimBy: "2024-06-04",
  brand: "Birdie",

}]

useEffect(() => {
    setAllDiscs(tempDiscs)
}, []);

export default function Home() {
  return (
    <div className="container-home">
      <FullLogoHeader />
      <HomePageButtons />
      <div className="disc-container">
        <Subheader text="Recently Added Discs" />
        <Discs arrayOfDiscs={allDiscs} />
      </div>
    </div>
  );
}
