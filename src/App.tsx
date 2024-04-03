import * as React from "react";
import { Routes, Route } from "react-router-dom";
import "./styles/globals.css";
import Home from "./views/Home";
import LoadingScreen from "./views/LoadingSceen";
import Footer from "./components/Footer";

// Define a Disc interface
export interface Disc {
  id?: number;
  course: string;
  name: string;
  disc: string;
  phoneNumber: string;
  bin: string;
  dateFound: string;
  dateTexted?: string | null;
  dateClaimed?: string | null;
  status: DiscStateString;
  comments?: string | null;
  color: string;
  claimBy?: string | null;
  brand?: string | null;
  dateSold?: string | null;
}
export enum DiscStateString {
  New = "NEW",
  Unclaimed = "UNCLAIMED",
  PendingDropoff = "PENDING_DROPOFF",
  PendingStorePickup = "PENDING_STORE_PICKUP",
  PendingCoursePickup = "PENDING_COURSE_PICKUP",
  Claimed = "CLAIMED",
  PickupOverdue = "PICKUP_OVERDUE",
  ForSale = "FOR_SALE",
  Sold = "SOLD",
  SoldOffline = "SOLD_OFFLINE",
  Surrendered = "SURRENDERED",
}

export const API_BASE_URL = "https://api.discrescuenetwork.com"; //production URL
//export const API_BASE_URL = "http://127.0.0.1:3001"; // local testing

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<LoadingScreen />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
