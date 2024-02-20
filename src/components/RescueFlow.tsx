import HeaderRescueFlow from "./RescueFlowComponets";
import LogoRescueFlow from "./LogoRescueFlow";
import "../styles/rescueFlowStep.css"
import RescueFlowForms from "./RescueFlowForms";
import Button from "./Button";


const RescueFlow = () => {
    return (
        <>
        <LogoRescueFlow />
        <div className="rescue-flow-step">
            <HeaderRescueFlow 
                baseText={"Rescue Flow"}
                lightText={"Wizard"}
                baseNumber={"1"}
                lightNumber={" / 5"}
                whereText={"where'd it go"} 
                secondMissingText={" Missing?"}
                smallerText={""} 
                finalPoint={""}/>      
        </div>
         <RescueFlowForms inicialOption={"State"} courseOption={"Select a Course"} />
         <div className="buttons-rescue">
            <Button  
                text={"Next Step"}
                red={true}
                className="button-red-rescue"
                onClick={() => {
                  alert("button clicked");
                }}/>
                {/* This button needs to be approximately the height: 30px */}
            <Button  
                text={"Don't Remember"}
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

export default RescueFlow;