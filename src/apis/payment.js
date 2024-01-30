import axios from "axios";
import config from "../utils/config";

export const makePayment = async (details) => {
  const authToken = sessionStorage.getItem("authToken");

  const data = await axios.patch(
    `${config.baseUrl}/checkout/address`,
    details,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    }
  );

  console.log(data);
  return data;
};
