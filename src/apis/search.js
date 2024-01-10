import axios from "axios";

export const search = async (type) => {
  const { data } = await axios.get(
    `https://comfiable-homes.onrender.com/api/v1/products?search=${type}`
  );

  //   console.log(data);
  return data;
};

// SORT BY CATEGORY
export const categorySort = async (category) => {
  const { data } = await axios.get(
    `https://comfiable-homes.onrender.com/api/v1/products?category=${category}`
  );

  //   console.log(data);
  return data;
};
