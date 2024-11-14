import "../styles/card.css";
import pinImage from "../assets/pin.png";
import noImageFound from "../assets/newAssets/noimagefound_drn.png";
import Button from "./Button";
import { Disc } from "../App";
import { useNavigate } from "react-router-dom";

interface CardProps {
  disc: Disc;
  className?: string;
  showButton: boolean;
}

const Card = (props: CardProps) => {
  const { disc, className, showButton } = props;
  const cardClassName = className
    ? `card-container ${className}`
    : "card-container";
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
            <div className="course-wrapper">{disc.course.name}</div>
          </div>
        </div>
        <div className="image-wrapper">
          <img
            src={disc.topImage || noImageFound}
            loading="lazy"
            alt="disc"
            className="image"
            onError={(e) => {
              e.currentTarget.src = noImageFound;
            }}
          />
          {disc.claims.length > 0 && (
            <div className="ribbon">Pending Claims</div>
          )}
        </div>
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
                  {disc.disc.brand.name} {disc.disc.name}
                </span>
              </li>
            </ul>
            <div className="card-button-container">
              {showButton && (
                <Button
                  text={"Claim Disc"}
                  red={false}
                  className="padding-1 btn-2 padding"
                  onClick={handleClaimDiscClick}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
