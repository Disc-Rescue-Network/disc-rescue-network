import React from "react";
import { Box, Typography } from "@mui/material";
import "../beta-styles/globals.css";

const Banner: React.FC = () => {
  return (
    <Box
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        backgroundColor: "var(--primary-blue)",
        color: "white",
        height: "50px",
        padding: "5px 10px",
      }}
    >
      <Typography
        sx={{
          fontFamily: "Bebas Neue",
          fontSize: "14px",
          letterSpacing: ".35px",
          textAlign: "left",
          margin: "auto",
        }}
      >
        This platform is currently in Beta, so there may be some bugs or issues
        experienced while using it. Thank you for your understanding.
      </Typography>
    </Box>
  );
};

export default Banner;
