import axios from "axios";

const apiService = {
  login: async (data) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        data
      );
      return response;
    } catch (error) {
      console.error("Login failed", error);
      throw error;
    }
  },
  register: async (data) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/register`,
        data
      );
      return response;
    } catch (error) {
      console.error("Register failed", error);
      throw error;
    }
  },
  forgotPassword: async (data) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/forgot-password`,
        data
      );
      return response;
    } catch (error) {
      console.error("Forgot password failed", error);
      throw error;
    }
  },
  resetPassword: async (data) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/auth/reset-password`,
        data
      );
      return response;
    } catch (error) {
      console.error("Reset password failed", error);
      throw error;
    }
  },
};

export default apiService;
