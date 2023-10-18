import React, { useState, useEffect } from 'react';
import Fab from '@mui/material/Fab';
import '../styles/App.css';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  const SCROLL_THRESHOLD = 100; // Adjust this threshold as needed

  const handleScroll = () => {
    const currentScrollPos = window.pageYOffset;
    //const isScrollingDown = currentScrollPos > prevScrollPos;

    if (currentScrollPos >= SCROLL_THRESHOLD) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }

    setPrevScrollPos(currentScrollPos);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollPos]);

  return (
    <div className={`back-to-top-button ${isVisible ? 'visible' : ''}`}>
      {/* Use MUI's Fab component for the floating action button */}
      <Fab
        className="fab-button"
        color="primary"
        aria-label="back-to-top"
        onClick={scrollToTop}
        size="large"
        style={{ position: 'fixed', bottom: '20px', right: '20px' }}
      >
        <KeyboardArrowUpIcon />
      </Fab>
    </div>
  );
}


export default BackToTopButton;