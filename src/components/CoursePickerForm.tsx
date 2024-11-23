import "../styles/rescueFlowForms.css";
import { useEffect, useState } from "react";
import { useCourses } from "../hooks/useCourses";
import { Course } from "../App";

interface CoursePickerProps {
  setCourse: (course: string) => void;
  setState: (state: string) => void;
}

const stateAbbreviations: { [key: string]: string } = {
  Alabama: "AL",
  Alaska: "AK",
  Arizona: "AZ",
  Arkansas: "AR",
  California: "CA",
  Colorado: "CO",
  Connecticut: "CT",
  Delaware: "DE",
  Florida: "FL",
  Georgia: "GA",
  Hawaii: "HI",
  Idaho: "ID",
  Illinois: "IL",
  Indiana: "IN",
  Iowa: "IA",
  Kansas: "KS",
  Kentucky: "KY",
  Louisiana: "LA",
  Maine: "ME",
  Maryland: "MD",
  Massachusetts: "MA",
  Michigan: "MI",
  Minnesota: "MN",
  Mississippi: "MS",
  Missouri: "MO",
  Montana: "MT",
  Nebraska: "NE",
  Nevada: "NV",
  "New Hampshire": "NH",
  "New Jersey": "NJ",
  "New Mexico": "NM",
  "New York": "NY",
  "North Carolina": "NC",
  "North Dakota": "ND",
  Ohio: "OH",
  Oklahoma: "OK",
  Oregon: "OR",
  Pennsylvania: "PA",
  "Rhode Island": "RI",
  "South Carolina": "SC",
  "South Dakota": "SD",
  Tennessee: "TN",
  Texas: "TX",
  Utah: "UT",
  Vermont: "VT",
  Virginia: "VA",
  Washington: "WA",
  "West Virginia": "WV",
  Wisconsin: "WI",
  Wyoming: "WY",
};

const CoursePickerForm = (props: CoursePickerProps) => {
  const [selectedState, setSelectedState] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [uniqueStates, setUniqueStates] = useState<string[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);

  const { setState, setCourse } = props;

  const { courses, fetchCourses, loading: loadingCourses } = useCourses();

  useEffect(() => {
    if (!loadingCourses) {
      console.log("courses", courses);
      const filtered = courses.filter(
        (course) => course.activeForLostAndFound === 1
      );
      console.log("filteredCourses", filtered);
      setFilteredCourses(filtered);
      const uniqueStates = Array.from(
        new Set(
          filteredCourses.map((course) => {
            // Debugging step to log each state
            console.log("Mapping state:", course.state);
            return stateAbbreviations[course.state] || course.state;
          })
        )
      ).sort();
      console.log("uniqueStates", uniqueStates);
      setUniqueStates(uniqueStates);
    }
  }, [loadingCourses]);

  const handleStateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedState = event.target.value;
    setSelectedState(selectedState);
    setState(selectedState);
    const course =
      courses.find(
        (course) =>
          (stateAbbreviations[course.state] || course.state) === selectedState
      )?.name || "";
    setSelectedCourse(course);
    setCourse(course);
  };

  const handleCourseChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCourse = event.target.value;
    setSelectedCourse(selectedCourse);
    setCourse(selectedCourse);

    if (selectedCourse === "SELECT A COURSE") {
      setSelectedState("");
      setState("");
      return;
    }

    const correspondingState = courses.find(
      (course) => course.name === selectedCourse
    )?.state;
    if (correspondingState) {
      const stateAbbreviation =
        stateAbbreviations[correspondingState] || correspondingState;
      setSelectedState(stateAbbreviation);
      setState(stateAbbreviation);
    }

    //console.log(selectedCourse);
  };

  //console.log("selected state", selectedState);

  // const filteredCourses =
  //   selectedState === "All" || selectedState === "STATE" || selectedState === ""
  //     ? courses
  //     : courses.filter(
  //         (course) =>
  //           (stateAbbreviations[course.state] || course.state) === selectedState
  //       );

  return (
    <div className="mt-5 mb-3 select-box-forms report-lost-class">
      <div className="col-2-forms pe-0 arrow one report-class-col-4">
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
      <div className="col-10-forms pe-0 arrow report-class-col-8">
        <select
          className="form-select-rescue-flow report-lost-form-select"
          value={selectedCourse}
          onChange={handleCourseChange}
        >
          <option value="">SELECT A COURSE</option>
          {filteredCourses.map((course, index) => (
            <option key={index} value={course.name}>
              {course.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default CoursePickerForm;
