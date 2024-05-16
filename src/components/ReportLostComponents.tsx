import { Form } from "react-router-dom";
import "../styles/reportLostComponents.css";
import FormReportLost from "./NameAndInitialForm";
import FormReportLost2 from "./FormReportLost2";
import FormReportLost3 from "./FormReportLost3";
import CoursePickerForm from "./CoursePickerForm";
import Button from "./Button";
import { useState } from "react";
import NameAndInitialForm from "./NameAndInitialForm";

interface HeaderReportLostProps {
  className?: string;
  contactMethod: "phone" | "email";
}

const ReportLostComponents = (props: HeaderReportLostProps) => {
  const { className, contactMethod } = props;

  const [state, setState] = useState("");
  const [course, setCourse] = useState("");
  const [brand, setBrand] = useState("");

  console.log("course", course);
  console.log("state", state);
  console.log("brand", brand);

  //the purpose of this component is to render the form for the user to report a lost disc & then submit the data from the form to the backend

  return (
    <div className={`report-lost-components ${className}`}>
      <h2>
        Enter The
        <span className="fw-light">Network</span>
      </h2>
      <NameAndInitialForm />
      <FormReportLost2
        initialName={"Color"}
        lastName={"Phone Number Written on The Disc"}
        contactMethod={contactMethod}
      />
      <FormReportLost3 initialName={"Brand"} lastName={"Enter Disc Name"} />
      <CoursePickerForm setState={setState} setCourse={setCourse} />
      <Button
        text={"Enter Your Disc into the Network"}
        red={true}
        className="button-report-lost"
        onClick={() => {
          alert("button clicked");
        }}
      />
    </div>
  );
};

export default ReportLostComponents;
