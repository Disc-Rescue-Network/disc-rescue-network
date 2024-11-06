import "../styles/formReportLost.css";

interface NameAndInitialFormProps {
  onFirstNameChange: (value: string) => void;
  onLastNameChange: (value: string) => void;
}

const NameAndInitialForm: React.FC<NameAndInitialFormProps> = ({
  onFirstNameChange,
  onLastNameChange,
}) => {
  const handleFirstNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    onFirstNameChange(event.target.value);
  };

  const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onLastNameChange(event.target.value);
  };

  return (
    <>
      <div className="select-box-report">
        <div className="col-6 report-lost">
          <input placeholder="First Name" onChange={handleFirstNameChange} />
        </div>
        <div className="col-6 report-lost">
          <input placeholder="Last Name" onChange={handleLastNameChange} />
        </div>
      </div>
    </>
  );
};

export default NameAndInitialForm;
