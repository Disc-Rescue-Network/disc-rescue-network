import "../styles/card.css";
import pinImage from "../assets/pin.png";
import Button from "./Button";
import { Disc } from "../App";
import { useNavigate } from "react-router-dom";

interface CardProps {
  disc: Disc;
  className?: string;
}

const Card = (props: CardProps) => {
  const { disc, className } = props;
  const cardClassName = className ? `card-container ${className}` : "card-container";
  const navigate = useNavigate();

  const handleClaimDiscClick = () => {
    navigate(`/claimDisc/${disc.id}`);
  };
  
  return (
    <div className={cardClassName}>
      <div className="disc-info">
        <div className="div-block-2">
          <div className="circle-overlay">
            <img src={pinImage} alt="pin-icon" />
          </div>
          <div className="text-block-2">
            <div className="course-wrapper">{disc.course}</div>
          </div>
        </div>
        <img
          src="https://i.ebayimg.com/images/g/y-gAAOSwHtdlCbey/s-l1200.jpg"
          loading="lazy"
          alt="disc"
          className="image"
        />
        <div className="w-layout-grid grid grid-disc">
          <div className="course-list">
            <ul>
              <li>
                <i className="bx bx-palette" />
                <span>{disc.color}</span>
              </li>
              <li>
                <i className="bx bxs-user-detail" />
                <span>{disc.name}</span>
              </li>
              <li>
                <i className="bx bx-purchase-tag" />
                <span>
                  {disc.brand} {disc.disc}
                </span>
              </li>
            </ul>
            <div className="card-button-container">
              <Button
                text={"Claim Disc"}
                red={false}
                className="unset-padding btn-2"
                onClick={handleClaimDiscClick}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
