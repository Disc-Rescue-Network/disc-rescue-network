import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Typography,
  Alert,
  CircularProgress,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { API_BASE_URL } from "../App";
import { WhiteBorderTextField } from "../components/WhiteBorderTextField";

export default function CheckOptInStatusForm() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [fullPhoneNumber, setFullPhoneNumber] = useState("");
  const [optInStatus, setOptInStatus] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isConsentChecked, setIsConsentChecked] = useState(false);
  const navigate = useNavigate();

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
      if (!data.data.items[0] || data.data.items.length > 1) {
        setError("Multiple phone numbers found. Please be more specific.");
        return;
      }
      setFullPhoneNumber(data.data.items[0]?.phoneNumber);
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
      await axios.put(`${API_BASE_URL}/sms/phone-opt-in`, {
        phoneNumber: fullPhoneNumber,
        smsConsent: newStatus ? 1 : 0,
      });
      setOptInStatus(newStatus ? true : false);
    } catch (err) {
      setError("Error updating opt-in status. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const optInColor = optInStatus ? "var(--primary-green)" : "var(--error-red)";

  return (
    <Box
      sx={{
        textAlign: "center",
        margin: "auto",
        width: "100%",
        maxWidth: "600px",
      }}
    >
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
          style={{ width: "100%", borderRadius: "0px" }}
        />
        <button
          onClick={handleCheckOptInStatus}
          disabled={loading || !phoneNumber}
          className="button-red-courses btn red"
          style={{ width: "100%", margin: "0px" }}
        >
          {loading ? <CircularProgress size={24} /> : "Check Opt In Status"}
        </button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {optInStatus !== null && (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          sx={{ mt: 4 }}
        >
          <Box sx={{ display: "flex", flexDirection: "row", gap: 4 }}>
            {/* <Typography
              sx={{
                fontFamily: "Bebas Neue",
                fontSize: "1.2rem",
                letterSpacing: "1px",
                color: "var(--primary-white)",
                fontWeight: "bold",
              }}
            >
              Opt-In Status:
            </Typography> */}
            {optInStatus ? (
              <Typography
                sx={{
                  fontFamily: "Bebas Neue",
                  fontWeight: "bold",
                  fontSize: "1.2rem",
                  letterSpacing: "1px",
                  color: "var(--primary-white)",
                }}
              >
                <span style={{ color: optInColor }}>Congrats!</span> You're
                opted into the Rescue Network and will receive all
                notifications.
              </Typography>
            ) : (
              <Typography
                sx={{
                  fontFamily: "Bebas Neue",
                  fontWeight: "bold",
                  fontSize: "1.2rem",
                  letterSpacing: "1px",
                  color: "var(--primary-white)",
                }}
              >
                <span style={{ color: optInColor }}>Ooops!</span> Looks like you
                haven't opted into the Rescue Network. Please click below to opt
                in and you will receive all future notifications.
              </Typography>
            )}
          </Box>
          {optInStatus ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                margin: "auto",
                justifyContent: "center",
                mt: 4,
              }}
            >
              <button
                onClick={() => handleOptInOut(false)}
                className={`button-blue-courses btn blue`}
                style={{ width: "100%", margin: "0px" }}
              >
                {loading ? <CircularProgress size={24} /> : "Opt Out"}
              </button>
            </Box>
          ) : (
            <Box
              sx={{ display: "flex", flexDirection: "column", mt: 4, gap: 4 }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isConsentChecked}
                    onChange={(e) => setIsConsentChecked(e.target.checked)}
                    color="primary"
                  />
                }
                label="By signing up, you agree to receive recurring automated text messages from Disc Rescue Network regarding our application at the number provided. Consent is not a condition of any purchase. Reply STOP to cancel at any time. Msg and data rates may apply."
                sx={{
                  mt: 2,
                  maxWidth: "600px",
                  textAlign: "left",
                  color: "var(--primary-white)",
                }}
              />
              <button
                onClick={() => handleOptInOut(true)}
                disabled={!isConsentChecked}
                className={`button-blue-courses btn blue ${
                  !isConsentChecked ? "disabled" : ""
                }`}
                style={{ width: "100%", margin: "0px" }}
              >
                {loading ? <CircularProgress size={24} /> : "Opt In"}
              </button>
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
}
