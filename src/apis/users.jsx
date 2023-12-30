import axios from "axios";

export const registerUser = async (person) => {
  const user = await axios.post(
    "https://comfiable-homes.onrender.com/api/v1/auth/register",
    person
  );
  return user;
};

export const loginUser = async (person) => {
  const user = await axios.post(
    "https://comfiable-homes.onrender.com/api/v1/auth/login",
    person
  );
  return user;
};

export const logoutUser = async () => {
  const token = sessionStorage.getItem("authToken");
  const headers = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const user = await axios.post(
    "https://comfiable-homes.onrender.com/api/v1/auth/logout",
    {},
    headers
  );
  return user;
};
