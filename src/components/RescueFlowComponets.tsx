import "../styles/rescueFlowComponents.css"

interface HeaderRescueFlowProps {
    baseText: string;
    lightText: string;
    baseNumber: string;
    lightNumber: string;
    whereText: string;
    secondMissingText: string;
    smallerText: string;
    finalPoint: string;
}

const RescueFlowComponets = (props: HeaderRescueFlowProps) => {
    const { baseText, lightText, baseNumber, lightNumber, whereText, secondMissingText, smallerText, finalPoint } = props;
    return (
        <div className="rescue-flow-components">
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
                {finalPoint}
            </h3>
            <span className="smaller-text">{smallerText}</span>
        </div>
    )
}

export default RescueFlowComponets;