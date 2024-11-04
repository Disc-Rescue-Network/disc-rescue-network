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
import SurrenderDiscSuccess from "./views/SurrenderDiscSuccess";
import ReportLostDiscSuccess from "./views/ReportLostDiscSuccess";
import { useInventory } from "./hooks/useInventory";
import BetaBanner from "./components/BetaBanner";

export interface Course {
  id: number;
  orgCode: string;
  name: string;
  state: string;
  city: string;
  shortCode: string;
  createdAt: Date;
  updatedAt: Date;
  activeForLostAndFound: boolean;
  shortLink: string;
  link: string;
  udiscLeagueURL: string | null;
}

// Updated Brand interface
export interface Brand {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

// Updated DiscDetail interface to represent the nested disc object
export interface DiscDetail {
  id: number;
  name: string;
  plasticType: string | null;
  category: string | null;
  brandId: number;
  createdAt: string;
  updatedAt: string;
  brand: Brand; // Nested brand object
}

// Updated Disc interface to match the new format
export interface Disc {
  id: number;
  bin: string;
  bottomImage: string | null;
  category: string | null;
  claimBy: string;
  course: Course;
  color: string;
  comments: string | null;
  dateClaimed: string | null;
  dateFound: string;
  dateSold: string | null;
  dateTexted: string | null;
  deleted: number; // Changed from boolean to match your format
  disc: DiscDetail; // Nested DiscDetail object
  name: string;
  phoneNumber: string | null;
  status: DiscStateString;
  topImage: string | null;
  subcategory: string | null;
  labels?: string[]; // Optional field
  action?: string; // Optional field
  dateOfReminderText?: string | null;
  orgCode: string;
  createdAt: string;
  updatedAt: string;
}

export enum DiscStateString {
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
//export const API_BASE_URL = "http://localhost:8080"; // local testing

function App() {
  const { inventory, fetchInventory } = useInventory();

  React.useEffect(() => {
    if (inventory.length === 0) {
      console.log("Fetching inventory");
      fetchInventory();
    }
  }, [inventory]);

  return (
    <div className="app">
      <BetaBanner
        Text={
          "This is currently under development. Please email support@discrescuenetwork.com for help."
        }
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rescueflow" element={<RescueFlow />} />
        <Route path="/store" element={<Store />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/requestCourse" element={<RequestCourse />} />
        <Route path="/reportLostDisc" element={<ReportLostDisc />} />
        <Route path="/searchInventory" element={<SearchInventory />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/claimDisc/:id" element={<ClaimDisc />} />
        <Route path="/claimDiscSuccess/:id" element={<ClaimDiscSuccess />} />
        <Route
          path="/surrenderDiscSuccess"
          element={<SurrenderDiscSuccess />}
        />
        <Route
          path="/reportLostDiscSuccess"
          element={<ReportLostDiscSuccess />}
        />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
