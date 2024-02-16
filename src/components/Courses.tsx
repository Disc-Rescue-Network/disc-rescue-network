import "../styles/courses.css"
import Button from "./Button";
import Form from "./Forms";
import HeaderCourses from "./HeaderCourses";
import SubHeaderCourses from "./SubHeaderCourses";

interface CoursesProps {
  baseText: string;
  lightText: string;
  subBaseText: string;
  subLightText: string;
}

const Courses = (props: CoursesProps) => {
  const { baseText, lightText, subBaseText, subLightText } = props;
    return (
        <>
          <div className="rescue-courses">
            <h2>
                {baseText}
                <span className="fw-light"> {lightText}</span>
            </h2>
            <h4 className="mt-0 mb-6 text-white text-center where sub-header-courses">{subBaseText} <span className="missingtext">{subLightText}</span></h4>
          </div>
        <Form inicialOption={"State"} courseOption={"Select a Course"} />
        <Button 
          className="button-course"
          text={"SEARCH AT THE SELECTED COURSE"} 
          red={true}
          onClick={() => {
            alert("button clicked");
          }} 
        />
        </>
    )
}

export default Courses;