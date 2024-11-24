import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LogoRescueFlow2 from "../components/LogoRescueFlow2";
import RequestCourseComponets from "../components/RequestCourseComponents";
import CoursePickerForm from "../components/CoursePickerForm";
import Button from "../components/Button";
import "../styles/supportTicket.css";
import Box from "@mui/material/Box";
import { WhiteBorderTextField } from "../components/WhiteBorderTextField";
import LookupClaimPopup from "../components/LookupClaimPopup";
import { Alert, Snackbar } from "@mui/material";
import { API_BASE_URL } from "../App";

export default function SupportTicket() {
  const [state, setState] = useState("");
  const [course, setCourse] = useState("");
  const [claimId, setClaimId] = useState("");
  const [showLookupPopup, setShowLookupPopup] = useState(false);

  const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState("");

  const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [showInfoMessage, setShowInfoMessage] = useState<boolean>(false);
  const [infoMessage, setInfoMessage] = useState("");

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

  const handleSubmit = async () => {
    if (state === "" || course === "" || claimId === "") {
      setShowErrorMessage(true);
      setErrorMessage(
        "Please select a state, course, & enter a Claim ID before proceeding."
      );
      return;
    }

    const response = await fetch(
      `${API_BASE_URL}/inventory/claim/${claimId}/ticket`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const responeJson = await response.json();
    console.log(responeJson);

    const { success, data } = responeJson;

    if (success) {
      setShowSuccessMessage(true);
      setSuccessMessage("Ticket submitted successfully.");
    } else {
      setShowErrorMessage(true);
      setErrorMessage("Failed to submit ticket.");
    }
  };

  const handlePopulateClaimId = (claimId: string) => {
    setClaimId(claimId);
    setShowLookupPopup(false);
  };

  return (
    <div className="container-light-blue">
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
          style={{ width: "100%", borderRadius: "0px" }}
          className="input-claim-id"
        />
        <Button
          text={"Lookup Claim ID"}
          red={true}
          className="button-red-courses-support-ticket"
          onClick={() => {
            handleLookupClick();
          }}
        />
      </Box>

      <Button
        text="Submit Ticket"
        red={true}
        className="button-submit-ticket"
        onClick={handleSubmit}
      />

      {showLookupPopup && (
        <LookupClaimPopup
          onClose={() => setShowLookupPopup(false)}
          onSubmit={handlePopulateClaimId}
        />
      )}

      <Snackbar
        open={showSuccessMessage}
        autoHideDuration={6000}
        onClose={() => setShowSuccessMessage(false)}
      >
        <Alert
          onClose={() => setShowSuccessMessage(false)}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {successMessage}
        </Alert>
      </Snackbar>

      <Snackbar
        open={showErrorMessage}
        autoHideDuration={6000}
        onClose={() => setShowErrorMessage(false)}
      >
        <Alert
          onClose={() => setShowErrorMessage(false)}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {errorMessage}
        </Alert>
      </Snackbar>

      <Snackbar
        open={showInfoMessage}
        autoHideDuration={6000}
        onClose={() => setShowInfoMessage(false)}
      >
        <Alert
          onClose={() => setShowInfoMessage(false)}
          severity="info"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {infoMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}
