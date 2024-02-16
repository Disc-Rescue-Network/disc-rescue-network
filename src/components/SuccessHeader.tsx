import "../styles/subHeaderSuccess.css";

interface SuccessHeaderProps {
  baseText: string;
}

const SuccessHeader = (props: SuccessHeaderProps) => {
  const { baseText } = props;
  return (
    <div className="sub-header-success">
      <h3>{baseText}</h3>
    </div>
  );
};

export default SuccessHeader;
