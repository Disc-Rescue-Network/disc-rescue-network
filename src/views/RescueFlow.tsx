import { useEffect, useState } from "react";
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
import { useInventory } from "../hooks/useInventory";
import { Disc } from "../App";

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
  const [matchedDiscs, setMatchedDiscs] = useState<Disc[]>([]);

  const { inventory, fetchInventory } = useInventory();

  useEffect(() => {
    if (inventory.length === 0) {
      console.log("Fetching inventory");
      fetchInventory();
    }
    console.log("Inventory", inventory);
  }, []);

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
    console.log("Updating search params", newParams);
    setSearchParams((prevParams) => ({ ...prevParams, ...newParams }));
  };

  const checkInventory = (searchParams: SearchParams): Disc[] => {
    console.log("searchParams", searchParams);
    console.log("inventory", inventory);
    return inventory.filter((disc) => {
      return (
        (!searchParams.color || disc.color === searchParams.color) &&
        (!searchParams.brand || disc.brand === searchParams.brand) &&
        (!searchParams.name || disc.name === searchParams.name) &&
        (!searchParams.phoneNumber ||
          disc.phoneNumber === searchParams.phoneNumber) &&
        (!searchParams.course || disc.course === searchParams.course)
      );
    });
  };

  const handleNextStep = async (newSearchParams: SearchParams) => {
    console.log("Handle next step");
    console.log("New Params", newSearchParams);
    const matches = checkInventory(newSearchParams);

    console.log("Matches", matches);

    if (matches.length === 0) {
      console.log("No matches found");
      setStep(step + 1); // should we skip to the end???
      return;
    }

    if (matches.length <= 6) {
      console.log("1-6 matches found", matches);
      setMatchedDiscs(matches);
      setIsPopupOpen(true);
    } else {
      console.log("More than 6 matches found, moving to next step");
      setStep(step + 1);
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
      {step === 1 && (
        <RescueFlowStep1
          step={step}
          setStep={setStep}
          handleNextStep={handleNextStep}
          searchParams={searchParams}
          setSearchParams={updateSearchParams}
        />
      )}
      {step === 2 && (
        <RescueFlowStep2
          step={step}
          setStep={setStep}
          handleNextStep={handleNextStep}
          searchParams={searchParams}
          setSearchParams={updateSearchParams}
        />
      )}
      {step === 3 && (
        <RescueFlowStep3
          step={step}
          setStep={setStep}
          handleNextStep={handleNextStep}
          searchParams={searchParams}
          setSearchParams={updateSearchParams}
        />
      )}
      {step === 4 && (
        <RescueFlowStep4
          step={step}
          setStep={setStep}
          handleNextStep={handleNextStep}
          searchParams={searchParams}
          setSearchParams={updateSearchParams}
        />
      )}
      {step === 5 && (
        <RescueFlowStep5
          step={step}
          setStep={setStep}
          handleNextStep={handleNextStep}
          searchParams={searchParams}
          setSearchParams={updateSearchParams}
        />
      )}
      {step === 6 && <RescueFLowFailure />}
      {isPopupOpen && (
        <RescueFlowPopup
          onClosePopup={closePopup}
          arrayOfDiscs={matchedDiscs}
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
