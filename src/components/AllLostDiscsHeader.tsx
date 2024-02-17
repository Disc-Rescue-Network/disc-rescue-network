import "../styles/subHeaderSearch.css";

interface AllLostDiscsHeaderProps {
  courseName: string;
}

const AllLostDiscsHeader = (props: AllLostDiscsHeaderProps) => {
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

export default AllLostDiscsHeader;
