import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import LogoRescueFlow2 from "../components/LogoRescueFlow2";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  TextField,
  Typography,
  Alert,
  CircularProgress,
  withStyles,
} from "@mui/material";
import { API_BASE_URL } from "../App";
import { relative } from "path";
import { WhiteBorderTextField } from "../components/WhiteBorderTextField";

export default function Settings() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [optInStatus, setOptInStatus] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/");
  };

  const handleCheckOptInStatus = async () => {
    console.log("Checking opt-in status for phone number:", phoneNumber);
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${API_BASE_URL}/sms/phone-opt-in?phoneNumber=${phoneNumber}`
      );
      console.log("Opt-in status response:", response);
      const data = await response.json();
      console.log("Opt-in status data:", data);
      setOptInStatus(data.data.items[0]?.smsConsent === 1 ? true : false);
    } catch (err) {
      setError("Error fetching opt-in status. Please try again.");
      console.log("Error fetching opt-in status:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleOptInOut = async (newStatus: boolean) => {
    setLoading(true);
    setError(null);

    try {
      await axios.post(`https://apis.discrescuenetwork.com/sms/phone-opt-in`, {
        phoneNumber,
        smsConsent: newStatus ? 1 : 0,
      });
      setOptInStatus(newStatus ? true : false);
    } catch (err) {
      setError("Error updating opt-in status. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const optInColor = optInStatus
    ? "var(--primary-green)"
    : "var(--primary-red)";

  return (
    <div className="container-store">
      <i className="arrow-left-icon" onClick={handleBack}>
        <FontAwesomeIcon icon={faArrowLeft} />
      </i>
      <LogoRescueFlow2 />
      <h2>Check Opt-In Status</h2>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent={"center"}
        sx={{ mt: 2, margin: "auto", width: "100%", maxWidth: "600px", gap: 2 }}
      >
        <WhiteBorderTextField
          label="Phone Number"
          variant="outlined"
          fullWidth
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <Button
          variant="contained"
          onClick={handleCheckOptInStatus}
          disabled={loading || !phoneNumber}
          sx={{ mb: 2 }}
        >
          {loading ? <CircularProgress size={24} /> : "Check Status"}
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {optInStatus && (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          sx={{ mt: 2 }}
        >
          <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
            <Typography variant="body1">Opt-In Status:</Typography>
            <Typography sx={{ fontWeight: "bold", color: optInColor }}>
              {optInStatus ? "Opted In" : "Opted Out"}
            </Typography>
          </Box>
          {optInStatus ? (
            <Button
              onClick={() => handleOptInOut(false)}
              sx={{
                mt: 2,
                maxWidth: "600px",
                color: "var(--primary-white)",
                backgroundColor: "var(--error-red)",
                ":hover": {
                  backgroundColor: "var(--primary-white)",
                  color: "var(--error-red)",
                },
              }}
            >
              Opt Out
            </Button>
          ) : (
            <Button
              onClick={() => handleOptInOut(true)}
              sx={{
                mt: 2,
                maxWidth: "600px",
                color: "var(--primary-white)",
                backgroundColor: "var(--primary-green)",
                ":hover": {
                  backgroundColor: "var(--primary-white)",
                  color: "var(--primary-green)",
                },
              }}
            >
              Opt In
            </Button>
          )}
        </Box>
      )}
    </div>
    // <Box
    //   className="container-store"
    //   sx={{
    //     display: "flex",
    //     flexDirection: "column",
    //     justifyContent: "start",
    //     gap: 2,
    //     position: "relative",
    //   }}
    // >
    //   <Box
    //     sx={{
    //       position: "relative",
    //       width: "100%",
    //       height: "auto",
    //       justifyContent: "center",
    //     }}
    //   >
    //     <Button
    //       onClick={handleBack}
    //       className="arrow-left-icon"
    //       style={{
    //         position: "absolute",
    //         top: "50px",
    //         left: "-150px",
    //         color: "white",
    //       }}
    //       startIcon={<FontAwesomeIcon icon={faArrowLeft} />}
    //     >
    //       Back
    //     </Button>
    //     <LogoRescueFlow2 />
    //   </Box>

    //   <Typography variant="h5" sx={{ mt: 2 }}>
    //     Check Opt-In Status
    //   </Typography>

    //   <Box
    //     display="flex"
    //     flexDirection="column"
    //     alignItems="center"
    //     justifyContent={"center"}
    //     gap={2}
    //   >
    //     <TextField
    //       label="Phone Number"
    //       variant="outlined"
    //       fullWidth
    //       value={phoneNumber}
    //       onChange={(e) => setPhoneNumber(e.target.value)}
    //       sx={{ mb: 2 }}
    //     />
    //     <Button
    //       variant="contained"
    //       onClick={handleCheckOptInStatus}
    //       disabled={loading || !phoneNumber}
    //       sx={{ mb: 2 }}
    //     >
    //       {loading ? <CircularProgress size={24} /> : "Check Status"}
    //     </Button>
    //   </Box>

    //   {error && (
    //     <Alert severity="error" sx={{ mb: 2 }}>
    //       {error}
    //     </Alert>
    //   )}

    //   {optInStatus && (
    //     <Box
    //       display="flex"
    //       flexDirection="column"
    //       alignItems="center"
    //       sx={{ mt: 2 }}
    //     >
    //       <Typography variant="body1">
    //         Opt-In Status:{" "}
    //         <strong>{optInStatus ? "Opted In" : "Opted Out"}</strong>
    //       </Typography>
    //       {optInStatus ? (
    //         <Button
    //           variant="outlined"
    //           color="primary"
    //           onClick={() => handleOptInOut(true)}
    //           sx={{ mt: 2 }}
    //         >
    //           Opt In
    //         </Button>
    //       ) : (
    //         <Button
    //           variant="outlined"
    //           color="secondary"
    //           onClick={() => handleOptInOut(false)}
    //           sx={{ mt: 2 }}
    //         >
    //           Opt Out
    //         </Button>
    //       )}
    //     </Box>
    //   )}
    // </Box>
  );
}
