import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import RescueFlowStep1 from "../components/RescueFlowStep1";
import RescueFlowStep2 from "../components/RescueFlowStep2";
import RescueFlowStep3 from "../components/RescueFlowStep3";
import RescueFlowStep4 from "../components/RescueFlowStep4";
import RescueFlowStep5 from "../components/RescueFlowStep5";
import { useLocation, useNavigate } from "react-router-dom";
import RescueFlowFailure from "../components/RescueFlowFailure";
import RescueFlowPopup from "../components/RescueFlowPopup";
import { useInventoryContext } from "../hooks/useInventory";
import { Disc } from "../App";
import { useTitle } from "../hooks/useTitle";

export interface SearchParams {
  course?: string;
  color?: string;
  brand?: string;
  name?: string;
  phoneNumber?: string;
}

export default function RescueFlow() {
  const location = useLocation();
  const navigate = useNavigate();
  const { inventory, loading } = useInventoryContext();

  // Get initial values from router state if available
  const initialState = location.state || {};
  const [step, setStep] = useState(initialState.initialStep || 1);
  const [searchParams, setSearchParams] = useState<SearchParams>(() => {
    // Initialize with course from router state if available
    console.log("initialState", initialState);
    console.log("initialState.initialCourse", initialState.initialCourse);
    console.log("initialState.initialStep", initialState.initialStep);
    console.log("initialState.searchParams", initialState.searchParams);
    if (initialState.initialCourse) {
      return { course: initialState.initialCourse };
    }
    return {};
  });

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [matchedDiscs, setMatchedDiscs] = useState<Disc[]>([]);
  const [rejectedDiscs, setRejectedDiscs] = useState<Disc[]>([]);

  useTitle(`Rescue Flow Step ${step}`);

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

  function checkInventory(searchParams: SearchParams, inventory: Disc[]) {
    const matchesSearchParams = (
      disc: Disc,
      params: Partial<typeof searchParams>
    ) => {
      return Object.entries(params).every(([key, value]) => {
        let discValue: string | null;

        if (key === "brand" && disc.disc?.brand) {
          discValue = disc.disc.brand.name;
        } else if (key === "color") {
          discValue = disc.color;
        } else if (key === "category") {
          discValue = disc.category;
        } else if (key === "plasticType") {
          discValue = disc.disc?.plasticType;
        } else if (key === "course") {
          discValue = disc.course?.name;
        } else if (key === "phoneNumber") {
          discValue = disc.phoneNumber;
        } else {
          discValue = String(disc[key as keyof Disc])
            .trim()
            .toLowerCase();
        }

        const paramValue = String(value).trim().toLowerCase();
        if (discValue) {
          return discValue.toLowerCase() === paramValue;
        }
        return false;
      });
    };

    const filteredSearchParams = Object.fromEntries(
      Object.entries(searchParams).filter(
        ([_, value]) => value != null && value !== ""
      )
    );

    const keys = Object.keys(filteredSearchParams);
    const combinations = [];
    for (let i = keys.length; i > 0; i--) {
      const combos = combine(keys, i);
      combinations.push(...combos);
    }

    const validCombinations = combinations.filter(
      (combo) =>
        combo.includes("name") ||
        combo.includes("phoneNumber") ||
        (combo.includes("color") && combo.includes("brand")) ||
        (combo.includes("color") && combo.includes("course")) ||
        (combo.includes("course") && combo.includes("brand")) ||
        (combo.includes("course") && combo.includes("color"))
    );

    function combine(keys: string[], size: number): string[][] {
      const combinations: string[][] = [];

      function _combine(start: number, combo: string[]) {
        if (combo.length === size) {
          combinations.push(combo);
          return;
        }
        for (let i = start; i < keys.length; i++) {
          _combine(i + 1, combo.concat(keys[i]));
        }
      }

      _combine(0, []);
      return combinations;
    }

    const allMatchingDiscs = new Set<Disc>();
    for (const combo of validCombinations) {
      const paramsToCheck = Object.fromEntries(
        combo.map((key) => [key, filteredSearchParams[key]])
      );
      const matchingDiscs = inventory.filter((disc) =>
        matchesSearchParams(disc, paramsToCheck)
      );
      matchingDiscs.forEach((disc) => allMatchingDiscs.add(disc));
    }

    return Array.from(allMatchingDiscs);
  }

  const handleNextStep = async (newSearchParams: SearchParams) => {
    const matches = checkInventory(newSearchParams, inventory).filter(
      (disc) => !rejectedDiscs.includes(disc)
    );

    if (matches.length === 0) {
      setStep(step + 1);
      return;
    }

    if (matches.length <= 6) {
      setMatchedDiscs(matches);
      setIsPopupOpen(true);
    } else if (matches.length > 6 && step === 5) {
      setMatchedDiscs(matches);
      setIsPopupOpen(true);
    } else {
      setStep(step + 1);
    }
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setRejectedDiscs((previousValues) => [...previousValues, ...matchedDiscs]);
    setStep(step + 1);
  };

  return (
    <div className="container-blue">
      <i className="arrow-left-icon" onClick={handleBack}>
        <FontAwesomeIcon icon={faArrowLeft} />
      </i>
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
      {step === 6 && <RescueFlowFailure />}
      {isPopupOpen && (
        <RescueFlowPopup
          onClosePopup={closePopup}
          arrayOfDiscs={matchedDiscs}
        />
      )}
    </div>
  );
}
