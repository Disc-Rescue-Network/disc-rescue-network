import "../styles/formReportLost.css"

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

interface FormReportLostProps {
    initialName: string;
    lastName: string;
}

const FormReportLost = (props: FormReportLostProps) => {
    const { initialName, lastName } = props
    return (
        <>
            <div className="select-box-report">
            <div className="col-4 pe-0 arrow one">
            <select className="form-select-report">
                        <option value="All">{initialName}</option>
                        {stateTuples.map((state, index) => (
                            <option key={index} value={state[1]}>{state[0]}</option>
                        ))}
                    </select>
            </div>
            <div className="col-8 report-lost">
                <input placeholder={lastName}/>
            </div>
        </div>
        </>
    )
}

export default FormReportLost