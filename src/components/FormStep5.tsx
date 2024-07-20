import "../styles/formStep2.css";

interface FormStepProps {
    inputName: string;
    setColor: (value: string) => void;
}

const FormStep5: React.FC<FormStepProps> = (props) => {
    const { inputName, setColor} = props;

    return (
        <div className="select-box-step">
            <div className="col-12-step col-md-10 col-lg-8" style={{ padding: '0' }}>
                <input
                    className="form-control-step"
                    placeholder={inputName}
                    onChange={(e) => setColor(e.target.value)}
                />
            </div>
        </div>
    );
};

export default FormStep5;
