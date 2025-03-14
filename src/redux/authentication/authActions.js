import axios from "axios";
import { loginSuccess, logout } from "./authSlice";

// Backend API URL
const API_URL = "https://json-server-app-58r9.onrender.com";

// 🔐 Login Function
export const login = (email, password) => async (dispatch) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    
    dispatch(loginSuccess(response.data));  // Save token & user in Redux
    console.log(response.data);
    
  } catch (error) {
    console.error("Login Failed:", error.response?.data?.message);
  }
};

// 🔓 Logout Function
export const logoutUser = () => (dispatch) => {
  dispatch(logout());
};

// 🔒 Get Protected Data (Example: Fetch User Profile)
export const fetchProfile = () => async (dispatch, getState) => {
  const token = getState().auth.token;
  
  try {
    const response = await axios.get(`${API_URL}/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    console.log("Profile Data:", response.data);
  } catch (error) {
    dispatch(logout());
    console.error("Access Denied:", error.response?.data?.message);
  }
};
