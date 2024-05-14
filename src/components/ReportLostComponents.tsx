import { Form } from "react-router-dom";
import "../styles/reportLostComponents.css"
import FormReportLost from "./FormReportLost";
import FormReportLost2 from "./FormReportLost2";
import FormReportLost3 from "./FormReportLost3";
import CoursePickerForm from "./CoursePickerForm";
import Button from "./Button";

interface HeaderReportLostProps {
    baseText: string;
    lightText: string;
    className?: string; 
}

const ReportLostComponets = (props: HeaderReportLostProps) => {
    const { baseText, lightText, className } = props;
    return (
        <div className={`report-lost-components ${className}`}>
            <h2>
                {baseText}
                <span className="fw-light"> {lightText}</span>
            </h2>
            <FormReportLost initialName={"First Initial"} lastName={"Last Name"} /> 
            <FormReportLost2 initialName={"Color"} lastName={"Phone Number Written on The Disc"} />
            <FormReportLost3 initialName={"Brand"} lastName={"Enter Disc Name"} />
            <CoursePickerForm />
            <Button
                text={"Enter Your Disc into the Network"}
                red={true}
                className="button-report-lost"
                onClick={() => {
                  alert("button clicked");
                }}
              />
        </div>
    )
}

export default ReportLostComponets;