import "../styles/subHeaderSuccess.css";

interface SuccessSubheaderProps {
  baseText: string;
}

const SuccessSubheader = (props: SuccessSubheaderProps) => {
  const { baseText } = props;
  return (
    <div className="sub-header-success">
      <h3>{baseText}</h3>
    </div>
  );
};

export default SuccessSubheader;
