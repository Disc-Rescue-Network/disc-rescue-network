import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import BetaBanner from "../components/BetaBanner";
import RescueFlowStep1 from "../components/RescueFlowStep1";
import RescueFlowStep2 from "../components/RescueFlowStep2";
import RescueFlowStep3 from "../components/RescueFlowStep3";
import RescueFlowStep4 from "../components/RescueFlowStep4";
import RescueFlowStep5 from "../components/RescueFlowStep5";
import Arrow from "../assets/arrow-down.png";
import { useNavigate } from "react-router-dom";
import RescueFLowFailure from "../components/RescueFlowFailure";
import RescueFlowPopup from "../components/RescueFlowPopup";
import axios from "axios";

export interface SearchParams {
  course?: string;
  color?: string;
  brand?: string;
  name?: string;
  phoneNumber?: string;
}

export default function RescueFlow() {
  const [step, setStep] = useState(1);
  const [searchParams, setSearchParams] = useState<SearchParams>({});
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [matchedDiscs, setMatchedDiscs] = useState([]); 

  const navigate = useNavigate();

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }

    if (step === 1) {
      navigate("/");
    }
  };

  const updateSearchParams = (newParams: SearchParams) => {
    setSearchParams((prevParams) => ({ ...prevParams, ...newParams }));
  };

  const checkInventory = async (params: SearchParams) => {
    try {
      const response = await axios.get('https://api.discrescuenetwork.com/inventory', { params });
      return response.data;
    } catch (error) {
      console.error('Error checking inventory:', error);
      return [];
    }
  };

  const handleNextStep = async (newParams: SearchParams) => {
    updateSearchParams(newParams);
    const matches = await checkInventory({ ...searchParams, ...newParams });

    if (matches.length <= 6) {
      setMatchedDiscs(matches); 
      setIsPopupOpen(true); 
    } else {
      setStep(step + 1);
      navigate(`/rescueflow?${new URLSearchParams({ ...searchParams, ...newParams }).toString()}`);
    }
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div className="container-rescue">
      <i className="arrow-left-icon" onClick={handleBack}>
        <FontAwesomeIcon icon={faArrowLeft} />
      </i>
      <BetaBanner Course={"This is a Beta version of the DRN Platform."} />
      {step === 1 && <RescueFlowStep1 step={step} setStep={setStep} handleNextStep={handleNextStep} />}
      {step === 2 && <RescueFlowStep2 step={step} setStep={setStep} handleNextStep={handleNextStep} />}
      {step === 3 && <RescueFlowStep3 step={step} setStep={setStep} handleNextStep={handleNextStep} />}
      {step === 4 && <RescueFlowStep4 step={step} setStep={setStep} handleNextStep={handleNextStep} />}
      {step === 5 && <RescueFlowStep5 step={step} setStep={setStep} handleNextStep={handleNextStep} />}
      {step === 6 && <RescueFLowFailure />}
      {isPopupOpen && (
        <RescueFlowPopup 
          onClosePopup={closePopup} 
          arrayOfDiscs={matchedDiscs} 
          selectedDiscId={""} 
        />
      )}
      {step === 1 && (
        <div className="wizardbox">
          <img src={Arrow} alt="arrow" />
          <p>
            If you don’t want to use the wizard you can always just enter the
            information manually on our search page
          </p>
        </div>
      )}
    </div>
  );
}
