import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import LogoRescueFlow2 from "../components/LogoRescueFlow2";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { API_BASE_URL } from "../App";

export default function Settings() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [optInStatus, setOptInStatus] = useState<boolean | null>(null);
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

  return (
    <div className="container-store">
      <i
        className="arrow-left-icon"
        style={{ top: "70px" }}
        onClick={handleBack}
      >
        <FontAwesomeIcon icon={faArrowLeft} />
      </i>
      <LogoRescueFlow2 />
      <h2>Check Opt-In Status</h2>
      <div>
        <input
          type="text"
          placeholder="Enter phone number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          style={{ margin: "10px 0", padding: "8px", width: "100%" }}
        />
        <button
          onClick={handleCheckOptInStatus}
          disabled={loading || !phoneNumber}
        >
          {loading ? "Checking..." : "Check Status"}
        </button>
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {optInStatus && <p>Opt-In Status: {optInStatus}</p>}
    </div>
  );
}
