import React, { useState } from "react";
import "../styles/formStep3.css";

interface FormStep3Props {
    firstName: string;
    lastName: string;
    setName: (value: { first: string; last: string }) => void;
}

const FormStep3: React.FC<FormStep3Props> = ({ firstName, lastName, setName }) => {
    const [first, setFirst] = useState("");
    const [last, setLast] = useState("");

    const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newFirst = e.target.value;
        setFirst(newFirst);
        setName({ first: newFirst, last });
    };

    const handleLastChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newLast = e.target.value;
        setLast(newLast);
        setName({ first, last: newLast });
    };

    return (
        <div className="mt-5 mb-3 select-box step3">
            <div className="col-6 pe-0 arrow one">
           <input
                    placeholder={"Enter First Name"}
                    value={first}
                    onChange={handleFirstNameChange}
                />
            </div>
            <div className="col-6">
                <input
                    placeholder={"Enter Last Name"}
                    value={last}
                    onChange={handleLastChange}
                />
            </div>
        </div>
    );
};

export default FormStep3;
