import "../styles/formReportLost.css";

var initials = [
  ["A"],
  ["B"],
  ["C"],
  ["D"],
  ["E"],
  ["F"],
  ["G"],
  ["H"],
  ["I"],
  ["J"],
  ["K"],
  ["L"],
  ["M"],
  ["N"],
  ["O"],
  ["P"],
  ["T"],
  ["U"],
  ["V"],
  ["X"],
  ["W"],
  ["Y"],
  ["Z"],
];

interface NameAndInitialFormProps {
  onInitialChange: (value: string) => void;
  onLastNameChange: (value: string) => void;
}

const NameAndInitialForm: React.FC<NameAndInitialFormProps> = ({ onInitialChange, onLastNameChange }) => {
  const handleInitialChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onInitialChange(event.target.value);
  };

  const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onLastNameChange(event.target.value);
  };

  return (
    <>
      <div className="select-box-report">
        <div className="col-4 pe-0 arrow one">
          <select className="form-select-report" onChange={handleInitialChange}>
            <option value="All">First Initial</option>
            {initials.map((initial, index) => (
              <option key={index} value={initial[0]}>
                {initial[0]}
              </option>
            ))}
          </select>
        </div>
        <div className="col-8 report-lost">
          <input placeholder="Last Name" onChange={handleLastNameChange} />
        </div>
      </div>
    </>
  );
};

export default NameAndInitialForm;
