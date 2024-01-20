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
