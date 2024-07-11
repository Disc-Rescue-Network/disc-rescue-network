import "../styles/formStep4.css";

var stateTuples = [
  ["MVP"],
  ["Innova"],
  ["Lonestar"],
  ["Discmania"],
  ["Birdie"],
  ["Discraft"],
  ["Dynamic Discs"],
];

interface FormStep4Props {
  inputBrand: string;
  brand: string;
  setBrand: (value: string) => void;
}

const FormStep4 = (props: FormStep4Props) => {
  const { inputBrand, brand, setBrand } = props;

  const handleBrandChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setBrand(e.target.value);
  };
  const handleBrandInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("e.target.value", e.target.value);
    setBrand(e.target.value);
  };

  return (
    <div className="input-dropdown-wrapper mt-1">
      <input
        placeholder={inputBrand}
        value={brand}
        onChange={handleBrandInputChange}
      />
      <div className="circle-or">OR</div>
      <select
        className="select-brand-dropdown"
        value={brand}
        onChange={handleBrandChange}
      >
        <option value="All">{brand}</option>
        {stateTuples.map((state, index) => (
          <option key={index} value={state[1]}>
            {state[0]}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FormStep4;
