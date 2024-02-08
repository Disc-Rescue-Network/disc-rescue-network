import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "../styles/globals.css";
import Footer from "./Footer";
import Card from "./Card";

//This is where we will load a single page of all the different components used in the app
export default function Components() {
  return (
    <>
      <p>This is the components page</p>
      <Footer needCutOut={true} />
      <Card Course={""} Color={""} Name={""} Brand={""} img={""} />
    </>
  );
}
