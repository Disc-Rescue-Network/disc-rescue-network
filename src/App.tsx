import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import EnterLostDisc from "./components/EnterLostDisc";
import Inventory from "./components/Inventory";
import "./styles/App.css";
import { Box, Button, ButtonGroup, Typography } from "@mui/material"; // Import Button and ButtonGroup from MUI
import AdminPanel from "./components/AdminPanel";
import PublicInventory from "./components/PublicHub";
import Home from "./beta-components/Home";
import SearchInventory from "./beta-components/SearchInventory";
import Store from "./beta-components/Store";
import Courses from "./beta-components/Courses";
import SearchCourses from "./beta-components/SearchCourses";
import ReportLostDisc from "./beta-components/ReportLostDisc";
import Settings from "./beta-components/Settings";
import RequestCourse from "./beta-components/RequestCourse";
import RescueFlow from "./beta-components/RescueFlow";
import RescueFlowStep2 from "./beta-components/RescueFlowStep2";
import RescueFlowStep3 from "./beta-components/RescueFlowStep3";
import RescueFlowStep4 from "./beta-components/RescueFlowStep4";
import RescueFlowStep5 from "./beta-components/RescueFlowStep5";
import FAQ from "./beta-components/FAQ";
import Banner from "./beta-components/Banner";
import LoadingScreen from "./beta-components/LoadingScreen";

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
  status: string;
  comments?: string | null;
  color: string;
  pickupDeadline?: string | null;
  brand: string;
}

export const API_BASE_URL = "https://lost-and-found-api-gl8z.onrender.com"; //production URL
//export const API_BASE_URL = 'http://127.0.0.1:3001'; // local testing

function App() {
  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Banner />
      <Routes>
        <Route path="/" element={<LoadingScreen />} />
        <Route path="/home" element={<Home />} />
        <Route path="/searchInventory" element={<SearchInventory />} />
        <Route path="/store" element={<Store />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/searchCourse" element={<SearchCourses />} />
        <Route path="/reportLostDisc" element={<ReportLostDisc />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/requestCourse" element={<RequestCourse />} />
        <Route path="/rescueFlow" element={<RescueFlow />} />
        <Route path="/rescueFlow2" element={<RescueFlowStep2 />} />
        <Route path="/rescueFlow3" element={<RescueFlowStep3 />} />
        <Route path="/rescueFlow4" element={<RescueFlowStep4 />} />
        <Route path="/rescueFlow5" element={<RescueFlowStep5 />} />
        <Route path="/faq" element={<FAQ />} />
      </Routes>
    </Box>
  );
}

export default App;
