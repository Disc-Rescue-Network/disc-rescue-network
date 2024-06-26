import { useState } from "react";
import Button from "./Button";
import FormStep from "./FormStep2";
import LogoRescueFlow from "./LogoRescueFlow";
import HeaderRescueFlow from "./RescueFlowComponets";
import RescueFlowPopup from "./RescueFlowPopup";

interface RescueFlowProps {
  step: number;
  setStep: (step: number) => void;
}

const RescueFlowStep2 = (props: RescueFlowProps ) => {
  const { step, setStep } = props;

  const [isPopupOpen, setIsPopupOpen] = useState(false); 

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

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
                onClick={openPopup}/>
                {/* This button needs to be approximately the height: 30px */}
            <Button  
                text={"Didn't Write One"}
                red={false}
                border={true}
                className="second-button-rescue-3 white-border"
                onClick={() => {
                  setStep(step + 1);
                }}                
                />
            </div> 
            {isPopupOpen && <RescueFlowPopup onClosePopup={closePopup} />}   
        </>
    )
}

export default RescueFlowStep2