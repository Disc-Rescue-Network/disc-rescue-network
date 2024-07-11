import { useState } from "react";
import Button from "./Button";
import FormStep4 from "./FormStep4";
import LogoRescueFlow from "./LogoRescueFlow";
import HeaderRescueFlow from "./RescueFlowComponets";
import RescueFlowPopupStep4 from "./RescueFlowPopupStep4";
import { SearchParams } from '../views/RescueFlow';

interface RescueFlowProps {
  step: number;
  setStep: (step: number) => void;
  handleNextStep: (newParams: SearchParams) => void;
}

const RescueFlowStep4 = (props: RescueFlowProps) => {
  const { step, setStep, handleNextStep } = props;

    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [brand, setBrand] = useState(""); 

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
         <FormStep4 inputBrand={"Type The Brand of Discs"} selectBrand={"Select Brand"} />
         <div className="buttons-rescue">
            <Button  
                text={"Show me the discs"}
                red={true}
                className="button-red-rescue-3"
                onClick={() => {
                  handleNextStep({ brand });
                  openPopup();
                }}
                />
            <Button  
                text={"Don't Know It"}
                red={false}
                border={true}
                className="second-button-rescue-3 white-border"
                onClick={() => {
                  setStep(step + 1);
                }}                 
                />
         </div>
         {isPopupOpen && <RescueFlowPopupStep4 onClosePopup={closePopup} />} 
        </>
    )
}

export default RescueFlowStep4;