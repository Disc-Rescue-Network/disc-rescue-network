import React, { useState, useRef, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  Box,
} from "@mui/material";
import { API_BASE_URL } from "../App";

interface VerifyOTPProps {
  open: boolean;
  onClose: () => void;
}

export function VerifyOTP({ open, onClose }: VerifyOTPProps) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    if (open) {
      inputRefs.current[0]?.focus();
    }
  }, [open]);

  const handleChange = (index: number, value: string) => {
    if (value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value !== "" && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }

      if (newOtp.every((digit) => digit !== "")) {
        handleSubmit(newOtp.join(""));
      }
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6).split("");
    const newOtp = [...otp];
    pastedData.forEach((value, index) => {
      if (index < 6) {
        newOtp[index] = value;
      }
    });
    setOtp(newOtp);
    if (newOtp.every((digit) => digit !== "")) {
      handleSubmit(newOtp.join(""));
    } else {
      inputRefs.current[pastedData.length]?.focus();
    }
  };

  const handleSubmit = async (otpValue: string) => {
    try {
      // Call API to verify OTP
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/inventory/pcm/verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          vid: 32,
          otp: otpValue,
          tofAccepted: true,
        }),
      });
      if (!response.ok) {
        console.log(response);
        console.log(response.statusText);
        console.log(response.json());
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log("Verify OTP response:", data);
    } catch (error) {
      console.error("Failed to verify OTP:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <h2
          className="header-popup-claim-disc"
          style={{
            fontSize: "3rem",
            marginTop: "10px",
            marginBottom: "2px",
            textTransform: "uppercase",
          }}
        >
          Verify Your PCM
        </h2>
      </DialogTitle>
      <DialogContent>
        <Box display="flex" justifyContent="center" my={2}>
          {otp.map((digit, index) => (
            <TextField
              key={index}
              inputRef={(el) => (inputRefs.current[index] = el)}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) =>
                handleKeyDown(index, e as React.KeyboardEvent<HTMLInputElement>)
              }
              onPaste={handlePaste}
              variant="outlined"
              inputProps={{
                maxLength: 1,
                style: { textAlign: "center", fontSize: "1.5rem" },
              }}
              sx={{ width: "3rem", mx: 0.5 }}
            />
          ))}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button
          onClick={() => handleSubmit(otp.join(""))}
          color="primary"
          variant="contained"
          disabled={otp.some((digit) => digit === "")}
        >
          Done
        </Button>
      </DialogActions>
    </Dialog>
  );
}
