import Button from "./Button";
import FormStep from "./FormStep2";
import LogoRescueFlow from "./LogoRescueFlow";
import HeaderRescueFlow from "./RescueFlowComponets";

const RescueFlowStep2 = () => {
    return (
        <>
        <LogoRescueFlow />
            <div className="rescue-flow-step">
            <HeaderRescueFlow 
                baseText={"Rescue Flow"}
                lightText={"Wizard"} 
                baseNumber={"2"} 
                lightNumber={" / 5"} 
                whereText={"New Phone,"} 
                secondMissingText={" Who Dis?"} 
                smallerText={""}
            />
            </div>
            <FormStep inputName={"PHONE NUMBER WRITTEN ON THE DISC"} />
            <div className="buttons-rescue-step2">
            <Button  
                text={"Locate My Disc"}
                red={true}
                className="button-red-rescue-step2"
                onClick={() => {
                  alert("button clicked");
                }}/>
                {/* This button needs to be approximately the height: 30px */}
            <Button  
                text={"Didn't Write One"}
                red={false}
                border={true}
                className="second-button-rescue white-border"
                onClick={() => {
                  alert("button clicked");
                }}                
                />
            </div>    
        </>
    )
}

export default RescueFlowStep2