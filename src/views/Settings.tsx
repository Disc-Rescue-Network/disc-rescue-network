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
import CheckOptInStatusForm from "../components/CheckOptInStatusForm";

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
      await axios.put(`${API_BASE_URL}/sms/phone-opt-in`, {
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
      <h4
        className="subheader-store"
        style={{ width: "100%", maxWidth: "unset" }}
      >
        Check Opt In Status
      </h4>
      <CheckOptInStatusForm />
    </div>
  );
}
