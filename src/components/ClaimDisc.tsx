import "../styles/claimDisc.css"
import FormClaimDisc from "./FormClaimDisc";

interface ClaimDiscProps {
    baseText: string;
    lightText: string;
    baseTextInfo: string;
    lightTextInfo: string;
    finalPoint: string;
}

const ClaimDisc = (props: ClaimDiscProps) => {
    const { baseText, lightText, baseTextInfo, lightTextInfo, finalPoint } = props; 
    return (
        <>
        <div className="rescue-claim-disc">
            <h3>
                {baseText}
                <span className="fw-light"> {lightText}</span>
            </h3>
            <h4>
                {baseTextInfo}
                <span className="overtext"> {lightTextInfo}</span>
                {finalPoint}
            </h4>
        </div>
        <FormClaimDisc inputInicial={"First Inicial"} inputName={"Last Name"} inputPhone={"Phone Number Written On the Disc"} inputPickupLocation={"Choose a Pickup Location"} />
        </>
    )
}

export default ClaimDisc