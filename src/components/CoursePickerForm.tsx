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
  const [allCourses, setAllCourses] = useState<Course[]>([]);

  const { setState, setCourse } = props;

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get<Course[]>(
          "https://api.discrescuenetwork.com/coursesData"
        );
        const validCourses = response.data.filter(
          (course: Course) => course.city && course.state && course.courseName
        );

        setAllCourses(validCourses);

        const states = Array.from(
          new Set(
            validCourses.map(
              (course: Course) =>
                stateAbbreviations[course.state] || course.state
            )
          )
        );
        setUniqueStates(["All", ...states]);
      } catch (error) {
        console.error("Erro ao buscar os cursos:", error);
      }
    };

    fetchCourses();
  }, []);

  const handleStateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedState = event.target.value;
    setSelectedState(selectedState);
    setState(selectedState);
    setSelectedCourse(
      allCourses.find(
        (course) =>
          (stateAbbreviations[course.state] || course.state) === selectedState
      )?.courseName || ""
    );
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

    const correspondingState = allCourses.find(
      (course) => course.courseName === selectedCourse
    )?.state;
    if (correspondingState) {
      const stateAbbreviation =
        stateAbbreviations[correspondingState] || correspondingState;
      setSelectedState(stateAbbreviation);
      setState(stateAbbreviation);
    }

    console.log(selectedCourse);
  };

  console.log("selected state", selectedState);

  const filteredCourses =
    selectedState === "All" || selectedState === "STATE" || selectedState === ""
      ? allCourses
      : allCourses.filter(
          (course) =>
            (stateAbbreviations[course.state] || course.state) === selectedState
        );

  return (
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
  );
};

export default CoursePickerForm;
