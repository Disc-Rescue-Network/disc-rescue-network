import "../styles/successHeader.css";

interface RescueSuccessHeaderProps {
  baseText: string;
  lightText: string;
}

const RescueSuccessHeader = () => {
  // const { baseText, lightText } = props;
  return (
    <>
      <div className="rescue-success">
        <h3>
          Nailed
          <span> It!</span>
        </h3>
      </div>
    </>
  );
};

export default RescueSuccessHeader;
