import "../styles/discs.css"
import Card from "./Card"
import imageLogo from "../assets/DRN_WebLogo_HDPI.png";
import { Disc } from "../App";



interface DiscsProps {
  arrayOfDiscs: Disc[];
}

const Discs = ({ arrayOfDiscs }: DiscsProps) => {
    return (
      <div className="discs">
        <div className="card-container-discs">
          
          
      </div>
      </div>
    )
}

export default Discs