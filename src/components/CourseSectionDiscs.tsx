import "../styles/discs.css";
import Card from "./Card";
import { Disc } from "../App";
import "../styles/courseSection.css"

interface CourseDiscsProps {
  arrayOfDiscs: Disc[];
}

const CourseSectionDiscs = ({ arrayOfDiscs }: CourseDiscsProps) => {
  return (
    <div className="row-search">
        {arrayOfDiscs.map((disc) => (
          <Card 
            className="card-course-section" 
            key={disc.id} 
            disc={disc} />
        ))}
    </div>
  );
};

export default CourseSectionDiscs;