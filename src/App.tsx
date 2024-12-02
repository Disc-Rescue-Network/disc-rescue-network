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
import BetaBanner from "./components/BetaBanner";
import { Claim } from "./components/PopupSurrender";
import SupportTicket from "./views/SupportTicket";
import { useTitle } from "./hooks/useTitle";

export interface Course {
  id: number;
  orgCode: string;
  name: string;
  state: string;
  city: string;
  shortCode: string;
  createdAt: Date;
  updatedAt: Date;
  activeForLostAndFound: number; // Changed from boolean to number
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
  claims: Claim[];
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

export const API_BASE_URL = "https://apis.discrescuenetwork.com"; //production URL
//export const API_BASE_URL = "http://localhost:8080"; // local testing

function useBackgroundColor() {
  const [pathname, setPathname] = React.useState(window.location.pathname);
  const [className, setClassName] = React.useState("");

  React.useEffect(() => {
    const handleLocationChange = () => {
      setPathname(window.location.pathname);
    };

    // Handle popstate and initial pathname set
    window.addEventListener("popstate", handleLocationChange);

    return () => {
      window.removeEventListener("popstate", handleLocationChange);
    };
  }, []);

  React.useEffect(() => {
    // Set className based on pathname
    if (["/", "/searchAll", "/searchInventory"].includes(pathname)) {
      setClassName("app");
    } else {
      // setClassName("app-blue");
      setClassName("app");
    }
  }, [pathname]);

  return className;
}

const routeTitles: Record<string, string> = {
  "/": "Choose Your Path - Disc Rescue Network",
  "/rescueflow": "Rescue Flow Step 1 - Disc Rescue Network",
  "/searchInventory": "Search All Rescue Beacons - Disc Rescue Network",
  // Add other routes as needed
};

function App() {
  const className = useBackgroundColor();
  const location = window.location.pathname;

  useTitle("Home");

  return (
    <div className={`${className} app-layout`}>
      <BetaBanner
        Text={"This app is currently in Beta. Click "}
        LinkText={"here"}
        SecondText={" to report any issues or provide feedback."}
      />
      <main className="app-content">
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
          <Route path="/support-ticket" element={<SupportTicket />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
