import '../styles/card.css'
import pinImage from '../assets/pin.png';
import imageLogo from '../assets/DRN_WebLogo_HDPI.png';

type CardProps = {
    Course: string;
    img: string;
    Color: string;
    Name: string;
    Brand: string; 
}

const Card = ({ Course, img, Color, Name, Brand }: CardProps) => {
    return (
        <div className="card-container">
            <div className="disc-info">
                <div className="div-block-2">
                    <div className="circle-overlay">
                       <img src={pinImage} />
                    </div>
                    <div className="text-block-2">
                        <div className="course-wrapper">{Course}tranquily trails</div>
                    </div>
                </div>
                <img src={imageLogo} loading="lazy" alt="${disc.Disc}" className="image" />
                <div className="w-layout-grid grid grid-disc">
                    <div className="course-list">
                        <ul>
                            <li><i className='bx bx-palette' /><span>{Color}Green Raptor</span></li>
                            <li><i className='bx bxs-user-detail' /><span>{Name}C. Deck</span></li>
                            <li><i className='bx bx-purchase-tag' /><span>{Brand}MVP</span></li>                                      
                        </ul>
                        <button className="btn-2">Claim Disc</button>
                    </div>                             
                </div>
            </div>
        </div>
    )
}

export default Card;