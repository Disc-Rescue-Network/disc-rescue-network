import "../styles/card-2.css";
import pinImage from "../assets/pin.png";
import noImageFound from "../assets/newAssets/ImageNotFound.jpg";
import Button from "./Button";
import { Disc } from "../App";
import { useNavigate } from "react-router-dom";

interface CardProps {
  disc: Disc;
  className?: string;
  showButton: boolean;
  showButtonBorder?: boolean;
}

const Card = (props: CardProps) => {
  const { disc, className, showButton, showButtonBorder } = props;
  const cardClassName = className
    ? `card-container ${className}`
    : "card-container";
  const navigate = useNavigate();

  const handleClaimDiscClick = () => {
    navigate(`/claimDisc/${disc.id}`);
  };

  return (
    <div className={cardClassName}>
      <div className="div-block-2">
        {/* <div className="circle-overlay"> */}
        <img src={pinImage} alt="Location Pin" className="circle-overlay" />
        {/* </div> */}
        <div className="text-block-2">{disc.course.name}</div>
      </div>
      <div className="image-wrapper">
        <img
          src={disc.topImage || noImageFound}
          loading="lazy"
          alt={`${disc.disc.brand.name} ${disc.disc.name}`}
          className="image"
          onError={(e) => {
            e.currentTarget.src = noImageFound;
          }}
        />
        {disc.claims.length > 0 && <div className="ribbon">Pending Claim</div>}
      </div>

      <div className="disc-info">
        <ul className="course-list">
          {disc.color && (
            <li>
              <i className="bx bx-palette" />
              <span>{disc.color}</span>
            </li>
          )}
          {disc.name && (
            <li>
              <i className="bx bxs-user-detail" />
              <span>{disc.name}</span>
            </li>
          )}
          {disc.disc.name && (
            <li>
              <i className="bx bx-purchase-tag" />
              <span>
                {disc.disc.brand.name} {disc.disc.name}
              </span>
            </li>
          )}
          {disc.disc.plasticType && (
            <li>
              <i className="bx bx-category"></i>
              <span>{disc.disc.plasticType} Plastic</span>
            </li>
          )}
        </ul>

        {showButton && (
          <div className="card-button-container">
            <Button
              text="Claim Disc"
              red={false}
              className="padding-1"
              border={showButtonBorder}
              onClick={handleClaimDiscClick}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
