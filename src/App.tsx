import * as React from "react";
import { Routes, Route } from "react-router-dom";
import "./globals.css";
import Home from "./views/Home";
import Footer from "./components/Footer";
import RescueFlow from "./views/RescueFlow";
import Store from "./views/Store";
import Settings from "./views/Settings";
import RequestCourse from "./views/RequestCourse";
import ReportLostDisc from "./views/ReportLostDisc";
import SearchInventory from "./views/SearchInventory";
import Courses from "./views/Courses";
import ClaimDisc from "./views/ClaimDisc";
import ClaimDiscSuccess from "./views/ClaimDiscSuccess";

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
  imageUrl?: string;
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
        <Route path="/" element={<Home />} />
        <Route path="/rescueflow" element={<RescueFlow />} />
        <Route path="/store" element= {<Store />} />
        <Route path="/settings" element= {<Settings />} />
        <Route path="/requestCourse" element= {<RequestCourse />} />
        <Route path="/reportLostDisc" element= {<ReportLostDisc />} />
        <Route path="/searchInventory" element= {<SearchInventory />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/claimDisc/:id" element={<ClaimDisc />} />
        <Route path="/claimDiscSuccess/:id" element={<ClaimDiscSuccess />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
