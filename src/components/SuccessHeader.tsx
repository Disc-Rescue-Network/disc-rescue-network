import "../styles/successHeader.css"
import SubHeaderSuccess from "./SubHeaderSuccess";

interface HeaderSuccessProps {
    baseText: string;
    lightText: string;
}

const SuccessHeader = (props: HeaderSuccessProps) => {
    const { baseText, lightText } = props;
    return (
        <>
            <div className="rescue-success">
                <h3>
                    {baseText} 
                    <span> {lightText}</span>
                </h3>
            </div>
            <SubHeaderSuccess baseText={"You have successfully claimed your disc and you've been opted in to receiving messages"} />
        </>
    )
}

export default SuccessHeader;