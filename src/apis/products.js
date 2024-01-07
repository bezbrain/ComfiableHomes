import axios from "axios";

// const token = sessionStorage.getItem("authToken");

// GET ALL PRODUCTS
export const getAllProducts = async () => {
  const token = sessionStorage.getItem("authToken");
  const { data } = await axios.get(
    "https://comfiable-homes.onrender.com/api/v1/products",
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
};

// GET SINGLE PRODUCT
export const getSingleProduct = async (routeParam) => {
  const token = sessionStorage.getItem("authToken");
  const { data } = await axios.get(
    `https://comfiable-homes.onrender.com/api/v1/products/${routeParam}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  //   console.log(data);
  return data;
};

// ADD PRODUCT TO CART
export const addToCart = async (productId) => {
  const token = sessionStorage.getItem("authToken");
  const { data } = await axios.post(
    "https://comfiable-homes.onrender.com/api/v1/addToCart",
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
  const { data } = await axios.get(
    "https://comfiable-homes.onrender.com/api/v1/getCartItems",
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

// DELETE PRODUCT FROM CART
export const deleteCartProduct = async (routeParam) => {
  const token = sessionStorage.getItem("authToken");
  const { data } = await axios.delete(
    `https://comfiable-homes.onrender.com/api/v1/deleteCart/${routeParam}`,
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
  const { data } = await axios.delete(
    "https://comfiable-homes.onrender.com/api/v1/deleteAll",
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
