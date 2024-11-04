import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Typography,
  Alert,
  CircularProgress,
} from "@mui/material";
import { API_BASE_URL } from "../App";
import { WhiteBorderTextField } from "../components/WhiteBorderTextField";

export default function CheckOptInStatusForm() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [fullPhoneNumber, setFullPhoneNumber] = useState("");
  const [optInStatus, setOptInStatus] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
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
    <>
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
          {loading ? <CircularProgress size={24} /> : "Check Opt In Status"}
        </Button>
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
    </>
  );
}
