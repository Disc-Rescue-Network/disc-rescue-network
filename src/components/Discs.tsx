import "../styles/discs.css"
import Card from "./Card"
import imageLogo from "../assets/DRN_WebLogo_HDPI.png";

interface Disc {
  course: string;
  color: string;
  name: string;
  discAndBrand: string;
}

interface DiscsProps {
  arrayOfDiscs: Disc[];
}

const Discs = ({ arrayOfDiscs }: DiscsProps) => {
    return (
        <div className="card-container-discs">
          {arrayOfDiscs.map((disc, index) => (
            <Card
              key={index}
              Course={disc.course}
              Color={disc.color}
              Name={disc.name}
              DiscAndBrand={disc.discAndBrand}
              img={imageLogo} />  
          ))}
      </div>
    )
}

export default Discs