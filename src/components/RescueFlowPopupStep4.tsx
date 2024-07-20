import imageLogo from "../assets/DRN_WebLogo_HDPI.png";
import Button from "./Button";

interface Props {
  onClosePopup: () => void;
}

const RescueFlowPopupStep4: React.FC<Props> = ({ onClosePopup }) => {
  return (
    <div
      className="popup"
      id="popup-verify"
      style={{ display: "flex", flexDirection: "column" }}
    >
      <div
        className="popup-content"
        id="popup-verify-content"
        style={{ padding: "10px 5px" }}
      >
        <div
          className="course-section-popup"
          style={{ margin: "0", width: "100%" }}
        >
          <div
            className="row"
            style={{
              color: "var(--primary-black)",
              margin: "0",
              paddingLeft: "0px",
              width: "100%",
            }}
          >
            <div
              className="col-6-step4 disc-item"
              style={{ paddingRight: "5px", paddingLeft: "5px" }}
            >
              {/* <CardsRescueFLow 
                                    Course={"Tranquility Trails"} 
                                    img={imageLogo} 
                                    Color={"Green"} 
                                    Name={"J. Doe"} 
                                    DiscAndBrand={"MVP"} 
                                    showButton={true} 
                                /> */}
            </div>
            <div
              className="col-6-step4 disc-item"
              style={{ paddingRight: "5px", paddingLeft: "3.5px" }}
            >
              {/* <CardsRescueFLow 
                                    Course={"Tranquility Trails"} 
                                    img={imageLogo} 
                                    Color={"Green"} 
                                    Name={"J. Doe"} 
                                    DiscAndBrand={"MVP"} 
                                    showButton={true} 
                                /> */}
            </div>
            <div
              className="col-6-step4 disc-item"
              style={{ paddingRight: "3.5px", paddingLeft: "3.5px" }}
            >
              {/* <CardsRescueFLow 
                                    Course={"Tranquility Trails"} 
                                    img={imageLogo} 
                                    Color={"Green"} 
                                    Name={"J. Doe"} 
                                    DiscAndBrand={"MVP"} 
                                    showButton={true} 
                                /> */}
            </div>
            <div
              className="col-6-step4 disc-item"
              style={{ paddingRight: "3.5px", paddingLeft: "3.5px" }}
            >
              {/* <CardsRescueFLow 
                                    Course={"Tranquility Trails"} 
                                    img={imageLogo} 
                                    Color={"Green"} 
                                    Name={"J. Doe"} 
                                    DiscAndBrand={"MVP"} 
                                    showButton={true} 
                                /> */}
            </div>
            <div
              className="col-6-step4 disc-item"
              style={{ paddingRight: "3.5px", paddingLeft: "3.5px" }}
            >
              {/* <CardsRescueFLow 
                                    Course={"Tranquility Trails"} 
                                    img={imageLogo} 
                                    Color={"Green"} 
                                    Name={"J. Doe"} 
                                    DiscAndBrand={"MVP"} 
                                    showButton={true} 
                                /> */}
            </div>
          </div>
        </div>
      </div>
      <div className="buttons-rescue">
        <Button
          text={"None of These are Mine"}
          red={true}
          onClick={() => {
            alert("button clicked");
          }}
        />
        <Button
          text={"Let Me See Of These Type of Discs"}
          red={false}
          className={"blue-button-popup"}
          onClick={onClosePopup}
        />
      </div>
    </div>
  );
};

export default RescueFlowPopupStep4;
