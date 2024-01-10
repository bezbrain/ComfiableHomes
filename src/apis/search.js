import axios from "axios";

export const productSorting = async (type, category, company) => {
  const token = sessionStorage.getItem("authToken");
  const { data } = await axios.get(
    `https://comfiable-homes.onrender.com/api/v1/products/?search=${type}&category=${category}&brand=${company}`,
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
