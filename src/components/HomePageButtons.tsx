import "../styles/buttonComponents.css";
import Button from "./Button";
import imgFind from "../assets/search.png";
import imgSearch from "../assets/courses.png";

const HomePageButtons = () => {
  const showToast = () => {
    alert("Button clicked");
  };

  return (
    <div className="btn-container-components min-height-35">
      <div className="box">
        <Button
          text={"FIND MY DISC"}
          onClick={showToast}
          red={true}
          className="button-home"
          icon={imgFind}
          tilt={true}
        />
        <div className="btn-description">
          GO THROUGH THE{" "}
          <span className="rescue-flow" onClick={showToast}>
            RESCUE FLOW
          </span>{" "}
          TO FIND YOUR DISC
        </div>
      </div>
      <div className="box">
        <Button
          text={"SEARCH COURSES"}
          onClick={showToast}
          red={false}
          className="button-home"
          icon={imgSearch}
          tilt={false}
        />
        <div className="btn-description">
          SEARCH BY COURSE FOR TURNED IN DISCS
        </div>
      </div>
    </div>
  );
};

export default HomePageButtons;
