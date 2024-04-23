import Button from "./Button";
import LogoRescueFlow from "./LogoRescueFlow"
import HeaderRescueFlow from "./RescueFlowComponets";
import "../styles/rescueFlowFailure.css";

interface RescueFlowProps {
    step: number;
    setStep: (step: number) => void;
  }

const RescueFLowFailure = (props: RescueFlowProps) => {
    const { step, setStep } = props;
    return (
        <>
        <LogoRescueFlow />
        <HeaderRescueFlow 
            baseText={"0/10 Rescue Flow"} 
            lightText={"Wizard"} 
            baseNumber={""} 
            lightNumber={""} 
            whereText={"So Maybe It's Not"} 
            secondMissingText={" Perfect."} 
            smallerText={"But it never gives up. Submit the information you used in the wizard to report your disc lost and be notified if the wizard finds it, so it can reunite you."} 
            className="custom-rescue-flow-failure"
            />
        <div className="buttons-rescue-failure">
            <Button  
                text={"Report My Disc Lost and Help The Wizard"}
                red={true}
                className="button-red-rescue-failure"
                onClick={() => {
                  alert("button clicked");
                }}/>
            <Button  
                text={"Fine, I'll do it Myself"}
                red={false}
                border={true}
                className="second-button-rescue-failure white-border"
                onClick={() => {
                    setStep(step + 1);
                  }}               
                />
            </div>   
        </>  
    )
}

export default RescueFLowFailure