import { useState } from "react";

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
    color: string;
    number: string;
    contactMethod: 'phone' | 'email';
    onContactValueChange: (value: string) => void;
    onColorChange: (value: string) => void;
}

const FormReportLost2 = (props: FormReportLostColorProps) => {
    const { color, number, contactMethod, onContactValueChange, onColorChange } = props
    const placeholder = contactMethod === 'email' ? 'Email Address' : number;
    const [contactValue, setContactValue] = useState("");

    const handleContactChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let value = event.target.value;
        if (contactMethod === 'phone') {
            value = formatPhoneNumber(value);
        }
        setContactValue(value);
        onContactValueChange(value);
    };

    const formatPhoneNumber = (value: string) => {
        if (!value) return value;
        const phoneNumber = value.replace(/[^\d]/g, "");
        const phoneNumberLength = phoneNumber.length;
        if (phoneNumberLength < 4) return phoneNumber;
        if (phoneNumberLength < 7) {
            return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
        }
        return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
    };
    
    return (
        <>
            <div className="select-box-report">
            <div className="col-4 pe-0 arrow one">
            <select className="form-select-report" onChange={(e) => onColorChange(e.target.value)}>
                        <option value="All">{color}</option>
                        {stateTuples.map((state, index) => (
                            <option key={index} value={state[1]}>{state[0]}</option>
                        ))}
                    </select>
            </div>
            <div className="col-8 report-lost">
            <input 
                placeholder={placeholder} 
                type={contactMethod === 'email' ? 'email' : 'text'}
                value={contactValue} 
                onChange={handleContactChange}
            />
            </div>
        </div>
        </>
    )
}

export default FormReportLost2