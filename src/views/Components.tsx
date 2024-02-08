import React from "react";
import "../styles/globals.css";
import Footer from "../components/Footer";
import Button from "../components/Button";
import Card from "../components/Card";
import imageLogo from "../assets/DRN_WebLogo_HDPI.png";

//This is where we will load a single page of all the different components used in the app
export default function Components() {
  const showToast = () => {
    alert("Button clicked");
  };

  return (
    <div className="container">
      <p>This is the components page</p>
      <div className="card-container-row">
        <Card
          Course={"Tranquility Trails"}
          Color={"Green"}
          Name={"D. Bryant"}
          DiscAndBrand={"Discraft Buzz"}
          img={imageLogo}
        />
        <Card
          Course={"Stafford Woods"}
          Color={"Blue"}
          Name={"A. Nichols"}
          DiscAndBrand={"MVP Volt"}
          img={imageLogo}
        />
        <Card
          Course={"Tranquility Trails"}
          Color={"Yellow"}
          Name={"C. Deck"}
          DiscAndBrand={"Axiom Crave"}
          img={imageLogo}
        />
        <Card
          Course={"Doc Cramer"}
          Color={"Red"}
          Name={"J. Doe"}
          DiscAndBrand={"Innova Roc3"}
          img={imageLogo}
        />
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
