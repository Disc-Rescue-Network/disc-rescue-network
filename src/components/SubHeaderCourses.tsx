import "../styles/subHeaderCourses.css"

interface SubHeaderCourses {
    baseText: string;
    lightText: string;
}

const SubHeaderCourses = ( props: SubHeaderCourses) => {
    const { baseText, lightText } = props; 
    return (
        <h4 className="mt-0 mb-6 text-white text-center where sub-header-courses">{baseText} <span className="missingtext">{lightText}</span></h4>
    )
}

export default SubHeaderCourses