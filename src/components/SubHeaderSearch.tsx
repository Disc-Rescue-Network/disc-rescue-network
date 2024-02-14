import "../styles/subHeaderSearch.css";

interface SubHeaderSearchProps {
  CourseName: string;
  baseText: string;
  lightText: string;
}

const SubHeaderSearch = (props: SubHeaderSearchProps) => {
  const { CourseName, baseText, lightText } = props;
  return (
    <div className="rescue">
      <h3>
        {baseText}
        <span className="search-disc"> {lightText}</span>
      </h3>
      <p className="course-name">@ {CourseName}</p>
    </div>
  );
};

export default SubHeaderSearch;
