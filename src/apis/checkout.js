import axios from "axios";
import config from "../utils/config";

export const deliveryInfo = async (address) => {
  const authToken = sessionStorage.getItem("authToken");

  const data = await axios.post(`${config.baseUrl}/checkout/address`, address, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
  });

  console.log(data);
  return data;
};

export const getDeliveryInfo = async () => {
  const authToken = sessionStorage.getItem("authToken");

  const data = await axios.get(`${config.baseUrl}/checkout/address`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
  });

  console.log(data);
  return data;
};
