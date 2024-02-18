import "../styles/formClaimDisc.css";
import Button from "./Button";

interface FormClaimDiscProps {
  inputInitial: string;
  inputName: string;
  inputPhone: string;
  inputPickupLocation: string;
}

const FormClaimDisc = (props: FormClaimDiscProps) => {
  const { inputInitial, inputName, inputPhone, inputPickupLocation } = props;
  return (
    <>
      <div
        className="select-box"
        style={{ marginBottom: "0.5rem", marginTop: "0.5rem" }}
      >
        <div className="col-4 arrow one">
          <select className="form-select" style={{ height: "55px !important" }}>
            <option value="All">{inputInitial}</option>
          </select>
        </div>
        <div className="col-8 last-name">
          <input className="form-control" placeholder={inputName} />
        </div>
      </div>

      <div className="mt-2 mb-2 select-box">
        <div className="col-12 number">
          <input className="form-control" placeholder={inputPhone} />
        </div>
      </div>
      <div
        className="select-box"
        style={{ marginBottom: "0.5rem", marginTop: "0.5rem" }}
      >
        <div className="col-12 pe-0 arrow one">
          <select
            className="form-select"
            style={{ width: "100%", maxWidth: "600px" }}
          >
            <option value="All">{inputPickupLocation}</option>
          </select>
        </div>
      </div>
      <div className="col select-box buttons-claim-disc">
        <Button
          text={"Schedule your Disc Pickup"}
          red={true}
          className="Schedule-disc white-border-hover"
          onClick={() => {
            alert("button clicked");
          }}
        />
        <Button
          text={"Surrender Disc"}
          red={false}
          className="Surrender-disc white-border-hover"
          onClick={() => {
            alert("button clicked");
          }}
        />
      </div>
    </>
  );
};

export default FormClaimDisc;
