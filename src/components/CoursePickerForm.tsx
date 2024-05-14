import "../styles/rescueFlowForms.css";
import { useEffect, useState } from "react";

var stateTuples: string[][];

var stateTuples = [
  ["All", "All"],
  ["Alabama", "AL"],
  ["Alaska", "AK"],
  ["Arizona", "AZ"],
  ["Arkansas", "AR"],
  ["California", "CA"],
  ["Colorado", "CO"],
  ["Connecticut", "CT"],
  ["Delaware", "DE"],
  ["Florida", "FL"],
  ["Georgia", "GA"],
  ["Hawaii", "HI"],
  ["Idaho", "ID"],
  ["Illinois", "IL"],
  ["Indiana", "IN"],
  ["Iowa", "IA"],
  ["Kansas", "KS"],
  ["Kentucky", "KY"],
  ["Louisiana", "LA"],
  ["Maine", "ME"],
  ["Maryland", "MD"],
  ["Massachusetts", "MA"],
  ["Michigan", "MI"],
  ["Minnesota", "MN"],
  ["Mississippi", "MS"],
  ["Missouri", "MO"],
  ["Montana", "MT"],
  ["Nebraska", "NE"],
  ["Nevada", "NV"],
  ["New Hampshire", "NH"],
  ["New Jersey", "NJ"],
  ["New Mexico", "NM"],
  ["New York", "NY"],
  ["North Carolina", "NC"],
  ["North Dakota", "ND"],
  ["Ohio", "OH"],
  ["Oklahoma", "OK"],
  ["Oregon", "OR"],
  ["Pennsylvania", "PA"],
  ["Rhode Island", "RI"],
  ["South Carolina", "SC"],
  ["South Dakota", "SD"],
  ["Tennessee", "TN"],
  ["Texas", "TX"],
  ["Utah", "UT"],
  ["Vermont", "VT"],
  ["Virginia", "VA"],
  ["Washington", "WA"],
  ["West Virginia", "WV"],
  ["Wisconsin", "WI"],
  ["Wyoming", "WY"],
];

var courses = [
  { name: "Maple Hill", city: "Leicester", state: "Massachusetts" },
  { name: "Tranquility Trails", city: "Woolwich", state: "New Jersey" },
  { name: "Blue Ribbon Pines", city: "East Bethel", state: "Minnesota" },
  { name: "Flip City", city: "Shelby", state: "Michigan" },
  { name: "Fox Run Meadows", city: "Smugglers' Notch", state: "Vermont" },
  { name: "Idlewild", city: "Burlington", state: "Kentucky" },
  { name: "The Beast", city: "Waco", state: "Texas" },
  { name: "DeLaveaga", city: "Santa Cruz", state: "California" },
  { name: "Hornets Nest", city: "Charlotte", state: "North Carolina" },
  { name: "Fountain Hills", city: "Fountain Hills", state: "Arizona" },
  { name: "Rollin Ridge", city: "Reedsville", state: "Wisconsin" },
  {
    name: "S.Y. Wilson Arlington Sports Complex",
    city: "Arlington",
    state: "Tennessee",
  },
  { name: "10-3 at CB", city: "Mt. Crested Butte", state: "Colorado" },
  {
    name: "1000 Acres Ranch Disc Golf Course",
    city: "Stony Creek",
    state: "New York",
  },
  {
    name: "2022 Lucky Disc Golf Open Freeman North",
    city: "Idaho Falls",
    state: "Idaho",
  },
  { name: "3 Creeks", city: "Rising Sun", state: "Maryland" },
  { name: "50 Acre Park", city: "Evergreen", state: "Illinois" },
  { name: "501 Disc Golf", city: "Warren", state: "Massachusetts" },
  {
    name: "65th Infantry Veterans Disc Golf Course",
    city: "Kissimmee",
    state: "Florida",
  },
  { name: "A. J. Jolly Park", city: "Alexandria", state: "Kentucky" },
  { name: "Stafford Woods", city: "Voorhees", state: "New Jersey" },
  { name: "Bellevue State Park", city: "Bellevue", state: "Delaware" },
  {
    name: "Inverness Disc Golf Park",
    city: "Inverness",
    state: "Florida",
  },
  {
    name: "Girdwood Forest Fair Park",
    city: "Girdwood",
    state: "Alaska",
  },
  {
    name: "Windy Ridge Disc Golf at Mitchusson Park",
    city: "Huntsville",
    state: "Arkansas",
  },
  { name: "North Landing", city: "Virginia Beach", state: "Virginia" },
];

interface Course {
  name: string;
  city: string;
  state: string;
  orgCode?: string;
}

const CoursePickerForm = () => {
  const [selectedState, setSelectedState] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [uniqueStates, setUniqueStates] = useState<string[]>([]);
  const [allCourses, setAllCourses] = useState<Course[]>(courses);

  useEffect(() => {
    const states = stateTuples.map((tuple) => tuple[0]);
    setUniqueStates([...states]);
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
      console.log(correspondingCourse.name);
      setSelectedCourse(correspondingCourse.name);
    }
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
      (course) => course.name === selectedCourse
    )?.state;
    console.log(correspondingState);
    if (correspondingState) {
      setSelectedState(correspondingState);
    }
  };

  useEffect(() => {
    var remainingStates = [
      "Alabama",
      "Connecticut",
      "Georgia",
      "Hawaii",
      "Iowa",
      "Indiana",
      "Kansas",
      "Louisiana",
      "Maine",
      "Mississippi",
      "Montana",
      "Nebraska",
      "Nevada",
      "New Hampshire",
      "New Mexico",
      "North Dakota",
      "Ohio",
      "Oklahoma",
      "Oregon",
      "Rhode Island",
      "South Carolina",
      "South Dakota",
      "Utah",
      "Vermont",
      "Washington",
      "West Virginia",
      "Wyoming",
    ];

    const updatedCourses = [...courses];
    remainingStates.forEach((state) => {
      if (!updatedCourses.some((course) => course.state === state)) {
        updatedCourses.push({
          name: `${state} Disc Golf Course`,
          city: `${state} City`,
          state: state,
        });
      }
    });
    setAllCourses(updatedCourses);
  }, []);

  const filteredCourses =
    selectedState === "All"
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
            <option selected>STATE</option>
            {stateTuples.map((state, index) => (
              <option key={index} value={state[0]}>
                {state[1]}
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
            <option selected>SELECT A COURSE</option>
            {filteredCourses.map((course, index) => (
              <option key={index} value={course.name}>
                {course.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
};

export default CoursePickerForm;
