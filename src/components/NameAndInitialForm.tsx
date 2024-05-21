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

const NameAndInitialForm = () => {
  return (
    <>
      <div className="select-box-report">
        <div className="col-4 pe-0 arrow one">
          <select className="form-select-report">
            <option value="All">First Initial</option>
            {initials.map((initial, index) => (
              <option key={index} value={initial}>
                {initial}
              </option>
            ))}
          </select>
        </div>
        <div className="col-8 report-lost">
          <input placeholder="Last Name" />
        </div>
      </div>
    </>
  );
};

export default NameAndInitialForm;
