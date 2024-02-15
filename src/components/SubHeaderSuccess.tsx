import "../styles/subHeaderSuccess.css"

interface SubHeaderSuccessProps{
    baseText: string;
}

const SubHeaderSuccess = (props: SubHeaderSuccessProps) => {
    const { baseText } = props; 
    return (
        <div className="sub-header-success">
            <h3>
                {baseText}
            </h3>
        </div>
    )
} 

export default SubHeaderSuccess; 