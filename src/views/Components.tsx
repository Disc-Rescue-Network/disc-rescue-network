import React from "react";
import "../styles/globals.css";
import Footer from "../components/Footer";
import Button from "../components/Button";
import Card from "../components/Card";

//This is where we will load a single page of all the different components used in the app
export default function Components() {
  const showToast = () => {
    alert("Button clicked");
  };

  return (
    <div className="container">
      <p>This is the components page</p>
      <div className="card-container-row">
        <Card Course={""} Color={""} Name={""} Brand={""} img={""} />
        <Card Course={""} Color={""} Name={""} Brand={""} img={""} />
      </div>

      <div className="btn-container">
        <Button text={"This is a red button"} onClick={showToast} red={true} />
        <Button
          text={"This is a blue button"}
          onClick={showToast}
          red={false}
        />
      </div>
      <Footer needCutOut={true} />
    </div>
  );
}
