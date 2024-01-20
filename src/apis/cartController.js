import axios from "axios";
import config from "../utils/config";

export const decreaseItem = async (itemId) => {
  const { data } = await axios(`${config.baseUrl}/decreaseItem/${itemId}`);
  console.log(data);
  return data;
};

export const increaseItem = async (itemId) => {
  const token = sessionStorage.getItem("authToken");

  const { data } = await axios(`${config.baseUrl}/increaseItem/${itemId}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(data);
  return data;
};
