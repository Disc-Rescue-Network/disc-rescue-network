import "../styles/courses.css"

interface CoursesProps {
  baseText: string;
  lightText: string;
  subBaseText: string;
  subLightText: string;
}

const Courses = (props: CoursesProps) => {
  const { baseText, lightText, subBaseText, subLightText } = props;
    return (
        <>
          <div className="rescue-courses">
            <h2>
                {baseText}
                <span className="fw-light"> {lightText}</span>
            </h2>
            <h4 className="mt-0 mb-6 text-white text-center where sub-header-courses">{subBaseText} <span className="missingtext">{subLightText}</span></h4>
          </div>
        </>
    )
}

export default Courses;