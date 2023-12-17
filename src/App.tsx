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
        <Route path="/" element={<Home />} />
        <Route path="/searchInventory" element={<SearchInventory />} />
      </Routes>
    </Box>
  );
}

export default App;
