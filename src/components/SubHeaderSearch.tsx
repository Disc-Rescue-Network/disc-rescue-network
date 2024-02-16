import "../styles/subHeaderSearch.css";

interface Items {
  CourseName: string;
  baseText: string;
  lightText: string;
}

interface SubHeaderSearchProps {
  arrayOfItems: Items[];
}


const SubHeaderSearch = ({arrayOfItems }: SubHeaderSearchProps) => {
  return (
    <div className="rescue">
      {arrayOfItems.map((item, index) => (
        <div key={index}>
          <h3>
            {item.baseText}
            <span className="search-disc"> {item.lightText}</span>
          </h3>
          <p className="course-name">@ {item.CourseName}</p>
        </div>
      ))}
    </div>
  );
};

export default SubHeaderSearch;
