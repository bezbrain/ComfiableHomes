import axios from "axios";
import config from "../utils/config";

export const makePayment = async (details) => {
  // console.log(details);
  const { email, amount } = details;

  const removeDecimal = Number(amount).toFixed(0);

  const newDetails = {
    email: email,
    amount: Number(removeDecimal),
  };

  const authToken = sessionStorage.getItem("authToken");

  const { data } = await axios.post(
    `${config.baseUrl}/acceptPayment`,
    newDetails,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    }
  );

  // console.log(data);
  return data;
};

export const redirectPage = async () => {
  const authToken = sessionStorage.getItem("authToken");

  const { data } = await axios.get(`${config.baseUrl}/paystack/callback`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
  });

  console.log(data);
  return data;
};
