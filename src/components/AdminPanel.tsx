import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EnterLostDisc from './EnterLostDisc';
import Inventory from './Inventory';
import '../styles/App.css';
import { Button, ButtonGroup, Typography, useMediaQuery, useTheme } from '@mui/material'; // Import Button and ButtonGroup from MUI
import ExpiredPickups from './ExpiredPickups';


function AdminPanel() {
  const [activeTab, setActiveTab] = useState('enterLostDisc'); // Default active tab
  const [isPasswordEntered, setIsPasswordEntered] = useState(false); // Track whether the password is entered
  const theme = useTheme();
  const isMobile = !useMediaQuery(theme.breakpoints.up("md"));
  
  const switchTab = (tabName: string) => {
    setActiveTab(tabName);
  };

  // Function to handle password submission
  const handlePasswordSubmit = () => {
    const enteredPassword = prompt("Please enter the password:"); // Prompt for the password

    if (enteredPassword === "TranqLostAndFound2023") {
      setIsPasswordEntered(true); // Set the flag to true if the password is correct
    } else {
      alert("Incorrect password. Please try again.");
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <Typography sx={{ color: 'white', fontSize: isMobile? "2rem" : "3rem", marginBottom: "10px"}}>Tranquility Trails Lost and Found</Typography>
        <nav>
          <ButtonGroup variant="contained" color="primary">
            <Button
              onClick={() => switchTab('enterLostDisc')}
              color={activeTab === 'enterLostDisc' ? "primary" : "inherit"}
              className={activeTab === 'enterLostDisc' ? 'active' : ''}
            >
              Enter Lost Disc
            </Button>
            <Button
              onClick={() => switchTab('inventory')}
              color={activeTab === 'inventory' ? "primary" : "inherit"}
              className={activeTab === 'inventory' ? 'active' : ''}
            >
              Inventory
            </Button>
          </ButtonGroup>
        </nav>
      </header>
      {isPasswordEntered ? ( // Render secret content if the password is entered
        <main className="container">
          {activeTab === 'enterLostDisc' && <EnterLostDisc />}
          {activeTab === 'inventory' && <Inventory />}
          {/* {activeTab === 'expired' && <ExpiredPickups />} */}
        </main>
        ) : ( // Render password form if the password is not entered
        <div id="password-form">
          {/* <p className="password-text">If you have the password, please click the button below.</p> */}
          <button onClick={handlePasswordSubmit} className="green-button">Enter Password</button>
        </div>
      )}
    </div>
  );
}

    
export default AdminPanel;