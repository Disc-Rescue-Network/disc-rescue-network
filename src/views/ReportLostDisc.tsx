import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LogoRescueFlow2 from "../components/LogoRescueFlow2";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import ReportLostComponents from "../components/ReportLostComponents";
import { useState, useEffect } from "react";
import PopUpReport from "../components/ReportLostPopup";

export default function ReportLostDisc() {
  const [showPopup, setShowPopup] = useState(true);
  const [contactMethod, setContactMethod] = useState<"phone" | "email">(
    "phone"
  );

  useEffect(() => {
    setShowPopup(true);
  }, []);

  const handleSelect = (choice: "phone" | "email") => {
    setContactMethod(choice);
    setShowPopup(false);
  };

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
      <i className="arrow-left-icon" style={{ top: "30px" }}>
        <FontAwesomeIcon icon={faArrowLeft} />
      </i>
        <LogoRescueFlow2 />
        <div className="filters-option" >
          <span onClick={() => setShowPopup(true)}>Filters</span>
        </div>
      {contactMethod && <ReportLostComponents contactMethod={contactMethod} />}
    </div>
  );
}
