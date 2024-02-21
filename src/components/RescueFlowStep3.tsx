import Button from "./Button";
import FormStep3 from "./FormStep3";
import HeaderRescueFlow from "./RescueFlowComponets";
import RescueFlowForms from "./RescueFlowForms";

const RescueFlowStep3 = () => {
    return (
        <>
        <div className="rescue-flow-step">
            <HeaderRescueFlow 
                baseText={"Rescue Flow"}
                lightText={"Wizard"}
                baseNumber={"3"}
                lightNumber={" / 5"}
                whereText={"Throw and a"} 
                secondMissingText={" Miss."}
                smallerText={"Not to worry, Let's keep searching"}
                />      
        </div>
        {/* I'll solve the form-control in this */}
         <FormStep3 initialName={"First Initial"} lastName={"Enter Last Name"} />
         <div className="buttons-rescue">
            <Button  
                text={"Let's Try This Again"}
                red={true}
                className="button-red-rescue"
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

export default RescueFlowStep3;