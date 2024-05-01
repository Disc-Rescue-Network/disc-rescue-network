import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import LogoRescueFlow2 from "../components/LogoRescueFlow2";
import RequestCourseComponents from "../components/RequestCourseComponents";
import FormRequestCourse from "../components/FormRequestCourse";
import Button from "../components/Button";

export default function Settings() {  
    return (
        <div className="container-request-course">
            <div className="main-section-request">
            <i className="arrow-left-icon-request-course" style={{top: '70px'}}>
                 <FontAwesomeIcon icon={faArrowLeft} />
            </i>
            <div className="logo-request-course">
                <LogoRescueFlow2 />
            </div>
            <RequestCourseComponents 
                baseText={"Request a"}
                lightText={"Course"}
                whereText={"What are we"}
                secondMissingText={" Missing?"}/> 
            </div> 
            <FormRequestCourse initialName={"State"} lastName={"Course Name"} />
            <Button
                text={"Request Your Course"}
                red={true}
                className="button-request"
                onClick={() => {
                  alert("button clicked");
                }}
              />
        </div>
    )
}