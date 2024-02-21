import "../styles/formStep4.css"

var stateTuples = [
    ["MVP"],
    ["Innova"],
    ["Lonestar"],
    ["Discmania"],
    ["Birdie"],
    ["Discraft"],
    ["Dynamic Discs"],
]

interface FormStep4Props {
    inputBrand: string; 
    selectBrand: string;
}

const FormStep4 = (props: FormStep4Props) => {
    const { inputBrand, selectBrand } = props; 
    return (
        <div className="input-dropdown-wrapper mt-1">
             <input placeholder={inputBrand} />
             <div className="circle-or">OR</div>
             <select className="select-brand-dropdown">
                <option value="All">{selectBrand}</option>
                {stateTuples.map((state, index) => (
                    <option key={index} value={state[1]}>{state[0]}</option>
                ))}
            </select>
      </div>
    )
}

export default FormStep4; 