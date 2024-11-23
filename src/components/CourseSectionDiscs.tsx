import "../styles/discs.css";
import Card from "./Card";
import { Disc } from "../App";
import "../styles/courseSection.css";

interface CourseDiscsProps {
  arrayOfDiscs: Disc[];
}

const CourseSectionDiscs = ({ arrayOfDiscs }: CourseDiscsProps) => {
  return (
    <div className="row-search">
      {arrayOfDiscs.map((disc) => (
        <Card key={disc.id} disc={disc} showButton={true} />
      ))}
    </div>
  );
};

export default CourseSectionDiscs;
