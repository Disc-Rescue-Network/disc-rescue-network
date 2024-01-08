import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Box, Button, ButtonGroup, Typography } from "@mui/material"; // Import Button and ButtonGroup from MUI
import Home from "./components/Home";
import SearchInventory from "./components/SearchInventory";
import Store from "./components/Store";
import Courses from "./components/Courses";
import SearchCourses from "./components/SearchCourses";
import ReportLostDisc from "./components/ReportLostDisc";
import ReportLostDiscSuccess from "./components/ReportLostDiscSuccess";
import Settings from "./components/Settings";
import RequestCourse from "./components/RequestCourse";
import RescueFlow from "./components/RescueFlow";
import RescueFlowStep2 from "./components/RescueFlowStep2";
import RescueFlowStep3 from "./components/RescueFlowStep3";
import RescueFlowStep4 from "./components/RescueFlowStep4";
import RescueFlowStep5 from "./components/RescueFlowStep5";
import FAQ from "./components/FAQ";
import Banner from "./components/Banner";
import ClaimDisc from "./components/ClaimDisc";
import ClaimDiscSuccess from "./components/ClaimDiscSuccess";
import LoadingScreen from "./components/LoadingScreen";
import "./styles/globals.css";
import RescueFlowFailure from "./components/RescueFlowFailure";

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
      <Routes>
        <Route path="/" element={<LoadingScreen />} />
        <Route path="/home" element={<Home />} />
        <Route path="/claimDisc" element={<ClaimDisc />} />
        <Route path="/claimDiscSuccess" element={<ClaimDiscSuccess />} />
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
        <Route path="/rescueFlowFailure" element={<RescueFlowFailure />} />
        <Route
          path="/reportLostDiscSuccess"
          element={<ReportLostDiscSuccess />}
        />
        <Route path="/faq" element={<FAQ />} />
      </Routes>
      <Banner />
    </Box>
  );
}

export default App;
