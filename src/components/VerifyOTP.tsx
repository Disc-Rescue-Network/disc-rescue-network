import React, { useState, useRef, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
} from "@mui/material";
import { API_BASE_URL } from "../App";
import { Claim, Pickup } from "./PopupSurrender";

interface VerifyOTPProps {
  open: boolean;
  onClose: () => void;
  onSurrenderClose: () => void;
  onClaimClose: () => void;
  isSurrender: boolean;
  pickupInfo: Pickup | null;
  tofAccepted: boolean;
  //originalClaim: Claim | null;
  setShowSuccessMessage: (value: boolean) => void;
  setShowErrorMessage: (value: boolean) => void;
  setErrorMessage: (value: string) => void;
  setSuccessMessage: (value: string) => void;
}

export function VerifyOTP({
  open,
  onClose,
  onSurrenderClose,
  onClaimClose,
  isSurrender,
  pickupInfo,
  tofAccepted,
  //originalClaim,
  setShowSuccessMessage,
  setShowErrorMessage,
  setErrorMessage,
  setSuccessMessage,
}: VerifyOTPProps) {
  const [otpValue, setOtpValue] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(45);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (open) {
      inputRef.current?.focus();
      setResendTimer(45);
      timer = setInterval(() => {
        setResendTimer((prev) => {
          if (prev === 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [open]);

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 6);
    setOtpValue(value);

    if (value.length === 6) {
      handleSubmit(value);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Allow backspace, delete, arrow keys, etc.
    if (
      e.key === "Backspace" ||
      e.key === "Delete" ||
      e.key === "ArrowLeft" ||
      e.key === "ArrowRight" ||
      e.key === "Tab"
    ) {
      return;
    }

    // Only allow numbers
    if (!/[0-9]/.test(e.key)) {
      e.preventDefault();
    }
  };

  const handleSubmit = async (otpValue: string) => {
    try {
      // Call API to verify OTP
      setLoading(true);
      console.log("pickupInfo in verify otp", pickupInfo);
      const vid = pickupInfo?.vid!;
      if (!vid) {
        throw new Error("VID not found");
      }

      if (!otpValue) {
        throw new Error("OTP is required");
      }

      if (!tofAccepted) {
        throw new Error("Terms of Use must be accepted");
      }

      console.log("is surrender", isSurrender);

      let jsonBody;

      if (isSurrender) {
        jsonBody = JSON.stringify({
          vid: vid,
          otp: otpValue,
          tofAccepted: tofAccepted,
          surrenderRequested: true,
        });
      } else {
        jsonBody = JSON.stringify({
          vid: vid,
          otp: otpValue,
          tofAccepted: tofAccepted,
        });
      }

      console.log(jsonBody);
      const response = await fetch(`${API_BASE_URL}/inventory/pcm/verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: jsonBody,
      });

      const responseJson = await response.json();
      console.log(responseJson);

      const { success, data } = responseJson;

      if (!success) {
        //console.log(response);
        //console.log(response.statusText);
        //console.log(await response.json());
        throw new Error("Network response was not ok");
      }
      if (isSurrender) {
        onSurrenderClose();
      } else {
        onClaimClose();
      }
    } catch (error) {
      console.error("Failed to verify OTP:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    // Logic to resend the code
    //console.log("Resend code");

    let claimId = pickupInfo?.claim.id!;
    setLoading(true);

    try {
      // Call API to resend OTP
      const response = await fetch(
        `${API_BASE_URL}/inventory/pcm/resend-otp?claimId=${claimId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response);
      const responseJson = await response.json();
      console.log(responseJson);
      const { success, data } = responseJson;
      if (!success) {
        throw new Error("Network response was not ok");
      }
    } catch (error: any) {
      console.error("Failed to resend code:", error);
      setShowErrorMessage(true);
      setErrorMessage("Failed to resend code: " + error.message);
    } finally {
      setLoading(false);
      setResendTimer(45);
      const timer = setInterval(() => {
        setResendTimer((prev) => {
          if (prev === 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
  };
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm">
      <DialogTitle>Verify Your PCM</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" alignItems="center" my={2}>
          {/* Single input field styled to look like separate boxes */}
          <Box position="relative" display="flex" justifyContent="center">
            <input
              ref={inputRef}
              type="text"
              inputMode="numeric"
              aria-label="Enter 6-digit OTP"
              value={otpValue}
              onChange={handleOtpChange}
              onKeyDown={handleKeyDown}
              autoComplete="one-time-code"
              maxLength={6}
              style={{
                width: "21rem", // 6 * 3rem + 5 * 0.5rem spacing
                height: "3.5rem",
                fontSize: "1.5rem",
                textAlign: "center",
                letterSpacing: "2.5rem",
                border: "2px solid #e0e0e0",
                borderRadius: "8px",
                outline: "none",
                backgroundColor: "transparent",
                color: "transparent",
                caretColor: "transparent",
                paddingLeft: "1.25rem",
              }}
            />{" "}
            {/* Visual overlay showing individual boxes */}
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                pointerEvents: "none",
              }}
            >
              {Array.from({ length: 6 }).map((_, index) => (
                <Box
                  key={index}
                  sx={{
                    width: "3rem",
                    height: "3.5rem",
                    mx: 0.25,
                    border: "2px solid #e0e0e0",
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                    backgroundColor: "white",
                  }}
                >
                  {otpValue[index] || ""}
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
        <Box display="flex" justifyContent="center" my={2}>
          <Button
            onClick={handleResendCode}
            color="primary"
            disabled={resendTimer > 0}
          >
            {resendTimer > 0 ? `Resend Code in ${resendTimer}s` : "Resend Code"}
          </Button>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button
          onClick={() => handleSubmit(otpValue)}
          color="primary"
          variant="contained"
          disabled={otpValue.length !== 6}
        >
          Done
        </Button>
      </DialogActions>
    </Dialog>
  );
}
