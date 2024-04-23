import Button from "./Button";
import FormStep from "./FormStep2";
import LogoRescueFlow from "./LogoRescueFlow";
import HeaderRescueFlow from "./RescueFlowComponets";

interface RescueFlowProps {
    step: number;
    setStep: (step: number) => void;
  }

const RescueFlowStep5 = (props: RescueFlowProps) => {
    const { step, setStep } = props;
    return (
        <>
        <LogoRescueFlow />
            <div className="rescue-flow-step">
            <HeaderRescueFlow 
                baseText={"Rescue Flow"}
                lightText={"Wizard"} 
                baseNumber={"5"} 
                lightNumber={" / 5"} 
                whereText={"Shoot For The"} 
                secondMissingText={" Moon."} 
                smallerText={"Last minute hail mary to save the flow..."}
            />
            </div>
            <FormStep inputName={"Whats Color Is It?!"} />
            <div className="buttons-rescue-step2">
            <Button  
                text={"Show Me The Discs"}
                red={true}
                className="button-red-rescue-step2"
                onClick={() => {
                  alert("button clicked");
                }}/>
                {/* This button needs to be approximately the height: 30px */}
            <Button  
                text={"This Is Just Sad Now"}
                red={false}
                border={true}
                className="second-button-rescue white-border"
                onClick={() => {
                    setStep(step + 1);
                  }}               
                />
            </div>    
        </>
    )
}

export default RescueFlowStep5;