import "../styles/discs.css";
import Card from "./Card";
import { Disc } from "../App";
import "../styles/courseSection.css"

interface CourseDiscsProps {
  arrayOfDiscs: Disc[];
  selectedCourseId: string | null;
}

const CourseSectionDiscs = ({ arrayOfDiscs, selectedCourseId }: CourseDiscsProps) => {
  let filteredDiscs = arrayOfDiscs;

  if (selectedCourseId) {
    filteredDiscs = arrayOfDiscs.filter((disc) => disc.course === selectedCourseId);
  }

  return (
    <div className="row-search">
        {filteredDiscs.map((disc) => (
          <Card 
            className="card-course-section" 
            key={disc.id} 
            disc={disc} />
        ))}
    </div>
  );
};

export default CourseSectionDiscs;