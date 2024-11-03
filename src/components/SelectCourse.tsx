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
      <h3 className="where-request">
        {whereText}
        <span className="secondary-missing-text-request">
          {secondMissingText}
        </span>
      </h3>
    </div>
  );
};

export default RequestCourseComponets;
