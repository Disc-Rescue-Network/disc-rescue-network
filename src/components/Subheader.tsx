import "../styles/subheader.css";

interface SubheaderProps {
  text: string;
}

const Subheader = (props: SubheaderProps) => {
  const { text } = props;
  return (
    <div className="content-sub-header">
      <div className="sub-header">{text}</div>
    </div>
  );
};

export default Subheader;
