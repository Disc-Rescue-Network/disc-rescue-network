import "../styles/formStep2.css"

interface FormStepProps {
    inputName: string;
}

const FormStep = (props: FormStepProps) => {
    const { inputName } = props;
    return (
       <div className="select-box-step">
            <div className="col-12-step col-md-10 col-lg-8" style={{ padding: '0' }}>
                <input className="form-control-step" placeholder={inputName}/>
            </div>
       </div>
    )
}

export default FormStep;