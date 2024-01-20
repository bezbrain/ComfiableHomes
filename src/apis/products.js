import axios from "axios";
import config from "../utils/config";

// GET ALL PRODUCTS
export const getAllProducts = async () => {
  const token = sessionStorage.getItem("authToken");
  const { data } = await axios.get(`${config.baseUrl}/products`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

// GET SINGLE PRODUCT
export const getSingleProduct = async (routeParam) => {
  const token = sessionStorage.getItem("authToken");
  const { data } = await axios.get(`${config.baseUrl}/products/${routeParam}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  //   console.log(data);
  return data;
};
