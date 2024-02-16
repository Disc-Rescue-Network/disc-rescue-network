import "../styles/successHeader.css";

interface RescueSuccessHeaderProps {
  baseText: string;
  lightText: string;
}

const RescueSuccessHeader = (props: RescueSuccessHeaderProps) => {
  const { baseText, lightText } = props;
  return (
    <>
      <div className="rescue-success">
        <h3>
          {baseText}
          <span> {lightText}</span>
        </h3>
      </div>
    </>
  );
};

export default RescueSuccessHeader;
