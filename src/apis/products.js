import axios from "axios";

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
