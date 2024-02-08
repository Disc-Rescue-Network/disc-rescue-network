import React from "react";
import "../styles/globals.css";
import Footer from "./Footer";

//This is where we will load a single page of all the different components used in the app
export default function Components() {
  return (
    <>
      <p>This is the components page</p>
      <Footer needCutOut={true} />
    </>
  );
}
