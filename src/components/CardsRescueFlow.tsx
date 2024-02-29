import pinImage from "../assets/pin.png";
import imageLogo from "../assets/DRN_WebLogo_HDPI.png";

type CardProps = {
    Course: string;
    img: string;
    Color: string;
    Name: string;
    DiscAndBrand: string;
  };

const CardsRescueFLow = ({ Course, img, Color, Name, DiscAndBrand }: CardProps) => {
    return (
    <div className="card-container" style={{ justifyContent: 'center' }}>
      <div className="disc-info">
        <div className="div-block-2">
          <div className="circle-overlay">
            <img src={pinImage} alt="pin-icon" />
          </div>
          <div className="text-block-2">
            <div className="course-wrapper">{Course}</div>
          </div>
        </div>
        <img src={img} loading="lazy" alt="disc" className="image" style={{ backgroundColor: '#353535' }}/>
        <div className="w-layout-grid grid grid-disc">
          <div className="course-list" style={{ height: '103px' }}>
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
          </div>
        </div>
      </div>
    </div>
    );
}

export default CardsRescueFLow;