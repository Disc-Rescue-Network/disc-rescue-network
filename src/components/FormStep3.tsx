import "../styles/formStep3.css"

var stateTuples = [
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


interface FormStep3Props {
    initialName: string;
    lastName: string;
}

const FormStep3 = (props: FormStep3Props) => {
    const { initialName, lastName } = props
    return (
        <>
            <div className="mt-5 mb-3 select-box step3">
            <div className="col-4 pe-0 arrow one">
            <select className="form-select">
                        <option value="All">{initialName}</option>
                        {stateTuples.map((state, index) => (
                            <option key={index} value={state[1]}>{state[0]}</option>
                        ))}
                    </select>
            </div>
            <div className="col-8-step3">
                <input placeholder={lastName}/>
            </div>
        </div>
        </>
    )
}

export default FormStep3