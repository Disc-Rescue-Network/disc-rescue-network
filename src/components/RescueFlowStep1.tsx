import React, { useState } from "react";
import HeaderRescueFlow from "./RescueFlowComponets";
import LogoRescueFlow from "./LogoRescueFlow";
import "../styles/rescueFlowStep.css";
import CoursePickerForm from "./CoursePickerForm";
import Button from "./Button";
import { SearchParams } from "../views/RescueFlow";
import { Disc } from "../App";

interface RescueFlowStep1Props {
  step: number;
  setStep: (step: number) => void;
  handleNextStep: (newSearchParams: SearchParams) => void;
  searchParams: SearchParams;
  setSearchParams: (searchParams: SearchParams) => void;
}

const RescueFlowStep1: React.FC<RescueFlowStep1Props> = ({
  step,
  handleNextStep,
  searchParams,
  setSearchParams,
}) => {
  const [state, setState] = useState("");
  const [course, setCourse] = useState("");
  // console.log("State", state);
  // console.log("Course", course);

  return (
    <>
      <LogoRescueFlow />
      <div className="rescue-flow-step">
        <HeaderRescueFlow
          baseText={"Rescue Flow"}
          lightText={"Wizard"}
          baseNumber={"1"}
          lightNumber={" / 5"}
          whereText={"where'd it go"}
          secondMissingText={" Missing?"}
          smallerText={""}
        />
      </div>
      <div className="course-picker-step1">
        <CoursePickerForm setState={setState} setCourse={setCourse} />
      </div>
      <div className="buttons-rescue">
        <Button
          text={"Next Step"}
          red={true}
          className="button-red-rescue-5"
          onClick={() => {
            console.log("Course", course);
            const newParams = { ...searchParams, course };
            console.log("New Params", newParams);
            setSearchParams(newParams);
            handleNextStep(newParams);
          }}
        />
        <Button
          text={"Don't Remember"}
          red={false}
          border={true}
          className="second-button-rescue-3 white-border"
          onClick={() => {
            console.log("Skipping, no course");
            const newParams = { ...searchParams, course: "" };
            handleNextStep(newParams);
          }}
        />
      </div>
    </>
  );
};

export default RescueFlowStep1;
