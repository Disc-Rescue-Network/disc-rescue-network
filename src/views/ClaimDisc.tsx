import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LogoRescueFlow2 from "../components/LogoRescueFlow2";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import ReportLostComponents from "../components/ReportLostComponents";
import { useState, useEffect } from "react";
import PopUpReport from "../components/ReportLostPopup";
import { useNavigate, useParams } from "react-router-dom";
import ClaimDiscComponents from "../components/ClaimDiscComponents";
import { Disc } from "../App";
import axios from "axios";

export default function ClaimDisc() {
  const { id } = useParams<{ id?: string }>();
  const [showPopup, setShowPopup] = useState(true);
  const [contactMethod, setContactMethod] = useState<"phone" | "email">("phone");
  const [step, setStep] = useState(1);
  const [arrayOfDiscs, setArrayOfDiscs] = useState<Disc[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    setShowPopup(true);
  }, []);

  useEffect(() => {
    const fetchDiscs = async () => {
      try {
        const response = await axios.get(
          "https://api.discrescuenetwork.com/inventory"
        );
        setArrayOfDiscs(response.data); 
      } catch (error) {
        console.error("Failed to fetch discs:", error);
      }
    };

    fetchDiscs();
  }, []);

  const handleSelect = (choice: "phone" | "email") => {
    setContactMethod(choice);
    setShowPopup(false);
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }

    if (step === 1) {
      navigate("/");
    }
  };

  if (id === undefined) {
    return <div>Error: Disc ID is missing</div>;
  }
  
  const discId = parseInt(id, 10);

  return (
    <div className="container-report-lost-disc">
      {showPopup && (
        <PopUpReport
          title={"WHAT IS YOUR PREFERRED METHOD OF COMMUNICATION?"}
          redText={""}
          content={
            "If you wrote your phone number on your disc, we recommend using this as your preferred method."
          }
          onClose={() => setShowPopup(false)}
          onSelect={handleSelect}
        />
      )}
      <i className="arrow-left-icon" style={{ top: "30px" }}
           onClick={handleBack}>
           <FontAwesomeIcon icon={faArrowLeft} />
      </i>
      <LogoRescueFlow2 />
      <div className="filters-option-claim">
        <span onClick={() => setShowPopup(true)}>Contact Method</span>
      </div>
      {contactMethod && 
        <ClaimDiscComponents 
          contactMethod={contactMethod} 
          arrayOfDiscs={arrayOfDiscs}
          selectedDiscId={id}
        />}
    </div>
  );
}
