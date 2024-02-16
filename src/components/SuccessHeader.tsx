import "../styles/successHeader.css"

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
        </>
    )
}

export default SuccessHeader;