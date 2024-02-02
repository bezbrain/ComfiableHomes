import axios from "axios";
import config from "../utils/config";
import { saveUsername } from "../utils/saveUsername";

// REGISTER A USER
export const registerUser = async (person) => {
  const user = await axios.post(`${config.baseUrl}/auth/register`, person);
  return user;
};

// LOGIN A USER
export const loginUser = async (person) => {
  const user = await axios.post(`${config.baseUrl}/auth/login`, person);
  // console.log(user.data.user);
  saveUsername(user.data.user);
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
