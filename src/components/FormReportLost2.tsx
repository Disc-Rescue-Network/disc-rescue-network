var stateTuples = [
    ["Green"],
    ["Gold"],
    ["Blue"],
    ["Purple"],
    ["Pink"],
    ["Yellow"],
    ["White"],
    ["Orange"],
    ["Red"],
    ["Light Blue"],
    ["Tie Die"],
    ["Glow"],
    ["Grey"],
    ["Blue GLow"],
    ["Blue Clear"],
    ["Teal Blue"],
    ["Halo Red"],
    ["Red Dye"],
    ["Other"],
];

interface FormReportLostColorProps {
    initialName: string;
    lastName: string;
    contactMethod: 'phone' | 'email';
}

const FormReportLost2 = (props: FormReportLostColorProps) => {
    const { initialName, lastName, contactMethod } = props
    const placeholder = contactMethod === 'email' ? 'Email Address' : lastName;
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
            <input placeholder={placeholder} type={contactMethod === 'email' ? 'email' : 'text'} />
            </div>
        </div>
        </>
    )
}

export default FormReportLost2