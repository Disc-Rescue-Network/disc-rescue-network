import axios from "axios";
import "../styles/rescueFlowForms.css";
import { useEffect, useState } from "react";

interface Course {
  courseName: string;
  city: string;
  state: string;
  orgCode?: string;
}

interface CoursePickerProps {
  setCourse: (course: string) => void;
  setState: (state: string) => void;
}

const CoursePickerForm = (props: CoursePickerProps) => {
  const [selectedState, setSelectedState] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [uniqueStates, setUniqueStates] = useState<string[]>([]);
  const [allCourses, setAllCourses] = useState<Course[]>([]);

  const { setState, setCourse } = props;

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get<Course[]>('https://api.discrescuenetwork.com/coursesData');
        const validCourses = response.data.filter((course: Course) => course.city && course.state && course.courseName);
        
        setAllCourses(validCourses);
        
        const states = Array.from(new Set(validCourses.map((course: Course) => course.state)));
        setUniqueStates(["All", ...states]);
      } catch (error) {
        console.error('Error when searching for courses:', error);
      }
    };

    fetchCourses();
  }, []);

  const handleStateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedState(event.target.value);
    const selectedState = event.target.value;
    console.log(selectedState);

    const correspondingCourse = allCourses.find(
      (course) => course.state === selectedState
    );
    console.log(correspondingCourse);
    console.log(allCourses);
    if (correspondingCourse) {
      console.log(correspondingCourse.courseName);
      setSelectedCourse(correspondingCourse.courseName);
      setCourse(correspondingCourse.courseName);
    }
    setState(selectedState);
  };

  const handleCourseChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (event.target.value === "SELECT A COURSE") {
      setSelectedState("");
      return;
    }

    setSelectedCourse(event.target.value);

    const selectedCourse = event.target.value;
    console.log(selectedCourse);
    const correspondingState = allCourses.find(
      (course) => course.courseName === selectedCourse
    )?.state;
    console.log(correspondingState);
    if (correspondingState) {
      setSelectedState(correspondingState);
    }
    setCourse(selectedCourse);
  };

  console.log("selected state", selectedState);

  const filteredCourses =
    selectedState === "All" || selectedState === "STATE" || selectedState === ""
      ? allCourses
      : allCourses.filter((course) => course.state === selectedState);

  return (
    <>
      <div className="mt-5 mb-3 select-box-forms report-lost-class">
        <div className="col-4-forms pe-0 arrow one report-class-col-4">
          <select
            className="form-select-rescue-flow report-lost-form-select"
            onChange={handleStateChange}
            value={selectedState}
          >
            <option value="">STATE</option>
            {uniqueStates.map((state, index) => (
              <option key={index} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>
        <div className="col-8-forms pe-0 arrow report-class-col-8">
          <select
            className="form-select-rescue-flow report-lost-form-select"
            value={selectedCourse}
            onChange={handleCourseChange}
          >
            <option value="">SELECT A COURSE</option>
            {filteredCourses.map((course, index) => (
              <option key={index} value={course.courseName}>
                {course.courseName}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
};

export default CoursePickerForm;
