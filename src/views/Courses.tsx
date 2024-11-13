import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LogoRescueFlow2 from "../components/LogoRescueFlow2";
import RequestCourseComponets from "../components/RequestCourseComponents";
import CoursePickerForm from "../components/CoursePickerForm";
import Button from "../components/Button";
import "../styles/coursesSelected.css";

export default function () {
  const [state, setState] = useState("");
  const [course, setCourse] = useState("");

  const [step, setStep] = useState(1);

  const navigate = useNavigate();

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }

    if (step === 1) {
      navigate("/");
    }
  };

  const handleSearch = () => {
    if (course) {
      const encodedCourse = encodeURIComponent(course);
      navigate(`/searchInventory?course=${encodedCourse}`);
    } else {
      alert("Please select a course.");
    }
  };

  return (
    <div className="container-store">
      <div className="logo-and-arrow">
        <i
          className="arrow-left-icon"
          style={{ fontSize: "1.5rem" }}
          onClick={handleBack}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </i>
        <LogoRescueFlow2 />
      </div>
      {/* <SelectCourse
        baseText={"Choose Your"}
        lightText={"Course"}
        secondMissingText={"Where did you lose your disc?"}
      /> */}
      <RequestCourseComponets
        baseText={"Choose Your"}
        lightText={"Course"}
        whereText={"Don't see your course?"}
        linkText={"Let us know"}
        secondMissingText={
          " and we will try to get them added as a Rescue Beacon."
        }
      />
      <CoursePickerForm setState={setState} setCourse={setCourse} />
      <Button
        text={"Search at the Selected Course"}
        red={true}
        className="button-red-courses"
        onClick={handleSearch}
      />
    </div>
  );
}
