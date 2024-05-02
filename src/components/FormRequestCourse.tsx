import "../styles/formRequestCourse.css"

var stateTuples = [
    ["All"],
    ["AL"],
    ["AK"],
    ["AZ"],
    ["AR"],
    ["CA"],
    ["CO"],
    ["CT"],
    ["DE"],
    ["FL"],
    ["GA"],
    ["HI"],
    ["ID"],
    ["IL"],
    ["IN"],
    ["IA"],
    ["KS"],
    ["KY"],
    ["LA"],
    ["ME"],
    ["MD"],
    ["MA"],
    ["MI"],
    ["MN"],
    ["MS"],
    ["MO"],
    ["MT"],
    ["NE"],
    ["NV"],
    ["NH"],
    ["NJ"],
    ["NM"],
    ["NY"],
    ["NC"],
    ["ND"],
    ["OH"],
    ["OK"],
    ["OR"],
    ["PA"],
    ["RI"],
    ["SC"],
    ["SD"],
    ["TN"],
    ["TX"],
    ["UT"],
    ["VT"],
    ["VA"],
    ["WA"],
    ["WV"],
    ["WI"],
    ["WY"],
];


interface FormRequestCourseProps {
    initialName: string;
    lastName: string;
}

const FormRequestCourse = (props: FormRequestCourseProps) => {
    const { initialName, lastName } = props
    return (
        <>
            <div className="mt-5 mb-3 select-box-request">
            <div className="col-4 pe-0 arrow one">
            <select className="form-select-request">
                        <option value="All">{initialName}</option>
                        {stateTuples.map((state, index) => (
                            <option key={index} value={state[1]}>{state[0]}</option>
                        ))}
                    </select>
            </div>
            <div className="col-8-request-course">
                <input className="form-select-request-input" placeholder={lastName}/>
            </div>
        </div>
        </>
    )
}

export default FormRequestCourse