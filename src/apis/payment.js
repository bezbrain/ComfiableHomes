import axios from "axios";
import config from "../utils/config";

export const makePayment = async (details) => {
  console.log(details);
  const authToken = sessionStorage.getItem("authToken");

  const data = await axios.post(`${config.baseUrl}/acceptPayment`, details, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
  });

  console.log(data);
  return data;
};
