import "../styles/requestCourseComponents.css";

interface HeaderRescueRequestProps {
  baseText: string;
  lightText: string;
  whereText?: string;
  linkText?: string;
  secondMissingText?: string;
  className?: string;
}

const RequestCourseComponets = (props: HeaderRescueRequestProps) => {
  const {
    baseText,
    lightText,
    whereText,
    linkText,
    secondMissingText,
    className,
  } = props;
  return (
    <div className={`request-course-components ${className}`}>
      <h2>
        {baseText}
        <span className="fw-light"> {lightText}</span>
      </h2>
      <h4 className="where-request">
        {whereText}{" "}
        <a href="https://discrescuenetwork.com/request-course">{linkText}</a>
        <span className="secondary-missing-text-request">
          {secondMissingText}
        </span>
      </h4>
    </div>
  );
};

export default RequestCourseComponets;
