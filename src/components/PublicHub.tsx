import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EnterLostDisc from './EnterLostDisc';
import Inventory from './Inventory';
import '../styles/App.css';
import { Button, ButtonGroup, Typography, useMediaQuery, useTheme } from '@mui/material'; // Import Button and ButtonGroup from MUI
import PublicInventory from './PublicInventory';
import FAQ from './FAQ';


function PublicHub() {

  const theme = useTheme();
  const isMobile = !useMediaQuery(theme.breakpoints.up("md"));
  const [activeTab, setActiveTab] = useState('faq'); // Default active tab

  const switchTab = (tabName: string) => {
    setActiveTab(tabName);
  };


  return (
    <div className="App">
      <header className="App-header">
        <Typography sx={{ color: 'white', fontSize: isMobile? "2rem" : "3rem", marginBottom: "10px"}}>Tranquility Trails Lost and Found</Typography>      
        <nav>
          <ButtonGroup variant="contained" color="primary">
            <Button
              onClick={() => switchTab('faq')}
              color={activeTab === 'faq' ? "primary" : "inherit"}
              className={activeTab === 'faq' ? 'active' : ''}
            >
              FAQ Page
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
      <main className="container">
          {activeTab === 'faq' && <FAQ />}
          {activeTab === 'inventory' && <PublicInventory />}
      </main>
    </div>
  );
}

    
export default PublicHub;