import { useState } from "react";
import Button from "./Button";
import FormStep4 from "./FormStep4";
import LogoRescueFlow from "./LogoRescueFlow";
import HeaderRescueFlow from "./RescueFlowComponets";
import RescueFlowPopupStep4 from "./RescueFlowPopupStep4";

const RescueFlowStep4 = () => {

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
                baseNumber={"4"}
                lightNumber={" / 5"}
                whereText={"Let's Widen Our"} 
                secondMissingText={" Stance."}
                smallerText={"We probably just couldn't read the handwriting..."}
                />      
        </div>
        {/* I'll solve the form-control in this */}
         <FormStep4 inputBrand={"Type The Brand of Discs"} selectBrand={"Select Brand"} />
         <div className="buttons-rescue">
            <Button  
                text={"Show me the discs"}
                red={true}
                className="button-red-rescue"
                onClick={openPopup}
                />
                {/* This button needs to be approximately the height: 30px */}
            <Button  
                text={"Select Brand"}
                red={false}
                border={true}
                className="second-button-rescue white-border"
                onClick={() => {
                  alert("button clicked");
                }}                
                />
         </div>
         {isPopupOpen && <RescueFlowPopupStep4 onClosePopup={closePopup} />} 
        </>
    )
}

export default RescueFlowStep4;