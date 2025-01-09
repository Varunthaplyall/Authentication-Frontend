import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Link,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Lock as LockIcon } from "lucide-react";
import PasswordResetModal from "../components/PasswordResetModal";
import apiService from "../services/Api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Login = () => {
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
  });
  const navigate = useNavigate();
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await apiService.login(formData);
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        navigate("/home");
        toast.success("Login successful");
      }
    } catch (error) {
      console.error("Login failed", error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Box
            sx={{
              mb: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                backgroundColor: "primary.main",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mb: 1,
              }}
            >
              <LockIcon color="white" size={20} />
            </Box>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
          </Box>

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              value={formData.userName}
              onChange={(e) =>
                setFormData({ ...formData, userName: e.target.value })
              }
              name="username"
              autoComplete="username"
              autoFocus
              sx={{ mb: 2 }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              sx={{ mb: 2 }}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
              sx={{ mb: 2 }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mb: 2, py: 1.5 }}
            >
              Sign In
            </Button>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Link
                href="#"
                variant="body2"
                onClick={() => setIsResetModalOpen(true)}
              >
                Forgot password?
              </Link>
              <PasswordResetModal
                open={isResetModalOpen}
                onClose={() => setIsResetModalOpen(false)}
              />
              <Link href="/register" variant="body2">
                {"Don't have an account?"}
              </Link>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login;
