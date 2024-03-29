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

  // console.log(data);
  return data;
};

export const updateDeliveryInfo = async (info) => {
  const authToken = sessionStorage.getItem("authToken");

  const data = await axios.patch(`${config.baseUrl}/checkout/address`, info, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
  });

  // console.log(data);
  return data;
};

// export const checkForAddress = async () => {
//   const authToken = sessionStorage.getItem("authToken");

//   const data = await axios.get(`${config.baseUrl}/checkout/checkAddress`, {
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${authToken}`,
//     },
//   });

//   console.log(data);
//   return data;
// };
