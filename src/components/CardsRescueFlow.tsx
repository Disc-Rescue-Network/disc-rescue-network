import pinImage from "../assets/pin.png";
import Button from "./Button";

type CardProps = {
  Course: string;
  img: string;
  Color: string;
  Name: string;
  DiscAndBrand: string;
  showButton: boolean;
};

const CardsRescueFLow = ({
  Course,
  img,
  Color,
  Name,
  DiscAndBrand,
  showButton,
}: CardProps) => {
  return (
    <div className="card-container" style={{ justifyContent: "center" }}>
      <div className="disc-info">
        <div className="div-block-2">
          <div className="circle-overlay">
            <img src={pinImage} alt="pin-icon" />
          </div>
          <div className="text-block-2">
            <div className="course-wrapper">{Course}</div>
          </div>
        </div>
        <img
          src={img}
          loading="lazy"
          alt="disc"
          className="image"
          style={{ backgroundColor: "#353535" }}
        />
        <div className="w-layout-grid grid grid-disc">
          <div className="course-list" style={{ height: "110px" }}>
            <ul>
              <li>
                <i className="bx bx-palette" />
                <span>{Color}</span>
              </li>
              <li>
                <i className="bx bxs-user-detail" />
                <span>{Name}</span>
              </li>
              <li>
                <i className="bx bx-purchase-tag" />
                <span>{DiscAndBrand}</span>
              </li>
            </ul>
            {showButton && (
              <div className="card-button-container">
                <Button
                  text={"Claim Disc"}
                  red={true}
                  className="btn-2 button-popup padding-1"
                  onClick={() => {
                    alert("button clicked");
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardsRescueFLow;
