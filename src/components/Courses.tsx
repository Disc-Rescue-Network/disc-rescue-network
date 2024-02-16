import "../styles/courses.css"
import Button from "./Button";
import Form from "./Forms";
import HeaderCourses from "./HeaderCourses";
import SubHeaderCourses from "./SubHeaderCourses";

const Courses = () => {
    return (
        <>
        <HeaderCourses baseText={"Choose your"} lightText={"Course"} />
        <SubHeaderCourses baseText={"Where to"} lightText={"Search?"} />
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