import { Form, useNavigate } from "react-router-dom";
import "../styles/reportLostComponents.css";
import FormReportLost from "./NameAndInitialForm";
import FormReportLost2 from "./FormReportLost2";
import FormReportLost3 from "./FormReportLost3";
import CoursePickerForm from "./CoursePickerForm";
import Button from "./Button";
import { useState } from "react";
import NameAndInitialForm from "./NameAndInitialForm";
import PopupReportLostDisc from "./PopupReportLostDisc";

interface HeaderReportLostProps {
  className?: string;
  contactMethod: "phone" | "email";
}

const ReportLostComponents = (props: HeaderReportLostProps) => {
  const [showPopupReport, setShowPopupReport] = useState(false);
  const { className, contactMethod } = props;
  const [contactValue, setContactValue] = useState("");
  const [firstName, setFirstName] = useState("First Initial");
  const [lastName, setLastName] = useState("");
  const [color, setColor] = useState("Color");
  const [course, setCourse] = useState("Select a Course");
  const [state, setState] = useState("State");
  const [brand, setBrand] = useState("Brand");
  const [discName, setDiscName] = useState("");

  const handleButtonClick = () => {
    setShowPopupReport(true);
  };

  const handleClosePopup = () => {
    setShowPopupReport(false);
  };

  const handleContactValueChange = (value: string) => {
    setContactValue(value);
  };

  const handleFirstNameChange = (value: string) => {
    setFirstName(value);
  };

  const handleLastNameChange = (value: string) => {
    setLastName(value);
  };

  const handleBrandChange = (value: string) => {
    setBrand(value);
  };

  const handleDiscNameChange = (value: string) => {
    setDiscName(value);
  };

  const handleDiscColorChange = (value: string) => {
    setColor(value);
  };

  return (
    <div className={`report-lost-components ${className}`}>
      <h2>
        Enter The
        <span className="fw-light"> Network</span>
      </h2>
      <NameAndInitialForm
        onFirstNameChange={handleFirstNameChange}
        onLastNameChange={handleLastNameChange}
      />
      <FormReportLost2
        color={color}
        number={"Phone Number Written on The Disc"}
        contactMethod={contactMethod}
        onContactValueChange={handleContactValueChange}
        onColorChange={handleDiscColorChange}
      />
      <FormReportLost3
        initialName={"Brand"}
        lastName={"Enter Disc Name"}
        onBrandChange={handleBrandChange}
        onDiscNameChange={handleDiscNameChange}
      />
      <CoursePickerForm setState={setState} setCourse={setCourse} />
      <Button
        text={"Enter Your Disc into the Network"}
        red={true}
        className="button-report-lost"
        onClick={handleButtonClick}
      />
      {showPopupReport && (
        <PopupReportLostDisc
          title={"Verify your info"}
          name={`${firstName} ${lastName}`}
          contactMethod={contactMethod}
          contactValue={contactValue}
          disc={`${color} ${discName} (${brand})`}
          course={`${course}, ${state}`}
          onClose={handleClosePopup}
        />
      )}
    </div>
  );
};

export default ReportLostComponents;
