var stateTuples = [
    ["MVP"],
    ["Innova"],
    ["Lonestar"],
    ["Discmania"],
    ["Birdie"],
    ["Discraft"],
    ["Dynamic Discs"],
    ["Other"],
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