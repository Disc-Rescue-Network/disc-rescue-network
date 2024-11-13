import * as React from "react";
import "../globals.css";
import FullLogoHeader from "../components/HeaderComponents";
import HomePageButtons from "../components/HomePageButtons";
import Subheader from "../components/Subheader";
import Discs from "../components/Discs";
import { useInventory } from "../hooks/useInventory";

function Home() {
  const { inventory, fetchInventory } = useInventory();

  React.useEffect(() => {
    if (inventory.length === 0) {
      console.log("Fetching inventory");
      fetchInventory();
    }
  }, [inventory]);

  return (
    <div className="container-home">
      <FullLogoHeader />
      <HomePageButtons />
      <div className="disc-container">
        <Subheader text="RECENTLY TURNED IN DISCS" />
        <Discs arrayOfDiscs={inventory} />
      </div>
    </div>
  );
}

export default Home;
