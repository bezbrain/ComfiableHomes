import axios from "axios";
import config from "../utils/config";

// REGISTER A USER
export const registerUser = async (person) => {
  const user = await axios.post(`${config.baseUrl}/auth/register`, person);
  return user;
};

// LOGIN A USER
export const loginUser = async (person) => {
  const user = await axios.post(`${config.baseUrl}/auth/login`, person);
  return user;
};

// LOGOUT A USER
export const logoutUser = async () => {
  const token = sessionStorage.getItem("authToken");
  const headers = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const user = await axios.post(`${config.baseUrl}/auth/logout`, {}, headers);
  return user;
};
