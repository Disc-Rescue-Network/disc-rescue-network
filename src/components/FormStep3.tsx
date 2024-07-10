import React, { useState } from "react";
import "../styles/formStep3.css";

const stateTuples = [
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
    setName: (value: { initial: string; last: string }) => void;
}

const FormStep3: React.FC<FormStep3Props> = ({ initialName, lastName, setName }) => {
    const [initial, setInitial] = useState("");
    const [last, setLast] = useState("");

    const handleInitialChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newInitial = e.target.value;
        setInitial(newInitial);
        setName({ initial: newInitial, last });
    };

    const handleLastChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newLast = e.target.value;
        setLast(newLast);
        setName({ initial, last: newLast });
    };

    return (
        <div className="mt-5 mb-3 select-box step3">
            <div className="col-4 pe-0 arrow one">
                <select
                    className="form-select"
                    value={initial}
                    onChange={handleInitialChange}
                >
                    <option value="">{initialName}</option>
                    {stateTuples.map((state, index) => (
                        <option key={index} value={state[0]}>
                            {state[0]}
                        </option>
                    ))}
                </select>
            </div>
            <div className="col-8-step3">
                <input
                    placeholder={lastName}
                    value={last}
                    onChange={handleLastChange}
                />
            </div>
        </div>
    );
};

export default FormStep3;
