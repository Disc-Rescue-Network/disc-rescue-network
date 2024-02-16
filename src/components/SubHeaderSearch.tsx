import "../styles/subHeaderSearch.css";

interface SubHeaderSearchProps {
  courseName: string;
}

const SubHeaderSearch = (props: SubHeaderSearchProps) => {
  return (
    <div className="rescue">
      <h3>
        All Lost
        <span className="search-disc">Discs</span>
      </h3>
      <p className="course-name">@ {props.courseName}</p>
    </div>
  );
};

export default SubHeaderSearch;
