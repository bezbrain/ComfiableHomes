import axios from "axios";

export const productSorting = async (type, category, company) => {
  const token = sessionStorage.getItem("authToken");
  const { data } = await axios.get(
    `https://comfiable-homes.onrender.com/api/v1/products/?category=${category}&brand=${company}&search=${type}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  console.log(data);
  console.log(type, category, company);
  return data;
};
