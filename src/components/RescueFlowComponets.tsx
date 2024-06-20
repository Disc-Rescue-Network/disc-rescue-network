import "../styles/rescueFlowComponents.css"

interface HeaderRescueFlowProps {
    baseText: string;
    lightText: string;
    baseNumber: string;
    lightNumber: string;
    whereText?: string;
    secondMissingText?: string;
    smallerText: string;
    className?: string; 
}

const RescueFlowComponets = (props: HeaderRescueFlowProps) => {
    const { baseText, lightText, baseNumber, lightNumber, whereText, secondMissingText, smallerText, className } = props;
    return (
        <div className={`rescue-flow-components ${className}`}>
            <h2>
                {baseText}
                <span className="fw-light"> {lightText}</span>
            </h2>
            <h3 className="steps">
                {baseNumber}
             <span className="overtext-secondary">{lightNumber}</span>
            </h3>
            <h3 className="where-rescue">
                {whereText}
                <span className="secondary-missing-text">{secondMissingText}</span>  
            </h3>
            <span className="smaller-text-rescue">{smallerText}</span>
        </div>
    )
}

export default RescueFlowComponets;