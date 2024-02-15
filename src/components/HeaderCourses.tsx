import "../styles/headerCourses.css"

interface HeaderCoursesProps {
    baseText: string;
    lightText: string;
}

const HeaderCourses = (props: HeaderCoursesProps) => {
    const { baseText, lightText } = props;
    return (
        <div className="rescue-courses">
            <h2>
                {baseText}
                <span className="fw-light"> {lightText}</span>
            </h2>
        </div>
    )
}

export default HeaderCourses