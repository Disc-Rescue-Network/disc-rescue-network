import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import RescueFlowStep1 from "../components/RescueFlowStep1";
import RescueFlowStep2 from "../components/RescueFlowStep2";
import RescueFlowStep3 from "../components/RescueFlowStep3";
import RescueFlowStep4 from "../components/RescueFlowStep4";
import RescueFlowStep5 from "../components/RescueFlowStep5";
import Arrow from "../assets/arrow-down.png";
import { useNavigate } from "react-router-dom";
import RescueFLowFailure from "../components/RescueFlowFailure";
import RescueFlowPopup from "../components/RescueFlowPopup";
import { useInventory } from "../hooks/useInventory";
import { Disc } from "../App";
import RescueFlowFailure from "../components/RescueFlowFailure";

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
  const [rejectedDiscs, setRejectedDiscs] = useState<Disc[]>([]);
  const { inventory, fetchInventory } = useInventory();

  useEffect(() => {
    if (inventory.length === 0) {
      //console.log("Fetching inventory");
      fetchInventory();
    }
    //console.log("Inventory", inventory);
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
    //console.log("Updating search params", newParams);
    setSearchParams((prevParams) => ({ ...prevParams, ...newParams }));
  };

  function checkInventory(searchParams: SearchParams, inventory: Disc[]) {
    // Helper function to check if a disc matches the search criteria
    const matchesSearchParams = (
      disc: Disc,
      params: Partial<typeof searchParams>
    ) => {
      return Object.entries(params).every(([key, value]) => {
        //console.log("Checking", key, value);

        // Determine the path for accessing the field (whether it's a direct or nested field)
        let discValue: string | null;

        // Handle nested brand field
        if (key === "brand" && disc.disc?.brand) {
          //console.log("Checking brand", disc.disc.brand.name);
          discValue = disc.disc.brand.name; // Access nested brand name
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
          // For other keys, access directly from Disc object
          discValue = String(disc[key as keyof Disc])
            .trim()
            .toLowerCase();
        }

        // Ensure both values are treated as strings, trimmed, and converted to lower case before comparison
        const paramValue = String(value).trim().toLowerCase();
        if (discValue) {
          return discValue.toLowerCase() === paramValue;
        }
        return false;
      });
    };

    // Filter out null or empty search parameters
    const filteredSearchParams = Object.fromEntries(
      Object.entries(searchParams).filter(
        ([_, value]) => value != null && value !== ""
      )
    );

    // Generate all combinations of the search parameters
    const keys = Object.keys(filteredSearchParams);
    const combinations = [];
    for (let i = keys.length; i > 0; i--) {
      // Start from full combination to single keys
      const combos = combine(keys, i);
      combinations.push(...combos);
    }

    // Ensure every valid combination includes 'name' or 'phone number', with 'course', 'color', and 'brand' being supplementary
    const validCombinations = combinations.filter(
      (combo) =>
        combo.includes("name") ||
        combo.includes("phoneNumber") ||
        (combo.includes("color") && combo.includes("brand")) ||
        (combo.includes("color") && combo.includes("course")) ||
        (combo.includes("course") && combo.includes("brand")) ||
        (combo.includes("course") && combo.includes("color"))
    );

    // Helper function to generate combinations of the keys
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

    // Collect matches from all valid combinations
    const allMatchingDiscs = new Set<Disc>();
    for (const combo of validCombinations) {
      const paramsToCheck = Object.fromEntries(
        combo.map((key) => [key, filteredSearchParams[key]])
      );
      //console.log("Checking params", paramsToCheck);
      const matchingDiscs = inventory.filter((disc) =>
        matchesSearchParams(disc, paramsToCheck)
      );
      //console.log("Matching discs in combos array", matchingDiscs);
      matchingDiscs.forEach((disc) => allMatchingDiscs.add(disc));
      //console.log("All matching discs in combos array", allMatchingDiscs);
    }

    // Convert the Set back to an array to return
    return Array.from(allMatchingDiscs);
  }

  const handleNextStep = async (newSearchParams: SearchParams) => {
    //console.log("Handle next step");
    //console.log("New Params", newSearchParams);
    const matches = checkInventory(newSearchParams, inventory).filter(
      (disc) => !rejectedDiscs.includes(disc)
    );

    //console.log("Matches", matches);

    if (matches.length === 0) {
      //console.log("No matches found");
      setStep(step + 1); // should we skip to the end???
      return;
    }

    if (matches.length <= 6) {
      //console.log("1-6 matches found", matches);
      setMatchedDiscs(matches);
      setIsPopupOpen(true);
    } else if (matches.length > 6 && step === 5) {
      //console.log("More than 6 matches found, but we are at the last step");
      setMatchedDiscs(matches);
      setIsPopupOpen(true);
    } else {
      //console.log("More than 6 matches found, moving to next step");
      setStep(step + 1);
    }
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setRejectedDiscs((previousValues) => [...previousValues, ...matchedDiscs]);
    setStep(step + 1);
  };

  return (
    <div className="container-rescue">
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
      {/* {step === 1 && (
        <div className="wizardbox">
          <img src={Arrow} alt="arrow" />
          <p>
            If you don’t want to use the wizard you can always just enter the
            information manually on our search page
          </p>
        </div>
      )} */}
    </div>
  );
}
