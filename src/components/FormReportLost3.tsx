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
    onBrandChange: (value: string) => void;
    onDiscNameChange: (value: string) => void;
}

const FormReportLost: React.FC<FormReportLostProps> = ({ initialName, lastName, onBrandChange, onDiscNameChange }) => {
    const handleBrandChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        onBrandChange(event.target.value);
    };

    const handleDiscNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onDiscNameChange(event.target.value);
    };
    
    return (
        <>
            <div className="select-box-report">
            <div className="col-4 pe-0 arrow one">
            <select className="form-select-report" onChange={handleBrandChange}>
                        <option value="All">{initialName}</option>
                        {stateTuples.map((state, index) => (
                            <option key={index} value={state[1]}>{state[0]}</option>
                        ))}
                    </select>
            </div>
            <div className="col-8 report-lost">
            <input placeholder={lastName} onChange={handleDiscNameChange}/>
            </div>
        </div>
        </>
    )
}

export default FormReportLost

 