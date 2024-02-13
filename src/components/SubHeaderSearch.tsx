import "../styles/subHeaderSearch.css"

interface SubHeaderSearchProps {
    CourseName: string;
}

const SubHeaderSearch = (props: SubHeaderSearchProps) => {
    const  { CourseName } = props;
    return (
        <div className="rescue">
            <h3>
              ALL LOST <span className="search-disc">DISCS</span>
            </h3>
            <p className="course-name">{CourseName}</p>
        </div>
    )
}

export default SubHeaderSearch;