import "../styles/discs.css";
import Card from "./Card";
import { Disc } from "../App";
import SkeletonCard from "./SkeletonCard";

interface DiscsProps {
  arrayOfDiscs: Disc[];
}

const Discs = ({ arrayOfDiscs }: DiscsProps) => {
  return (
    <div className="discs">
      <div className="card-container-discs">
        {arrayOfDiscs.length > 0
          ? arrayOfDiscs.map((disc) => (
              <Card key={disc.id} disc={disc} showButton={true} />
            ))
          : // Render skeleton cards when there are no discs
            Array.from({ length: 5 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))}
      </div>
    </div>
  );
};

export default Discs;
