interface FormStore {
    inputName: string;
}

const FormStore = (props: FormStore) => {
    const { inputName } = props;
    return (
        <div className="select-box-store">
            <input className="form-control-step" style={{paddingLeft: '12px'}} placeholder={inputName}/>
        </div>
    )
} 

export default FormStore;
