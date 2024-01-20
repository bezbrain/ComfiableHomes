import axios from "axios";
import config from "../utils/config";

// ADD PRODUCT TO CART
export const addToCart = async (productId) => {
  const token = sessionStorage.getItem("authToken");
  const { data } = await axios.post(
    `${config.baseUrl}/addToCart`,
    { productId },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  // console.log(data);
  return data;
};

// GET ALL PRODUCTS IN CART
export const getCartProducts = async () => {
  const token = sessionStorage.getItem("authToken");
  const { data } = await axios.get(`${config.baseUrl}/getCartItems`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  // console.log(data);
  return data;
};

// DELETE PRODUCT FROM CART
export const deleteCartProduct = async (routeParam) => {
  const token = sessionStorage.getItem("authToken");
  const { data } = await axios.delete(
    `${config.baseUrl}/deleteCart/${routeParam}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  // console.log(data);
  return data;
};

// CLEAR ALL ITEMS FROM CART
export const deleteAll = async () => {
  const token = sessionStorage.getItem("authToken");
  const { data } = await axios.delete(`${config.baseUrl}/deleteAll`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  // console.log(data);
  return data;
};
