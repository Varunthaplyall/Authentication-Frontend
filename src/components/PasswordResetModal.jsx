import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Alert,
} from "@mui/material";
import { X } from "lucide-react";
import apiService from "../services/Api";
import toast from "react-hot-toast";

const PasswordResetModal = ({ open, onClose }) => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEmailSubmit = async () => {
    setError("");
    setLoading(true);
    try {
      const response = await apiService.forgotPassword({ email });

      if (response.status === 200) {
        setStep(2);
      } else {
        setError("Email not found");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async () => {
    setError("");
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const response = await apiService.resetPassword({
        email,
        newPassword,
      });
      if (response.status === 200) {
        setStep(1);
        setEmail("");
        setNewPassword("");
        setConfirmPassword("");
        setError("");
        toast.success("Password reset successful");
        onClose();
      } else {
        toast.error("Failed to reset password");
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setStep(1);
    setEmail("");
    setNewPassword("");
    setConfirmPassword("");
    setError("");
    onClose();
  };

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: { xs: "90%", sm: 400 },
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="password-reset-modal"
    >
      <Box sx={modalStyle}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant="h6" component="h2">
            {step === 1 ? "Reset Password" : "Enter New Password"}
          </Typography>
          <IconButton onClick={handleClose} size="small">
            <X size={20} />
          </IconButton>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {step === 1 ? (
          <>
            <TextField
              fullWidth
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              margin="normal"
              required
            />
            <Button
              fullWidth
              variant="contained"
              onClick={handleEmailSubmit}
              disabled={!email || loading}
              sx={{ mt: 2 }}
            >
              {loading ? "Checking..." : "Continue"}
            </Button>
          </>
        ) : (
          <>
            <TextField
              fullWidth
              label="New Password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Confirm New Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              margin="normal"
              required
            />
            <Button
              fullWidth
              variant="contained"
              onClick={handlePasswordReset}
              disabled={!newPassword || !confirmPassword || loading}
              sx={{ mt: 2 }}
            >
              {loading ? "Resetting..." : "Reset Password"}
            </Button>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default PasswordResetModal;
