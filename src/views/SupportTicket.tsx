import {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import LogoRescueFlow2 from "../components/LogoRescueFlow2";
import RequestCourseComponets from "../components/RequestCourseComponents";
import CoursePickerForm from "../components/CoursePickerForm";
import Button from "../components/Button";
import "../styles/supportTicket.css";
import Box from "@mui/material/Box";
import { WhiteBorderTextField } from "../components/WhiteBorderTextField";
import LookupClaimPopup from "../components/LookupClaimPopup";

export default function SupportTicket() {
  const [state, setState] = useState("");
  const [course, setCourse] = useState("");
  const [claimId, setClaimId] = useState("");
  const [showLookupPopup, setShowLookupPopup] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const handleLookupClick = () => {
    setShowLookupPopup(true);
  };
  
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const claimIdParam = searchParams.get("claimId");

    if (claimIdParam) {
      setClaimId(claimIdParam);
    }
  }, [location.search]);

  const handleSearch = () => {
    if (course && claimId) {
      const orgCode = course;

      console.log("Preparing to send to API:", {orgCode, claimId});

      const encodedCourse = encodeURIComponent(course);
      navigate(`/searchInventory?course=${encodedCourse}&claimId=${claimId}`);
    } else {
      alert("Please select a course and enter a Claim ID.");
    }
  };

  return (
    <div className="container-store">
      <div className="logo-and-arrow">
        <LogoRescueFlow2 />
      </div>
      <RequestCourseComponets
        baseText={"Submit a"}
        lightText={"ticket"}
        whereText={"Need help?"}
        linkText={""}
        secondMissingText={
          "Submit a ticket to the course to have someone reach out. If you don’t know your claim ID then you can look it up below."
        }
        className="main-header-support"
      />
      <CoursePickerForm setState={setState} setCourse={setCourse} />

      <Box
        display="flex"
        justifyContent={"center"}
        sx={{
          mt: 2,
          margin: "auto",
          width: "100%",
          maxWidth: "600px",
          gap: 2,
          mb: 4,
        }}
      >
        <WhiteBorderTextField
          label="Claim ID"
          variant="outlined"
          fullWidth
          value={claimId}
          onChange={(e) => setClaimId(e.target.value)}
          style={{width: "100%", borderRadius: "0px"}}
          className="input-claim-id"
        />
        <Button
          text={"Lookup Claim ID"}
          red={true}
          className="button-red-courses-support-ticket"
          onClick={() => {
            if (!state && !course && !claimId) {
              alert(
                "Please select a state, course, or enter a Claim ID before proceeding."
              );
              return;
            }
            handleLookupClick();
          }}
        />
      </Box>

      <Button
        text="Submit Ticket"
        red={true}
        className="button-submit-ticket"
        onClick={() =>
          alert("Submit Ticket functionality not implemented yet!")
        }
      />

      {showLookupPopup && (
        <LookupClaimPopup
          onClose={() => setShowLookupPopup(false)}
          onSubmit={async (data) => {
            setShowLookupPopup(false);
          }}
        />
      )}
    </div>
  );
}
