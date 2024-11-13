import "../styles/formStep2.css";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
// import "react-phone-input-2/lib/bootstrap.css";
import "react-phone-input-2/lib/material.css";

interface FormStepProps {
  phoneNumber: string;
  setPhoneNumber: (value: string) => void;
}

const FormStep: React.FC<FormStepProps> = (props) => {
  const { phoneNumber, setPhoneNumber } = props;

  const handleSetPhoneNumber = (value: string) => {
    console.log("Phone number", value);
    setPhoneNumber(value);
  };

  return (
    <div className="select-box-step">
      <div className="col-12-step col-md-10 col-lg-8" style={{ padding: "0" }}>
        <PhoneInput
          country={"us"}
          value={phoneNumber}
          onChange={setPhoneNumber}
          inputProps={{
            required: true,
            autoFocus: true,
          }}
          inputStyle={{
            minWidth: "100%",
            borderRadius: "0px",
          }}
          buttonStyle={{ borderRadius: "0px" }}
        />
      </div>
    </div>
  );
};

export default FormStep;
