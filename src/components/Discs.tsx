import "../styles/discs.css"
import Card from "./Card"
import imageLogo from "../assets/DRN_WebLogo_HDPI.png";

const Discs = () => {
    return (
        <div className="card-container-discs">
        <Card
          Course={"Tranquility Trails"}
          Color={"Green"}
          Name={"D. Bryant"}
          DiscAndBrand={"Discraft Buzz"}
          img={imageLogo}
        />
        <Card
          Course={"Stafford Woods"}
          Color={"Blue"}
          Name={"A. Nichols"}
          DiscAndBrand={"MVP Volt"}
          img={imageLogo}
        />
        <Card
          Course={"Tranquility Trails"}
          Color={"Yellow"}
          Name={"C. Deck"}
          DiscAndBrand={"Axiom Crave"}
          img={imageLogo}
        />
        <Card
          Course={"Doc Cramer"}
          Color={"Red"}
          Name={"J. Doe"}
          DiscAndBrand={"Innova Roc3"}
          img={imageLogo}
        />
      </div>
    )
}

export default Discs