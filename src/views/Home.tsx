import * as React from "react";
import "../globals.css";
import FullLogoHeader from "../components/HeaderComponents";
import HomePageButtons from "../components/HomePageButtons";
import Subheader from "../components/Subheader";
import Discs from "../components/Discs";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import { Disc, DiscStateString } from "../App";
import axios from "axios";
import { useInventory } from "../hooks/useInventory";

function Home() {
  const { inventory, fetchInventory } = useInventory();

  React.useEffect(() => {
    if (inventory.length === 0) {
      console.log("Fetching inventory");
      fetchInventory();
    }
  }, [inventory]);

  console.log(inventory);
  //Filter by status
  const filteredDiscs = inventory.filter(
    (disc) => disc.status === DiscStateString.Unclaimed
  );
  console.log(filteredDiscs);

  return (
    <div className="container-home">
      <FullLogoHeader />
      <HomePageButtons />
      <div className="disc-container">
        <Subheader text="RECENTLY TURNED IN DISCS" />
        <Discs arrayOfDiscs={filteredDiscs} />
      </div>
    </div>
  );
}

export default Home;
